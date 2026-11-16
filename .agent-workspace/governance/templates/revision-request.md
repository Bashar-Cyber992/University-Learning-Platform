# 📋 قالب أمر التصحيح وإعادة التكليف (Revision Request Template)

```markdown
<!-- SECOD_REVISION_REQUEST_START -->
```yaml
revision_id: REV-[COURSE]-[LEC]-[GATE]-[ATTEMPT]
workflow_id: SEC-[COURSE]-[LEC]
source_gate: [GATE-01 | GATE-02 | GATE-03 | GATE-04 | GATE-05 | GATE-06]
assigned_agent: [academic-analyst | academic-researcher | academic-writer | instructional-designer | secod-frontend | academic-qa]
severity: [CRITICAL | HIGH | MEDIUM | LOW]

affected_files:
  - path/to/file.md

findings:
  - finding_id: FIND-001
    description: "الوصف الدقيق للخلل أو النقص المكتشف"
    evidence: "الموضع المحدد بالسطر والاقتباس أو الفحص الرياضي"
    expected_state: "الحالة المعيارية المطلوبة للمخرج"
    required_action: "الإجراء التقني المحدد والمباشر المطلوب تنفيذه"

acceptance_criteria:
  - "معيار التحقق الصريح 1"
  - "معيار التحقق الصريح 2"

attempt: 1
max_allowed_attempts: 2
status: PENDING
timestamp: "YYYY-MM-DDTHH:MM:SS+03:00"
```

### 📝 توجيهات المراجعة الفنية من المشرف (Supervisor Guidance Notes):
- **الدافع المباشر للرفض:** [شرح موجز للأثر السلبي المترتب على الخلل إن لم يعالج].
- **التوجيه البيداغوجي/التقني:** [إرشادات عملية مساعدة للوكيل المنفذ لتلافي تكرار الخطأ].
- **التحذير من استنفاد المحاولات:** تنبيه: هذه المحاولة رقم [1 أو 2] من أصل محاولتين مسموح بهما آلياً. فشل المحاولة الثانية سيؤدي إلى تجميد المهمة والتصعيد المباشر للمستخدم البشري.
<!-- SECOD_REVISION_REQUEST_END -->
```
