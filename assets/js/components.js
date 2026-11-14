/**
 * ==============================================================================
 * MANAR UNIVERSITY LEARNING PLATFORM - SHARED COMPONENTS BUNDLE (components.js)
 * Master loader for Shared Header, Shared Footer, and Component Initialization
 * ==============================================================================
 */

(function () {
    "use strict";

    const FOOTER_DATA = {
        college: "كلية المنار للعلوم والتكنولوجيا (M.C.S.T)",
        departments: "قسم الأمن السيبراني والشبكات & قسم تكنولوجيا المعلومات — المستوى الثالث (الترم الثاني)",
        committee: "إعداد عضو اللجنة العلمية في القسمين م. بشار زبله",
        year: 2026,
        links: [
            { label: "🏠 المنصة الرئيسية", path: "index.html" },
            { label: "📚 دليل المقررات الدراسية", path: "courses.html" },
            { label: "💻 أساسيات تطوير البرمجيات", path: "Software-Development-Fundamentals/index.html" },
            { label: "🛡️ تصميم البرمجيات الآمنة", path: "Security-Software-Design/index.html" },
            { label: "☁️ الحوسبة السحابية", path: "Cloud-Computing/index.html" },
            { label: "📊 إدارة مشاريع IT", path: "IT-Project-Management/index.html" },
            { label: "🔎 التحقيق الجنائي الرقمي", path: "Digital-Forensics/index.html" },
            { label: "📐 تحليل وتصميم النظم", path: "Systems-Analysis-and-Design/index.html" }
        ],
        instructors: {
            "software-development-fundamentals": "أستاذ المقرر: د. عبدالرزاق الأهدل & أ. وليد الشراعي",
            "security-software-design": "أستاذ المقرر: د. عبدالرزاق الأهدل",
            "cloud-computing": "أستاذ المقرر: أ.د. عبده ناصر شويه",
            "it-project-management": "أستاذ المقرر: أ.د. عبده ناصر شويه",
            "digital-forensics": "أستاذ المقرر: أ. أفنان الشرفي",
            "systems-analysis-and-design": "أستاذ المقرر: أ. أفنان الشرفي"
        }
    };

    function isSubdirectory() {
        const course = (document.body.getAttribute("data-course") || 
                        document.documentElement.getAttribute("data-course") || "").toLowerCase().trim();
        if (course === "root") return false;
        if (course !== "") return true;

        const path = window.location.pathname || "";
        return /[\/\\](Software-Development-Fundamentals|Security-Software-Design|Cloud-Computing|IT-Project-Management|Digital-Forensics|Systems-Analysis-and-Design)[\/\\]/i.test(path);
    }

    function resolveRelativeUrl(targetPath) {
        const cleanPath = targetPath.startsWith("/") ? targetPath.substring(1) : targetPath;
        if (isSubdirectory()) {
            return "../" + cleanPath;
        }
        return cleanPath;
    }

    function renderFooter() {
        let mountPoint = document.getElementById("site-footer") || 
                         document.querySelector("footer.site-footer") || 
                         document.querySelector("footer");

        if (!mountPoint) {
            mountPoint = document.createElement("footer");
            mountPoint.id = "site-footer";
            mountPoint.className = "site-footer";
            document.body.appendChild(mountPoint);
        } else {
            mountPoint.id = "site-footer";
            mountPoint.className = "site-footer";
        }

        const courseAttr = (document.body.getAttribute("data-course") || 
                            document.documentElement.getAttribute("data-course") || 
                            window.location.pathname).toLowerCase();

        let instructorText = "";
        for (const [key, instructor] of Object.entries(FOOTER_DATA.instructors)) {
            if (courseAttr.includes(key)) {
                instructorText = instructor;
                break;
            }
        }

        const instructorHtml = instructorText 
            ? `<p class="footer-instructor" style="margin-bottom:0.4rem; color:var(--primary); font-weight:700;">${instructorText}</p>`
            : "";

        mountPoint.innerHTML = `
            <div class="footer-inner" style="max-width:var(--max-w-container); margin:0 auto; padding:0 var(--space-4);">
                <p style="font-weight:700; color:var(--primary); font-size:1.02rem; margin-bottom:0.4rem;">
                    🏛️ ${FOOTER_DATA.college}
                </p>
                <p style="color:var(--text-muted); font-size:0.92rem; margin-bottom:0.4rem;">
                    ${FOOTER_DATA.departments}
                </p>
                ${instructorHtml}
                <p style="color:var(--secondary); font-weight:800; font-size:0.98rem; margin:0.6rem 0;">
                    ${FOOTER_DATA.committee}
                </p>
                <div class="footer-links-row" style="display:flex; justify-content:center; flex-wrap:wrap; gap:0.8rem; margin:0.8rem 0; font-size:0.85rem;">
                    <a href="${resolveRelativeUrl('index.html')}" style="color:var(--text-muted); text-decoration:none;">🏠 المنصة الرئيسية</a>
                    <span style="color:var(--border-color);">•</span>
                    <a href="${resolveRelativeUrl('courses.html')}" style="color:var(--text-muted); text-decoration:none;">📚 دليل المقررات</a>
                    <span style="color:var(--border-color);">•</span>
                    <a href="${resolveRelativeUrl('Software-Development-Fundamentals/index.html')}" style="color:var(--text-muted); text-decoration:none;">أساسيات تطوير البرمجيات</a>
                    <span style="color:var(--border-color);">•</span>
                    <a href="${resolveRelativeUrl('Security-Software-Design/index.html')}" style="color:var(--text-muted); text-decoration:none;">تصميم البرمجيات الآمنة</a>
                    <span style="color:var(--border-color);">•</span>
                    <a href="${resolveRelativeUrl('Cloud-Computing/index.html')}" style="color:var(--text-muted); text-decoration:none;">الحوسبة السحابية</a>
                    <span style="color:var(--border-color);">•</span>
                    <a href="${resolveRelativeUrl('IT-Project-Management/index.html')}" style="color:var(--text-muted); text-decoration:none;">إدارة مشاريع IT</a>
                    <span style="color:var(--border-color);">•</span>
                    <a href="${resolveRelativeUrl('Digital-Forensics/index.html')}" style="color:var(--text-muted); text-decoration:none;">التحقيق الجنائي الرقمي</a>
                    <span style="color:var(--border-color);">•</span>
                    <a href="${resolveRelativeUrl('Systems-Analysis-and-Design/index.html')}" style="color:var(--text-muted); text-decoration:none;">تحليل وتصميم النظم</a>
                </div>
                <p style="margin-top:0.8rem; font-size:0.8rem; color:var(--text-muted); opacity:0.85;">
                    © ${FOOTER_DATA.year} جميع الحقوق محفوظة — المنصة الأكاديمية التفاعلية للتعلم الذاتي
                </p>
            </div>
        `;
    }

    function initHeaderControls() {
        const toggleBtn = document.getElementById("themeToggleBtn");
        if (toggleBtn) {
            const currentTheme = document.documentElement.getAttribute("data-theme") || 
                                 localStorage.getItem("theme") || "light";
            const icon = toggleBtn.querySelector("#themeIcon") || toggleBtn.querySelector("span:first-child");
            const text = toggleBtn.querySelector("#themeText") || toggleBtn.querySelector("span:last-child");

            if (icon) icon.textContent = currentTheme === "dark" ? "☀️" : "🌙";
            if (text) text.textContent = currentTheme === "dark" ? "الوضع النهاري" : "الوضع الليلي";
        }

        initMobileDrawer();
        highlightActiveNavigation();
    }

    function initMobileDrawer() {
        const toggleBtn = document.getElementById("mobileMenuBtn");
        const closeBtn = document.getElementById("mobileDrawerClose");
        const overlay = document.getElementById("mobileDrawerOverlay");
        const drawer = document.getElementById("mobileDrawer");

        function openDrawer() {
            if (drawer) drawer.classList.add("active");
            if (overlay) overlay.classList.add("active");
            if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "true");
            document.body.style.overflow = "hidden";
        }

        function closeDrawer() {
            if (drawer) drawer.classList.remove("active");
            if (overlay) overlay.classList.remove("active");
            if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
        }

        if (toggleBtn) {
            toggleBtn.addEventListener("click", openDrawer);
        }
        if (closeBtn) {
            closeBtn.addEventListener("click", closeDrawer);
        }
        if (overlay) {
            overlay.addEventListener("click", closeDrawer);
        }

        if (drawer) {
            const links = drawer.querySelectorAll("a");
            links.forEach(l => l.addEventListener("click", closeDrawer));
        }
    }

    function highlightActiveNavigation() {
        const path = (window.location.pathname || "").toLowerCase();
        const isCourses = path.includes("courses.html") || window.location.href.includes("courses.html");
        const isRoot = path.endsWith("index.html") || path.endsWith("/") || (!isCourses && !path.includes("/lecture-"));

        const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
        navLinks.forEach(link => {
            const href = (link.getAttribute("href") || "").toLowerCase();
            if (isCourses && href.includes("courses.html")) {
                link.classList.add("active");
            } else if (isRoot && (href.endsWith("index.html") || href === "#" || href === "index.html")) {
                link.classList.add("active");
            }
        });
    }

    function init() {
        renderFooter();
        initHeaderControls();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    window.renderSiteFooter = renderFooter;
})();
