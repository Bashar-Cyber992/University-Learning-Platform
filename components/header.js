/**
 * ==============================================================================
 * MANAR UNIVERSITY LEARNING PLATFORM - SHARED HEADER COMPONENT (header.js)
 * Single Source of Truth for Platform Navigation Header & Controls
 * ==============================================================================
 */

(function () {
    "use strict";

    function initHeader() {
        // Ensure theme toggle button has standard content and behavior
        const toggleBtn = document.getElementById("themeToggleBtn");
        if (toggleBtn) {
            const currentTheme = document.documentElement.getAttribute("data-theme") || 
                                 localStorage.getItem("theme") || "light";
            updateThemeButtonText(toggleBtn, currentTheme);

            if (!toggleBtn.onclick && !toggleBtn.dataset.bound) {
                toggleBtn.addEventListener("click", function () {
                    if (window.toggleTheme) {
                        window.toggleTheme();
                    }
                });
                toggleBtn.dataset.bound = "true";
            }
        }

        // Ensure reading progress container is initialized if present
        const progressEl = document.getElementById("reading-progress") || 
                           document.querySelector(".reading-progress-bar");
        if (progressEl) {
            window.addEventListener("scroll", function () {
                const docH = document.documentElement.scrollHeight - window.innerHeight;
                const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
                progressEl.style.width = Math.min(100, Math.max(0, pct)) + "%";
            });
        }

        // Initialize mobile menu drawer if present
        initMobileDrawer();

        // Highlight active navigation link
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

        if (toggleBtn && !toggleBtn.dataset.bound) {
            toggleBtn.addEventListener("click", openDrawer);
            toggleBtn.dataset.bound = "true";
        }
        if (closeBtn && !closeBtn.dataset.bound) {
            closeBtn.addEventListener("click", closeDrawer);
            closeBtn.dataset.bound = "true";
        }
        if (overlay && !overlay.dataset.bound) {
            overlay.addEventListener("click", closeDrawer);
            overlay.dataset.bound = "true";
        }

        if (drawer) {
            const links = drawer.querySelectorAll("a");
            links.forEach(l => {
                if (!l.dataset.bound) {
                    l.addEventListener("click", closeDrawer);
                    l.dataset.bound = "true";
                }
            });
        }
    }

    function highlightActiveNavigation() {
        const path = (window.location.pathname || "").toLowerCase();
        const hrefLoc = (window.location.href || "").toLowerCase();
        const isCourseSubdir = /[\/\\](software-development-fundamentals|security-software-design|cloud-computing|it-project-management|digital-forensics|systems-analysis-and-design)[\/\\]/i.test(path) ||
                               /[\/\\](software-development-fundamentals|security-software-design|cloud-computing|it-project-management|digital-forensics|systems-analysis-and-design)[\/\\]/i.test(hrefLoc);
        const isCoursesPage = hrefLoc.includes("courses.html");
        const isRootHome = !isCourseSubdir && !isCoursesPage && (path.endsWith("index.html") || path.endsWith("/") || path === "");

        const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link, .mobile-nav-links a");
        navLinks.forEach(link => {
            link.classList.remove("active");
            const href = (link.getAttribute("href") || "").toLowerCase();
            if (isCoursesPage && href.includes("courses.html")) {
                link.classList.add("active");
            } else if (isCourseSubdir && href.includes("courses.html")) {
                link.classList.add("active");
            } else if (isRootHome && (href === "index.html" || href.endsWith("/index.html") || href === "#")) {
                link.classList.add("active");
            }
        });
    }

    function updateThemeButtonText(btn, theme) {
        const icon = btn.querySelector("#themeIcon") || btn.querySelector("span:first-child");
        const text = btn.querySelector("#themeText") || btn.querySelector("span:last-child");
        if (theme === "dark") {
            if (icon) icon.textContent = "☀️";
            if (text) text.textContent = "الوضع النهاري";
        } else {
            if (icon) icon.textContent = "🌙";
            if (text) text.textContent = "الوضع الليلي";
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initHeader);
    } else {
        initHeader();
    }

    window.updateHeaderThemeButton = updateThemeButtonText;
})();
