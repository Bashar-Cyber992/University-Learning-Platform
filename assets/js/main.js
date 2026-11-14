/**
 * ==============================================================================
 * MANAR UNIVERSITY LEARNING PLATFORM - CORE SCRIPTS (main.js)
 * Theme Manager, Reading Progress, TOC Spy, Accordion, Code Copy & Utilities
 * ==============================================================================
 */

(function () {
    "use strict";

    /* ==============================================================================
     * 1. THEME MANAGEMENT (Light / Dark Mode synced with localStorage key 'theme')
     * ============================================================================== */

    function getSavedTheme() {
        return localStorage.getItem("theme") || "light";
    }

    function initTheme() {
        const current = getSavedTheme();
        document.documentElement.setAttribute("data-theme", current);
        updateThemeUI(current);
    }

    function toggleTheme() {
        const active = document.documentElement.getAttribute("data-theme") || "light";
        const next = active === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        updateThemeUI(next);
    }

    function updateThemeUI(theme) {
        const icon = document.getElementById("themeIcon");
        const text = document.getElementById("themeText");
        const btn = document.getElementById("themeToggleBtn");

        if (icon) icon.textContent = theme === "dark" ? "☀️" : "🌙";
        if (text) text.textContent = theme === "dark" ? "الوضع النهاري" : "الوضع الليلي";

        if (window.updateHeaderThemeButton && btn) {
            window.updateHeaderThemeButton(btn, theme);
        }
    }

    // Expose globally for backward compatibility
    window.initTheme = initTheme;
    window.toggleTheme = toggleTheme;
    window.updateThemeButton = updateThemeUI;

    /* ==============================================================================
     * 2. READING PROGRESS BAR & SIDEBAR SCROLL SPY
     * ============================================================================== */

    function initScrollInteractions() {
        const progressBar = document.getElementById("reading-progress") || 
                            document.querySelector(".reading-progress-bar");
        const tocLinks = document.querySelectorAll("#toc-list a, .toc-list a");
        const sections = document.querySelectorAll("main section[id], .content-area section[id]");

        if (!progressBar && tocLinks.length === 0) return;

        window.addEventListener("scroll", function () {
            // Reading progress
            if (progressBar) {
                const docH = document.documentElement.scrollHeight - window.innerHeight;
                const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
                progressBar.style.width = Math.min(100, Math.max(0, pct)) + "%";
            }

            // Scroll-spy active TOC
            if (sections.length > 0 && tocLinks.length > 0) {
                let currentId = "";
                sections.forEach(function (sec) {
                    if (window.scrollY >= sec.offsetTop - 180) {
                        currentId = sec.getAttribute("id");
                    }
                });

                tocLinks.forEach(function (link) {
                    const href = link.getAttribute("href");
                    if (href === "#" + currentId) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            }
        });
    }

    /* ==============================================================================
     * 3. CODE SNIPPET COPY TO CLIPBOARD
     * ============================================================================== */

    function copyCode(btn) {
        if (!btn) return;
        const codeWin = btn.closest(".code-window");
        if (!codeWin) return;
        const pre = codeWin.querySelector("pre");
        if (!pre) return;

        const text = pre.innerText || pre.textContent;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
                const orig = btn.textContent;
                btn.textContent = "✓ تم النسخ";
                setTimeout(function () {
                    btn.textContent = orig;
                }, 1600);
            });
        }
    }
    window.copyCode = copyCode;

    /* ==============================================================================
     * 4. ACCORDIONS & EXPANDABLES
     * ============================================================================== */

    function toggleAccordion(btn) {
        if (!btn) return;
        const item = btn.closest(".accordion-item") || btn.parentElement;
        if (item) {
            item.classList.toggle("open");
            item.classList.toggle("active");
        }
    }
    window.toggleAccordion = toggleAccordion;
    window.toggleAcc = toggleAccordion; // legacy alias

    /* ==============================================================================
     * 5. GENERIC TAB SWITCHER
     * ============================================================================== */

    function openTab(evt, tabId, groupClass) {
        if (!tabId || !groupClass) return;
        document.querySelectorAll("." + groupClass).forEach(function (panel) {
            panel.classList.remove("active");
        });

        const targetPanel = document.getElementById(tabId);
        if (targetPanel) {
            targetPanel.classList.add("active");
        }

        const tabBtn = evt && evt.currentTarget ? evt.currentTarget : evt;
        if (tabBtn && tabBtn.parentElement) {
            tabBtn.parentElement.querySelectorAll(".tab-btn").forEach(function (b) {
                b.classList.remove("active");
            });
            tabBtn.classList.add("active");
        }
    }
    window.openTab = openTab;

    /* ==============================================================================
     * 6. FLASHCARDS INTERACTION & EVENT DELEGATION
     * ============================================================================== */

    function initInteractiveDelegation() {
        document.addEventListener("click", function (e) {
            // Flashcard click flip
            const flashcard = e.target.closest(".flashcard");
            if (flashcard) {
                flashcard.classList.toggle("flipped");
                return;
            }

            // Accordion header click
            const accHeader = e.target.closest(".accordion-header");
            if (accHeader && !accHeader.getAttribute("onclick")) {
                toggleAccordion(accHeader);
                return;
            }

            // Code copy button click
            const copyBtn = e.target.closest(".copy-code-btn");
            if (copyBtn && !copyBtn.getAttribute("onclick")) {
                copyCode(copyBtn);
                return;
            }

            // Theme toggle button click
            const themeBtn = e.target.closest("#themeToggleBtn, .theme-toggle-btn");
            if (themeBtn && !themeBtn.getAttribute("onclick")) {
                toggleTheme();
                return;
            }
        });

        // Checklist items
        document.addEventListener("change", function (e) {
            const chk = e.target.closest(".checklist-item input[type='checkbox']");
            if (chk) {
                const label = chk.closest(".checklist-item");
                if (label) {
                    label.classList.toggle("checked", chk.checked);
                }
            }
        });
    }

    /* ==============================================================================
     * 7. AUTO-INITIALIZATION ON PAGE LOAD
     * ============================================================================== */

    function initPage() {
        initTheme();
        initScrollInteractions();
        initInteractiveDelegation();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initPage);
    } else {
        initPage();
    }
})();
