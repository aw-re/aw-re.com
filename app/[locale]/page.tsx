import { getLocale } from "@/lib/locale";
import { defaultDescription, pageMetadata } from "@/lib/metadata";
import { copy, t } from "@/data/site";
import { homeCopy } from "@/data/home";
import { Button } from "@/components/ui";
import { HeroVisual } from "@/components/visuals";
import HomeHeroTitle from "@/components/home-hero-title";
import { PageSchema } from "@/components/seo";
import {
  HomeServices,
  HomeProjects,
  HomeClosing,
} from "@/components/home-sections";
import "../home.css";
const homeTitle = [
  "AW-RE Tech | Software Development & AI Automation in Yemen",
  "أوري تك | تطوير البرمجيات وأتمتة الأعمال في اليمن",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return pageMetadata(l, "", t(l, homeTitle), defaultDescription(l));
}
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return (
    <div className="homepage">
      <PageSchema locale={l} path="" name={t(l, homeTitle)} description={defaultDescription(l)} />
      <section className="hero home-hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <HomeHeroTitle title={t(l, homeCopy.heroTitle)} locale={l} />
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
