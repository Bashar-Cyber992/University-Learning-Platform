/**
 * ==============================================================================
 * MANAR UNIVERSITY LEARNING PLATFORM - UNIFIED QUIZ ENGINE (quiz.js)
 * Step-by-Step Question Assessment, Feedback & Best Score LocalStorage Persistence
 * ==============================================================================
 */

(function () {
    "use strict";

    function QuizEngine(options) {
        this.container = typeof options.container === "string" 
            ? document.getElementById(options.container) 
            : options.container;
        this.questions = options.questions || [];
        this.storageKey = options.storageKey || "quiz_default";
        this.courseName = options.courseName || "";
        this.currentQ = 0;
        this.score = 0;
        this.answered = false;

        if (this.container && this.questions.length > 0) {
            this.init();
        }
    }

    QuizEngine.prototype.init = function () {
        this.currentQ = 0;
        this.score = 0;
        this.answered = false;
        this.loadQuestion();
    };

    QuizEngine.prototype.getSavedBestScore = function () {
        try {
            const raw = localStorage.getItem(this.storageKey);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    };

    QuizEngine.prototype.saveScore = function (finalScore) {
        const total = this.questions.length;
        const pct = Math.round((finalScore / total) * 100);
        const prev = this.getSavedBestScore();
        const isNewBest = !prev || finalScore >= (prev.score || 0);

        const record = {
            score: isNewBest ? finalScore : prev.score,
            lastScore: finalScore,
            total: total,
            pct: isNewBest ? pct : prev.pct,
            date: new Date().toLocaleDateString("ar-YE")
        };

        try {
            localStorage.setItem(this.storageKey, JSON.stringify(record));
        } catch (e) {}

        return record;
    };

    QuizEngine.prototype.loadQuestion = function () {
        if (!this.container) return;

        if (this.currentQ >= this.questions.length) {
            this.showResult();
            return;
        }

        const q = this.questions[this.currentQ];
        let savedBadgeHtml = "";

        if (this.currentQ === 0) {
            const saved = this.getSavedBestScore();
            if (saved && typeof saved.score === "number") {
                savedBadgeHtml = `
                    <div style="background:var(--success-bg); border:1px solid var(--success); color:var(--success-text); padding:0.45rem 0.9rem; border-radius:8px; font-size:0.88rem; font-weight:700; margin-bottom:1rem; display:inline-block;">
                        🏆 أفضل نتيجة محفوظة سابقاً: ${saved.score} من ${saved.total} (${saved.pct}%)
                    </div>
                `;
            }
        }

        const optionsHtml = q.options.map((opt, i) => {
            return `<li data-opt-index="${i}">${opt}</li>`;
        }).join("");

        this.container.innerHTML = `
            ${savedBadgeHtml}
            <div class="quiz-header-bar">
                <span>السؤال ${this.currentQ + 1} من ${this.questions.length}</span>
                <span>الدرجة الحالية: ${this.score} / ${this.questions.length}</span>
            </div>
            <h3 style="margin-top:0; color:var(--primary); font-size:var(--text-lg);">${q.question}</h3>
            <ul class="options" id="quiz-options-list">
                ${optionsHtml}
            </ul>
            <div class="quiz-feedback" id="quiz-feedback-box"></div>
            <button class="quiz-btn btn btn-primary" id="quiz-next-btn" style="display:none; margin-top:1rem;">
                ${this.currentQ === this.questions.length - 1 ? "عرض النتيجة النهائية 🏆" : "السؤال التالي ←"}
            </button>
        `;

        const self = this;
        const optList = this.container.querySelectorAll("#quiz-options-list li");
        optList.forEach(li => {
            li.addEventListener("click", function () {
                const idx = parseInt(this.getAttribute("data-opt-index"), 10);
                self.selectOption(idx, this);
            });
        });

        const nextBtn = this.container.querySelector("#quiz-next-btn");
        if (nextBtn) {
            nextBtn.addEventListener("click", function () {
                self.nextQuestion();
            });
        }
    };

    QuizEngine.prototype.selectOption = function (idx, el) {
        if (this.answered) return;
        this.answered = true;

        const q = this.questions[this.currentQ];
        const fb = this.container.querySelector("#quiz-feedback-box");
        const allOpts = this.container.querySelectorAll("#quiz-options-list li");

        if (idx === q.correct) {
            this.score++;
            el.classList.add("correct-ans");
            if (fb) {
                fb.style.background = "var(--success-bg)";
                fb.style.border = "1px solid var(--success)";
                fb.style.color = "var(--success-text)";
                fb.innerHTML = `✅ <strong>إجابة صحيحة!</strong> ${q.explanation || ""}`;
            }
        } else {
            el.classList.add("wrong-ans");
            if (allOpts[q.correct]) {
                allOpts[q.correct].classList.add("correct-ans");
            }
            if (fb) {
                fb.style.background = "var(--danger-bg)";
                fb.style.border = "1px solid var(--danger)";
                fb.style.color = "var(--danger-text)";
                fb.innerHTML = `❌ <strong>إجابة غير صحيحة.</strong> ${q.explanation || ""}`;
            }
        }

        if (fb) fb.style.display = "block";
        const nextBtn = this.container.querySelector("#quiz-next-btn");
        if (nextBtn) nextBtn.style.display = "inline-flex";
    };

    QuizEngine.prototype.nextQuestion = function () {
        this.currentQ++;
        this.answered = false;
        this.loadQuestion();
    };

    QuizEngine.prototype.showResult = function () {
        const total = this.questions.length;
        const pct = Math.round((this.score / total) * 100);
        this.saveScore(this.score);

        let msg = pct === 100 
            ? "🌟 ممتاز جداً! لقد حصلت على الدرجة الكاملة وأتقنت جميع مفاهيم المحاضرة."
            : pct >= 70
            ? "👏 أداء رائع ومتميز! استيعابك للمحاضرة ممتاز."
            : "📚 بداية جيدة! ننصح بمراجعة بطاقات الاستذكار وأقسام المحاضرة ثم إعادة المحاولة.";

        this.container.innerHTML = `
            <div style="text-align:center; padding:var(--space-6);">
                <h3 style="font-size:var(--text-2xl); color:var(--primary); margin-bottom:var(--space-2);">نتيجة الكوز التقييمي</h3>
                <div style="font-size:2.8rem; font-weight:800; color:var(--secondary); margin:1rem 0;">
                    ${this.score} / ${total} (${pct}%)
                </div>
                <p style="font-size:var(--text-lg); text-align:center; max-width:540px; margin:0 auto 1.5rem; color:var(--text-dark);">
                    ${msg}
                </p>
                <div style="font-size:var(--text-xs); color:var(--text-muted); margin-bottom:1.5rem;">
                    💾 تم حفظ النتيجة تلقائياً في متصفحك للرجوع إليها مستقبلاً.
                </div>
                <button class="quiz-btn btn btn-primary" id="quiz-restart-btn">إعادة الاختبار من جديد ↺</button>
            </div>
        `;

        const self = this;
        const restartBtn = this.container.querySelector("#quiz-restart-btn");
        if (restartBtn) {
            restartBtn.addEventListener("click", function () {
                self.init();
            });
        }
    };

    /**
     * Helper to mount quiz globally
     */
    function initLectureQuiz(questions, storageKey, containerId) {
        const targetId = containerId || "quiz-app";
        const engine = new QuizEngine({
            container: targetId,
            questions: questions,
            storageKey: storageKey
        });

        // Expose legacy helpers if any page still references them directly
        window.currentQuizEngine = engine;
        window.selectQuizOpt = function (idx, el) { engine.selectOption(idx, el); };
        window.nextQuizQ = function () { engine.nextQuestion(); };
        window.restartQuiz = function () { engine.init(); };
        window.loadQuiz = function () { engine.loadQuestion(); };
        window.selectOption = function (idx, el) { engine.selectOption(idx, el); };
        window.nextQuestion = function () { engine.nextQuestion(); };
        window.showResults = function () { engine.showResult(); };
        window.showQuizResult = function () { engine.showResult(); };
        window.loadQuiz = function () { engine.loadQuestion(); };

        return engine;
    }

    window.QuizEngine = QuizEngine;
    window.initLectureQuiz = initLectureQuiz;
})();
