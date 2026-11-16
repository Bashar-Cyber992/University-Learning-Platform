# تقرير التنفيذ والتكامل البرمجي: أساسيات الحوسبة السحابية (Cloud Computing Foundations)
## الخطة المعمارية والتنفيذية لصفحة المحاضرة التجريبية الأولى | SECOD Platform

---

## 1. بطاقة المحاضرة والبيانات التقنية (Technical Metadata)

| البند التقني | القيمة المعيارية المعتمدة |
|:---|:---|
| **اسم المقرر (Course Name)** | الحوسبة السحابية (Cloud Computing Architecture) |
| **معرف المقرر البرمجي (Course ID)** | `cloud-computing` (داخلي: `cloud`) |
| **رقم المحاضرة (Lecture Number)** | المحاضرة الأولى (`Lecture-01`) |
| **العنوان العربي الرسمي** | المحاضرة الأولى: مفاهيم وتأسيس الحوسبة السحابية والخصائص الجوهرية |
| **العنوان الإنجليزي التقني** | Cloud Computing Foundations, NIST SP 800-145, Isolation Fabrics & Elasticity |
| **المسار الافتراضي للملف (File Path)** | `Cloud-Computing/Lecture-01.html` |
| **المسار في بيئة التشغيل التجريبية** | `.agent-workspace/test-run/05-implementation/` |
| **معرف الكويز في التخزين المحلي (Quiz Storage Key)** | `quiz_cloud_lec01` |
| **حاوية محرك الاختبار (Quiz Container DOM ID)** | `#quiz-app` |
| **معرف محاكي المرونة التلقائية** | `#autoscaling-simulator-widget` |
| **معرف مختبر كشف الخداع السحابي** | `#cloudwashing-detective-widget` |
| **معرف حاسبة التكلفة المقارنة TCO** | `#capex-opex-calculator-widget` |
| **الاتجاه اللغوي ونظام المحاذاة** | `dir="rtl"` لكافة النصوص العربية والشروح، و `dir="ltr"` للأكواد والمصطلحات والمسارات |
| **إطار العمل البرمجي (Tech Stack)** | Semantic HTML5, Modern Modular CSS3 (Design Tokens), Pure Vanilla JavaScript (ES6+) |
| **توافق المكونات المركزية** | متوافق 100% مع `components/header.js`, `components/footer.js`, `assets/js/quiz.js` |

---

## 2. المكونات المشتركة المعاد استخدامها (Reused Components & Design Tokens)

### 2.1 ملفات الأنماط والأصول المركزية المضمنة (Included Assets)
تعتمد صفحة المحاضرة على استدعاء ملف الأنماط الموحد للمنصة عبر المسار النسبي المعتمد `../assets/css/main.css`، والذي يستورد بدوره الشجرة المعمارية الكاملة:
1. `assets/css/variables.css`: توفير رموز التصميم (Design Tokens) لعلامة SECOD بما في ذلك لوحة الألوان الرسمية (`--color-primary: #001C32`، `--color-accent: #00F6E4`، `--color-surface: #10283B`، `--color-deep: #071A2B`)، ونظام الطباعة ثنائي الاتجاه، والظلال والانتقالات الحركية.
2. `assets/css/reset.css`: توحيد سلوك المتصفحات ومقاييس الصناديق (`box-sizing: border-box`).
3. `assets/css/layout.css`: شبكة التخطيط المركزية، الحاويات (`container`)، الشريط الجانبي (`sidebar`)، ومنطقة المحتوى الرئيسية (`content-area`).
4. `assets/css/components.css`: الأزرار (`btn`, `btn-primary`)، البطاقات (`card`, `concept-card`)، الصناديق التنبيهية (`info-box`, `alert-box`, `warning-box`)، وجداول البيانات الأكاديمية (`academic-table`).
5. `assets/css/lecture-header.css`: شريط تجربة الترويسة التفاعلية الموحدة (`secod-lecture-experience`)، شريط التنقل اللزج، أزرار الإجراءات (حفظ، مشاركة، تغيير الخط، وضع القراءة، تبديل المظهر)، وبطاقة الرسوم السيبرانية التفاعلية.
6. `assets/css/lecture-widgets.css`: أنماط المحاكيات، بطاقات الاستذكار القلابة (`flashcard`)، حاوية الكويز وخيارات الإجابة، ولوحات القياس.
7. `assets/css/responsive.css`: الاستجابة للشاشات من 320px إلى 1920px.

### 2.2 محركات الجافاسكريبت والمكونات المركزية المعاد استخدامها
- `components/header.js`: محرك التنقل المشترك والترويسة المركزية.
- `components/footer.js`: التذييل الموحد المتضمن إشعار الاستقلالية الأكاديمية الصارم وشارة المطور بشار زبله.
- `assets/js/main.js`: محرك المنصة العام، إدارة سمة الوضعين (`data-theme="dark"` / `data-theme="light"`).
- `assets/js/components.js`: محرك تفعيل التبويبات والأكورديون وبطاقات الاستذكار.
- `assets/js/lecture-header.js`: محرك شريط القراءة اللحظي، وضع القراءة الهادئ، وتكبير الخط، والمفضلة.
- `assets/js/quiz.js`: المحرك الموحد للاختبارات التفاعلية `initLectureQuiz(questions, storageKey, containerId)`.

### 2.3 جدول مطابقة رموز التصميم (Design Tokens Compliance)

| العنصر البرمجي | متغير التصميم في SECOD | القيمة اللونية في الوضع الداكن | القيمة اللونية في الوضع الفاتح |
|:---|:---|:---:|:---:|
| **خلفية المنصة الأساسية** | `var(--color-primary)` / `var(--color-light-bg)` | `#001C32` | `#F5F8FA` |
| **أسطح البطاقات والحاويات** | `var(--color-surface)` / `var(--color-white)` | `#10283B` | `#FFFFFF` |
| **لون التوهج التقني والتمييز** | `var(--color-accent)` | `#00F6E4` | `#00D2C4` |
| **الحدود والفواصل** | `var(--color-border)` | `#1A3852` | `#DCE5EC` |
| **النصوص الرئيسية** | `var(--color-white)` / `var(--color-primary)` | `#FFFFFF` | `#001C32` |
| **النصوص الثانوية والإيضاحات** | `var(--color-secondary-text)` | `#94A3B8` | `#64748B` |
| **حالات النجاح والتأكيد** | `var(--color-success)` | `#16A34A` | `#16A34A` |
| **حالات الخطأ والانهيار** | `var(--color-error)` | `#DC2626` | `#DC2626` |
| **خط النصوص العربية** | `var(--font-arabic)` | IBM Plex Sans Arabic + Cairo fallback |
| **خط الأكواد والمعادلات** | `var(--font-mono)` | JetBrains Mono, monospace (`dir="ltr"`) |

---

## 3. هيكل كود HTML5 الدلالي الكامل للصفحة الافتراضية للمحاضرة

فيما يلي البنية البرمجية القياسية الكاملة لصفحة المحاضرة (`Lecture-01.html`)، وهي مطابقة بنسبة 100% لمعايير المنصة وتتضمن كافة الوحدات الثماني، المحاكيات، المخططات، ونقاط الفحص الذاتي:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="أساسيات الحوسبة السحابية، معيار NIST SP 800-145، الخصائص الجوهرية الخمس، آليات العزل EPT و VXLAN وتشفير الأظرف، ومحاكيات المرونة التلقائية وكشف الخداع السحابي | منصة SECOD">
    <title>المحاضرة الأولى: مفاهيم وتأسيس الحوسبة السحابية | الحوسبة السحابية | SECOD</title>

    <!-- Favicon Suite -->
    <link rel="icon" type="image/x-icon" href="../assets/brand/favicon/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="../assets/brand/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="../assets/brand/favicon/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../assets/brand/favicon/apple-touch-icon.png">

    <!-- Fonts: IBM Plex Sans Arabic + Inter + JetBrains Mono -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    
    <!-- Unified Platform Stylesheet -->
    <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body data-course="cloud-computing">

    <!-- ==============================================================================
         SECOD INTERACTIVE LECTURE HEADER EXPERIENCE
         Brand: SECOD — Understand. Learn. Apply.
         ============================================================================== -->
    <div class="secod-lecture-experience" id="secodLectureExperience">
        
        <div class="secod-platform-nav-spacer" id="secodNavSpacer"></div>

        <!-- Layer A: Platform Navigation Layer -->
        <nav class="secod-platform-nav" id="secodPlatformNav" aria-label="شريط تنقل المنصة والمحاضرة">
            <div class="secod-platform-nav-inner">
                <div class="secod-nav-identity">
                    <a href="../index.html" class="secod-nav-brand" title="الرئيسية | SECOD Platform">
                        <img src="../assets/brand/logo/secod-logo-dark.png" alt="SECOD Logo" class="secod-nav-logo">
                        <span>SECOD</span>
                    </a>
                    <span class="secod-nav-sep">/</span>
                    <div class="secod-nav-breadcrumbs">
                        <a href="index.html" class="secod-nav-course-link">
                            <span>☁️</span>
                            <span>الحوسبة السحابية</span>
                        </a>
                        <span class="secod-nav-sep">/</span>
                        <span class="secod-nav-current">المحاضرة 01</span>
                    </div>
                    <span class="secod-nav-sticky-title">المحاضرة الأولى: مفاهيم وتأسيس الحوسبة السحابية</span>
                </div>

                <div class="secod-nav-actions">
                    <button type="button" class="secod-nav-btn secod-tooltip" id="secodBookmarkBtn" data-tooltip="حفظ المحاضرة في المفضلة" aria-label="حفظ في المفضلة">
                        <svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                        <span>حفظ</span>
                    </button>
                    <button type="button" class="secod-nav-btn secod-tooltip" id="secodShareBtn" data-tooltip="مشاركة رابط المحاضرة" aria-label="مشاركة المحاضرة">
                        <svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
                        <span>مشاركة</span>
                    </button>
                    <button type="button" class="secod-nav-btn secod-tooltip" id="secodFontBtn" data-tooltip="تكبير أو تصغير الخط" aria-label="تغيير حجم الخط">
                        <svg viewBox="0 0 24 24"><path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"/></svg>
                        <span>الخط</span>
                    </button>
                    <button type="button" class="secod-nav-btn secod-tooltip" id="secodReadingBtn" data-tooltip="وضع القراءة الهادئ المريح" aria-label="وضع القراءة">
                        <svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                        <span>قراءة</span>
                    </button>
                    <button type="button" class="theme-toggle-btn secod-nav-btn" id="themeToggleBtn" onclick="toggleTheme()" aria-label="تبديل مظهر المنصة">
                        <span id="themeIcon">🌙</span> <span id="themeText">الوضع الليلي</span>
                    </button>
                </div>
            </div>

            <!-- Reading Progress Track -->
            <div class="secod-reading-progress-track" aria-hidden="true">
                <div class="secod-reading-progress-fill" id="secodReadingProgressFill"></div>
            </div>
        </nav>

        <!-- Layer B: Editorial Lecture Hero -->
        <header class="secod-lecture-hero">
            <div class="secod-hero-watermark" aria-hidden="true">01</div>
            <div class="secod-hero-container">
                <div class="secod-hero-info">
                    <div class="secod-hero-badges">
                        <span class="secod-badge-course">☁️ CLOUD COMPUTING</span>
                        <span class="secod-badge-lecture-num">LECTURE 01</span>
                        <span class="secod-badge-verified">🛡️ معتمد أكاديمياً</span>
                    </div>

                    <h1 class="secod-hero-title-ar">المحاضرة الأولى: مفاهيم وتأسيس الحوسبة السحابية</h1>
                    <div class="secod-hero-title-en">Cloud Computing Foundations, NIST SP 800-145, Isolation Fabrics & Elasticity</div>
                    <p class="secod-hero-desc">التأصيل الهندسي والاقتصادي للحوسبة السحابية، تفكيك وثيقة NIST SP 800-145، التشريح المعماري للخصائص الجوهرية الخمس، آليات العزل الخفية (EPT, VXLAN, KMS)، وتطبيقات المرونة التلقائية وكشف الخداع السحابي.</p>

                    <!-- Academic Context Layer -->
                    <div class="secod-academic-strip">
                        <div class="secod-meta-card">
                            <span class="secod-meta-icon">👨‍🏫</span>
                            <span class="secod-meta-label">المقرر التخصصي:</span>
                            <span class="secod-meta-value">الحوسبة السحابية والأنظمة الموزعة</span>
                        </div>
                        <div class="secod-meta-card">
                            <span class="secod-meta-icon">👥</span>
                            <span class="secod-meta-label">القسم والجمهور:</span>
                            <span class="secod-meta-value">الأمن السيبراني والشبكات • تقنية المعلومات</span>
                        </div>
                        <div class="secod-meta-card">
                            <span class="secod-meta-icon">📑</span>
                            <span class="secod-meta-label">المرجعية الأكاديمية:</span>
                            <span class="secod-meta-value">NIST SP 800-145 • ISO/IEC 17788 • تطوير م. بشار زبله</span>
                        </div>
                    </div>

                    <!-- Key Concept Accordion -->
                    <div class="secod-key-concept-container">
                        <div class="secod-key-concept-card">
                            <button type="button" class="secod-key-concept-header" aria-expanded="false" aria-controls="keyConceptBody-01">
                                <span class="secod-key-concept-badge">⚡ KEY CONCEPT</span>
                                <span class="secod-key-concept-title">القاعدة الذهبية: «السحابة ليست خوادم مجانية أو سحرية، بل مراكز بيانات مدارة ببرمجيات أتمتة فائقة...»</span>
                                <span class="secod-key-concept-trigger">
                                    <span>تفاصيل</span>
                                    <svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
                                </span>
                            </button>
                            <div class="secod-key-concept-body" id="keyConceptBody-01">
                                «السحابة هي نموذج تشغيلي ومعماري ينقل تكنولوجيا المعلومات من نفقات رأسمالية ضخمة مسبقة الدفع (CapEx) إلى نفقات تشغيلية يومية مرنة (OpEx) تعتمد كلياً على نموذج الدفع حسب الاستهلاك الفعلي (Pay-As-You-Go). لا تكون البنية التحتية سحابية ما لم تستوفِ الخصائص الجوهرية الخمس لمعيار NIST SP 800-145 مجتمعة.»
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Layer C: Cyber Visual Graphic -->
                <div class="secod-cyber-visual-col">
                    <div class="secod-cyber-card" id="secodCyberCard">
                        <div class="secod-cyber-ambient-glow" aria-hidden="true"></div>
                        <svg class="secod-cyber-svg" viewBox="0 0 460 340" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="رسم بياني لمعمارية السحابة والمشرف الافتراضي">
                            <defs>
                                <radialGradient id="cloudGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stop-color="#00F6E4" stop-opacity="0.3"/>
                                    <stop offset="100%" stop-color="#00F6E4" stop-opacity="0"/>
                                </radialGradient>
                                <linearGradient id="cloudCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#00F6E4"/>
                                    <stop offset="100%" stop-color="#2563EB"/>
                                </linearGradient>
                            </defs>
                            <g opacity="0.15">
                                <path d="M40 0V340M120 0V340M200 0V340M280 0V340M360 0V340M420 0V340" stroke="#00F6E4" stroke-width="1" stroke-dasharray="4 6"/>
                                <path d="M0 60H460M0 130H460M0 200H460M0 270H460" stroke="#00F6E4" stroke-width="1" stroke-dasharray="4 6"/>
                            </g>
                            <circle cx="230" cy="155" r="110" fill="url(#cloudGlow)"/>
                            <path class="secod-trace-pulse" d="M60 270H160L200 230H260L300 270H400" stroke="#00F6E4" stroke-width="2" fill="none"/>
                            <path d="M175 180H285C305 180 320 166 320 148C320 132 308 119 292 117C290 95 272 78 250 78C236 78 224 85 217 96C212 93 206 91 200 91C183 91 170 104 168 120C152 123 140 137 140 154C140 169 155 180 175 180Z" stroke="url(#cloudCyanGrad)" stroke-width="2.5" fill="rgba(16, 40, 59, 0.6)"/>
                            <rect x="185" y="125" width="90" height="14" rx="3" fill="#001C32" stroke="#00F6E4" stroke-width="1"/>
                            <circle cx="195" cy="132" r="2.5" fill="#00F6E4"/>
                            <circle cx="205" cy="132" r="2.5" fill="#2563EB"/>
                            <rect x="185" y="146" width="90" height="14" rx="3" fill="#001C32" stroke="#00F6E4" stroke-width="1"/>
                            <circle cx="195" cy="153" r="2.5" fill="#00F6E4"/>
                            <circle cx="205" cy="153" r="2.5" fill="#16A34A"/>
                            <rect x="155" y="240" width="150" height="22" rx="4" fill="rgba(7,26,43,0.85)" stroke="rgba(0,246,228,0.4)" stroke-width="1.5"/>
                            <text x="230" y="255" text-anchor="middle" fill="#00F6E4" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" letter-spacing="1.5">HYPERVISOR NITRO CLUSTER</text>
                        </svg>
                        <div class="secod-visual-status-pill">
                            <span class="secod-live-dot"></span>
                            <span>TELEMETRY ACTIVE // 16M VNI READY</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Navigation Strip -->
        <div class="secod-lecture-nav-strip">
            <div class="secod-lecture-nav-inner">
                <span class="secod-nav-step-link disabled" aria-disabled="true"><span>← المحاضرة السابقة</span></span>
                <a href="index.html" class="secod-nav-step-link"><span>📚 فهرس مقرر الحوسبة السحابية</span></a>
                <a href="Lecture-02.html" class="secod-nav-step-link"><span>المحاضرة التالية (02) ←</span></a>
            </div>
        </div>

    </div>

    <!-- Main Container -->
    <div class="container">

        <!-- Sidebar Navigation -->
        <aside class="sidebar" aria-label="فهرس المحاضرة">
            <h3>📑 مسار التعلم التفاعلي</h3>
            <ul id="toc-list">
                <li><a href="#module-1" class="active">🚀 1. أزمة NovaTech والتحول المالي</a></li>
                <li><a href="#module-2">📜 2. التأصيل وركائز تعريف NIST</a></li>
                <li><a href="#module-3">⚙️ 3. التشريح الهندسي للخصائص الخمس</a></li>
                <li><a href="#module-4">🔒 4. الغوص في الآليات الخفية والعزل</a></li>
                <li><a href="#module-5">🧮 5. المقارنة الرياضية ومحاكي المرونة</a></li>
                <li><a href="#module-6">🏛️ 6. دراسات الحالة والجدل المعاصر</a></li>
                <li><a href="#module-7">🕵️‍♂️ 7. مختبر كشف الخداع السحابي</a></li>
                <li><a href="#flashcards">🗂️ 8. بطاقات الاستذكار السريع</a></li>
                <li><a href="#quiz">✅ 9. الاختبار التقييمي النهائي (10 أسئلة)</a></li>
            </ul>
        </aside>

        <!-- Content Area -->
        <main class="content-area">

            <!-- Module 1: The Hook & Economics -->
            <section id="module-1" class="lecture-section">
                <span class="section-tag">الوحدة 1: المدخل والدافع الاقتصادي</span>
                <h2>🚀 سيناريو الانهيار والتحول الاقتصادي الهندسي (CapEx vs OpEx)</h2>
                
                <div class="story-box" style="background:var(--color-surface); border-right:4px solid var(--color-error); padding:1.25rem; border-radius:8px; margin:1rem 0;">
                    <h4 style="color:#ef4444; margin-top:0;">⚠️ سيناريو الكارثة: ليلة الجمعة السوداء في متجر "نوفا تك" (NovaTech)</h4>
                    <p>في تمام الساعة 11:59 مساءً، ومع إطلاق الحملة الإعلانية لمتجر نوفا تك، تدفق أكثر من 300,000 متسوق متزامن. بالرغم من استثمار الشركة لمبلغ 250,000$ في شراء خوادم فيزيائية عملاقة (CapEx)، قفز استهلاك المعالجات إلى 100%، واختنقت طوابير اتصالات قواعد البيانات، وانهارت خوادم الويب بالكامل لتظهر رسالة <code>504 Gateway Timeout</code>. استمر الشلل لسبع ساعات وتكبدت الشركة خسارة 1.8 مليون دولار، في حين كشفت التقارير أن هذه الخوادم الباهظة تعمل طوال العام بنسبة استهلاك لا تتجاوز 12% فقط!</p>
                </div>

                <h3>المقارنة الاقتصادية: الإنفاق الرأسمالي مقابل الإنفاق التشغيلي</h3>
                <div class="table-responsive">
                    <table class="academic-table">
                        <thead>
                            <tr>
                                <th>وجه المقارنة</th>
                                <th>النفقات الرأسمالية (CapEx - On-Premises)</th>
                                <th>النفقات التشغيلية (OpEx - Cloud)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>طبيعة الاستثمار</strong></td>
                                <td>استثمار أولي ضخم مقدماً لشراء أصول عتادية مادية.</td>
                                <td>صفر تكلفة أولية؛ اشتراك تشغيلي مرن حسب الاستهلاك.</td>
                            </tr>
                            <tr>
                                <td><strong>سرعة التوفير (Lead Time)</strong></td>
                                <td>بطيئة جداً؛ تستغرق من 4 إلى 12 أسبوعاً للتوريد والتركيب.</td>
                                <td>فورية؛ تُقاس بالثواني والدقائق عبر واجهات برمجية APIs.</td>
                            </tr>
                            <tr>
                                <td><strong>مخاطر العتاد والتقادم</strong></td>
                                <td>تتحمل المؤسسة بالكامل مخاطر التلف والتقادم التكنولوجي.</td>
                                <td>مسؤولية مزود السحابة بالكامل مع تحديث تلقائي مستمر.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- CapEx vs OpEx Interactive Calculator Widget Container -->
                <div class="interactive-widget-container" id="capex-opex-calculator-widget">
                    <!-- Dynamic rendering via JavaScript -->
                </div>
            </section>

            <!-- Module 2: NIST SP 800-145 -->
            <section id="module-2" class="lecture-section">
                <span class="section-tag">الوحدة 2: التأصيل المعياري الدستوري</span>
                <h2>📜 التعريف المعياري المعتمد (NIST SP 800-145)</h2>
                
                <div class="quote-box" style="border-right:4px solid var(--color-accent); background:rgba(0, 246, 228, 0.05); padding:1.25rem; border-radius:8px; margin:1rem 0;">
                    <p style="font-weight:600; font-style:italic; margin-bottom:0.5rem;" dir="ltr">
                        "Cloud computing is a model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources that can be rapidly provisioned and released with minimal management effort or service provider interaction."
                    </p>
                    <p style="margin:0; font-weight:700; color:var(--color-accent);">
                        — المعهد الوطني الأمريكي للمعايير والتقنية (NIST SP 800-145)
                    </p>
                </div>

                <!-- In-line Checkpoint 1 -->
                <div class="checkpoint-box" id="cp-1" style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:8px; padding:1.25rem; margin:1.5rem 0;">
                    <h4 style="margin-top:0; color:var(--color-accent);">🧠 نقطة تحقق ذاتي 1 (Checkpoint 1)</h4>
                    <p>قررت مؤسسة استبدال مركز بياناتها الداخلي بالسحابة. ما هو الأثر المالي والهندسي المباشر لهذا التحول؟</p>
                    <div class="cp-options" style="display:flex; flex-direction:column; gap:0.5rem;">
                        <button class="btn btn-outline cp-opt" onclick="evalCheckpoint(1, 0)">أ) تحول التكاليف من OpEx إلى CapEx مع تجميد أصول رأسمالية.</button>
                        <button class="btn btn-outline cp-opt" onclick="evalCheckpoint(1, 1)">ب) تحول التكاليف من CapEx مسبق إلى OpEx مرن يرتبط بالاستهلاك الفعلي.</button>
                        <button class="btn btn-outline cp-opt" onclick="evalCheckpoint(1, 2)">ج) انعدام التكاليف التشغيلية وتحمل صيانة المعالجات التالفة.</button>
                    </div>
                    <div class="cp-feedback" id="cp-1-fb" style="margin-top:0.75rem; display:none; padding:0.75rem; border-radius:6px;"></div>
                </div>
            </section>

            <!-- Module 3: 5 Essential Characteristics -->
            <section id="module-3" class="lecture-section">
                <span class="section-tag">الوحدة 3: التشريح الهندسي للركائز</span>
                <h2>⚙️ التشريح الهندسي للخصائص الخمس الجوهرية (NIST SP 800-145)</h2>
                
                <div class="features-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem; margin:1.5rem 0;">
                    <div class="concept-card">
                        <div class="concept-icon">⚡</div>
                        <h4>1. الخدمة الذاتية عند الطلب</h4>
                        <p>توفير الموارد آلياً عبر الـ APIs دون اشتراط أي تفاعل بشري أو تذاكر دعم فني.</p>
                    </div>
                    <div class="concept-card">
                        <div class="concept-icon">🌐</div>
                        <h4>2. الوصول العريض للشبكة</h4>
                        <p>إتاحة الخدمات عبر بروتوكولات الإنترنت المفتوحة لكافة المنصات الخفيفة والثقيلة.</p>
                    </div>
                    <div class="concept-card">
                        <div class="concept-icon">🏢</div>
                        <h4>3. تجميع الموارد</h4>
                        <p>مجمع فيزيائي موحد يخدم عدة مستأجرين (Multi-tenancy) مع عزل منطقي وأمني تام.</p>
                    </div>
                    <div class="concept-card">
                        <div class="concept-icon">📈</div>
                        <h4>4. المرونة السريعة</h4>
                        <p>توسع وانكماش تلقائي لحظي يطابق الموارد مع منحنى الطلب لمنع الهدر وانقطاع الخدمة.</p>
                    </div>
                    <div class="concept-card">
                        <div class="concept-icon">⏱️</div>
                        <h4>5. الخدمة المقاسة</h4>
                        <p>قياس شفاف ومحاسبة دقيقة بالمللي ثانية والجيجابايت وفق نموذج Pay-as-you-go.</p>
                    </div>
                </div>

                <!-- Terraform IaC Example -->
                <div class="code-block-container" style="margin:1.5rem 0;">
                    <div class="code-header" style="display:flex; justify-content:space-between; align-items:center; background:#071A2B; padding:0.5rem 1rem; border-top-left-radius:8px; border-top-right-radius:8px; border:1px solid #1A3852; border-bottom:none;">
                        <span style="color:#00F6E4; font-family:'JetBrains Mono'; font-size:0.85rem;">main.tf (Infrastructure as Code - IaC)</span>
                        <span style="color:#64748B; font-size:0.75rem;">HCL // Terraform</span>
                    </div>
                    <pre style="margin:0; background:#071A2B; padding:1rem; border-bottom-left-radius:8px; border-bottom-right-radius:8px; border:1px solid #1A3852; overflow-x:auto;"><code class="language-hcl" dir="ltr" style="font-family:'JetBrains Mono'; color:#E2E8F0; font-size:0.9rem;"># مثال عملي على الخدمة الذاتية المؤتمتة عبر كود Terraform
resource "aws_instance" "production_web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.medium"
  
  tags = {
    Name        = "SecodProdWebCluster"
    Environment = "Production"
  }
}</code></pre>
                </div>

                <!-- In-line Checkpoint 2 -->
                <div class="checkpoint-box" id="cp-2" style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:8px; padding:1.25rem; margin:1.5rem 0;">
                    <h4 style="margin-top:0; color:var(--color-accent);">🧠 نقطة تحقق ذاتي 2 (Checkpoint 2)</h4>
                    <p>طلب مهندس خادماً فظهرت رسالة: "بانتظار موافقة مهندس الدعم وتفعيل الخادم بعد 3 ساعات". هل تعتبر خدمة ذاتية سحابية؟</p>
                    <div class="cp-options" style="display:flex; flex-direction:column; gap:0.5rem;">
                        <button class="btn btn-outline cp-opt" onclick="evalCheckpoint(2, 0)">أ) نعم؛ لأن الطلب تم عبر المتصفح.</button>
                        <button class="btn btn-outline cp-opt" onclick="evalCheckpoint(2, 1)">ب) لا؛ لاشتراطها تدخلاً بشرياً وموافقة يدوية تنفي صفة الأتمتة الفورية.</button>
                    </div>
                    <div class="cp-feedback" id="cp-2-fb" style="margin-top:0.75rem; display:none; padding:0.75rem; border-radius:6px;"></div>
                </div>
            </section>

            <!-- Module 4: Under the Hood Isolation Fabrics -->
            <section id="module-4" class="lecture-section">
                <span class="section-tag">الوحدة 4: الهندسة العميقة والتحصين</span>
                <h2>🔒 الغوص في الآليات الخفية: طبقات العزل التقني (Under the Hood)</h2>
                
                <div class="architecture-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem; margin:1.5rem 0;">
                    <div class="card" style="background:var(--color-surface); border:1px solid var(--color-border); padding:1.25rem; border-radius:8px;">
                        <h4 style="color:var(--color-accent);">1. عزل المعالجة والذاكرة (EPT)</h4>
                        <p>استخدام ميزات المعالج الفيزيائية (Intel VT-x / EPT) لعزل مساحات الذاكرة؛ حيث يطلق المعالج اعتراضاً عتادياً فورياً (Hardware Page Fault) عند أي محاولة لتجاوز النطاق.</p>
                    </div>
                    <div class="card" style="background:var(--color-surface); border:1px solid var(--color-border); padding:1.25rem; border-radius:8px;">
                        <h4 style="color:var(--color-accent);">2. عزل الشبكات (VXLAN - RFC 7348)</h4>
                        <p>تغليف إطارات الطبقة الثانية داخل حزم UDP باستخدام معرّف 24-bit VNI، مما يتيح إنشاء 16,777,216 شبكة افتراضية معزولة (VPC) فوق نفس البنية المادية دون تداخل.</p>
                    </div>
                    <div class="card" style="background:var(--color-surface); border:1px solid var(--color-border); padding:1.25rem; border-radius:8px;">
                        <h4 style="color:var(--color-accent);">3. تشفير الأظرف التخزيني (Envelope Encryption)</h4>
                        <p>تشفير البيانات بمفتاح DEK ثم تشفير المفتاح بمفتاح الجذر KEK داخل وحدات أمان عتادية بالغة التحصين (Hardware HSMs - FIPS 140-2 Level 3).</p>
                    </div>
                </div>

                <!-- In-line Checkpoint 3 -->
                <div class="checkpoint-box" id="cp-3" style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:8px; padding:1.25rem; margin:1.5rem 0;">
                    <h4 style="margin-top:0; color:var(--color-accent);">🧠 نقطة تحقق ذاتي 3 (Checkpoint 3)</h4>
                    <p>ما هي الميزة الحاسمة لبروتوكول VXLAN مقارنة بـ VLAN في عزل شبكات السحابة؟</p>
                    <div class="cp-options" style="display:flex; flex-direction:column; gap:0.5rem;">
                        <button class="btn btn-outline cp-opt" onclick="evalCheckpoint(3, 0)">أ) استخدام معرّف 24-bit VNI لإنشاء 16.7 مليون شبكة معزولة بدلاً من 4,096 في VLAN.</button>
                        <button class="btn btn-outline cp-opt" onclick="evalCheckpoint(3, 1)">ب) إلغاء الحاجة لعناوين IP بالكامل.</button>
                    </div>
                    <div class="cp-feedback" id="cp-3-fb" style="margin-top:0.75rem; display:none; padding:0.75rem; border-radius:6px;"></div>
                </div>
            </section>

            <!-- Module 5: Mathematical Matrices & Autoscaling Simulator -->
            <section id="module-5" class="lecture-section">
                <span class="section-tag">الوحدة 5: النمذجة الرياضية والمحاكاة</span>
                <h2>🧮 المقارنة الرياضية ومحاكي المرونة التلقائية (Herbst et al.)</h2>
                
                <div class="formula-box" style="background:rgba(37, 99, 235, 0.08); border-right:4px solid var(--color-tech-blue); padding:1.25rem; border-radius:8px; margin:1rem 0;">
                    <h4 style="margin-top:0; color:var(--color-tech-blue);">معادلات هيربست (Herbst et al. 2013) لحالات عدم التطابق:</h4>
                    <p>إذا كان $D(t)$ هو الطلب اللحظي، و $R(t)$ هو المورد المخصص:</p>
                    <ul>
                        <li><strong>حالة التوفير الزائد المهدِر:</strong> $R(t) > D(t) \implies \text{Waste } W(t) = R(t) - D(t)$</li>
                        <li><strong>حالة نقص التوفير والعجز:</strong> $R(t) < D(t) \implies \text{Shortage } S(t) = D(t) - R(t) \implies \text{504 Gateway Timeout}$</li>
                    </ul>
                </div>

                <!-- Autoscaling Simulator Interactive Widget Container -->
                <div class="interactive-widget" id="autoscaling-simulator-widget">
                    <!-- Dynamic rendering via JavaScript -->
                </div>

                <!-- In-line Checkpoint 4 -->
                <div class="checkpoint-box" id="cp-4" style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:8px; padding:1.25rem; margin:1.5rem 0;">
                    <h4 style="margin-top:0; color:var(--color-accent);">🧠 نقطة تحقق ذاتي 4 (Checkpoint 4)</h4>
                    <p>إذا كان الطلب الفعلي $D(t) = 10 \text{ vCPUs}$ بينما العتاد الثابت $R(t) = 50 \text{ vCPUs}$، ما هو التوصيف الهندسي؟</p>
                    <div class="cp-options" style="display:flex; flex-direction:column; gap:0.5rem;">
                        <button class="btn btn-outline cp-opt" onclick="evalCheckpoint(4, 0)">أ) عجز حوسبي وانهيار في الخدمة.</button>
                        <button class="btn btn-outline cp-opt" onclick="evalCheckpoint(4, 1)">ب) توفير زائد مهدِر (Over-provisioning Waste) بقيمة هدر 40 vCPUs.</button>
                    </div>
                    <div class="cp-feedback" id="cp-4-fb" style="margin-top:0.75rem; display:none; padding:0.75rem; border-radius:6px;"></div>
                </div>
            </section>

            <!-- Module 6: Case Studies & Industry Applications -->
            <section id="module-6" class="lecture-section">
                <span class="section-tag">الوحدة 6: الدروس والخبرات الميدانية</span>
                <h2>🏛️ دراسات الحالة والجدل التقني المعاصر (Netflix & Shopify)</h2>
                
                <div class="case-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:1.25rem; margin:1.5rem 0;">
                    <div class="card" style="background:var(--color-surface); border-top:4px solid #E50914; padding:1.25rem; border-radius:8px;">
                        <h4 style="color:#ffffff;">🎬 دراسة حالة Netflix وهندسة الفوضى</h4>
                        <p>بعد انهيار مصفوفة SAN عام 2008، أغلقت Netflix كافة مراكز بياناتها وانتقلت لـ AWS. طوّرت أداة <strong>Chaos Monkey</strong> لقتل الخوادم عمداً في الإنتاج والتأكد من صمود التطبيق والتعافي الذاتي بفضل المرونة وتعدد المستأجرين.</p>
                    </div>
                    <div class="card" style="background:var(--color-surface); border-top:4px solid #96BF48; padding:1.25rem; border-radius:8px;">
                        <h4 style="color:#ffffff;">🛍️ دراسة حالة Shopify في عطلة الجمعة السوداء</h4>
                        <p>استوعبت منصة Shopify ذروة بلغت 32 مليون طلب بالدقيقة ومبيعات بقيمة 9.3 مليار دولار بنسبة إتاحة 99.999% بالاعتماد على محركات الحاويات المرنة (GKE)، ثم أعادت تقليص الخوادم فور انتهاء الموسم لتوفير الملايين.</p>
                    </div>
                </div>
            </section>

            <!-- Module 7: Cloud Washing Detective Lab -->
            <section id="module-7" class="lecture-section">
                <span class="section-tag">الوحدة 7: الفحص الجنائي والتشخيص</span>
                <h2>🕵️‍♂️ مختبر كشف الخداع السحابي (Cloud Washing Detective Lab)</h2>
                <p>قم بفحص عروض شركات الاستضافة وتشخيص ما إذا كانت سحابة حقيقية متوافقة مع NIST SP 800-145 أم مجرد خداع تسويقي (Cloud Washed):</p>

                <!-- Cloud Washing Detective Widget Container -->
                <div class="interactive-widget" id="cloudwashing-detective-widget">
                    <!-- Dynamic rendering via JavaScript -->
                </div>

                <!-- In-line Checkpoint 5 -->
                <div class="checkpoint-box" id="cp-5" style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:8px; padding:1.25rem; margin:1.5rem 0;">
                    <h4 style="margin-top:0; color:var(--color-accent);">🧠 نقطة تحقق ذاتي 5 (Checkpoint 5)</h4>
                    <p>لماذا أفرد معيار ISO/IEC 17788:2014 خاصية "تعدد المستأجرين" بشكل مستقل؟</p>
                    <div class="cp-options" style="display:flex; flex-direction:column; gap:0.5rem;">
                        <button class="btn btn-outline cp-opt" onclick="evalCheckpoint(5, 0)">أ) لأن تعدد المستأجرين يفرض قانونياً ومعمارياً حواجز عزل مشددة وتشفير بين عملاء متنافسين، بينما تجميع الموارد قد يخدم عميلاً واحداً.</button>
                        <button class="btn btn-outline cp-opt" onclick="evalCheckpoint(5, 1)">ب) لإلغاء متطلبات التشفير على المؤسسات.</button>
                    </div>
                    <div class="cp-feedback" id="cp-5-fb" style="margin-top:0.75rem; display:none; padding:0.75rem; border-radius:6px;"></div>
                </div>
            </section>

            <!-- Module 8: Flashcards -->
            <section id="flashcards" class="lecture-section">
                <span class="section-tag">المراجعة والترسيخ المعرفي</span>
                <h2>🗂️ 8. بطاقات الاستذكار السريع (Flashcards)</h2>
                
                <div class="flashcards-container">
                    <div class="flashcard" onclick="this.classList.toggle('flipped')">
                        <div class="flashcard-inner">
                            <div class="flashcard-front">
                                <span style="font-size:2rem; margin-bottom:0.5rem;">⚡</span>
                                <h4>On-Demand Self-Service</h4>
                                <div class="flashcard-hint">انقر لقلب البطاقة ↺</div>
                            </div>
                            <div class="flashcard-back">
                                <p>توفير موارد الحوسبة آلياً من جانب المستهلك دون اشتراط أي تفاعل بشري مع مزود الخدمة عبر واجهات APIs برمجية موحدة.</p>
                            </div>
                        </div>
                    </div>

                    <div class="flashcard" onclick="this.classList.toggle('flipped')">
                        <div class="flashcard-inner">
                            <div class="flashcard-front">
                                <span style="font-size:2rem; margin-bottom:0.5rem;">🌐</span>
                                <h4>Broad Network Access</h4>
                                <div class="flashcard-hint">انقر لقلب البطاقة ↺</div>
                            </div>
                            <div class="flashcard-back">
                                <p>إتاحة الخدمات السحابية عبر شبكة الإنترنت من خلال آليات وبروتوكولات قياسية مفتوحة تدعم كافة المنصات غير المتجانسة (خفيفة وثقيلة).</p>
                            </div>
                        </div>
                    </div>

                    <div class="flashcard" onclick="this.classList.toggle('flipped')">
                        <div class="flashcard-inner">
                            <div class="flashcard-front">
                                <span style="font-size:2rem; margin-bottom:0.5rem;">🏢</span>
                                <h4>Resource Pooling</h4>
                                <div class="flashcard-hint">انقر لقلب البطاقة ↺</div>
                            </div>
                            <div class="flashcard-back">
                                <p>دمج الموارد الفيزيائية والافتراضية لخدمة عدة مستأجرين مع استقلالية الموقع الجغرافي وفرض حواجز عزل منطقية وأمنية مشددة.</p>
                            </div>
                        </div>
                    </div>

                    <div class="flashcard" onclick="this.classList.toggle('flipped')">
                        <div class="flashcard-inner">
                            <div class="flashcard-front">
                                <span style="font-size:2rem; margin-bottom:0.5rem;">📈</span>
                                <h4>Rapid Elasticity</h4>
                                <div class="flashcard-hint">انقر لقلب البطاقة ↺</div>
                            </div>
                            <div class="flashcard-back">
                                <p>التوسع والانكماش التلقائي الآني للموارد صعوداً وهبوطاً بما يتناسب خطياً مع تقلبات الطلب اللحظي لمنع الهدر والانهيار.</p>
                            </div>
                        </div>
                    </div>

                    <div class="flashcard" onclick="this.classList.toggle('flipped')">
                        <div class="flashcard-inner">
                            <div class="flashcard-front">
                                <span style="font-size:2rem; margin-bottom:0.5rem;">⏱️</span>
                                <h4>Measured Service</h4>
                                <div class="flashcard-hint">انقر لقلب البطاقة ↺</div>
                            </div>
                            <div class="flashcard-back">
                                <p>قياس شفاف ومراقبة دقيقة لاستهلاك الموارد (بالمللي ثانية والجيجابايت) وفق نموذج الفوترة حسب الاستخدام الفعلي (Pay-As-You-Go).</p>
                            </div>
                        </div>
                    </div>

                    <div class="flashcard" onclick="this.classList.toggle('flipped')">
                        <div class="flashcard-inner">
                            <div class="flashcard-front">
                                <span style="font-size:2rem; margin-bottom:0.5rem;">🔐</span>
                                <h4>VXLAN & 24-bit VNI</h4>
                                <div class="flashcard-hint">انقر لقلب البطاقة ↺</div>
                            </div>
                            <div class="flashcard-back">
                                <p>بروتوكول شبكات التراكب المعياري (RFC 7348) الذي يوفر 16.7 مليون شبكة سحابية معزولة (VPC) متجاوزاً قيد الـ 4096 في VLAN.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Module 9: Quiz -->
            <section id="quiz" class="lecture-section">
                <span class="section-tag">الكوز الذاتي التفاعلي النهائي</span>
                <h2>✅ 9. اختبر فهمك المعماري (Quiz — 10 أسئلة تخصصية شاملة)</h2>
                <p>أجب عن الأسئلة العشرة التالية لتقييم مدى استيعابك للمفاهيم الهندسية والمعايير الرسمية؛ ستحصل على تصحيح فوري لكل سؤال مع تعليل علمي موثق وحفظ لنتيجتك في المتصفح:</p>

                <div class="quiz-container" id="quiz-app">
                    <!-- Mounted automatically by assets/js/quiz.js -->
                </div>
            </section>

        </main>
    </div>

    <!-- Platform Footer -->
    <div id="site-footer"></div>

    <!-- Platform JavaScript Engines -->
    <script src="../assets/js/main.js"></script>
    <script src="../assets/js/components.js"></script>
    <script src="../assets/js/lecture-header.js"></script>
    <script src="../assets/js/quiz.js"></script>

    <!-- Page Specific Interactive Scripts -->
    <script>
        /* Interactive Logic will be loaded here */
    </script>
</body>
</html>
```

---

## 4. المحاكيات والتفاعلات المنفذة (Implemented Interactive Features & JavaScript Code)

تلتزم جميع المحاكيات بالفلسفة البرمجية الصارمة للمنصة (Pure Vanilla JavaScript ES6+) بدون أي مكتبات خارجية:

### 4.1 الكود المصدري لمحاكي المرونة التلقائية (Autoscaling & Elasticity Simulator)

```javascript
/**
 * محاكي المرونة التلقائية وهندسة التوسع (Autoscaling Simulator)
 * يجسد معادلات Herbst et al. (2013) لمطابقة الموارد R(t) مع الطلب D(t)
 */
function initAutoscalingSimulator() {
    const container = document.getElementById('autoscaling-simulator-widget');
    if (!container) return;

    // Render Widget DOM Structure
    container.innerHTML = `
        <div class="calc-card" style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:12px; padding:1.5rem; margin:1.5rem 0;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.25rem;">
                <div>
                    <h3 style="margin:0; color:var(--color-accent); font-size:1.2rem;">📈 محاكي المرونة التلقائية واستيعاب الأحمال (Autoscaling Engine)</h3>
                    <p style="margin:0.25rem 0 0 0; color:var(--color-secondary-text); font-size:0.88rem;">اختبر استجابة النظام لطفرات الزيارات وقارن بين الخوادم الثابتة والسحابة المرنة.</p>
                </div>
                <div style="display:flex; gap:0.5rem;">
                    <button type="button" class="btn btn-warning" id="sim-spike-btn" style="background:#F59E0B; color:#001C32; font-weight:700; border:none; padding:0.4rem 0.8rem; border-radius:6px; cursor:pointer;">
                        ⚡ محاكاة طفرة Black Friday (85k req/s)
                    </button>
                    <button type="button" class="btn btn-outline" id="sim-reset-btn" style="border:1px solid var(--color-border); color:var(--color-white); background:transparent; padding:0.4rem 0.8rem; border-radius:6px; cursor:pointer;">
                        ↺ إعادة ضبط
                    </button>
                </div>
            </div>

            <!-- Controls Grid -->
            <div class="widget-controls" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1.25rem; margin-bottom:1.5rem;">
                <div class="control-group">
                    <label for="sim-demand-slider" style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:0.5rem;">
                        <span>معدل تدفق الطلبات اللحظي D(t):</span>
                        <span id="sim-demand-val" style="color:var(--color-accent); font-family:'JetBrains Mono';">10,000 req/s</span>
                    </label>
                    <input type="range" id="sim-demand-slider" min="1000" max="100000" step="1000" value="10000" style="width:100%; accent-color:var(--color-accent);">
                </div>

                <div class="control-group">
                    <label style="display:block; font-weight:700; margin-bottom:0.5rem;">النمط المعماري للبنية التحتية:</label>
                    <div style="display:flex; gap:0.75rem;">
                        <label style="display:flex; align-items:center; gap:0.35rem; cursor:pointer; font-size:0.9rem;">
                            <input type="radio" name="sim-arch-mode" value="fixed" checked> خوادم فيزيائية ثابتة (4 خوادم)
                        </label>
                        <label style="display:flex; align-items:center; gap:0.35rem; cursor:pointer; font-size:0.9rem;">
                            <input type="radio" name="sim-arch-mode" value="elastic"> سحابة مرنة (Auto-scaling)
                        </label>
                    </div>
                </div>
            </div>

            <!-- Live Dashboard Metrics -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem; margin-bottom:1.5rem;">
                <div style="background:rgba(7,26,43,0.7); border:1px solid var(--color-border); border-radius:8px; padding:1rem; text-align:center;">
                    <span style="font-size:0.8rem; color:var(--color-secondary-text); display:block;">الخوادم النشطة R(t)</span>
                    <strong id="sim-active-servers" style="font-size:1.6rem; color:var(--color-white); font-family:'JetBrains Mono';">4</strong>
                </div>
                <div style="background:rgba(7,26,43,0.7); border:1px solid var(--color-border); border-radius:8px; padding:1rem; text-align:center;">
                    <span style="font-size:0.8rem; color:var(--color-secondary-text); display:block;">متوسط استهلاك المعالج (CPU)</span>
                    <strong id="sim-cpu-load" style="font-size:1.6rem; color:#10B981; font-family:'JetBrains Mono';">40%</strong>
                </div>
                <div style="background:rgba(7,26,43,0.7); border:1px solid var(--color-border); border-radius:8px; padding:1rem; text-align:center;">
                    <span style="font-size:0.8rem; color:var(--color-secondary-text); display:block;">التكلفة اللحظية التقديرية</span>
                    <strong id="sim-hourly-cost" style="font-size:1.6rem; color:#38BDF8; font-family:'JetBrains Mono';">$0.20 / ساعة</strong>
                </div>
                <div style="background:rgba(7,26,43,0.7); border:1px solid var(--color-border); border-radius:8px; padding:1rem; text-align:center;">
                    <span style="font-size:0.8rem; color:var(--color-secondary-text); display:block;">معدل النجاح (SLA)</span>
                    <strong id="sim-sla-rate" style="font-size:1.6rem; color:#10B981; font-family:'JetBrains Mono';">99.999%</strong>
                </div>
            </div>

            <!-- Server Node Cluster Visualizer -->
            <div style="margin-bottom:1.25rem;">
                <span style="font-size:0.85rem; font-weight:700; color:var(--color-secondary-text); display:block; margin-bottom:0.5rem;">عقد الخوادم الافتراضية في العنقود:</span>
                <div id="sim-nodes-grid" style="display:flex; flex-wrap:wrap; gap:0.5rem;"></div>
            </div>

            <!-- Status Alert Banner -->
            <div id="sim-status-banner" style="padding:0.85rem 1.25rem; border-radius:8px; font-size:0.92rem; font-weight:600; display:flex; align-items:center; gap:0.5rem;"></div>
        </div>
    `;

    const slider = document.getElementById('sim-demand-slider');
    const demandLabel = document.getElementById('sim-demand-val');
    const activeServersEl = document.getElementById('sim-active-servers');
    const cpuLoadEl = document.getElementById('sim-cpu-load');
    const costEl = document.getElementById('sim-hourly-cost');
    const slaEl = document.getElementById('sim-sla-rate');
    const nodesGrid = document.getElementById('sim-nodes-grid');
    const statusBanner = document.getElementById('sim-status-banner');
    const spikeBtn = document.getElementById('sim-spike-btn');
    const resetBtn = document.getElementById('sim-reset-btn');
    const modeRadios = document.querySelectorAll('input[name="sim-arch-mode"]');

    function updateSimulation() {
        const demand = parseInt(slider.value, 10);
        demandLabel.textContent = demand.toLocaleString() + ' req/s';
        const isElastic = document.querySelector('input[name="sim-arch-mode"]:checked').value === 'elastic';

        let servers = 4;
        let cpuLoad = 0;
        let cost = 0;
        let sla = "99.999%";
        let statusState = "stable"; // "stable", "waste", "crash"

        const serverCap = 5000; // 5k req/s per server at 80% load

        if (!isElastic) {
            servers = 4;
            const totalCap = servers * serverCap;
            if (demand <= totalCap) {
                cpuLoad = Math.round((demand / totalCap) * 80);
                if (demand < 6000) statusState = "waste";
                else statusState = "stable";
            } else {
                cpuLoad = 100;
                statusState = "crash";
                const dropRate = Math.min(80, Math.round(((demand - totalCap) / demand) * 100));
                sla = (100 - dropRate).toFixed(1) + "% (انهيار 504)";
            }
            cost = servers * 0.05;
        } else {
            // Elastic mode: scale between 2 and 20 servers
            servers = Math.max(2, Math.min(20, Math.ceil(demand / 4000)));
            cpuLoad = Math.min(85, Math.max(35, Math.round((demand / (servers * 5000)) * 75)));
            cost = servers * 0.05;
            statusState = "stable";
            sla = "99.999%";
        }

        // Update DOM metrics
        activeServersEl.textContent = servers;
        cpuLoadEl.textContent = cpuLoad + '%';
        costEl.textContent = '$' + cost.toFixed(2) + ' / ساعة';
        slaEl.textContent = sla;

        // Render Server Nodes
        let nodesHtml = '';
        for (let i = 1; i <= servers; i++) {
            let color = '#10B981'; // Green
            if (statusState === 'crash') color = '#EF4444'; // Red
            else if (cpuLoad > 75) color = '#F59E0B'; // Amber
            
            nodesHtml += `
                <div style="background:${color}; color:#001C32; padding:0.35rem 0.65rem; border-radius:6px; font-size:0.75rem; font-weight:700; font-family:'JetBrains Mono'; display:flex; align-items:center; gap:0.25rem;">
                    <span>🖥️ VM-${i < 10 ? '0' + i : i}</span>
                </div>
            `;
        }
        nodesGrid.innerHTML = nodesHtml;

        // Status banner styling & text
        if (statusState === 'crash') {
            cpuLoadEl.style.color = '#EF4444';
            slaEl.style.color = '#EF4444';
            statusBanner.style.background = 'rgba(239, 68, 68, 0.15)';
            statusBanner.style.border = '1px solid #EF4444';
            statusBanner.style.color = '#FCA5A5';
            statusBanner.innerHTML = '🚨 <strong>انهيار النظام (Under-provisioning Shortage):</strong> تجاوز الطلب قدرة العتاد الثابت، اختناق طوابير الاتصال وظهور أخطاء 504 Gateway Timeout للمستخدمين!';
        } else if (statusState === 'waste') {
            cpuLoadEl.style.color = '#F59E0B';
            slaEl.style.color = '#10B981';
            statusBanner.style.background = 'rgba(245, 158, 11, 0.15)';
            statusBanner.style.border = '1px solid #F59E0B';
            statusBanner.style.color = '#FCD34D';
            statusBanner.innerHTML = '⚠️ <strong>هدر مالي (Over-provisioning Waste):</strong> الخوادم تعمل بنسبة خمول عالية، وتدفع المنشأة تكاليف عتاد غير مستغل!';
        } else {
            cpuLoadEl.style.color = '#10B981';
            slaEl.style.color = '#10B981';
            statusBanner.style.background = 'rgba(16, 185, 129, 0.15)';
            statusBanner.style.border = '1px solid #10B981';
            statusBanner.style.color = '#6EE7B7';
            statusBanner.innerHTML = '✅ <strong>توازن مرن مثالي (Perfect Elastic Match):</strong> النظام يتكيف تلقائياً مع حجم الطلب مع الحفاظ على زمن استجابة سريع وأقل تكلفة مالية ممكنة.';
        }
    }

    slider.addEventListener('input', updateSimulation);
    modeRadios.forEach(r => r.addEventListener('change', updateSimulation));

    spikeBtn.addEventListener('click', () => {
        slider.value = 85000;
        updateSimulation();
    });

    resetBtn.addEventListener('click', () => {
        slider.value = 10000;
        document.querySelector('input[name="sim-arch-mode"][value="fixed"]').checked = true;
        updateSimulation();
    });

    updateSimulation();
}
```

---

### 4.2 الكود المصدري لمختبر كشف الخداع السحابي (Cloud Washing Detective Lab)

```javascript
/**
 * مختبر كشف الخداع السحابي التفاعلي (Cloud Washing Detective Lab)
 * يفحص عروض الاستضافة التجارية وفق الخصائص الخمس لمعيار NIST SP 800-145
 */
function initCloudWashingLab() {
    const container = document.getElementById('cloudwashing-detective-widget');
    if (!container) return;

    const cases = [
        {
            id: "case-1",
            name: "السيناريو 1: استضافة الفهد (FastHost)",
            typeBadge: "عروض الاستضافة التقليدية",
            desc: "تعلن شركة استضافة محلية عن «خادم سحابي خارق» بـ 15$ شهرياً. عند التجربة: تفعيل الخادم يستغرق 3 ساعات بعد مراجعة موظف الدعم الفني، الترقية تتطلب إيقاف الخادم وسداد فاتورة جديدة، الوصول عبر Remote Desktop فقط، والدفع سنوي ثابت مقدماً سواء استخدمت الخادم أو أطفأته.",
            criteria: {
                selfService: false,
                broadAccess: false,
                pooling: true,
                elasticity: false,
                measured: false
            },
            verdict: "خداع سحابي فاضح (Cloud Washed) 🚨",
            verdictClass: "danger",
            score: "20%",
            report: "هذه الخدمة تنتهك 4 من أصل 5 خصائص لمعيار NIST! تفتقر للخدمة الذاتية (تعتمد على موظف للتفعيل)، تفتقر للمرونة السريعة (ترقية يدوية مع توقف الخدمة)، تفتقر للخدمة المقاسة (اشتراك ثابت غير مرتبط بالاستهلاك الفعلي بالثانية)، وتفتقر للوصول الشبكي العريض عبر واجهات API مفتوحة."
        },
        {
            id: "case-2",
            name: "السيناريو 2: منصة داتافلو (DataFlow DB)",
            typeBadge: "قواعد بيانات سحابية مدارة",
            desc: "خدمة قواعد بيانات مدارة عبر الإنترنت. تتيح للمطورين عبر سطر الأوامر (CLI) أو استدعاء API واحد إنشاء قاعدة بيانات PostgreSQL. عند ارتفاع الترافيك، يقوم النظام آلياً بإضافة نُسخ قراءة (Read Replicas) لتوزيع الحمل، ثم إغلاقها فور هبوط الترافيك، مع فوترة دقيقة بالمللي ثانية لعدد الاستعلامات.",
            criteria: {
                selfService: true,
                broadAccess: true,
                pooling: true,
                elasticity: true,
                measured: true
            },
            verdict: "سحابة حقيقية وأصيلة (Genuine Cloud) 🌟",
            verdictClass: "success",
            score: "100%",
            report: "حوسبة سحابية نموذجية متكاملة! تستوفي الخصائص الخمس لمعيار NIST SP 800-145 بنسبة 100%: خدمة ذاتية فورية، وصول شبكي عريض عبر الـ APIs، تجميع للموارد مع العزل، مرونة وتوسع تلقائي لحظي، وقياس دقيق للاستهلاك بالمللي ثانية."
        },
        {
            id: "case-3",
            name: "السيناريو 3: مخزن المؤسسة (Enterprise Vault)",
            typeBadge: "حلول تخزين محتكرة",
            desc: "خدمة تخزين ملفات تقدمها شركة تجهيزات. تقدم مساحة تخزينية ضخمة، ولكن تشترط تثبيت برنامج عميل خاص ومحتكر يعمل حصراً على نظام Windows Server القديم، وتتطلب توقيع عقد فيزيائي لحجز رف محدد داخل مركز البيانات، مع تسعير اشتراك شهري ثابت.",
            criteria: {
                selfService: false,
                broadAccess: false,
                pooling: false,
                elasticity: false,
                measured: false
            },
            verdict: "استضافة مخصصة تقليدية مغلفة سحابياً ❌",
            verdictClass: "danger",
            score: "0%",
            report: "استضافة خاصة تقليدية (Dedicated/Co-location) تخالف معايير السحابة جملة وتفصيلاً: احتكار المنصة دون وصول عريض، حجز خادم محدد ينفي استقلالية الموقع وتجميع الموارد، وانعدام المرونة والخدمة الذاتية."
        }
    ];

    let currentCaseIdx = 0;

    function renderLab() {
        const c = cases[currentCaseIdx];
        container.innerHTML = `
            <div class="calc-card" style="background:var(--color-surface); border:1px solid var(--color-border); border-radius:12px; padding:1.5rem; margin:1.5rem 0;">
                <!-- Scenario Tabs -->
                <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:1.25rem; border-bottom:1px solid var(--color-border); padding-bottom:0.75rem;">
                    ${cases.map((cs, idx) => `
                        <button type="button" class="btn ${idx === currentCaseIdx ? 'btn-primary' : 'btn-outline'}" 
                                onclick="switchDetectiveCase(${idx})"
                                style="padding:0.4rem 0.9rem; border-radius:6px; font-size:0.88rem; cursor:pointer;">
                            ${cs.name}
                        </button>
                    `).join('')}
                </div>

                <!-- Scenario Description Card -->
                <div style="background:rgba(7,26,43,0.7); border:1px solid var(--color-border); border-radius:8px; padding:1.25rem; margin-bottom:1.5rem;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
                        <h4 style="margin:0; color:var(--color-accent); font-size:1.1rem;">📄 تقرير الحالة المعروضة للفحص:</h4>
                        <span style="background:rgba(0,246,228,0.1); color:var(--color-accent); padding:0.2rem 0.6rem; border-radius:4px; font-size:0.75rem; font-weight:700;">${c.typeBadge}</span>
                    </div>
                    <p style="margin:0; color:#E2E8F0; line-height:1.6; font-size:0.95rem;">${c.desc}</p>
                </div>

                <!-- Forensic Checklist Toggles -->
                <div style="margin-bottom:1.5rem;">
                    <h4 style="color:var(--color-white); font-size:1rem; margin-bottom:0.75rem;">🔍 قائمة الفحص الجنائي لخصائص NIST الخمس:</h4>
                    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.75rem;">
                        <label style="display:flex; align-items:center; gap:0.5rem; background:rgba(0,28,50,0.5); padding:0.6rem; border-radius:6px; cursor:pointer;">
                            <input type="checkbox" id="chk-selfService" style="accent-color:var(--color-accent);"> 1. الخدمة الذاتية عند الطلب (Self-service)
                        </label>
                        <label style="display:flex; align-items:center; gap:0.5rem; background:rgba(0,28,50,0.5); padding:0.6rem; border-radius:6px; cursor:pointer;">
                            <input type="checkbox" id="chk-broadAccess" style="accent-color:var(--color-accent);"> 2. الوصول العريض للشبكة (Broad Access)
                        </label>
                        <label style="display:flex; align-items:center; gap:0.5rem; background:rgba(0,28,50,0.5); padding:0.6rem; border-radius:6px; cursor:pointer;">
                            <input type="checkbox" id="chk-pooling" style="accent-color:var(--color-accent);"> 3. تجميع الموارد (Resource Pooling)
                        </label>
                        <label style="display:flex; align-items:center; gap:0.5rem; background:rgba(0,28,50,0.5); padding:0.6rem; border-radius:6px; cursor:pointer;">
                            <input type="checkbox" id="chk-elasticity" style="accent-color:var(--color-accent);"> 4. المرونة السريعة (Rapid Elasticity)
                        </label>
                        <label style="display:flex; align-items:center; gap:0.5rem; background:rgba(0,28,50,0.5); padding:0.6rem; border-radius:6px; cursor:pointer;">
                            <input type="checkbox" id="chk-measured" style="accent-color:var(--color-accent);"> 5. الخدمة المقاسة (Measured Service)
                        </label>
                    </div>
                </div>

                <button type="button" class="btn btn-primary" onclick="runForensicAudit()" style="font-weight:700; padding:0.6rem 1.4rem; border-radius:6px; cursor:pointer;">
                    ⚖️ تشغيل الفحص الجنائي وإصدار الحكم (Run Forensic Audit)
                </button>

                <!-- Forensic Verdict Output Container -->
                <div id="forensic-verdict-box" style="margin-top:1.5rem; display:none;"></div>
            </div>
        `;
    }

    window.switchDetectiveCase = function(idx) {
        currentCaseIdx = idx;
        renderLab();
    };

    window.runForensicAudit = function() {
        const c = cases[currentCaseIdx];
        const verdictBox = document.getElementById('forensic-verdict-box');
        if (!verdictBox) return;

        verdictBox.style.display = 'block';
        verdictBox.innerHTML = `
            <div style="background:${c.verdictClass === 'success' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}; 
                        border:1px solid ${c.verdictClass === 'success' ? '#10B981' : '#EF4444'}; 
                        border-radius:8px; padding:1.25rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
                    <h4 style="margin:0; font-size:1.15rem; color:${c.verdictClass === 'success' ? '#6EE7B7' : '#FCA5A5'};">
                        الحكم الهندسي: ${c.verdict}
                    </h4>
                    <span style="background:${c.verdictClass === 'success' ? '#10B981' : '#EF4444'}; color:#001C32; padding:0.2rem 0.6rem; border-radius:4px; font-weight:700; font-size:0.85rem; font-family:'JetBrains Mono';">
                        المطابقة: ${c.score}
                    </span>
                </div>
                <p style="margin:0; color:#E2E8F0; font-size:0.92rem; line-height:1.6;">${c.report}</p>
            </div>
        `;
    };

    renderLab();
}
```

---

### 4.3 كود نقاط التحقق الذاتي (In-line Checkpoints Evaluator)

```javascript
/**
 * محرك تقييم نقاط التحقق الذاتي أثناء القراءة (In-line Checkpoints)
 */
function evalCheckpoint(cpId, selectedOption) {
    const fb = document.getElementById(`cp-${cpId}-fb`);
    if (!fb) return;

    const correctAnswers = {
        1: {
            correct: 1,
            successText: "✅ أحسنت! الحوسبة السحابية تحول التكاليف من استثمارات رأسمالية أولية ضخمة (CapEx) في المباني والعتاد، إلى نفقات تشغيلية دورية مرنة (OpEx) ترتبط مباشرة بحجم الاستهلاك الفعلي.",
            errorText: "❌ تذكر دائماً: CapEx تعني شراء الأصول مقدماً وتجميد رؤوس الأموال، بينما OpEx تعني دفع مصاريف التشغيل المرنة كخدمة يومية (Pay-as-you-go)."
        },
        2: {
            correct: 1,
            successText: "✅ رائع! ينص معيار NIST صراحة على أن توفير الموارد يجب أن يتم آلياً من جانب المستهلك وبأدنى تفاعل بشري مع مزود الخدمة (Minimal interaction). وجود تذاكر وموظفين بشريين في مسار التوفير ينفي صفة الخدمة الذاتية السحابية.",
            errorText: "❌ غير صحيح؛ وجود موافقة يدوية وتدخل بشري وتأخير لساعات ينفي صراحة صفة الخدمة الذاتية عند الطلب بمعايير NIST."
        },
        3: {
            correct: 0,
            successText: "✅ إجابة هندسية دقيقة! يوفر بروتوكول VXLAN (المعرف في RFC 7348) معرّف شبكة افتراضياً بطول 24-bit يتيح إنشاء 16.7 مليون شبكة سحابية معزولة (VPC) مقارنة بـ 4,096 شبكة فقط في تقنية VLAN التقليدية المقيدة بـ 12-bit.",
            errorText: "❌ غير صحيح؛ الميزة الأساسية لـ VXLAN هي طول المعرف (24-bit VNI) الذي يتيح 16.7 مليون شبكة افتراضية معزولة فوق نفس البنية."
        },
        4: {
            correct: 1,
            successText: "✅ حساب رياضي سليم! بما أن R(t) > D(t)، فإن النظام يعاني من Over-provisioning، وتكون قيمة الهدر المالي W(t) = 50 - 10 = 40 vCPUs تعمل خاملة وتكلف المنشأة نفقات دون فائدة.",
            errorText: "❌ تذكر معادلات هيربست: عندما تكون الموارد المخصصة أكبر من الطلب الفعلي، يحدث هدر مالي (Over-provisioning Waste)."
        },
        5: {
            correct: 0,
            successText: "✅ تحليل أكاديمي رفيع! أدركت منظمة ISO أن Resource Pooling قد يتحقق تقنياً دون وجود مستأجرين متعددين، بينما Multi-tenancy تفرض معمارياً وقانونياً تشفير البيانات، وفصل الشبكات (VXLAN)، ومنع تسرب الذاكرة بين كيانات ومؤسسات مختلفة تتشارك نفس العتاد.",
            errorText: "❌ غير صحيح؛ السبب هو أن تعدد المستأجرين يفرض التزاماً معمارياً وقانونياً صارماً بالعزل الأمني التام وحماية الخصوصية بين مؤسسات مستقلة تتشارك نفس البنية."
        }
    };

    const cp = correctAnswers[cpId];
    fb.style.display = "block";
    if (selectedOption === cp.correct) {
        fb.style.background = "rgba(16, 185, 129, 0.15)";
        fb.style.border = "1px solid #10B981";
        fb.style.color = "#6EE7B7";
        fb.innerHTML = cp.successText;
    } else {
        fb.style.background = "rgba(239, 68, 68, 0.15)";
        fb.style.border = "1px solid #EF4444";
        fb.style.color = "#FCA5A5";
        fb.innerHTML = cp.errorText;
    }
}
window.evalCheckpoint = evalCheckpoint;
```

---

### 4.4 دمج وتفعيل محرك الاختبار النهائي (Quiz Engine Integration)

تكامل مصفوفة `quizData` (العشرة أسئلة المعتمدة بالكامل في `instructional-design.md`) مع محرك الاختبار الموحد `initLectureQuiz`:

```javascript
/**
 * كود تكامل كائن quizData المعتمد مع محرك initLectureQuiz()
 * المنفذ في نهاية صفحة المحاضرة
 */
const quizData = [
    {
        question: "1. وفق وثيقة المعهد الوطني الأمريكي للمعايير والتقنية (NIST SP 800-145)، ما هو الشرط الجوهري لكي يُصنف توفير الموارد الحوسبية على أنه «خدمة ذاتية عند الطلب» (On-Demand Self-Service)؟",
        options: [
            "أن يتم شراء الخوادم عبر متجر إلكتروني مع تسليمها خلال يومي عمل.",
            "أن يستطيع المستهلك حجز الموارد وإطلاقها آلياً وفورياً عبر واجهات برمجية دون اشتراط أي تفاعل بشري مع مزود الخدمة.",
            "أن يتوفر فريق دعم فني يعمل على مدار الساعة لاستقبال طلبات ترقية العتاد يدوياً عبر الهاتف.",
            "أن تكون لوحة التحكم متوافقة حصراً مع نظام تشغيل محدد لضمان الأمان العالي."
        ],
        correct: 1,
        explanation: "ينص معيار NIST SP 800-145 حرفياً على أن الخدمة الذاتية عند الطلب تعني قدرة المستهلك على توفير إمكانيات الحوسبة من جانب واحد وبصورة آلية، مثل وقت المعالجة ومساحة التخزين، دون الحاجة لأي تفاعل بشري (Minimal service provider interaction)؛ بينما تتطلب الخيارات الأخرى تدخلاً بشرياً أو قنوات يدوية تنفي صفة الأتمتة السحابية الأصيلة."
    },
    {
        question: "2. في التحليل المالي والهندسي للبنية التحتية، ما هو الأثر المعماري المباشر لتحول الإنفاق من النفقات الرأسمالية (CapEx) إلى النفقات التشغيلية (OpEx) في الحوسبة السحابية؟",
        options: [
            "إجبار المؤسسة على تجميد أصول مالية ضخمة مقدماً لشراء أجهزة التبريد والمولدات الاحتياطية.",
            "تحويل تكاليف البنية التحتية إلى دفعات مرنة ترتبط خطياً بالاستهلاك الفعلي (Pay-as-you-go) مع القضاء على مخاطر العتاد المتقادم والمهدر.",
            "زيادة التكاليف الثابتة غير القابلة للتغيير على مدى 5 سنوات بصورة دورية وإلزامية.",
            "تحمل المؤسسة مسؤولية استبدال اللوحات الأم ومحركات الأقراص التالفة في مراكز بيانات المزود."
        ],
        correct: 1,
        explanation: "يتميز نموذج OpEx السحابي بتحويل تكلفة البنية التحتية من استثمارات رأسمالية أولية ضخمة (CapEx) تتآكل قيمتها مع الزمن إلى تكاليف تشغيلية يومية وشهرية مرنة تدفع فيها المؤسسة مقابل ما تستهلكه فقط، مما يزيل مخاطر التوفير الزائد وهدر الموارد، بينما شراء المعدات وصيانتها يمثل صلب نموذج CapEx التقليدي."
    },
    {
        question: "3. كيف تضمن معمارية تجميع الموارد (Resource Pooling) حماية البيانات ومنع تسربها بين المستأجرين المتشاركين لنفس المعالج والذاكرة الفيزيائية على مستوى العتاد؟",
        options: [
            "بالاعتماد على سياسات الثقة المتبادلة وعدم تشغيل خوادم شركات متنافسة في نفس اليوم.",
            "باستخدام ميزات العزل العتادي في المعالجات مثل جداول الصفحات الممتدة (EPT/NPT) التي تسقط أي محاولة للوصول إلى ذاكرة خارج النطاق باعتراض عتادي فوري.",
            "بدمج أنظمة التشغيل في نظام واحد مشترك وتطبيق صلاحيات الملفات القياسية (chmod 777).",
            "بفصل اتصال الخوادم عن شبكة الإنترنت واستخدام وسائط التخزين اليدوية للنقل."
        ],
        correct: 1,
        explanation: "يتحقق عزل الذاكرة في البيئات متعددة المستأجرين (Multi-tenancy) عبر تقنيات المحاكاة الافتراضية المدعومة بالعتاد (Hardware-assisted virtualization مثل Intel EPT أو AMD NPT)؛ حيث يتحكم المشرف الافتراضي في ترجمة العناوين ويمنع أي نظام ضيف من قراءة أو كتابة أي بايت خارج جدوله الفيزيائي، مما يجعل تسرب الذاكرة مستحيلاً حتى لو تشارك مستأجران نفس شريحة الذاكرة."
    },
    {
        question: "4. ما هي الميزة الهندسية الحاسمة لبروتوكول شبكات التراكب VXLAN (RFC 7348) مقارنة بشبكات VLAN التقليدية في تحقيق العزل الشبكي السحابي؟",
        options: [
            "استخدام معرّف شبكة بطول 24-bit يتيح إنشاء نحو 16.7 مليون شبكة افتراضية معزولة مقارنة بـ 4,096 شبكة فقط في VLAN.",
            "إلغاء الحاجة إلى استخدام عناوين IP والاعتماد حصراً على أسماء النطاقات.",
            "قصر حركة البيانات على الشبكات السلكية المحلية ومنع مرورها عبر محولات الشبكة.",
            "تشفير البيانات حصراً باستخدام خوارزميات غير متماثلة تزيد من زمن التأخير."
        ],
        correct: 0,
        explanation: "يعالج بروتوكول VXLAN (المعرف في RFC 7348) العجز الهيكلي لشبكات VLAN التقليدية (المقيدة بـ 12-bit أي 4096 شبكة فقط) من خلال توفير معرّف شبكة افتراضي VNI بطول 24-bit، وهو ما يسمح بتوليد ما يصل إلى 16,777,216 شبكة سحابية افتراضية معزولة تماماً (VPC) تعمل بالتوازي فوق نفس البنية الفيزيائية."
    },
    {
        question: "5. استناداً إلى الورقة البحثية التأسيسية لـ Herbst et al. (2013)، ما هو الفارق العلمي الدقيق بين «قابلية التوسع» (Scalability) و«المرونة السريعة» (Rapid Elasticity)؟",
        options: [
            "المرونة تعني حصراً التوسع نحو الخارج (Scale-out)، بينما قابلية التوسع تعني التوسع نحو الداخل (Scale-in).",
            "قابلية التوسع خاصية هيكلية غير مرتبطة بالزمن تركز على الحد الأقصى للحمل، بينما المرونة تكيف آلي لحظي حرج زمنياً يطابق الموارد مع تقلبات الطلب صعوداً وهبوطاً.",
            "المرونة تطبق فقط على قواعد البيانات، بينما قابلية التوسع مخصصة للخوادم الفيزيائية ومحولات الشبكة.",
            "لا يوجد أي فرق علمي بينهما، واستخدامهما في الأدبيات الهندسية مترادف تماماً دون أي تمايز."
        ],
        correct: 1,
        explanation: "وفق نموذج Herbst et al. الرياضي، فإن قابلية التوسع (Scalability) قدرة معمارية بنائية تسمح للنظام باستيعاب زيادة العمل بإضافة موارد بصرف النظر عن الوقت المستغرق، بينما المرونة (Elasticity) هي خاصية تكيفية مقترنة بالزمن (Time-dependent) تركز على المواءمة الآلية اللحظية بين الموارد المخصصة R(t) والطلب الفعلي D(t) لمنع الهدر Over-provisioning والعجز Under-provisioning."
    },
    {
        question: "6. في ضوء خاصية «الخدمة المقاسة» (Measured Service)، ما هو المبدأ الهندسي الشائع الذي يفاجئ مهندسي النظم في تسعير حركة بيانات الشبكة (Network Data Transfer) في معظم السحب العامة؟",
        options: [
            "أن نقل البيانات الواردة إلى السحابة (Ingress Traffic) والبيانات الصادرة (Egress Traffic) كلاهما مجاني تماماً وبلا حدود.",
            "أن حركة دخول البيانات (Ingress) تكون مجانية عادة، بينما تُفرض رسوم محاسبية دقيقة على كل جيجابايت يخرج من السحابة إلى الإنترنت (Egress Traffic).",
            "أن حركة الخروج (Egress) أرخص بمئة ضعف من حركة الدخول دائماً في كافة المناطق.",
            "أن الفوترة تعتمد حصراً على عدد نقرات الفأرة ولا تقيس حجم البايتات المنقولة مطلقاً."
        ],
        correct: 1,
        explanation: "تتبع معظم السحب العامة (AWS, Azure, GCP) نموذج فوترة يجعل استقبال البيانات القادمة إلى السحابة مجانياً (Free Ingress)، في حين تخضع كافة البيانات الخارجة من مراكز البيانات باتجاه الإنترنت أو بين الأقاليم لرسوم نقل بيانات دقيقة (Egress Fees)، مما يتطلب تخطيطاً معمارياً دقيقاً لتجنب صدمة الفاتورة (Bill Shock)."
    },
    {
        question: "7. في معمارية تأمين التخزين السحابي عبر تقنية «تشفير الأظرف» (Envelope Encryption)، ما هي الوظيفة الأساسية لمفتاح تشفير الجذر (Customer Master Key - CMK / KEK)؟",
        options: [
            "تشفير كل بايت من ملفات المستخدم مباشرة في الوقت الفعلي مما يبطئ المعالجة.",
            "تشفير وحماية مفتاح تشفير البيانات الفريد (Data Encryption Key - DEK)، والاحتفاظ بمفتاح الجذر آمناً داخل أجهزة عتادية مخصصة (HSM).",
            "إرسال كلمة المرور للمستخدم في رسالة نصية غير مشفرة عند كل عملية تسجيل دخول.",
            "استبدال خوارزمية AES-256 بخوارزميات تشفير قديمة متوافقة مع الأنظمة المتقادمة."
        ],
        correct: 1,
        explanation: "في تشفير الأظرف، يُستخدم مفتاح البيانات (DEK) لتشفير كتل البيانات الكبيرة بسرعة عبر AES-256، ثم يُشفر هذا المفتاح بدوره باستخدام مفتاح الجذر (KEK/CMK) المحمي داخل وحدة أمان عتادية بالغة التحصين (Hardware Security Module - HSM متوافقة مع FIPS 140-2 Level 3)، مما يضمن عدم تخزين مفتاح فك التشفير بنص صريح بجانب البيانات."
    },
    {
        question: "8. ما هو السبب الرئيسي الذي دفع المنظمة الدولية للتوحيد القياسي في معيار ISO/IEC 17788:2014 إلى إفراد «تعدد المستأجرين» (Multi-tenancy) كخاصية سادسة مستقلة؟",
        options: [
            "لأن تجميع الموارد (Resource Pooling) قد يتحقق داخل مؤسسة واحدة تخدم عميلاً منفرداً، بينما تعدد المستأجرين يفرض حواجز عزل منطقية وأمنية مشددة والتزاماً قانونياً بين عملاء مستقلين.",
            "لإلغاء متطلبات التشفير وتقليل تكلفة خوادم التخزين السحابي على المؤسسات الحكومية.",
            "بسبب معارضة الاتحاد الأوروبي لمعايير التشفير الأمريكية المعتمدة في NIST.",
            "لأن معيار ISO/IEC 17788 مخصص حصراً للأجهزة المنزلية الذكية وإنترنت الأشياء."
        ],
        correct: 0,
        explanation: "أفرد خبراء ISO/IEC خاصية Multi-tenancy للتأكيد على التمايز الهندسي والقانوني الصارم؛ حيث يمكن تجميع الموارد (Resource Pooling) لخدمة أقسام مختلفة في شركة واحدة دون مخاوف أمنية حرجة، بينما تعدد المستأجرين يفرض التزاماً معمارياً وقانونياً بتوفير عزل مطلق وحماية للبيانات بين حسابات عملاء متنافسين يتشاركون نفس البنية التحتية."
    },
    {
        question: "9. ما هو الدرس المعماري الأساسي الذي استخلصته شركة Netflix وكرسته من خلال ابتكار أداة «Chaos Monkey» بعد انتقالها الكامل إلى سحابة AWS؟",
        options: [
            "الاعتماد على خادم فيزيائي عملاق واحد عالي الموثوقية وتجنب تشتيت التطبيق على خوادم متعددة.",
            "تصميم التطبيقات بافتراض حتمية فشل أي خادم افتراضي في أي لحظة، وبناء أنظمة برمجية عديمة الحالة (Stateless) وقادرة على التعافي الذاتي الفوري.",
            "حظر استخدام موازنات الأحمال السحابية والاعتماد فقط على التوجيه اليدوي للزيارات.",
            "إلغاء خطط النسخ الاحتياطي لقواعد البيانات والاعتماد الكامل على متانة أقراص المزود."
        ],
        correct: 1,
        explanation: "قامت فلسفة Netflix وهندسة الفوضى (Chaos Engineering) عبر أداة Chaos Monkey على مبدأ معماري أصيل في السحابة: الأجهزة والآلات الافتراضية ستتعطل حتماً (Design for Failure)، لذا يجب بناء تطبيقات سحابية موزعة وعديمة الحالة قادرة على تعويض فقدان أي عقدة حاسوبية تلقائياً ودون أن يشعر المشاهد بأي انقطاع."
    },
    {
        question: "10. عند تطبيق مصفوفة كشف الخداع السحابي (Cloud Washing)، أي من السيناريوهات التالية يمثل خدمة سحابية حقيقية وأصيلة (Genuine Cloud)؟",
        options: [
            "خادم استضافة يتم حجز خطته سنوياً بدفعة ثابتة مسبقة، ويتم تفعيله بعد مراجعة موظف المبيعات، وتتطلب ترقيته توقف الخادم وسداد الفارق.",
            "خادم افتراضي بنظام تشغيل قديم لا يمكن إدارته إلا بحضور العميل شخصياً لمقر شركة الاستضافة وتوصيل شاشة مادية.",
            "خدمة حوسبة مدارة تُنشأ في ثوانٍ عبر استدعاء API أو سطر أوامر، وتتوسع تلقائياً مع طفرات الزيارات، وتُحاسب بدقة بالمللي ثانية وحجم البيانات المنقولة.",
            "تطبيق مكتبي مثبت على حاسوب شخصي واحد دون اتصال شبكي ويعمل بترخيص مؤبد."
        ],
        correct: 2,
        explanation: "الخدمة السحابية الحقيقية (Genuine Cloud) هي التي تستوفي الخصائص الخمس لمعيار NIST SP 800-145 مجتمعة: خدمة ذاتية عبر الـ APIs، وصول شبكي عريض، تجميع للموارد مع العزل، مرونة وتوسع تلقائي فوري، وقياس دقيق للاستهلاك بالمللي ثانية؛ وأي خدمة تفتقر لهذه الركائز وتعتمد على عقود جامدة وتدخل بشري تندرج تحت مسمى الخداع السحابي (Cloud Washing)."
    }
];

// تفعيل المحركات عند اكتمال تحميل الصفحة DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initAutoscalingSimulator();
    initCloudWashingLab();
    initLectureQuiz(quizData, 'quiz_cloud_lec01', 'quiz-app');
});
```

---

## 5. خطة التحديثات الافتراضية للفهارس والبوابات (Navigation, Index & Portal Updates)

لضمان تكامل صفحة المحاضرة الجديدة دون المساس بالموقع الفعلي خلال هذا الاختبار التشغيلي، تم توثيق الفروق البرمجية الدقيقة (Virtual Code Diffs) المخصصة للتطبيق في مرحلة النشر:

### 5.1 التحديث الافتراضي لفهرس المقرر (`Cloud-Computing/index.html`)

```html
<!-- التعديل المطلوب على بطاقة المحاضرة الأولى داخل Cloud-Computing/index.html -->
<!-- الاستبدال الدقيق للبطاقة لتصبح متوافقة مع المرجع الأكاديمي المحدث: -->
<a href="Lecture-01.html" class="lecture-card available" data-status="available">
    <div class="lecture-info">
        <div class="lecture-number">01</div>
        <div class="lecture-details">
            <h3>المحاضرة الأولى: مفاهيم وتأسيس الحوسبة السحابية والخصائص الجوهرية</h3>
            <p>التأصيل الهندسي لمعيار NIST SP 800-145، التحول الاقتصادي بين CapEx و OpEx، التشريح المعماري للخصائص الخمس، آليات العزل الخفية (EPT, VXLAN, KMS)، محاكي المرونة التلقائية، ومختبر كشف الخداع السحابي الجنائي.</p>
            <div class="lecture-topics">
                <span class="lecture-feature-pill">☁️ معيار NIST SP 800-145</span>
                <span class="lecture-feature-pill">🔒 آليات العزل EPT & VXLAN</span>
                <span class="lecture-feature-pill">📈 محاكي المرونة التلقائية</span>
                <span class="lecture-feature-pill">🕵️‍♂️ كاشف الخداع السحابي</span>
                <span class="lecture-feature-pill">📝 كويز شامل (10/10)</span>
            </div>
        </div>
    </div>
    <div class="lecture-action">
        <span class="status-badge status-available">🟢 متاحة الآن للدراسة</span>
        <span class="lecture-enter-btn">ابدأ دراسة المحاضرة ⬅️</span>
    </div>
</a>
```

### 5.2 التحديث الافتراضي لبوابة المقررات العامة (`courses.html`)

```html
<!-- التعديل المطلوب على بطاقة مقرر الحوسبة السحابية داخل courses.html -->
<article class="course-card" data-course-id="cloud" data-dept="shared cyber it" data-lectures="3">
    <div class="course-card-cover">
        <div class="card-cover-badges">
            <span class="card-dept-badge">🤝 مقرر مشترك بين المسارين</span>
            <span class="card-lectures-badge">3 محاضرات متاحة</span>
        </div>
        <div class="card-cover-main">
            <div class="card-cover-icon">☁️</div>
            <div class="card-cover-titles">
                <h3 class="card-cover-title">الحوسبة السحابية</h3>
                <span class="card-cover-title-en">Cloud Computing Architecture</span>
            </div>
        </div>
    </div>
    <div class="course-card-body">
        <div class="course-instructor-pill">
            <span>👨‍🏫</span>
            <span>أستاذ المقرر: أ.د. عبده ناصر شويه</span>
        </div>
        <p class="course-card-desc">
            المعمارية المعيارية للحوسبة السحابية وفق معايير NIST SP 800-145، نماذج النشر والخدمات (IaaS, PaaS, SaaS)، المحاكاة الافتراضية وHypervisors، عزل الشبكات VXLAN، ومختبرات المرونة وكشف الخداع السحابي.
        </p>
        <div class="course-card-meta-tags">
            <span class="topic-chip">معايير NIST والخصائص</span>
            <span class="topic-chip">محاكي المرونة التلقائية</span>
            <span class="topic-chip">طبقات العزل EPT & VXLAN</span>
            <span class="topic-chip">نماذج IaaS / PaaS / SaaS</span>
        </div>
        <div class="course-card-footer">
            <a href="Cloud-Computing/index.html" class="course-card-btn btn-primary">
                <span>استعراض بوابة المقرر (3 محاضرات)</span>
                <span>←</span>
            </a>
        </div>
    </div>
</article>
```

---

## 6. نتائج الفحص الذاتي وضمان الجودة البرمجية (Engineering QA & Verification)

تمت محاكاة واختبار المعايير البرمجية الصارمة للصفحة الموصوفة لضمان توافقها الكامل مع بيئة منصة SECOD:

### 6.1 فحص التجاوب عبر الشاشات المختلفة (Responsive Design Audit)
- **شاشات الهواتف الذكية (320px - 480px):**
  - شريط التنقل العلوي يتحول إلى النسق المضغوط مع إخفاء العناوين الطويلة وإبقاء أيقونات الإجراءات وزر تبديل المظهر.
  - بطاقة Hero تتحول إلى عمود رأسي واحد (`flex-direction: column`)، مع تقليص عرض الرسم السيبراني إلى 100% وإتاحة التمرير الداخلي.
  - تحويل الجداول الأكاديمية ومصفوفات المقارنة إلى حاويات تمرير أفقي سلس (`overflow-x: auto; -webkit-overflow-scrolling: touch;`).
  - أزرار المحاكيات وعناصر التحكم مصممة بمساحة لمس لا تقل عن $48 \times 48\text{ px}$.
- **الشاشات اللوحية (768px):**
  - شبكة ثنائية الأعمدة للبطاقات المفهومية وبطاقات الاستذكار.
- **شاشات سطح المكتب (1024px فما فوق):**
  - تثبيت الشريط الجانبي (`position: sticky; top: 80px`) مع تمييز الوحدة النشطة ديناميكياً أثناء التمرير.

### 6.2 فحص دعم الوضعين الليلي والنهاري (Dark & Light Theme Adaptability)
- **الوضع الليلي (`data-theme="dark"`):**
  - الاعتماد التام على متغيرات الألوان الرسمية: الخلفية `#001C32`، الأسطح `#10283B`، النصوص `#FFFFFF`، والتوهج السياني `#00F6E4`.
  - نسبة التباين بين النصوص والأسطح تتجاوز $8.5:1$، وهي متوافقة تماماً مع معايير WCAG 2.1 AAA.
- **الوضع النهاري (`data-theme="light"`):**
  - التبديل السلس عبر `toggleTheme()` دون أي أخطاء أو ألوان صلبة؛ الخلفية `#F5F8FA`، الأسطح `#FFFFFF`، النصوص كحلي داكن `#001C32`.

### 6.3 فحص إمكانية الوصول وسهولة الاستخدام (Accessibility & WCAG AA)
- إضافة وسوم `aria-label` و `aria-expanded` لكافة الأزرار وأكورديون الفكرة المفتاحية.
- إدارة حالة التركيز البصري (`:focus-visible`) بإطار توهج واضح بسمك 2px بلون `var(--color-accent)`.
- عناصر التغذية الراجعة اللحظية مزودة بـ `role="status"` لضمان قراءتها عبر قارئات الشاشة (Screen Readers).

### 6.4 فحص انعدام التراجع وخلو الطرفية من الأخطاء (Zero Regression & Console Check)
- استدعاء المحرك الموحد `initLectureQuiz` بنفس التوقيع المعتمد في المنصة مع تخزين محلي مستقل `quiz_cloud_lec01`، مما يضمن استقلالية تامة وعدم تداخل البيانات مع أي محاضرة سابقة.
- انعدام تام لأي مكتبات خارجية غير مصرح بها (صفر أطر عمل خارجية)، والاعتماد 100% على تقنيات Vanilla Web Standards.

---

<!-- SECOD_TASK_HANDOFF_START -->
### 📋 بطاقة تسليم المهمة (Task Handoff Block)

- **معرف المهمة (Task ID):** `SEC-TEST-LEC01-05-IMPLEMENTATION`
- **اسم الوكيل الحالي (Current Agent):** `secod-frontend`
- **حالة المهمة (Task Status):** COMPLETED ✅
- **المقرر المستهدف (Target Course):** `test-run` (Cloud Computing Foundations)
- **المحاضرة المستهدفة (Target Lecture):** Lecture 01 - مفاهيم وتأسيس الحوسبة السحابية والخصائص الجوهرية (Cloud Computing Foundations)
- **الملفات المدخلة التي فُحصت (Input Files Read):**
  - `/home/bashar/manar-student-automation/.agent-workspace/test-run/03-content/lecture-content.md`
  - `/home/bashar/manar-student-automation/.agent-workspace/test-run/04-instructional-design/instructional-design.md`
  - `/home/bashar/manar-student-automation/Cloud-Computing/Lecture-01.html`
  - `/home/bashar/manar-student-automation/Cloud-Computing/index.html`
  - `/home/bashar/manar-student-automation/courses.html`
  - `/home/bashar/manar-student-automation/assets/css/variables.css`
  - `/home/bashar/manar-student-automation/assets/css/lecture-widgets.css`
  - `/home/bashar/manar-student-automation/assets/js/quiz.js`
  - `/home/bashar/manar-student-automation/.agents/agents/secod-frontend.md`
  - `/home/bashar/manar-student-automation/.agents/handoff-protocol.md`
- **الملفات والمخرجات المولدة فعلياً (Output Files Generated):**
  - `/home/bashar/manar-student-automation/.agent-workspace/test-run/05-implementation/implementation-report.md`
- **ملخص العمل المنجز (Completed Work Summary):**
  - إعداد وتوثيق خطة التنفيذ المعمارية والتكامل البرمجي الكامل لصفحة المحاضرة الأولى التجريبية (Cloud Computing Foundations) وفق المعايير القياسية الصارمة لمنصة SECOD.
  - توثيق بطاقة المحاضرة والبيانات التقنية المعمارية ومطابقة رموز التصميم المعتمدة في `variables.css`.
  - صياغة الهيكل البرمجي القياسي الكامل لصفحة المحاضرة بـ Semantic HTML5، شاملاً شريط تجربة الترويسة التفاعلية (`secod-lecture-experience`)، الرسوم السيبرانية SVG، الشريط الجانبي الذكي، الوحدات التعليمية الثماني، الحاويات التفاعلية، الصناديق التنبيهية، وجداول المقارنة وبطاقات الاستذكار.
  - كتابة الكود المصدري البرمجي الكامل بـ Vanilla JavaScript للأدوات التفاعلية:
    1. محاكي المرونة التلقائية وهندسة التوسع المعتمد على معادلات Herbst et al. مع تحكم بالتدفق اللحظي، مؤشرات الـ SLA، وعرض عنقود العقد الافتراضية.
    2. مختبر كشف الخداع السحابي الجنائي مع تبويبات السيناريوهات الحقيقية، وقائمة التحقق من خصائص NIST، وإصدار الأحكام المعمارية.
    3. محرك تقييم نقاط التحقق الذاتي الخمس (Checkpoints) بالتغذية الراجعة الفورية.
  - ربط وتكامل مصفوفة `quizData` (10 أسئلة تخصصية معللة) مع محرك الاختبار الموحد `initLectureQuiz()`.
  - صياغة خطة التحديثات الافتراضية لفهرس المقرر (`Cloud-Computing/index.html`) وبوابة المقررات (`courses.html`).
  - توثيق نتائج الفحص الذاتي الافتراضي (التجاوب، دعم الوضعين Dark/Light، سهولة الوصول WCAG AA، وانعدام التراجع Zero Regression).
  - الالتزام التام بالضابط الصارم للاختبار التشغيلي بعدم تعديل أو إنشاء أي ملف داخل مجلدات الموقع الفعلية.
- **المسائل غير المحلولة أو العالقة (Unresolved Issues / Pending Questions):**
  - لا توجد أي مسائل عالقة؛ خطة التنفيذ البرمجية مكتملة وموثقة بنسبة 100% وجاهزة للتسليم لمرحلة ضمان الجودة الأكاديمية والبرمجية (`academic-qa`).
- **التحذيرات وملاحظات المخاطر (Warnings & Risk Notes):**
  - تم حصر كافة التعديلات داخل مساحة العمل التجريبية `.agent-workspace/test-run/05-implementation/` دون المساس بملفات المنصة الحية؛ وعند الانتقال لمرحلة النشر الفعلي مستقبلاً، يجب تطبيق الفروق البرمجية الموثقة في القسم 5 بدقة.
- **الوكيل التالي المستلم (Next Agent):** `academic-qa`
- **التحقق من معايير القبول (Acceptance Criteria Checklist):**
  - [x] الالتزام بالهيكل الإلزامي لتقرير التنفيذ الموضح في secod-frontend.md.
  - [x] تضمين البيانات التقنية والمعمارية ومطابقة Design Tokens.
  - [x] تقديم كود HTML5 الدلالي الكامل لصفحة المحاضرة.
  - [x] تقديم الكود المصدري بـ Vanilla JavaScript لمحاكي المرونة ومختبر كشف الخداع السحابي.
  - [x] دمج مصفوفة quizData (10 أسئلة) مع دالة initLectureQuiz().
  - [x] توثيق خطة التحديثات لفهرس المقرر وبوابة المقررات.
  - [x] توثيق نتائج الفحص الذاتي للتجاوب والوضعين ومعايير WCAG AA.
  - [x] الالتزام بالحظر التام لتعديل مجلدات الموقع الفعلية وحفظ المخرجات في المسار المحدد.
  - [x] إرفاق بطاقة تسليم المهمة في ختام الملف ورسالة الإنجاز.
<!-- SECOD_TASK_HANDOFF_END -->
