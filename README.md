# 🛡️ SECOD — Cybersecurity & IT Learning Platform

![Brand](https://img.shields.io/badge/Brand-SECOD-001C32?style=for-the-badge&logoColor=00F6E4)
![Tagline](https://img.shields.io/badge/Tagline-Understand.%20Learn.%20Apply.-00F6E4?style=for-the-badge)
![Initiative](https://img.shields.io/badge/Type-Independent%20Educational%20Initiative-10283B?style=for-the-badge)
![Founder](https://img.shields.io/badge/Founder-Bashar%20Zblh-2563EB?style=for-the-badge)
![Tech](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-001C32?style=for-the-badge)
![Status](https://img.shields.io/badge/QA-Zero%20Regression%20Passed-16A34A?style=for-the-badge)

منصة تعليمية تقنية مستقلة تهدف إلى مساعدة الطلاب على فهم مقررات الأمن السيبراني وتقنية المعلومات من خلال الشرح المنهجي، وتفكيك المفاهيم، والأمثلة التطبيقية، والاختبارات التعليمية.

> **الشعار اللفظي (Brand Tagline):**  
> **Understand. Learn. Apply.**

---

## 🏛️ تنويه الاستقلالية الأكاديمية (Institutional Independence)

**SECOD** منصة تعليمية مستقلة من تطوير **بشار زبله**، وتهدف إلى مساعدة طلاب المستوى الثالث في كلية المنار على دراسة مقررات الأمن السيبراني وتقنية المعلومات.

المنصة لا تتبع كلية المنار ولا تمثلها رسمياً، ولا توجد بينها وبين الكلية علاقة إدارية أو أكاديمية أو شراكة رسمية.

---

## 🎨 نظام تصميم SECOD (SECOD Design System)

اعتمدت المنصة نظام تصميم موحد (Design Tokens) مرتكز على الشعار الرسمي المعتمد:

| المتغير | الاسم | HEX | الاستخدام |
|---|---|---|---|
| Primary | SECOD Navy | `#001C32` | اللون الأساسي للعلامة والأسطح الرسمية |
| Accent | SECOD Cyan | `#00F6E4` | اللون المميز (Brand Accent) وتأثيرات التوهج السيبراني |
| Deep | Deep Navy | `#071A2B` | الخلفيات العميقة في الوضع الليلي |
| Surface | Dark Surface | `#10283B` | أسطح البطاقات والحاويات المظلمة |
| White | Pure White | `#FFFFFF` | النصوص النقية على الأسطح الداكنة والبطاقات الفاتحة |
| Light BG | Light Background | `#F5F8FA` | خلفية المنصة في الوضع النهاري |
| Secondary Text | Slate Gray | `#64748B` | النصوص الثانوية والملاحظات الوصفية |
| Border | Border Gray | `#DCE5EC` | الحدود في الوضع النهاري (`#1A3852` في الليلي) |
| Tech Blue | Tech Blue | `#2563EB` | الروابط التفاعلية والأزرار التقنية |
| Success | Success Green | `#16A34A` | حالات النجاح والتأكيد |
| Warning | Warning Amber | `#F59E0B` | التنبيهات والتحذيرات |
| Error | Error Red | `#DC2626` | الأخطاء البرمجية وإشعارات التراجع |

### نظام الطباعة (Typography System)
- **الخط العربي الأساسي:** IBM Plex Sans Arabic (مع خط Cairo كبديل قياسي).
- **الخط الإنجليزي والأرقام:** Inter (مع خط Roboto كبديل قياسي).
- **خط الأكواد والطرفيات:** JetBrains Mono / SFMono / Consolas.
- **التوجيه ثنائي الاتجاه:** دعم RTL كامل للمحتوى العربي، مع ضبط تلقائي LTR للأكواد والمصطلحات التقنية.

---

## 🏗️ المعمارية البرمجية وهيكل الملفات (Project Architecture)

```text
SECOD-Platform/
│
├── index.html                                 # الصفحة الرئيسية لمنصة SECOD
├── courses.html                               # بوابة المقررات الدراسية ومحرك البحث والتصفية
├── README.md                                  # التوثيق الرسمي للمنصة والمعمارية
├── favicon.ico                                # أيقونة الموقع
│
├── assets/                                    # الأصول البرمجية المركزية المشتركة
│   ├── brand/                                 # أصول الهوية البصرية المعتمدة
│   │   ├── logo/                              # نسخ الشعار الرسمي (داكن، فاتح، شفاف)
│   │   ├── favicon/                           # حزمة الأيقونات القياسية (16x16, 32x32, 48x48, 180x180, 192x192, 512x512)
│   │   └── social/                            # بطاقة Open Graph والصورة الرمزية (Avatar)
│   │
│   ├── css/
│   │   ├── variables.css                      # رموز التصميم (Tokens): الألوان، الخطوط، الأوزان، الظلال
│   │   ├── reset.css                          # إعادة الضبط القياسية، الاتجاه RTL، وقواعد الطباعة
│   │   ├── layout.css                         # التخطيط العام، شريط الرأس، المسافات، والحاويات
│   │   ├── components.css                     # نظام المكونات: الأزرار، البطاقات، التنبيهات، الجداول
│   │   ├── lecture-widgets.css                # محاكيات المحاضرات: خطوط SDLC، الهاش، والمخططات التفاعلية
│   │   ├── responsive.css                     # استجابة الشاشات (320px إلى 1920px) والطباعة
│   │   └── main.css                           # المدخل الرئيسي لملفات التنسيق (Master Stylesheet)
│   │
│   └── js/
│       ├── main.js                            # إدارة الوضع الليلي/النهاري، شريط القراءة، نسخ الأكواد، والأكورديون
│       ├── components.js                      # محرك تحميل وتركيب المكونات المركزية والتذييل المشترك
│       ├── course-portal.js                   # محرك البحث الفوري وتصفية المحاضرات والمقررات
│       └── quiz.js                            # محرك الاختبارات التفاعلية الموحد وحفظ الدرجات بـ localStorage
│
├── components/                                # مكونات العرض القابلة لإعادة الاستخدام
│   ├── header.js                              # شريط التنقل العلوي والقائمة الجانبية للهواتف
│   └── footer.js                              # التذييل الموحد وتنويه الاستقلالية الأكاديمية
│
├── Cloud-Computing/                           # مقرر الحوسبة السحابية (3 محاضرات + كويزات)
├── Digital-Forensics/                         # مقرر التحقيق الجنائي الرقمي (محاضرة + كويز)
├── IT-Project-Management/                     # مقرر إدارة مشاريع IT (محاضرتان + كويزات)
├── Security-Software-Design/                  # مقرر تصميم البرمجيات الآمنة (3 محاضرات + كويزات)
├── Software-Development-Fundamentals/         # مقرر أساسيات تطوير البرمجيات (محاضرتان + كويزات)
└── Systems-Analysis-and-Design/               # مقرر تحليل وتصميم النظم (محاضرتان + كويزات)
```

---

## 👨‍💻 المؤسس والمطور (Founder & Developer)

**Bashar Zblh**  
*Founder & Developer of SECOD*  
مبادرة تعليمية تقنية مستقلة أُنشئت وطُوّرت بمبادرة شخصية من بشار زبله، بهدف تنظيم المعرفة التقنية وتسهيل دراسة مقررات الأمن السيبراني وتقنية المعلومات.

---

© 2026 SECOD — Cybersecurity & IT Learning Platform • All Rights Reserved.
