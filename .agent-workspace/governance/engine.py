#!/usr/bin/env python3
"""
SECOD Governance & Verification Engine
=====================================
Deterministic state machine, physical deliverable verification,
audit logging, revision management, and simulation test suite
for the SECOD Supervisor Agent.

Zero external dependencies - 100% Python 3 standard library.
"""

import sys
import os
import json
import re
import hashlib
from datetime import datetime
from pathlib import Path

# Paths relative to project root
PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent
GOVERNANCE_DIR = PROJECT_ROOT / ".agent-workspace" / "governance"
WORKFLOW_STATE_FILE = GOVERNANCE_DIR / "workflow-state.json"
AUDIT_LOG_FILE = GOVERNANCE_DIR / "audit-log.md"
TEMPLATES_DIR = GOVERNANCE_DIR / "templates"
TESTS_DIR = GOVERNANCE_DIR / "tests"

# Protected project paths that must never be altered without explicit user escalation
PROTECTED_PATHS = [
    "assets/",
    "components/",
    "Cloud-Computing/",
    "Digital-Forensics/",
    "IT-Project-Management/",
    "Security-Software-Design/",
    "Software-Development-Fundamentals/",
    "Systems-Analysis-and-Design/",
    "index.html",
    "courses.html",
]

# Gate definitions and mandatory deliverable requirements
GATE_SPECS = {
    "GATE-01": {
        "stage": "Academic Analysis",
        "agent": "academic-analyst",
        "expected_file": "01-analysis/lecture-analysis.md",
        "min_size_bytes": 1024,
        "min_lines": 30,
        "required_sections": [
            "أهداف",
            "المفاهيم",
            "الفجوات",
        ],
    },
    "GATE-02": {
        "stage": "Academic Research",
        "agent": "academic-researcher",
        "expected_file": "02-research/research-report.md",
        "min_size_bytes": 2048,
        "min_lines": 50,
        "required_sections": [
            "المعايير",
            "دراسة حالة",
        ],
    },
    "GATE-03": {
        "stage": "Academic Writing",
        "agent": "academic-writer",
        "expected_file": "03-content/lecture-content.md",
        "min_size_bytes": 5120,
        "min_lines": 100,
        "required_sections": [
            "تنويه",
            "المصطلحات",
        ],
    },
    "GATE-04": {
        "stage": "Instructional Design",
        "agent": "instructional-designer",
        "expected_file": "04-instructional-design/instructional-design.md",
        "min_size_bytes": 3072,
        "min_lines": 80,
        "required_sections": [
            "quizData",
            "mermaid",
        ],
    },
    "GATE-05": {
        "stage": "Frontend Implementation",
        "agent": "secod-frontend",
        "expected_file": "05-implementation/implementation-report.md",
        "min_size_bytes": 3072,
        "min_lines": 80,
        "required_sections": [
            "HTML5",
            "variables.css",
        ],
    },
    "GATE-06": {
        "stage": "Quality Assurance",
        "agent": "academic-qa",
        "expected_file": "06-qa/qa-report.md",
        "min_size_bytes": 2048,
        "min_lines": 50,
        "required_sections": [
            "العلمي",
            "التعليمي",
            "التقني",
        ],
    },
    "GATE-07": {
        "stage": "Final Acceptance",
        "agent": "secod-supervisor",
        "expected_file": "audit-log.md",
        "min_size_bytes": 500,
        "min_lines": 10,
        "required_sections": [],
    },
}

ALLOWED_STATE_TRANSITIONS = {
    "IDLE": ["PENDING", "IN_PROGRESS"],
    "PENDING": ["IN_PROGRESS", "BLOCKED"],
    "IN_PROGRESS": ["SUBMITTED", "BLOCKED"],
    "SUBMITTED": ["UNDER_REVIEW", "BLOCKED"],
    "UNDER_REVIEW": ["APPROVED", "REVISION_REQUIRED", "BLOCKED", "HUMAN_REVIEW"],
    "APPROVED": ["IN_PROGRESS", "COMPLETED", "HUMAN_REVIEW"],
    "REVISION_REQUIRED": ["REWORK", "HUMAN_REVIEW"],
    "REWORK": ["RESUBMITTED", "BLOCKED", "HUMAN_REVIEW"],
    "RESUBMITTED": ["UNDER_REVIEW"],
    "BLOCKED": ["PENDING", "HUMAN_REVIEW"],
    "HUMAN_REVIEW": ["PENDING", "IN_PROGRESS", "UNDER_REVIEW", "APPROVED", "REWORK", "BLOCKED", "COMPLETED"],
    "COMPLETED": ["IDLE", "PENDING"]
}


def get_iso_timestamp():
    return datetime.now().astimezone().isoformat()


def load_state():
    if not WORKFLOW_STATE_FILE.exists():
        return init_default_state()
    try:
        with open(WORKFLOW_STATE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading workflow state: {e}", file=sys.stderr)
        return init_default_state()


def save_state(state):
    state["updated_at"] = get_iso_timestamp()
    GOVERNANCE_DIR.mkdir(parents=True, exist_ok=True)
    with open(WORKFLOW_STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, ensure_ascii=False)


def init_default_state():
    return {
        "schema_version": "1.0.0",
        "system": "SECOD-Multi-Agent-Platform",
        "governance_agent": "secod-supervisor",
        "updated_at": get_iso_timestamp(),
        "active_workflow": None,
        "current_stage": None,
        "current_state": "IDLE",
        "active_gate": None,
        "revision_counters": {gate: 0 for gate in GATE_SPECS},
        "max_allowed_revisions": 2,
        "gates_status": {gate: "PENDING" for gate in GATE_SPECS},
        "active_revision": None,
        "human_escalation": None,
        "recent_decisions": []
    }


def append_audit_log(entry_id, event_type, status, details, decision):
    AUDIT_LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    ts = get_iso_timestamp()
    entry = f"""
### [{entry_id}] | {event_type}
- **التاريخ والوقت:** {ts}
- **الوكيل المبادر:** `secod-supervisor`
- **نوع الحدث:** `{event_type}`
- **الحالة:** `{status}`
- **التفاصيل والأدلة:**
{details}
- **القرار الصادر:** `{decision}`

---
"""
    with open(AUDIT_LOG_FILE, "a", encoding="utf-8") as f:
        f.write(entry)


def transition_state(new_state, reason=""):
    state = load_state()
    current_state = state.get("current_state", "IDLE")
    allowed = ALLOWED_STATE_TRANSITIONS.get(current_state, [])
    
    if new_state not in allowed:
        raise ValueError(
            f"Invalid state transition: Cannot transition from '{current_state}' to '{new_state}'. "
            f"Allowed next states are: {allowed}"
        )
    
    state["current_state"] = new_state
    decision_record = {
        "timestamp": get_iso_timestamp(),
        "from_state": current_state,
        "to_state": new_state,
        "reason": reason
    }
    state["recent_decisions"].append(decision_record)
    if len(state["recent_decisions"]) > 20:
        state["recent_decisions"] = state["recent_decisions"][-20:]
    save_state(state)
    return current_state, new_state


def verify_file_physical(file_path, min_bytes=100, min_lines=5, required_substrings=None, forbidden_substrings=None):
    """
    Physically verifies a file on disk:
    1. Existence
    2. File type is regular file
    3. File size in bytes >= min_bytes
    4. Line count >= min_lines
    5. Absence of forbidden placeholders ([TODO], [PLACEHOLDER])
    6. Presence of required substrings
    """
    path = Path(file_path)
    report = {
        "path": str(file_path),
        "exists": False,
        "is_file": False,
        "size_bytes": 0,
        "lines": 0,
        "md5": None,
        "clean_templates": True,
        "required_matches": True,
        "missing_substrings": [],
        "found_forbidden": [],
        "verdict": "FAIL",
        "evidence": ""
    }

    if not path.exists():
        report["evidence"] = f"File does not exist on disk: {file_path}"
        return report

    report["exists"] = True
    if not path.is_file():
        report["evidence"] = f"Path exists but is not a regular file: {file_path}"
        return report

    report["is_file"] = True
    stat = path.stat()
    report["size_bytes"] = stat.st_size
    
    if stat.st_size < min_bytes:
        report["evidence"] = f"File size {stat.st_size} bytes is below required minimum of {min_bytes} bytes."
        return report

    try:
        content = path.read_text(encoding="utf-8")
    except Exception as e:
        report["evidence"] = f"Failed to read file content as utf-8: {e}"
        return report

    lines = content.splitlines()
    report["lines"] = len(lines)
    report["md5"] = hashlib.md5(content.encode("utf-8")).hexdigest()

    if len(lines) < min_lines:
        report["evidence"] = f"Line count {len(lines)} is below minimum requirement of {min_lines} lines."
        return report

    # Check forbidden placeholders
    forbidden = forbidden_substrings or ["[TODO]", "[PLACEHOLDER]", "LOREM IPSUM", "TODO:"]
    for fb in forbidden:
        if fb.lower() in content.lower():
            report["found_forbidden"].append(fb)
            report["clean_templates"] = False

    if report["found_forbidden"]:
        report["evidence"] = f"File contains placeholder / uncompleted tokens: {report['found_forbidden']}"
        return report

    # Check required substrings
    if required_substrings:
        for req in required_substrings:
            if req.lower() not in content.lower():
                report["missing_substrings"].append(req)
                report["required_matches"] = False

    if report["missing_substrings"]:
        report["evidence"] = f"File is missing mandatory sections or terms: {report['missing_substrings']}"
        return report

    report["verdict"] = "PASS"
    report["evidence"] = f"File verified: {report['size_bytes']} bytes, {report['lines']} lines, MD5: {report['md5']}"
    return report


def check_protected_path_violation(paths_to_modify):
    """
    Checks if any intended modification targets a protected path.
    Returns (is_violated, violated_paths)
    """
    violated = []
    for p in paths_to_modify:
        clean_p = str(p).replace("\\", "/").lstrip("./")
        for prot in PROTECTED_PATHS:
            if clean_p.startswith(prot) or clean_p == prot.rstrip("/"):
                violated.append(clean_p)
                break
    return (len(violated) > 0), violated


def can_orchestrator_advance(gate_id):
    """
    Verifies whether Orchestrator has permission to advance to next stage.
    RULE: Orchestrator CANNOT advance unless the current gate is marked APPROVED by Supervisor.
    """
    state = load_state()
    gate_status = state.get("gates_status", {}).get(gate_id, "PENDING")
    if gate_status == "APPROVED":
        return True, f"Permission GRANTED: {gate_id} is APPROVED by Supervisor."
    return False, f"Permission DENIED: {gate_id} is in status '{gate_status}'. Advancing is blocked until Supervisor approves."


def request_revision(gate_id, agent_name, affected_files, finding_desc, evidence, expected_state, required_action, severity="HIGH"):
    """
    Processes a revision request:
    1. Checks current revision count
    2. Increments counter
    3. If counter > max (2), triggers ESCALATE_TO_HUMAN
    4. Otherwise, generates YAML revision request and sets state to REWORK
    """
    state = load_state()
    current_count = state.get("revision_counters", {}).get(gate_id, 0)
    max_revisions = state.get("max_allowed_revisions", 2)
    next_attempt = current_count + 1

    rev_id = f"REV-{gate_id}-ATTEMPT-{next_attempt}"

    if next_attempt > max_revisions:
        # Loop limit exceeded -> Human Escalation
        state["current_state"] = "HUMAN_REVIEW"
        state["gates_status"][gate_id] = "HUMAN_REVIEW"
        escalation_packet = {
            "escalation_id": f"ESC-{gate_id}-{get_iso_timestamp()}",
            "source_gate": gate_id,
            "reason": f"Maximum allowed revisions ({max_revisions}) exceeded without resolving defects.",
            "last_finding": finding_desc,
            "evidence": evidence,
            "attempts_exhausted": next_attempt,
            "status": "WAITING_FOR_USER"
        }
        state["human_escalation"] = escalation_packet
        save_state(state)

        details = f"""  - **البوابة:** `{gate_id}`
  - **السبب:** استنفاد الحد الأقصى لجولات التصحيح ({max_revisions}) دون علاج الخلل.
  - **آخر خلل:** {finding_desc}
  - **الدليل:** {evidence}
  - **الإجراء:** تجميد سير العمل فوراً وتصعيد الحالة للمستخدم البشري."""
        append_audit_log(f"ESC-{gate_id}", "REVISION_LIMIT_EXCEEDED", "ESCALATED", details, "ESCALATE_TO_HUMAN")
        return "ESCALATE_TO_HUMAN", escalation_packet

    # Normal revision request
    state["revision_counters"][gate_id] = next_attempt
    state["current_state"] = "REWORK"
    state["gates_status"][gate_id] = "REVISION_REQUIRED"

    rev_data = {
        "revision_id": rev_id,
        "workflow_id": state.get("active_workflow", "SEC-UNKNOWN"),
        "source_gate": gate_id,
        "assigned_agent": agent_name,
        "severity": severity,
        "affected_files": affected_files,
        "findings": [
            {
                "finding_id": f"FIND-{gate_id}-001",
                "description": finding_desc,
                "evidence": evidence,
                "expected_state": expected_state,
                "required_action": required_action
            }
        ],
        "acceptance_criteria": [
            "إصلاح موضع الخلل المحدد في الدليل بدقة.",
            "عدم المساس بالأقسام المستوفية (Zero Regression).",
            "إعادة تقديم تقرير التسليم المكتمل."
        ],
        "attempt": next_attempt,
        "max_allowed_attempts": max_revisions,
        "status": "PENDING",
        "timestamp": get_iso_timestamp()
    }
    state["active_revision"] = rev_data
    save_state(state)

    details = f"""  - **معرف التصحيح:** `{rev_id}`
  - **الوكيل المكلف:** `{agent_name}`
  - **البوابة:** `{gate_id}` (محاولة رقم {next_attempt} من {max_revisions})
  - **الخلل المرصود:** {finding_desc}
  - **الدليل:** {evidence}
  - **التوجيه:** {required_action}"""
    append_audit_log(rev_id, "REVISION_REQUESTED", "PENDING", details, "REQUEST_REVISION")
    return "REQUEST_REVISION", rev_data


def approve_gate(gate_id, stage_dir, notes="All acceptance criteria verified with solid evidence."):
    """
    Approves a gate:
    1. Sets gate status to APPROVED
    2. Updates workflow state
    3. Logs to audit log
    """
    state = load_state()
    state["gates_status"][gate_id] = "APPROVED"
    state["current_state"] = "APPROVED"
    state["active_revision"] = None
    save_state(state)

    details = f"""  - **البوابة:** `{gate_id}`
  - **المرحلة:** `{GATE_SPECS.get(gate_id, {}).get('stage', 'Unknown')}`
  - **الوكيل المنفذ:** `{GATE_SPECS.get(gate_id, {}).get('agent', 'Unknown')}`
  - **المسار المفحوص:** `{stage_dir}`
  - **أدلة الفحص:** {notes}"""
    append_audit_log(f"APP-{gate_id}", "GATE_APPROVED", "PASS", details, "APPROVE")
    return "APPROVED"


def block_workflow(gate_id, reason, evidence):
    """
    Halts workflow on critical blocker
    """
    state = load_state()
    state["current_state"] = "BLOCKED"
    state["gates_status"][gate_id] = "BLOCKED"
    save_state(state)

    details = f"""  - **البوابة:** `{gate_id}`
  - **سبب الحظر:** {reason}
  - **الدليل القاطع:** {evidence}"""
    append_audit_log(f"BLK-{gate_id}", "WORKFLOW_BLOCKED", "BLOCKED", details, "BLOCK")
    return "BLOCKED"


# =====================================================================
# SIMULATION TESTS (Section 14 of Specification)
# =====================================================================

def run_simulation_tests():
    """
    Executes the 7 required simulation tests in an isolated workspace:
    Test 1 — Successful Approval
    Test 2 — Detect Academic Error
    Test 3 — Missing Evidence
    Test 4 — Revision Cycle
    Test 5 — Infinite Loop Prevention
    Test 6 — Protected Files
    Test 7 — Orchestrator Integration
    """
    print("=" * 70)
    print("🧪 SECOD SUPERVISOR SIMULATION TEST SUITE")
    print("=" * 70)

    test_sandbox = TESTS_DIR / "sandbox"
    if test_sandbox.exists():
        import shutil
        shutil.rmtree(test_sandbox)
    test_sandbox.mkdir(parents=True, exist_ok=True)

    results = {}

    # -------------------------------------------------------------
    # Test 1 — Successful Approval
    # -------------------------------------------------------------
    print("\n[Running Test 1] Successful Approval...")
    try:
        t1_dir = test_sandbox / "test1-approval" / "01-analysis"
        t1_dir.mkdir(parents=True, exist_ok=True)
        t1_file = t1_dir / "lecture-analysis.md"
        t1_content = """# تفكيك وتحليل المحاضرة
## 1. أهداف التعلم وفق تصنيف بلوم
- الهدف الأول: يفهم بنية الحوسبة السحابية.
- الهدف الثاني: يحلل الفروق المعمارية.
## 2. شبكة المفاهيم الأساسية
- المفهوم الأساسي: NIST Cloud Characteristics
## 3. رصد الفجوات المعرفية
- لا توجد فجوات غير مغطاة في الشرائح الأصلية.
""" + ("\n- توثيق تفصيلي للشرائح والمحتوى." * 30)
        t1_file.write_text(t1_content, encoding="utf-8")

        # Verify
        check = verify_file_physical(t1_file, min_bytes=500, min_lines=20, required_substrings=["أهداف", "المفاهيم", "الفجوات"])
        if check["verdict"] == "PASS":
            verdict = approve_gate("GATE-01", str(t1_file), check["evidence"])
            if verdict == "APPROVED":
                results["Test 1 — Successful Approval"] = ("PASS", "Gate approved with full physical evidence.")
            else:
                results["Test 1 — Successful Approval"] = ("FAIL", f"Unexpected verdict: {verdict}")
        else:
            results["Test 1 — Successful Approval"] = ("FAIL", check["evidence"])
    except Exception as e:
        results["Test 1 — Successful Approval"] = ("FAIL", str(e))

    # -------------------------------------------------------------
    # Test 2 — Detect Academic Error
    # -------------------------------------------------------------
    print("[Running Test 2] Detect Academic Error...")
    try:
        t2_dir = test_sandbox / "test2-error" / "01-analysis"
        t2_dir.mkdir(parents=True, exist_ok=True)
        t2_file = t2_dir / "lecture-analysis.md"
        # Content contains an unverified academic claim / placeholder
        t2_content = """# تفكيك المحاضرة
## أهداف غير محددة
- مجرد شرح عام
[TODO: إكمال تفكيك الشرائح 5 إلى 10]
## المفاهيم
- ادعاء غير مثبت: الحوسبة السحابية ظهرت عام 2024.
"""
        t2_file.write_text(t2_content, encoding="utf-8")

        check = verify_file_physical(t2_file, min_bytes=100, min_lines=5, required_substrings=["أهداف", "المفاهيم", "الفجوات"])
        # Expected check to FAIL because of [TODO] or missing 'الفجوات'
        if check["verdict"] == "FAIL":
            decision, rev = request_revision(
                gate_id="GATE-01",
                agent_name="academic-analyst",
                affected_files=[str(t2_file)],
                finding_desc="وجود وسوم غير مكتملة [TODO] وإسقاط قسم الفجوات المعرفية.",
                evidence=check["evidence"],
                expected_state="استيفاء كافة الشرائح وإزالة وسوم [TODO] وتضمين قسم الفجوات.",
                required_action="تفكيك الشرائح المتبقية وصياغة قسم الفجوات بدقة."
            )
            if decision == "REQUEST_REVISION" and rev["attempt"] == 1:
                results["Test 2 — Detect Academic Error"] = ("PASS", "Detected defect, generated structured revision request.")
            else:
                results["Test 2 — Detect Academic Error"] = ("FAIL", f"Wrong decision {decision}")
        else:
            results["Test 2 — Detect Academic Error"] = ("FAIL", "Failed to detect academic error / placeholder.")
    except Exception as e:
        results["Test 2 — Detect Academic Error"] = ("FAIL", str(e))

    # -------------------------------------------------------------
    # Test 3 — Missing Evidence
    # -------------------------------------------------------------
    print("[Running Test 3] Missing Evidence (Claims without files)...")
    try:
        non_existent_file = test_sandbox / "test3-ghost" / "ghost-report.md"
        check = verify_file_physical(non_existent_file, min_bytes=500, min_lines=10)
        if not check["exists"] and check["verdict"] == "FAIL":
            results["Test 3 — Missing Evidence"] = ("PASS", "Zero tolerance for unverified claims; non-existent file strictly rejected as FAIL.")
        else:
            results["Test 3 — Missing Evidence"] = ("FAIL", "System accepted missing evidence.")
    except Exception as e:
        results["Test 3 — Missing Evidence"] = ("FAIL", str(e))

    # -------------------------------------------------------------
    # Test 4 — Revision Cycle
    # -------------------------------------------------------------
    print("[Running Test 4] Revision Cycle (Rework -> Resubmission -> Approval)...")
    try:
        t4_dir = test_sandbox / "test4-revision" / "01-analysis"
        t4_dir.mkdir(parents=True, exist_ok=True)
        t4_file = t4_dir / "lecture-analysis.md"
        
        # Step A: Defective file
        t4_file.write_text("نص قصير غير مكتمل [TODO]", encoding="utf-8")
        chk1 = verify_file_physical(t4_file, min_bytes=500, min_lines=20)
        assert chk1["verdict"] == "FAIL"

        # Step B: Supervisor requests revision
        dec1, _ = request_revision("GATE-01", "academic-analyst", [str(t4_file)], "نص قصير", chk1["evidence"], "أكمل النص", "كتابة تحليل وافي")
        assert dec1 == "REQUEST_REVISION"

        # Step C: Agent fixes file (rework)
        fixed_content = """# التحليل المصحح
## 1. أهداف التعلم
- أهداف مصححة وكاملة.
## 2. المفاهيم
- مفاهيم مستوفاة وموثقة.
## 3. الفجوات
- تم تحديد الفجوات بالكامل.
""" + ("\n- توثيق تفصيلي للشرائح والمحتوى الأكاديمي." * 25)
        t4_file.write_text(fixed_content, encoding="utf-8")

        # Step D: Supervisor re-verifies
        chk2 = verify_file_physical(t4_file, min_bytes=500, min_lines=20, required_substrings=["أهداف", "المفاهيم", "الفجوات"])
        if chk2["verdict"] == "PASS":
            app = approve_gate("GATE-01", str(t4_file), "Re-check passed after remediation.")
            if app == "APPROVED":
                results["Test 4 — Revision Cycle"] = ("PASS", "Revision successfully resolved defect and achieved APPROVE.")
            else:
                results["Test 4 — Revision Cycle"] = ("FAIL", f"Approval failed: {app}")
        else:
            results["Test 4 — Revision Cycle"] = ("FAIL", f"Fixed file failed check: {chk2['evidence']}")
    except Exception as e:
        results["Test 4 — Revision Cycle"] = ("FAIL", str(e))

    # -------------------------------------------------------------
    # Test 5 — Infinite Loop Prevention
    # -------------------------------------------------------------
    print("[Running Test 5] Infinite Loop Prevention (Max revisions -> Escalation)...")
    try:
        # Reset counter for a test gate
        test_gate = "GATE-02"
        s = load_state()
        s["revision_counters"][test_gate] = 0
        save_state(s)

        # Attempt 1
        d1, _ = request_revision(test_gate, "academic-researcher", ["dummy.md"], "خلل 1", "دليل 1", "تعديل", "إصلاح 1")
        assert d1 == "REQUEST_REVISION"

        # Attempt 2
        d2, _ = request_revision(test_gate, "academic-researcher", ["dummy.md"], "خلل 2", "دليل 2", "تعديل", "إصلاح 2")
        assert d2 == "REQUEST_REVISION"

        # Attempt 3 (Should exceed max limit of 2)
        d3, esc = request_revision(test_gate, "academic-researcher", ["dummy.md"], "خلل 3", "دليل 3", "تعديل", "إصلاح 3")
        if d3 == "ESCALATE_TO_HUMAN":
            cur_st = load_state()["current_state"]
            if cur_st == "HUMAN_REVIEW":
                results["Test 5 — Infinite Loop Prevention"] = ("PASS", "Loop halted at attempt 3, escalated to HUMAN_REVIEW.")
            else:
                results["Test 5 — Infinite Loop Prevention"] = ("FAIL", f"State is {cur_st}, expected HUMAN_REVIEW.")
        else:
            results["Test 5 — Infinite Loop Prevention"] = ("FAIL", f"Loop not stopped! Got decision: {d3}")
    except Exception as e:
        results["Test 5 — Infinite Loop Prevention"] = ("FAIL", str(e))

    # -------------------------------------------------------------
    # Test 6 — Protected Files
    # -------------------------------------------------------------
    print("[Running Test 6] Protected Files Violation Check...")
    try:
        risky_paths = [
            "assets/css/variables.css",
            "components/header.js",
            "Cloud-Computing/Lecture-01.html",
            "index.html",
            ".agent-workspace/production/lecture-01/01-analysis/lecture-analysis.md"
        ]
        is_violated, violated = check_protected_path_violation(risky_paths)
        if is_violated and len(violated) == 4 and ".agent-workspace" not in violated[0]:
            results["Test 6 — Protected Files"] = ("PASS", f"Protected site paths successfully intercepted: {violated}")
        else:
            results["Test 6 — Protected Files"] = ("FAIL", f"Violation check incorrect: {violated}")
    except Exception as e:
        results["Test 6 — Protected Files"] = ("FAIL", str(e))

    # -------------------------------------------------------------
    # Test 7 — Orchestrator Integration
    # -------------------------------------------------------------
    print("[Running Test 7] Orchestrator Integration (Advancement Guard)...")
    try:
        # Gate 03 is PENDING
        s = load_state()
        s["gates_status"]["GATE-03"] = "PENDING"
        save_state(s)

        allowed, msg = can_orchestrator_advance("GATE-03")
        if allowed:
            results["Test 7 — Orchestrator Integration"] = ("FAIL", "Orchestrator was improperly allowed to advance unapproved gate.")
        else:
            # Now simulate Supervisor approving Gate 03
            s["gates_status"]["GATE-03"] = "APPROVED"
            save_state(s)
            allowed_after, msg_after = can_orchestrator_advance("GATE-03")
            if allowed_after:
                results["Test 7 — Orchestrator Integration"] = ("PASS", "Progression strictly blocked when PENDING, unlocked when APPROVED.")
            else:
                results["Test 7 — Orchestrator Integration"] = ("FAIL", "Failed to allow advancement after approval.")
    except Exception as e:
        results["Test 7 — Orchestrator Integration"] = ("FAIL", str(e))

    # -------------------------------------------------------------
    # Print Test Summary Table
    # -------------------------------------------------------------
    print("\n" + "=" * 70)
    print("📋 SIMULATION TEST RESULTS SUMMARY")
    print("=" * 70)
    all_passed = True
    for test_name, (status, detail) in results.items():
        status_icon = "✅ PASS" if status == "PASS" else "❌ FAIL"
        print(f"{status_icon} | {test_name}: {detail}")
        if status != "PASS":
            all_passed = False

    print("=" * 70)
    if all_passed:
        print("🟢 ALL 7 SIMULATION TESTS PASSED SUCCESSFULLY.")
    else:
        print("🔴 SOME TESTS FAILED.")
    print("=" * 70)

    return results


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 engine.py [status | run-tests | verify-file | check-advance | init-state]")
        sys.exit(1)

    cmd = sys.argv[1]

    if cmd == "status":
        state = load_state()
        print(json.dumps(state, indent=2, ensure_ascii=False))

    elif cmd == "run-tests":
        results = run_simulation_tests()
        for k, v in results.items():
            if v[0] != "PASS":
                sys.exit(1)
        sys.exit(0)

    elif cmd == "init-state":
        save_state(init_default_state())
        print("Workflow state initialized to default.")

    elif cmd == "check-advance":
        if len(sys.argv) < 3:
            print("Usage: python3 engine.py check-advance <GATE_ID>")
            sys.exit(1)
        gate = sys.argv[2]
        allowed, msg = can_orchestrator_advance(gate)
        print(f"Allowed: {allowed} | {msg}")
        sys.exit(0 if allowed else 1)

    elif cmd == "verify-file":
        if len(sys.argv) < 3:
            print("Usage: python3 engine.py verify-file <PATH> [min_bytes] [min_lines]")
            sys.exit(1)
        path = sys.argv[2]
        min_b = int(sys.argv[3]) if len(sys.argv) > 3 else 100
        min_l = int(sys.argv[4]) if len(sys.argv) > 4 else 5
        res = verify_file_physical(path, min_bytes=min_b, min_lines=min_l)
        print(json.dumps(res, indent=2, ensure_ascii=False))
        sys.exit(0 if res["verdict"] == "PASS" else 1)

    else:
        print(f"Unknown command: {cmd}")
        sys.exit(1)


if __name__ == "__main__":
    main()
