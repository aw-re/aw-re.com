import { getLocale } from "@/lib/locale";
import { defaultDescription, pageMetadata } from "@/lib/metadata";
import { copy, t, tr } from "@/data/site";
import { homeCopy } from "@/data/home";
import { Button } from "@/components/ui";
import { HeroVisual } from "@/components/visuals";
import {
  HomeServices,
  HomeProjects,
  HomeClosing,
} from "@/components/home-sections";
import "../home.css";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  const metadata = pageMetadata(
    l,
    "",
    tr(
      l,
      "AW-RE Tech | Software, AI & Digital Systems",
      "أوري تك | البرمجيات والذكاء الاصطناعي والأنظمة الرقمية",
    ),
    defaultDescription(l),
  );
  return {
    ...metadata,
    title: {
      absolute: tr(
        l,
        "AW-RE Tech | Software, AI & Digital Systems",
        "أوري تك | البرمجيات والذكاء الاصطناعي والأنظمة الرقمية",
      ),
    },
  };
}
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return (
    <div className="homepage">
      <section className="hero home-hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">
              <i />
              {tr(
                l,
                "SOFTWARE · AI · DIGITAL SYSTEMS",
                "برمجيات · ذكاء اصطناعي · أنظمة رقمية",
              )}
            </div>
            <h1>
              {t(l, copy.heroTitle)}
              <br />
              <span>{t(l, copy.heroAccent)}</span>
            </h1>
            <p>{t(l, homeCopy.hero)}</p>
            <div className="hero-buttons">
              <Button href={`/${l}/contact`}>{t(l, copy.start)}</Button>
              <Button
                secondary
                className="home-secondary-action"
                href={`/${l}/projects`}
              >
                {t(l, copy.explore)}
              </Button>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>
      <HomeServices locale={l} />
      <HomeProjects locale={l} />
      <HomeClosing locale={l} />
    </div>
  );
}
