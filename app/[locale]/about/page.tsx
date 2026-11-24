import Image from "next/image";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { copy, t, tr } from "@/data/site";
import { PageHero, Socials } from "@/components/ui";
import { BrandVisual } from "@/components/visuals";
import { WhySection, ProcessSection, ContactCTA } from "@/components/sections";
import { PageSchema } from "@/components/seo";

const aboutDescription = [
  "Meet AW-RE Tech, a technology company in Sana’a, Yemen, and learn how we plan and develop software, automation and data systems.",
  "تعرّف على أوري تك، شركة تقنية في صنعاء، اليمن، وعلى طريقتنا في تخطيط مشاريع البرمجيات والأتمتة وأنظمة البيانات وتطويرها.",
] as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return pageMetadata(
    l,
    "/about",
    tr(l, "About Our Technology Company in Yemen", "عن شركتنا التقنية في اليمن"),
    t(l, aboutDescription),
  );
}
export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return (
    <>
      <PageSchema
        locale={l}
        path="/about"
        name={tr(l, "About AW-RE Tech", "عن أوري تك")}
        description={t(l, aboutDescription)}
        type="AboutPage"
      />
      <PageHero
        eyebrow={tr(l, "ABOUT AW-RE TECH", "عن أوري تك")}
        title={tr(l, "About AW-RE Tech", "عن أوري تك")}
        description={tr(
          l,
          "A technology company in Sana’a, Yemen, building software and digital systems for businesses.",
          "شركة تقنية في صنعاء، اليمن، تطوّر البرمجيات والأنظمة الرقمية للشركات والمؤسسات.",
        )}
      />
      <section className="container about-story">
        <div>
          <h2>{tr(l, "Who we are.", "من نحن.")}</h2>
          <p>{t(l, copy.aboutText)}</p>
          <p>{t(l, copy.aboutMore)}</p>
          <p>
            {tr(
              l,
              "As a growing technology company, we take a focused approach: understand the problem, choose the right tools, and build a solution that can be maintained and improved.",
              "بصفتنا شركة تقنية نامية، نتبع نهجًا واضحًا: نفهم المشكلة ونختار الأدوات المناسبة ونبني حلًا يمكن صيانته وتطويره.",
            )}
          </p>
        </div>
        <BrandVisual />
      </section>
      <WhySection locale={l} />
      <ProcessSection locale={l} />
      <section className="container founder-section">
        <div className="founder-grid">
          <Image
            src="/images/abdulwahab-al-reyashi.jpg"
            width={852}
            height={1280}
            sizes="(max-width: 640px) 128px, (max-width: 900px) 160px, 180px"
            alt={tr(
              l,
              "Eng. Abdulwahab Al-Reyashi",
              "المهندس عبدالوهاب الرياشي",
            )}
            className="founder-image"
          />
          <div>
            <div className="eyebrow">
              <i />
              {tr(l, "BEHIND AW-RE TECH", "وراء أوري تك")}
            </div>
            <h2>
              {tr(l, "Eng. Abdulwahab Al-Reyashi", "المهندس عبدالوهاب الرياشي")}
            </h2>
            <p className="founder-role">
              {tr(
                l,
                "Software & Digital Solutions Developer",
                "مطوّر برمجيات وحلول رقمية",
              )}
            </p>
            <p className="founder-bio">
              {tr(
                l,
                "Information Technology professional focused on software development, artificial intelligence, automation, and digital systems.",
                "متخصص في تقنية المعلومات، يركز على تطوير البرمجيات والذكاء الاصطناعي والأتمتة والأنظمة الرقمية.",
              )}
            </p>
            <Socials locale={l} />
          </div>
        </div>
      </section>
      <ContactCTA locale={l} />
    </>
  );
}
