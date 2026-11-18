/**
 * ==============================================================================
 * SECOD PLATFORM - SHARED FOOTER COMPONENT (footer.js)
 * Minimalist Academic Design System
 * 
 * 1. قسم الهوية الأكاديمية:
 *    - اسم المنصة وشعارها.
 *    - وصف مختصر: منصة تعليمية أكاديمية تابعة للجنة العلمية لقسمي الأمن السيبراني
 *      وتقنية المعلومات – المستوى الثالث، بكلية المنار للعلوم والتكنولوجيا.
 * 2. قسم التنقل:
 *    - الرئيسية.
 *    - المقررات الدراسية.
 *    - عن المنصة.
 * 3. قسم الانتماء المؤسسي:
 *    - اللجنة العلمية.
 *    - قسما الأمن السيبراني وتقنية المعلومات.
 *    - كلية المنار للعلوم والتكنولوجيا.
 * 4. الشريط السفلي:
 *    - © 2026 جميع الحقوق محفوظة.
 * ==============================================================================
 */

(function () {
    "use strict";

    const FOOTER_DATA = {
        brand: "SECOD",
        tagline: "Understand. Learn. Apply.",
        academicDescription: "منصة تعليمية أكاديمية تابعة للجنة العلمية لقسمي الأمن السيبراني وتقنية المعلومات – المستوى الثالث، بكلية المنار للعلوم والتكنولوجيا.",
        year: 2026
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

        const logoPath = resolveRelativeUrl("assets/brand/logo/secod-logo-dark.png");
        const homeUrl = resolveRelativeUrl("index.html");
        const coursesUrl = resolveRelativeUrl("courses.html");
        const aboutUrl = resolveRelativeUrl("about.html");

        mountPoint.innerHTML = `
            <div class="footer-inner">
                <div class="footer-academic-grid">
                    
                    <!-- 1. قسم الهوية الأكاديمية -->
                    <div class="footer-identity-col">
                        <div style="display:inline-flex; align-items:center; gap:0.75rem; margin-bottom:0.75rem;">
                            <img src="${logoPath}" alt="SECOD Logo" style="width:36px; height:36px; border-radius:8px; border:1px solid rgba(0,246,228,0.35); background:#001C32; object-fit:contain; padding:2px;">
                            <div>
                                <h3 class="footer-brand-title">${FOOTER_DATA.brand}</h3>
                                <span class="footer-brand-tagline">${FOOTER_DATA.tagline}</span>
                            </div>
                        </div>
                        <p class="footer-desc-text">
                            ${FOOTER_DATA.academicDescription}
                        </p>
                    </div>

                    <!-- 2. قسم التنقل -->
                    <div class="footer-nav-col">
                        <h4 class="footer-col-header">
                            <span class="footer-col-icon">🧭</span>
                            <span>التنقل السريع</span>
                        </h4>
                        <ul class="footer-nav-list">
                            <li><a href="${homeUrl}"><span>🏠</span> الرئيسية</a></li>
                            <li><a href="${coursesUrl}"><span>📚</span> المقررات الدراسية</a></li>
                            <li><a href="${aboutUrl}"><span>ℹ️</span> عن المنصة</a></li>
                        </ul>
                    </div>

                    <!-- 3. قسم الانتماء المؤسسي -->
                    <div class="footer-institutional-col">
                        <h4 class="footer-col-header">
                            <span class="footer-col-icon">🏛️</span>
                            <span>الانتماء المؤسسي</span>
                        </h4>
                        <ul class="footer-institutional-list">
                            <li>
                                <span>👥</span>
                                <span><strong>الجهة المشرفة:</strong> اللجنة العلمية</span>
                            </li>
                            <li>
                                <span>💻</span>
                                <span><strong>الأقسام:</strong> الأمن السيبراني وتقنية المعلومات</span>
                            </li>
                            <li>
                                <span>🎓</span>
                                <span><strong>المؤسسة الأكاديمية:</strong> كلية المنار للعلوم والتكنولوجيا</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <!-- 4. الشريط السفلي -->
                <div class="footer-bottom-bar">
                    <p>© ${FOOTER_DATA.year} جميع الحقوق محفوظة.</p>
                    <p style="font-size:0.78rem; opacity:0.85;">SECOD Academic Platform • صُمم وفق المعايير الأكاديمية الحديثة</p>
                </div>
            </div>
        `;
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", renderFooter);
    } else {
        renderFooter();
    }

    window.renderSiteFooter = renderFooter;
})();
