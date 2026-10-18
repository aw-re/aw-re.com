import { getLocale } from "@/lib/locale";
import { defaultDescription, pageMetadata } from "@/lib/metadata";
import { copy, services, projects, t, tr } from "@/data/site";
import { Button, Icon, SectionHeader } from "@/components/ui";
import { HeroVisual } from "@/components/visuals";
import { ServiceCard, ProjectCard } from "@/components/cards";
import {
  WhySection,
  ProcessSection,
  AboutPreview,
} from "@/components/sections";
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
    <>
      <section className="hero">
        <div className="hero-horizon" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="eyebrow">
              <i />
              {tr(
                l,
                "SOFTWARE · AI SOLUTIONS · DIGITAL SYSTEMS",
                "برمجيات · ذكاء اصطناعي · أنظمة رقمية",
              )}
            </div>
            <h1>
              {t(l, copy.heroTitle)}
              <br />
              <span>{t(l, copy.heroAccent)}</span>
            </h1>
            <p>{t(l, copy.heroDescription)}</p>
            <div className="hero-buttons">
              <Button href={`/${l}/contact`}>{t(l, copy.start)}</Button>
              <Button secondary href={`/${l}/projects`}>
                {t(l, copy.explore)}
              </Button>
            </div>
            <div className="hero-capabilities">
              {services.map((s) => (
                <div key={s.slug}>
                  <span>
                    <Icon name={s.icon} />
                  </span>
                  <span>{t(l, s.name)}</span>
                </div>
              ))}
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeader
            number="01"
            label={tr(l, "OUR SERVICES", "خدماتنا")}
            title={t(l, copy.servicesTitle)}
            description={t(l, copy.servicesIntro)}
            action={
              <Button secondary className="small" href={`/${l}/services`}>
                {tr(l, "View All Services", "جميع الخدمات")}
              </Button>
            }
          />
          <div className="services-grid">
            {services.map((s, i) => (
              <ServiceCard service={s} index={i} locale={l} key={s.slug} />
            ))}
          </div>
        </div>
      </section>
      <section className="section projects-section">
        <div className="container">
          <SectionHeader
            number="02"
            label={tr(l, "FEATURED PROJECTS", "مشاريع مختارة")}
            title={t(l, copy.projectsTitle)}
            description={t(l, copy.projectsIntro)}
            action={
              <Button secondary className="small" href={`/${l}/projects`}>
                {tr(l, "View All Projects", "جميع المشاريع")}
              </Button>
            }
          />
          <div className="projects-grid">
            {projects.map((p) => (
              <ProjectCard project={p} locale={l} key={p.slug} />
            ))}
          </div>
        </div>
      </section>
      <WhySection locale={l} />
      <ProcessSection locale={l} />
      <AboutPreview locale={l} />
    </>
  );
}
