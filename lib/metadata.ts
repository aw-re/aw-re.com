import type { Metadata } from "next";
import { Locale, tr } from "@/data/site";
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    metadataBase: new URL("https://aw-re.com"),
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        en: `/en${path}`,
        ar: `/ar${path}`,
        "x-default": `/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}${path}`,
      locale: locale === "ar" ? "ar_YE" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_YE",
      type: "website",
      siteName: "AW-RE Tech",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
export function defaultDescription(l: Locale) {
  return tr(
    l,
    "AW-RE Tech builds practical software, AI automation, data systems, and digital solutions for businesses and organizations.",
    "أوري تك تطوّر البرمجيات وحلول الذكاء الاصطناعي والأتمتة وأنظمة البيانات والحلول الرقمية للشركات والمؤسسات.",
  );
}
