export type Locale = "en" | "ar";
export const tr = (l: Locale, en: string, ar: string) => (l === "ar" ? ar : en);
export const t = (l: Locale, p: readonly [string, string]) =>
  p[l === "ar" ? 1 : 0];
export const navigation = [
  ["", "Home", "الرئيسية"],
  ["/services", "Services", "خدماتنا"],
  ["/projects", "Projects", "المشاريع"],
  ["/about", "About", "من نحن"],
  ["/contact", "Contact", "تواصل معنا"],
] as const;
export const services = [
  {
    slug: "software",
    icon: "code",
    name: ["Software Development", "تطوير البرمجيات"],
    description: [
      "Web applications, business systems, internal tools, and APIs built for real business needs.",
      "تطبيقات ويب وأنظمة أعمال وأدوات داخلية وتكاملات برمجية تلبي احتياجات العمل الفعلية.",
    ],
    capabilities: [
      ["Web Applications", "تطبيقات الويب"],
      ["Business Systems", "أنظمة الأعمال"],
      ["Internal Tools", "الأدوات الداخلية"],
      ["APIs & Integrations", "واجهات برمجية وتكاملات"],
      ["Mobile-ready Solutions", "حلول متوافقة مع الجوال"],
    ],
    useCase: [
      "Bring disconnected operations into one reliable platform. From internal workflows to customer-facing products, we design around the people using your system.",
      "اجمع عملياتك المتفرقة في منصة موثوقة. نصمم الأنظمة حول احتياجات مستخدميها، من إجراءات العمل الداخلية إلى المنتجات الموجهة للعملاء.",
    ],
    outcome: [
      "Less friction. More room to grow.",
      "إجراءات أبسط، ومساحة أكبر للنمو.",
    ],
  },
  {
    slug: "ai",
    icon: "bot",
    name: ["AI & Automation", "الذكاء الاصطناعي والأتمتة"],
    description: [
      "AI assistants, workflow automation, AI integrations, and intelligent business tools.",
      "مساعدون أذكياء وأتمتة لسير العمل وتكاملات ذكاء اصطناعي تدعم أعمالك.",
    ],
    capabilities: [
      ["AI Integration", "تكامل الذكاء الاصطناعي"],
      ["Business Automation", "أتمتة الأعمال"],
      ["AI Assistants", "المساعدون الأذكياء"],
      ["Workflow Automation", "أتمتة سير العمل"],
      ["Intelligent Tools", "الأدوات الذكية"],
    ],
    useCase: [
      "Reduce repetitive tasks, make knowledge easier to find, and connect existing tools. We apply AI to a clear problem, with human oversight where it matters.",
      "اختصر المهام المتكررة وسهّل الوصول إلى المعرفة واربط أدواتك الحالية. نوظّف الذكاء الاصطناعي لحل مشكلة واضحة مع إشراف بشري حيث يلزم.",
    ],
    outcome: [
      "Intelligence with a practical purpose.",
      "ذكاء يخدم هدفًا عمليًا.",
    ],
  },
  {
    slug: "data",
    icon: "chart",
    name: ["Data & Digital Systems", "البيانات والأنظمة الرقمية"],
    description: [
      "Dashboards, reporting systems, data management, and digital transformation.",
      "لوحات معلومات وأنظمة تقارير وإدارة بيانات تدعم التحول الرقمي.",
    ],
    capabilities: [
      ["Dashboards", "لوحات المعلومات"],
      ["Reporting Systems", "أنظمة التقارير"],
      ["Data Management", "إدارة البيانات"],
      ["Analytics", "تحليل البيانات"],
      ["Digital Transformation", "التحول الرقمي"],
    ],
    useCase: [
      "Turn scattered spreadsheets and isolated data into a clear view of your operations. Build consistent reporting and a foundation for informed decisions.",
      "حوّل الجداول المتفرقة والبيانات المعزولة إلى رؤية واضحة لعملياتك، مع تقارير متسقة وأساس يساعدك على اتخاذ قرارات مدروسة.",
    ],
    outcome: ["Clearer data. Better decisions.", "بيانات أوضح، وقرارات أفضل."],
  },
  {
    slug: "it",
    icon: "server",
    name: ["IT Solutions", "حلول تقنية المعلومات"],
    description: [
      "Infrastructure, business IT systems, network solutions, and technical consulting.",
      "بنية تحتية وأنظمة تقنية وحلول شبكات واستشارات تدعم استقرار أعمالك.",
    ],
    capabilities: [
      ["IT Infrastructure", "البنية التحتية التقنية"],
      ["Network Solutions", "حلول الشبكات"],
      ["Business IT Systems", "أنظمة تقنية الأعمال"],
      ["Technical Consulting", "الاستشارات التقنية"],
    ],
    useCase: [
      "Plan the right technical foundation for your business. We help assess infrastructure, connect systems, and choose maintainable solutions that fit your operations.",
      "ضع أساسًا تقنيًا مناسبًا لأعمالك. نساعدك على تقييم البنية التحتية وربط الأنظمة واختيار حلول قابلة للصيانة تلائم طريقة عملك.",
    ],
    outcome: [
      "A dependable foundation for what comes next.",
      "أساس موثوق للخطوة القادمة.",
    ],
  },
] as const;
export const projects = [
  {
    slug: "business-reporting-platform",
    kind: "reporting",
    name: ["Business Reporting Platform", "منصة تقارير الأعمال"],
    category: ["DATA & ANALYTICS", "البيانات والتحليلات"],
    description: [
      "Centralized reporting and analytics system designed to simplify access to operational data.",
      "نظام مركزي للتقارير والتحليلات يسهّل الوصول إلى البيانات التشغيلية.",
    ],
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Recharts"],
  },
  {
    slug: "sales-force-management",
    kind: "sales",
    name: ["Sales Force Management System", "نظام إدارة فرق المبيعات"],
    category: ["BUSINESS SYSTEMS", "أنظمة الأعمال"],
    description: [
      "A role-based platform for managing field operations, users, workflows, and business data.",
      "منصة بصلاحيات متعددة لإدارة العمليات الميدانية والمستخدمين وسير العمل وبيانات الأعمال.",
    ],
    tags: ["Next.js", "FastAPI", "Docker", "RBAC"],
  },
  {
    slug: "pharmaceutical-market-intelligence",
    kind: "market",
    name: ["Pharmaceutical Market Intelligence", "نظام معلومات السوق الدوائي"],
    category: ["DIGITAL INTELLIGENCE", "المعلومات الرقمية"],
    description: [
      "A structured system for consolidating pharmaceutical studies, pricing data, and analysis.",
      "نظام منظم يجمع الدراسات الدوائية وبيانات التسعير والتحليلات في مكان واحد.",
    ],
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Data Analysis"],
  },
] as const;
export const pillars = [
  {
    icon: "settings",
    name: ["Practical by Design", "حلول تنطلق من الواقع"],
    text: [
      "We build solutions around real operational needs.",
      "نبني الحلول حول احتياجات العمل الفعلية.",
    ],
  },
  {
    icon: "layers",
    name: ["Scalable Architecture", "بنية قابلة للتوسع"],
    text: [
      "Systems designed to grow with the business.",
      "أنظمة مصممة لتنمو مع أعمالك.",
    ],
  },
  {
    icon: "sparkles",
    name: ["AI Where It Matters", "ذكاء اصطناعي يصنع فرقًا"],
    text: [
      "We use AI where it creates measurable value.",
      "نوظّف الذكاء الاصطناعي حيث يضيف قيمة يمكن قياسها.",
    ],
  },
  {
    icon: "shield",
    name: ["Long-Term Thinking", "تفكير للمستقبل"],
    text: [
      "We build with maintainability, security, and future growth in mind.",
      "نبني مع مراعاة الأمان وسهولة الصيانة والنمو المستقبلي.",
    ],
  },
] as const;
export const process = [
  [
    ["Discover", "نفهم"],
    ["Understand the problem.", "نحدد المشكلة واحتياجاتك."],
  ],
  [
    ["Design", "نصمم"],
    ["Plan the right solution.", "نخطط للحل المناسب."],
  ],
  [
    ["Build", "نطوّر"],
    ["Develop and test.", "نبني ونختبر بعناية."],
  ],
  [
    ["Launch", "نطلق"],
    ["Deploy and deliver.", "ننشر الحل ونسلّمه."],
  ],
  [
    ["Improve", "نحسّن"],
    ["Support and grow.", "ندعم ونواصل التطوير."],
  ],
] as const;
export const copy = {
  heroTitle: ["A Smarter", "مستقبل أكثر"],
  heroAccent: ["Tomorrow.", "ذكاءً."],
  heroDescription: [
    "Software, AI & Digital Systems built for real business impact.",
    "نطوّر البرمجيات وحلول الذكاء الاصطناعي والأنظمة الرقمية التي تحوّل احتياجات الأعمال إلى نتائج حقيقية.",
  ],
  start: ["Start a Project", "ابدأ مشروعك"],
  explore: ["Explore Our Work", "اكتشف أعمالنا"],
  learn: ["Learn More", "اعرف المزيد"],
  servicesTitle: [
    "From ideas to real solutions.",
    "من الأفكار إلى حلول حقيقية.",
  ],
  servicesIntro: [
    "We build practical digital solutions that help businesses work smarter, faster, and more efficiently.",
    "نبني حلولًا رقمية عملية تساعد الأعمال على العمل بذكاء وسرعة وكفاءة أكبر.",
  ],
  projectsTitle: ["Built for real-world problems.", "حلول لتحديات واقعية."],
  projectsIntro: [
    "A selection of projects focused on practical solutions for real business needs.",
    "مجموعة مشاريع تركز على حلول عملية لاحتياجات الأعمال الفعلية.",
  ],
  whyTitle: ["Built differently.", "نبني برؤية مختلفة."],
  whyIntro: [
    "We combine technical expertise with a deep understanding of real business needs to deliver solutions that create lasting value.",
    "نجمع الخبرة التقنية والفهم العميق لاحتياجات الأعمال لنقدّم حلولًا تصنع قيمة مستدامة.",
  ],
  processTitle: [
    "A clear path from idea to impact.",
    "طريق واضح من الفكرة إلى الأثر.",
  ],
  aboutTitle: ["Technology with purpose.", "تقنية تصنع قيمة."],
  aboutText: [
    "AW-RE Tech is a technology company focused on building practical digital solutions for businesses and organizations.",
    "أوري تك شركة تقنية تركز على بناء حلول رقمية عملية للشركات والمؤسسات.",
  ],
  aboutMore: [
    "We combine software engineering, artificial intelligence, automation, data, and IT expertise to turn operational challenges into reliable digital systems.",
    "نجمع هندسة البرمجيات والذكاء الاصطناعي والأتمتة والبيانات والخبرة التقنية لتحويل التحديات التشغيلية إلى أنظمة رقمية موثوقة.",
  ],
  ctaTitle: ["Let’s build something useful.", "لنبنِ شيئًا يصنع فرقًا."],
  ctaText: [
    "Have a project in mind? Let’s talk about how we can help.",
    "لديك فكرة مشروع؟ لنتحدث عن كيف يمكننا مساعدتك.",
  ],
} as const;
