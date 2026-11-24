import { getLocale } from "@/lib/locale";
import { defaultDescription, pageMetadata } from "@/lib/metadata";
import { copy, t, tr } from "@/data/site";
import { homeCopy } from "@/data/home";
import { Button } from "@/components/ui";
import { HeroVisual } from "@/components/visuals";
import TechText from "@/components/react-bits/TechText";
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
  const wordmark = "AW-RE Tech";
  return (
    <div className="homepage">
      <section className="hero home-hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="home-wordmark">
              <h1 dir="ltr" lang="en">{wordmark}</h1>
              <div className="home-wordmark-effect" dir="ltr" aria-hidden="true">
                <TechText
                  text={wordmark}
                  align={l === "ar" ? "right" : "left"}
                  fontWeight={650}
                  fontSize={96}
                  letterSpacing={-0.055}
                  reveal="letter"
                  accentColor="#b6ff3b"
                  dashLength={4}
                  dashGap={2}
                  strokeWidth={0.95}
                  specks={8}
                  labels={false}
                  draggable={false}
                  sweep={false}
                  guides={false}
                  intro="type"
                  introDuration={0.95}
                  clickKick
                />
              </div>
            </div>
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
