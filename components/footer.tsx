import Link from "next/link";
import { Locale, navigation, tr } from "@/data/site";
import { Logo, Socials } from "./ui";
export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <Link
          href={`/${locale}`}
          aria-label={tr(locale, "AW-RE Tech home", "أوري تك الرئيسية")}
        >
          <Logo compact />
        </Link>
        <div className="footer-description">
          <p>
            {tr(
              locale,
              "Software · AI · Digital Systems · IT Solutions",
              "برمجيات · ذكاء اصطناعي · أنظمة رقمية · حلول تقنية",
            )}
          </p>
          <p>
            {tr(
              locale,
              "Ideas. Systems. Real Impact.",
              "أفكار. أنظمة. أثر حقيقي.",
            )}
          </p>
        </div>
        <div>
          <nav
            className="footer-nav"
            aria-label={tr(locale, "Footer navigation", "روابط التذييل")}
          >
            {navigation.map(([url, en, ar]) => (
              <Link key={url} href={`/${locale}${url}`}>
                {tr(locale, en, ar)}
              </Link>
            ))}
          </nav>
          <Socials locale={locale} />
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} AW-RE Tech.
          <br />
          {tr(locale, "All rights reserved.", "جميع الحقوق محفوظة.")}
        </p>
      </div>
    </footer>
  );
}
