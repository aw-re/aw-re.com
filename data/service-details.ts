import type { projects, services } from "@/data/site";

type LocalizedText = readonly [string, string];
type ServiceDetail = {
  title: LocalizedText;
  description: LocalizedText;
  questions: { question: LocalizedText; answer: LocalizedText }[];
  relatedProjects: (typeof projects)[number]["slug"][];
};

export const serviceDetails: Record<(typeof services)[number]["slug"], ServiceDetail> = {
  software: {
    title: ["Custom Software & Web Application Development", "تطوير البرمجيات المخصصة وتطبيقات الويب"],
    description: [
      "Custom web applications, internal business systems, and API integrations for teams that need software built around their workflows.",
      "تطوير تطبيقات ويب وأنظمة أعمال داخلية وربط الأنظمة عبر واجهات برمجية بما يلائم طريقة عمل فريقك.",
    ],
    questions: [
      {
        question: ["When does a custom system make sense?", "متى يكون النظام المخصص خيارًا مناسبًا؟"],
        answer: [
          "Consider custom software when a critical workflow spans several tools or depends on re-entering the same data. Start by mapping one workflow, such as how an order moves from sales to approval, and identify where the current tools fall short.",
          "قد يناسبك النظام المخصص إذا كانت عملية أساسية موزعة بين عدة أدوات أو تتطلب إدخال البيانات نفسها أكثر من مرة. ابدأ برسم مسار عملية واحدة، مثل انتقال الطلب من المبيعات إلى الموافقة، وحدد أين تقصر الأدوات الحالية عن تلبية احتياجك.",
        ],
      },
      {
        question: ["Can a new application connect to our existing tools?", "هل يمكن ربط التطبيق الجديد بأدواتنا الحالية؟"],
        answer: [
          "That depends on what the existing tools let you access and update. List the systems involved, the data that needs to move, and any permission or approval rules. From there we can assess whether APIs or scheduled imports fit the workflow.",
          "يعتمد ذلك على البيانات التي تسمح الأدوات الحالية بقراءتها أو تحديثها. حدّد الأنظمة المعنية والبيانات المطلوب نقلها وقواعد الصلاحيات أو الموافقة، ثم يمكننا تقييم ما إذا كان الربط عبر واجهات برمجية أو الاستيراد الدوري يناسب العملية.",
        ],
      },
    ],
    relatedProjects: ["sales-force-management"],
  },
  ai: {
    title: ["AI Integration & Business Process Automation", "تكامل الذكاء الاصطناعي وأتمتة الأعمال"],
    description: [
      "AI assistants, workflow automation, and integrations that help businesses handle repetitive tasks and find information in their existing tools.",
      "مساعدون بالذكاء الاصطناعي وأتمتة لسير العمل وتكاملات تساعد الشركات على معالجة المهام المتكررة والوصول إلى المعلومات.",
    ],
    questions: [
      {
        question: ["Which tasks are a good starting point for automation?", "ما المهام المناسبة للبدء بالأتمتة؟"],
        answer: [
          "Start with a frequent task that has a clear trigger and a result you can check, such as assembling a routine report or routing an incoming request. Rules work well for predictable steps. AI can help when a step involves interpreting unstructured text.",
          "ابدأ بمهمة متكررة لها نقطة بداية واضحة ونتيجة يمكن مراجعتها، مثل إعداد تقرير دوري أو توجيه طلب وارد. تناسب القواعد الخطوات المتوقعة، ويمكن للذكاء الاصطناعي المساعدة عندما تحتاج إحدى الخطوات إلى فهم نصوص غير منظمة.",
        ],
      },
      {
        question: ["How do we keep people in control of AI-assisted work?", "كيف يبقى القرار بيد الفريق عند استخدام الذكاء الاصطناعي؟"],
        answer: [
          "Decide which actions need approval before the system runs them. For example, an assistant can draft a customer reply for review, while an employee approves it and handles unusual cases. Make sure the assistant can only access the information it needs.",
          "حدّد الإجراءات التي تحتاج موافقة قبل تنفيذها. مثلًا، يمكن للمساعد إعداد مسودة رد على عميل، ثم يراجعها الموظف ويتولى الحالات غير المعتادة. احصر صلاحيات المساعد في المعلومات التي يحتاج إليها لأداء المهمة.",
        ],
      },
    ],
    relatedProjects: [],
  },
  data: {
    title: ["Business Dashboards, Reporting & Data Systems", "لوحات المعلومات وتقارير الأعمال وأنظمة البيانات"],
    description: [
      "Business dashboards, centralized reporting, and data systems that bring spreadsheets and operational sources into a clearer view.",
      "تصميم لوحات معلومات وتقارير أعمال وأنظمة بيانات تجمع الجداول والمصادر التشغيلية وتسهّل متابعة المؤشرات.",
    ],
    questions: [
      {
        question: ["What should we define before building a dashboard?", "ما الذي ينبغي تحديده قبل بناء لوحة المعلومات؟"],
        answer: [
          "Name the decisions the dashboard should support, who will use it, and how frequently they need updated data. Agree on how each metric is calculated. If two teams define sales differently, the dashboard needs to make that distinction clear.",
          "حدّد القرارات التي ستدعمها اللوحة، ومن سيستخدمها، وعدد مرات تحديث البيانات. اتفق على طريقة حساب كل مؤشر. فإذا كان فريقان يستخدمان تعريفين مختلفين للمبيعات، ينبغي توضيح الفرق في اللوحة.",
        ],
      },
      {
        question: ["Can we start with spreadsheet data?", "هل يمكن البدء ببيانات موجودة في جداول؟"],
        answer: [
          "Spreadsheets are a useful starting point when the columns are consistent and someone owns updates. Preparing them may involve standardizing dates, removing duplicates, or deciding which source wins when records disagree.",
          "يمكن البدء بالجداول عندما تكون الأعمدة متسقة وهناك مسؤول عن تحديثها. وقد يتطلب التجهيز توحيد صيغة التواريخ، أو إزالة التكرار، أو تحديد المصدر المعتمد عند اختلاف السجلات.",
        ],
      },
    ],
    relatedProjects: ["business-reporting-platform", "pharmaceutical-market-intelligence"],
  },
  it: {
    title: ["IT Infrastructure & Technical Consulting", "البنية التحتية والاستشارات التقنية"],
    description: [
      "IT consulting for businesses evaluating their infrastructure, network, and internal systems or planning a technical upgrade.",
      "استشارات تقنية للشركات التي تريد تقييم بنيتها التحتية وشبكاتها وأنظمتها الداخلية أو التخطيط لتحديثها.",
    ],
    questions: [
      {
        question: ["What should we prepare for an infrastructure review?", "ما الذي نجهّزه لمراجعة البنية التحتية؟"],
        answer: [
          "Prepare a list of the systems your staff rely on, where they run, who manages access, and recurring problems. Note which outages affect the business most. This helps prioritize improvements without asking you to share passwords or other secrets.",
          "جهّز قائمة بالأنظمة التي يعتمد عليها الفريق، وأماكن تشغيلها، ومن يدير صلاحياتها، والمشكلات المتكررة. سجّل الأعطال الأكثر تأثيرًا على العمل. تساعد هذه المعلومات في ترتيب الأولويات دون مشاركة كلمات المرور أو الأسرار.",
        ],
      },
      {
        question: ["How do we decide what to upgrade first?", "كيف نحدد ما ينبغي تحديثه أولًا؟"],
        answer: [
          "Start with the systems on which daily work depends and note the cost of downtime. Check which components have dependencies or lack a clear recovery process. That gives you a practical order for upgrades and helps plan the steps before changing a live system.",
          "ابدأ بالأنظمة التي يعتمد عليها العمل اليومي وحدد أثر توقفها. تحقّق من المكونات التي تعتمد عليها أنظمة أخرى أو تفتقر إلى آلية استعادة واضحة. بذلك يمكنك ترتيب التحديثات والتخطيط لها قبل تغيير أي نظام يعمل فعليًا.",
        ],
      },
    ],
    relatedProjects: [],
  },
};
