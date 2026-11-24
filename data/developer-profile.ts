export const developerProfile = {
  fragment: "abdulwahab-al-reyashi",
  name: ["Abdulwahab Al-Reyashi", "عبدالوهاب الرياشي"],
  occupation: ["Software & Digital Solutions Developer", "مطوّر برمجيات وحلول رقمية"],
  role: [
    "Software & Digital Solutions Developer at AW-RE Tech",
    "مطوّر برمجيات وحلول رقمية في أوري تك",
  ],
  bio: [
    "Information technology professional focused on software development, artificial intelligence, automation and digital systems.",
    "متخصص في تقنية المعلومات، يركز على تطوير البرمجيات والذكاء الاصطناعي والأتمتة والأنظمة الرقمية.",
  ],
  portrait: "/images/abdulwahab-al-reyashi.jpg",
} as const;

export const developerProfilePath = `/about#${developerProfile.fragment}`;
