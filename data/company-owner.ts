export const companyOwner = {
  fragment: "abdulwahab-al-reyashi",
  name: ["Abdulwahab Al-Reyashi", "عبدالوهاب الرياشي"],
  ownershipTitle: ["Owner of AW-RE Tech", "صاحب شركة أوري تك"],
  occupation: ["Software & Digital Solutions Developer", "مطوّر برمجيات وحلول رقمية"],
  bio: [
    "Information technology professional focused on software development, artificial intelligence, automation and digital systems.",
    "متخصص في تقنية المعلومات، يركز على تطوير البرمجيات والذكاء الاصطناعي والأتمتة والأنظمة الرقمية.",
  ],
  portrait: "/images/abdulwahab-al-reyashi.jpg",
} as const;

export const ownerProfilePath = `/about#${companyOwner.fragment}`;
