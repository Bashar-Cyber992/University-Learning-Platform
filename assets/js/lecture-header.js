/**
 * ==============================================================================
 * SECOD DESIGN SYSTEM - INTERACTIVE LECTURE HEADER CONTROLLER (lecture-header.js)
 * Component: SECOD Interactive Lecture Header
 * Interactions: Smart Scroll, Dynamic Progress, Cyber Visual Tilt, Key Concept,
 *               Bookmarks, Social Share, Font Scaler, Reading Mode & Toasts.
 * Brand: SECOD — Understand. Learn. Apply.
 * Author: SECOD Design & Engineering Team (Bashar Zblh)
 * ==============================================================================
 */

(function () {
    "use strict";

    /* ==========================================================================
     * 1. TOAST NOTIFICATION ENGINE
     * ========================================================================== */

    let toastTimeout = null;

    function showToast(message, icon) {
        icon = icon || "⚡";
        let toast = document.getElementById("secodToast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "secodToast";
            toast.className = "secod-toast";
            toast.setAttribute("role", "status");
            toast.setAttribute("aria-live", "polite");
            document.body.appendChild(toast);
        }

        toast.innerHTML = `<span class="secod-toast-icon">${icon}</span><span>${message}</span>`;
        toast.classList.add("active");

        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        toastTimeout = setTimeout(function () {
            toast.classList.remove("active");
        }, 2800);
    }

    /* ==========================================================================
     * 2. SMART SCROLL & STICKY NAVIGATION
     * ========================================================================== */

    function initSmartScrollNav() {
        const nav = document.getElementById("secodPlatformNav");
        const spacer = document.getElementById("secodNavSpacer");
        if (!nav) return;

        let navTop = nav.offsetTop;
        let isSticky = false;
        let ticking = false;

        function updateNavState() {
            const scrollY = window.scrollY || window.pageYOffset;
            const threshold = navTop > 0 ? navTop : 80;

            if (scrollY > threshold) {
                if (!isSticky) {
                    isSticky = true;
                    nav.classList.add("is-sticky");
                    if (spacer) spacer.classList.add("active");
                }
            } else {
                if (isSticky) {
                    isSticky = false;
                    nav.classList.remove("is-sticky");
                    if (spacer) spacer.classList.remove("active");
                }
            }
            ticking = false;
        }

        window.addEventListener("scroll", function () {
            if (!ticking) {
                window.requestAnimationFrame(updateNavState);
                ticking = true;
            }
        }, { passive: true });

        // Recalculate on resize
        window.addEventListener("resize", function () {
            if (!isSticky) {
                navTop = nav.offsetTop;
            }
        }, { passive: true });
    }

    /* ==========================================================================
     * 3. EDUCATIONAL CONTENT READING PROGRESS SYSTEM
     * ========================================================================== */

    function initReadingProgress() {
        const fillEl = document.getElementById("secodReadingProgressFill") ||
                       document.getElementById("reading-progress");
        const contentArea = document.querySelector("main.content-area") ||
                            document.querySelector(".content-area") ||
                            document.querySelector(".container");

        if (!fillEl || !contentArea) return;

        let ticking = false;

        function calculateProgress() {
            const rect = contentArea.getBoundingClientRect();
            const contentTop = window.scrollY + rect.top;
            const contentHeight = contentArea.offsetHeight;
            const viewportH = window.innerHeight;

            // Start calculating when the top of content enters viewport
            const scrollableDistance = contentHeight - viewportH;
            let pct = 0;

            if (scrollableDistance <= 0) {
                pct = 100;
            } else {
                const scrolled = window.scrollY - contentTop;
                pct = Math.min(100, Math.max(0, (scrolled / scrollableDistance) * 100));
            }

            fillEl.style.width = pct.toFixed(1) + "%";
            ticking = false;
        }

        window.addEventListener("scroll", function () {
            if (!ticking) {
                window.requestAnimationFrame(calculateProgress);
                ticking = true;
            }
        }, { passive: true });

        calculateProgress();
    }

    /* ==========================================================================
     * 4. KEY CONCEPT ACCORDION (EXPAND / COLLAPSE)
     * ========================================================================== */

    function initKeyConcept() {
        const headers = document.querySelectorAll(".secod-key-concept-header");
        headers.forEach(function (header) {
            header.addEventListener("click", function () {
                const card = header.closest(".secod-key-concept-card");
                if (!card) return;

                const isExpanded = card.classList.contains("is-expanded");
                if (isExpanded) {
                    card.classList.remove("is-expanded");
                    header.setAttribute("aria-expanded", "false");
                } else {
                    card.classList.add("is-expanded");
                    header.setAttribute("aria-expanded", "true");
                }
            });

            header.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    header.click();
                }
            });
        });
    }

    /* ==========================================================================
     * 5. INTERACTIVE CYBER VISUAL (MOUSE PARALLAX & AMBIENT GLOW)
     * ========================================================================== */

    function initCyberVisual() {
        const visualCard = document.querySelector(".secod-cyber-card");
        if (!visualCard) return;

        // Respect reduced motion
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) return;

        let isHovered = false;
        let bounds = null;

        function updateBounds() {
            bounds = visualCard.getBoundingClientRect();
        }

        visualCard.addEventListener("mouseenter", function () {
            isHovered = true;
            updateBounds();
        });

        visualCard.addEventListener("mouseleave", function () {
            isHovered = false;
            visualCard.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
            visualCard.style.setProperty("--glow-x", "0px");
            visualCard.style.setProperty("--glow-y", "0px");
        });

        visualCard.addEventListener("mousemove", function (e) {
            if (!isHovered || !bounds) return;

            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;

            const normX = (x / bounds.width) - 0.5;
            const normY = (y / bounds.height) - 0.5;

            const tiltX = (normY * -10).toFixed(2);
            const tiltY = (normX * 10).toFixed(2);

            visualCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
            visualCard.style.setProperty("--glow-x", `${(normX * 120).toFixed(1)}px`);
            visualCard.style.setProperty("--glow-y", `${(normY * 90).toFixed(1)}px`);
        });

        // Pause animation when offscreen
        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        visualCard.classList.add("paused");
                    } else {
                        visualCard.classList.remove("paused");
                    }
                });
            }, { threshold: 0.1 });
            observer.observe(visualCard);
        }
    }

    /* ==========================================================================
     * 6. LECTURE ACTION BAR: BOOKMARK, SHARE, TEXT SIZE & READING MODE
     * ========================================================================== */

    function initActionControls() {
        const currentPath = window.location.pathname || "";
        const storageKeyBookmarks = "secod_bookmarks";
        const storageKeyFontSize = "secod_font_scale";

        // Bookmark Handler
        const bookmarkBtn = document.getElementById("secodBookmarkBtn");
        if (bookmarkBtn) {
            let bookmarks = [];
            try {
                bookmarks = JSON.parse(localStorage.getItem(storageKeyBookmarks) || "[]");
            } catch (e) {
                bookmarks = [];
            }

            const isBookmarked = bookmarks.includes(currentPath);
            if (isBookmarked) {
                bookmarkBtn.classList.add("active");
                bookmarkBtn.setAttribute("aria-label", "إزالة من المحاضرات المحفوظة");
            }

            bookmarkBtn.addEventListener("click", function () {
                try {
                    bookmarks = JSON.parse(localStorage.getItem(storageKeyBookmarks) || "[]");
                } catch (e) {
                    bookmarks = [];
                }

                const index = bookmarks.indexOf(currentPath);
                if (index > -1) {
                    bookmarks.splice(index, 1);
                    bookmarkBtn.classList.remove("active");
                    showToast("تمت إزالة المحاضرة من المفضلة", "🗑️");
                } else {
                    bookmarks.push(currentPath);
                    bookmarkBtn.classList.add("active");
                    showToast("تم حفظ المحاضرة في قائمتك المفضلة", "⭐");
                }
                localStorage.setItem(storageKeyBookmarks, JSON.stringify(bookmarks));
            });
        }

        // Share & Copy Link Handler
        const shareBtn = document.getElementById("secodShareBtn");
        if (shareBtn) {
            shareBtn.addEventListener("click", async function () {
                const shareData = {
                    title: document.title,
                    text: document.title + " | منصة SECOD التعليمية",
                    url: window.location.href
                };

                if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                    try {
                        await navigator.share(shareData);
                        showToast("تمت مشاركة المحاضرة بنجاح", "🚀");
                    } catch (err) {
                        if (err.name !== "AbortError") {
                            copyCurrentUrl();
                        }
                    }
                } else {
                    copyCurrentUrl();
                }
            });
        }

        function copyCurrentUrl() {
            const url = window.location.href;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(function () {
                    showToast("تم نسخ رابط المحاضرة بنجاح", "📋");
                }).catch(function () {
                    fallbackCopyUrl(url);
                });
            } else {
                fallbackCopyUrl(url);
            }
        }

        function fallbackCopyUrl(url) {
            const ta = document.createElement("textarea");
            ta.value = url;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand("copy");
                showToast("تم نسخ رابط المحاضرة بنجاح", "📋");
            } catch (e) {
                showToast("تعذر نسخ الرابط تلقائياً", "⚠️");
            }
            document.body.removeChild(ta);
        }

        // Text Size Scaler (Normal 1.0 -> Large 1.1 -> XL 1.2)
        const fontBtn = document.getElementById("secodFontBtn");
        const fontSizes = [1, 1.1, 1.22];
        const fontLabels = ["عادي (100%)", "كبير (110%)", "كبير جداً (122%)"];
        let currentFontIndex = 0;

        const savedScale = parseFloat(localStorage.getItem(storageKeyFontSize) || "1");
        if (!isNaN(savedScale)) {
            const foundIdx = fontSizes.indexOf(savedScale);
            if (foundIdx !== -1) currentFontIndex = foundIdx;
            applyFontScale(savedScale);
        }

        if (fontBtn) {
            fontBtn.addEventListener("click", function () {
                currentFontIndex = (currentFontIndex + 1) % fontSizes.length;
                const newScale = fontSizes[currentFontIndex];
                applyFontScale(newScale);
                localStorage.setItem(storageKeyFontSize, newScale.toString());
                showToast("حجم الخط: " + fontLabels[currentFontIndex], "🔤");
            });
        }

        function applyFontScale(scale) {
            document.documentElement.style.setProperty("--secod-font-scale", scale);
            const content = document.querySelector("main.content-area") || document.querySelector(".content-area");
            if (content) {
                content.style.fontSize = (scale * 1.0625) + "rem";
            }
        }

        // Reading Mode Controller
        const readingBtn = document.getElementById("secodReadingBtn");
        let exitPill = document.getElementById("secodReadingExitPill");

        if (!exitPill) {
            exitPill = document.createElement("div");
            exitPill.id = "secodReadingExitPill";
            exitPill.className = "secod-reading-exit-pill";
            exitPill.innerHTML = `<span>✕</span><span>الخروج من وضع القراءة (Esc)</span>`;
            document.body.appendChild(exitPill);
        }

        function toggleReadingMode(enable) {
            const isReading = typeof enable === "boolean" 
                ? enable 
                : !document.body.classList.contains("secod-reading-mode");

            if (isReading) {
                document.body.classList.add("secod-reading-mode");
                if (readingBtn) readingBtn.classList.add("active");
                showToast("تم تفعيل وضع القراءة الهادئ (اضغط Esc للخروج)", "📖");
            } else {
                document.body.classList.remove("secod-reading-mode");
                if (readingBtn) readingBtn.classList.remove("active");
                showToast("تم الخروج من وضع القراءة", "👁️");
            }
        }

        if (readingBtn) {
            readingBtn.addEventListener("click", function () {
                toggleReadingMode();
            });
        }

        exitPill.addEventListener("click", function () {
            toggleReadingMode(false);
        });

        window.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && document.body.classList.contains("secod-reading-mode")) {
                toggleReadingMode(false);
            }
        });

        // Fullscreen Toggle
        const fullscreenBtn = document.getElementById("secodFullscreenBtn");
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener("click", function () {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().then(function () {
                        fullscreenBtn.classList.add("active");
                        showToast("تم تفعيل وضع ملء الشاشة", "⛶");
                    }).catch(function () {
                        showToast("وضع ملء الشاشة غير مدعوم في متصفحك", "⚠️");
                    });
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen().then(function () {
                            fullscreenBtn.classList.remove("active");
                            showToast("تم الخروج من ملء الشاشة", "⛶");
                        });
                    }
                }
            });
        }
    }

    /* ==========================================================================
     * 7. MASTER INITIALIZER
     * ========================================================================== */

    function init() {
        initSmartScrollNav();
        initReadingProgress();
        initKeyConcept();
        initCyberVisual();
        initActionControls();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    window.SECOD_LectureHeader = {
        init: init,
        showToast: showToast
    };
})();
