import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { services, t, tr } from "@/data/site";
import { PageHero, Icon, Button } from "@/components/ui";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return pageMetadata(
    l,
    "/services",
    tr(l, "Services", "خدماتنا"),
    tr(
      l,
      "Software, AI automation, data systems and IT solutions built around your business.",
      "تطوير برمجيات وأتمتة وذكاء اصطناعي وأنظمة بيانات وحلول تقنية تلائم أعمالك.",
    ),
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
      <PageHero
        eyebrow={tr(l, "WHAT WE DO", "ماذا نقدم")}
        title={tr(
          l,
          "Digital solutions built around real business needs.",
          "حلول رقمية تنطلق من احتياجات أعمالك.",
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
              <h2>{t(l, s.name)}</h2>
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
