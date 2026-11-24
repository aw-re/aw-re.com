import Link from "next/link";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { services, t, tr } from "@/data/site";
import { PageHero, Icon, Button } from "@/components/ui";
import { PageSchema } from "@/components/seo";
import { servicePath } from "@/lib/site-urls";

const title = ["Software, AI Automation, Data & IT Services", "خدمات البرمجيات والذكاء الاصطناعي والبيانات وتقنية المعلومات"] as const;
const description = [
  "Explore custom software development, AI integration and business automation, dashboards and data systems, and IT consulting from AW-RE Tech.",
  "تعرّف على خدمات أوري تك في تطوير البرمجيات المخصصة، وتكامل الذكاء الاصطناعي وأتمتة الأعمال، ولوحات البيانات، والاستشارات التقنية.",
] as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return pageMetadata(
    l,
    "/services",
    t(l, title),
    t(l, description),
  );
}
export default async function Services({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return (
    <>
      <PageSchema
        locale={l}
        path="/services"
        name={tr(l, "Services", "خدماتنا")}
        description={t(l, description)}
        type="CollectionPage"
        entries={services.map((s) => ({ name: t(l, s.name), path: servicePath(s.slug) }))}
      />
      <PageHero
        eyebrow={tr(l, "WHAT WE DO", "ماذا نقدم")}
        title={tr(
          l,
          "Software, AI, data & IT services",
          "خدمات البرمجيات والذكاء الاصطناعي والبيانات",
        )}
        description={tr(
          l,
          "The right technology starts with the right understanding. We connect engineering and business thinking to build systems that work in practice.",
          "التقنية المناسبة تبدأ بفهم صحيح. نجمع التفكير التقني وفهم الأعمال لبناء أنظمة تؤدي دورها في الواقع.",
        )}
      />
      <div className="container service-details">
        {services.map((s, i) => (
          <section id={s.slug} className="service-detail" key={s.slug}>
            <div className="service-detail-heading">
              <div className="icon-box">
                <Icon name={s.icon} />
              </div>
              <div className="eyebrow">
                0{i + 1} — {tr(l, "OUR EXPERTISE", "مجالات خبرتنا")}
              </div>
              <h2>
                <Link href={`/${l}${servicePath(s.slug)}`}>{t(l, s.name)}</Link>
              </h2>
            </div>
            <div className="service-detail-main">
              <p>{t(l, s.description)}</p>
              <p>{t(l, s.useCase)}</p>
              <h3>{t(l, s.outcome)}</h3>
              <Button secondary href={`/${l}/contact?service=${s.slug}`}>
                {tr(l, "Discuss Your Project", "لنتحدث عن مشروعك")}
              </Button>
            </div>
            <div className="capabilities">
              <h3>{tr(l, "CAPABILITIES", "ما نقدّمه")}</h3>
              <ul>
                {s.capabilities.map((c) => (
                  <li key={c[0]}>{t(l, c)}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
      <section className="section cta-section">
        <div className="container cta-inner">
          <div className="eyebrow">
            <i />
            {tr(l, "LET’S FIND THE RIGHT APPROACH", "لنجد الحل المناسب")}
          </div>
          <h2>
            {tr(
              l,
              "Tell us what you’re trying to solve.",
              "أخبرنا بالتحدي الذي تريد حلّه.",
            )}
          </h2>
          <p>
            {tr(
              l,
              "A conversation is a good place to start.",
              "الحوار هو البداية المناسبة.",
            )}
          </p>
          <Button href={`/${l}/contact`}>
            {tr(l, "Start a Project", "ابدأ مشروعك")}
          </Button>
        </div>
      </section>
    </>
  );
}
