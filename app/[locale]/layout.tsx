import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getLocale } from "@/lib/locale";
import { tr } from "@/data/site";
export const metadata: Metadata = {
  metadataBase: new URL("https://aw-re.com"),
  title: {
    default: "AW-RE Tech | Software, AI & Digital Systems",
    template: "%s | AW-RE Tech",
  },
  icons: { icon: "/icon.svg" },
  robots: { index: true, follow: true },
};
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await getLocale(params);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AW-RE Tech",
    alternateName: "أوري تك",
    url: "https://aw-re.com",
    logo: "https://aw-re.com/brand/aw-re-tech.png",
    email: "abdulwahab@aw-re.com",
    telephone: "+967735898777",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sana’a",
      addressCountry: "YE",
    },
    sameAs: ["https://github.com/aw-re"],
  };
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <a href="#main" className="skip-link">
          {tr(locale, "Skip to content", "انتقل إلى المحتوى")}
        </a>
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
