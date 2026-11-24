import type { Metadata } from "next";
import { Locale, tr } from "@/data/site";
import { languageAlternates, publicUrl, siteOrigin } from "@/lib/site-urls";

export const brandName = "AW-RE Tech";
export const arabicBrandName = "أوري تك";

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const url = publicUrl(locale, path);
  const brand = tr(locale, brandName, arabicBrandName);
  const socialTitle = path ? `${title} | ${brand}` : title;
  return {
    metadataBase: new URL(siteOrigin),
    title: { absolute: socialTitle },
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      locale: locale === "ar" ? "ar_YE" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_YE",
      type: "website",
      siteName: brandName,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: brandName }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: "/opengraph-image", alt: brandName }],
    },
  };
}
export function defaultDescription(l: Locale) {
  return tr(
    l,
    "AW-RE Tech is a technology company based in Sana’a, Yemen. We build custom software, AI automation, dashboards and IT solutions for businesses.",
    "أوري تك (AW-RE Tech) شركة تقنية في صنعاء، اليمن، تقدم تطوير البرمجيات المخصصة، وأتمتة الأعمال بالذكاء الاصطناعي، ولوحات البيانات وحلول تقنية المعلومات.",
  );
}
