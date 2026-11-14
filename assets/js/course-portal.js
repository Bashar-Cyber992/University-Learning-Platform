/**
 * ==============================================================================
 * MANAR UNIVERSITY LEARNING PLATFORM - COURSE PORTAL & SEARCH (course-portal.js)
 * Real-time Lecture & Course Search, Department/Availability Filtering,
 * Multi-criteria Sorting, URL Query Sync, Dynamic Counters & UI States
 * ==============================================================================
 */

(function () {
    "use strict";

    /* ==========================================================================
     * 1. LECTURE PORTALS (Course-Level index.html)
     * ========================================================================== */

    function updateLectureCounter(visible, total) {
        const counterEl = document.getElementById("lectureCountLabel") || 
                          document.getElementById("lectureCounter");
        if (counterEl) {
            if (visible === total) {
                counterEl.textContent = `(عرض جميع المحاضرات: ${total})`;
            } else if (visible === 0) {
                counterEl.textContent = `(لا توجد نتائج مطابقة)`;
            } else {
                counterEl.textContent = `(عرض ${visible} من ${total} محاضرات)`;
            }
        }

        const noResults = document.getElementById("noLecturesMsg");
        if (noResults) {
            noResults.style.display = visible === 0 ? "block" : "none";
        }
    }

    function filterLectures(status, btn) {
        const cards = document.querySelectorAll(".lecture-card");
        const filterBtns = document.querySelectorAll(".filter-btn, .lecture-filter-btn");

        filterBtns.forEach(b => b.classList.remove("active"));
        if (btn) btn.classList.add("active");

        let visibleCount = 0;
        cards.forEach(card => {
            const cardStatus = (card.getAttribute("data-status") || "").toLowerCase();
            const isAvailable = cardStatus === "available" || card.classList.contains("available") || card.getAttribute("href");
            const isPending = cardStatus === "pending" || cardStatus === "upcoming" || card.classList.contains("pending") || card.classList.contains("disabled");

            if (status === "all") {
                card.style.display = "flex";
                visibleCount++;
            } else if (status === "available" && isAvailable && !isPending) {
                card.style.display = "flex";
                visibleCount++;
            } else if (status === "pending" && isPending) {
                card.style.display = "flex";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        updateLectureCounter(visibleCount, cards.length);
    }

    function initLectureSearch() {
        const searchInput = document.getElementById("lectureSearch") || 
                            document.getElementById("search");
        if (!searchInput) return;

        const lectureCards = document.querySelectorAll(".lecture-card");
        if (lectureCards.length === 0) return;

        searchInput.addEventListener("input", function () {
            const query = this.value.trim().toLowerCase();
            let visibleCount = 0;

            lectureCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (!query || text.includes(query)) {
                    card.style.display = "flex";
                    visibleCount++;
                } else {
                    card.style.display = "none";
                }
            });

            updateLectureCounter(visibleCount, lectureCards.length);
        });
    }

    /* ==========================================================================
     * 2. MAIN HUB & COURSES DIRECTORY (index.html & courses.html)
     * ========================================================================== */

    let currentDept = "all";
    let currentStatus = "all";
    let currentSort = "default";
    let originalCardOrder = [];

    function initCoursesPortal() {
        const grid = document.getElementById("coursesGrid");
        if (grid) {
            // Save original DOM order for 'default' sorting
            originalCardOrder = Array.from(grid.querySelectorAll(".course-card"));
        }

        // Read URL parameters if present
        readUrlParameters();

        // Bind search input listeners
        const searchInput = document.getElementById("courseSearchInput");
        if (searchInput) {
            searchInput.addEventListener("input", handleSearch);
        }

        // Hide skeletons if present and show actual grid
        const skeletons = document.getElementById("coursesSkeleton");
        if (skeletons && grid) {
            skeletons.style.display = "none";
            grid.style.display = "grid";
        }
    }

    function readUrlParameters() {
        try {
            const params = new URLSearchParams(window.location.search);
            const deptParam = params.get("dept");
            const searchParam = params.get("search");
            const sortParam = params.get("sort");

            if (deptParam) {
                currentDept = deptParam;
                const matchBtn = document.querySelector(`.filter-pill-btn[data-dept="${deptParam}"], .filter-btn[data-dept="${deptParam}"]`);
                if (matchBtn) {
                    document.querySelectorAll(".filter-pill-btn, .filter-btn").forEach(b => b.classList.remove("active"));
                    matchBtn.classList.add("active");
                }
            }

            if (searchParam) {
                const searchInput = document.getElementById("courseSearchInput");
                if (searchInput) {
                    searchInput.value = searchParam;
                    const clearBtn = document.getElementById("searchClearBtn");
                    if (clearBtn) clearBtn.style.display = "flex";
                }
            }

            if (sortParam) {
                currentSort = sortParam;
                const sortSelect = document.getElementById("courseSortSelect");
                if (sortSelect) sortSelect.value = sortParam;
            }

            applyCourseFilters();
        } catch (e) {
            // Fallback gracefully on environments without full URLSearchParams
            applyCourseFilters();
        }
    }

    function filterCourses(dept, btnEl) {
        currentDept = dept;
        document.querySelectorAll(".filter-pill-btn, .filter-btn").forEach(b => {
            if (b.getAttribute("data-dept") || b.onclick?.toString().includes("filterCourses")) {
                b.classList.remove("active");
            }
        });
        if (btnEl) btnEl.classList.add("active");
        applyCourseFilters();
    }

    function handleSearch() {
        const searchInput = document.getElementById("courseSearchInput");
        const query = searchInput ? searchInput.value.trim() : "";
        const clearBtn = document.getElementById("searchClearBtn");
        if (clearBtn) {
            clearBtn.style.display = query.length > 0 ? "flex" : "none";
        }
        applyCourseFilters();
    }

    function clearSearch() {
        const input = document.getElementById("courseSearchInput");
        if (input) {
            input.value = "";
            input.focus();
        }
        const clearBtn = document.getElementById("searchClearBtn");
        if (clearBtn) clearBtn.style.display = "none";
        applyCourseFilters();
    }

    function handleSortChange(sortValue) {
        currentSort = sortValue || "default";
        sortCourseCards(currentSort);
        applyCourseFilters();
    }

    function sortCourseCards(sortType) {
        const grid = document.getElementById("coursesGrid");
        if (!grid) return;

        const cards = Array.from(grid.querySelectorAll(".course-card"));
        if (cards.length === 0) return;

        if (sortType === "default") {
            if (originalCardOrder.length > 0) {
                originalCardOrder.forEach(card => grid.appendChild(card));
            }
            return;
        }

        cards.sort((a, b) => {
            if (sortType === "name-asc" || sortType === "name-desc") {
                const titleA = (a.querySelector(".card-cover-title, .course-title")?.textContent || "").trim();
                const titleB = (b.querySelector(".card-cover-title, .course-title")?.textContent || "").trim();
                const cmp = titleA.localeCompare(titleB, "ar");
                return sortType === "name-asc" ? cmp : -cmp;
            }

            if (sortType === "lectures") {
                const countA = parseInt(a.getAttribute("data-lectures") || "0", 10);
                const countB = parseInt(b.getAttribute("data-lectures") || "0", 10);
                return countB - countA; // Descending
            }

            return 0;
        });

        cards.forEach(card => grid.appendChild(card));
    }

    function resetAllFilters() {
        currentDept = "all";
        currentStatus = "all";
        currentSort = "default";

        // Reset search input
        const searchInput = document.getElementById("courseSearchInput");
        if (searchInput) searchInput.value = "";

        const clearBtn = document.getElementById("searchClearBtn");
        if (clearBtn) clearBtn.style.display = "none";

        // Reset department buttons
        document.querySelectorAll(".filter-pill-btn, .filter-btn").forEach(b => {
            b.classList.remove("active");
            if (b.getAttribute("data-dept") === "all" || b.textContent.includes("الكل") || b.textContent.includes("جميع")) {
                b.classList.add("active");
            }
        });

        // Reset sort select
        const sortSelect = document.getElementById("courseSortSelect");
        if (sortSelect) sortSelect.value = "default";

        sortCourseCards("default");
        applyCourseFilters();
    }

    function applyCourseFilters() {
        const input = document.getElementById("courseSearchInput");
        const query = input ? (input.value || "").trim().toLowerCase() : "";
        const cards = document.querySelectorAll(".course-card");
        if (cards.length === 0) return;

        let visibleCount = 0;
        const totalCards = cards.length;

        cards.forEach(card => {
            const cardDepts = (card.getAttribute("data-dept") || "").split(" ");
            const textContent = card.textContent.toLowerCase();
            const matchesDept = (currentDept === "all" || cardDepts.includes(currentDept));
            const matchesQuery = query === "" || textContent.includes(query);

            if (matchesDept && matchesQuery) {
                card.style.display = "flex";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        // UI states handling
        const noResults = document.getElementById("noResultsMsg") || document.getElementById("noResultsState");
        const countLabel = document.getElementById("resultsCount");
        const resetBtn = document.getElementById("resetFiltersBtn");

        if (noResults) {
            noResults.style.display = visibleCount === 0 ? "block" : "none";
        }

        if (countLabel) {
            if (visibleCount === 0) {
                countLabel.textContent = "لا توجد نتائج مطابقة";
            } else if (visibleCount === totalCards) {
                countLabel.textContent = `عرض جميع المقررات (${totalCards})`;
            } else {
                countLabel.textContent = `عرض ${visibleCount} من ${totalCards} مقررات`;
            }
        }

        if (resetBtn) {
            const isFiltered = currentDept !== "all" || query.length > 0 || currentSort !== "default";
            resetBtn.style.display = isFiltered ? "inline-flex" : "none";
        }
    }

    // Expose functions globally for backward compatibility & inline handlers
    window.filterLectures = filterLectures;
    window.filterCourses = filterCourses;
    window.handleSearch = handleSearch;
    window.clearSearch = clearSearch;
    window.handleSortChange = handleSortChange;
    window.resetAllFilters = resetAllFilters;
    window.applyCourseFilters = applyCourseFilters;

    function init() {
        initLectureSearch();
        initCoursesPortal();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
