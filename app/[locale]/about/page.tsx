import Image from "next/image";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { copy, t, tr } from "@/data/site";
import { PageHero, Socials } from "@/components/ui";
import { BrandVisual } from "@/components/visuals";
import { WhySection, ProcessSection, ContactCTA } from "@/components/sections";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return pageMetadata(
    l,
    "/about",
    tr(l, "About", "من نحن"),
    t(l, copy.aboutText),
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
      <PageHero
        eyebrow={tr(l, "ABOUT AW-RE TECH", "عن أوري تك")}
        title={t(l, copy.aboutTitle)}
        description={tr(
          l,
          "Practical thinking. Thoughtful engineering. Digital systems that make a difference.",
          "تفكير عملي، وهندسة مدروسة، وأنظمة رقمية تصنع فرقًا.",
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
            src="/images/founder.jpeg"
            width={560}
            height={620}
            sizes="(max-width: 640px) 89vw, 280px"
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
              {tr(l, "THE FOUNDER", "المؤسس")}
            </div>
            <h2>
              {tr(l, "Eng. Abdulwahab Al-Reyashi", "المهندس عبدالوهاب الرياشي")}
            </h2>
            <p className="founder-role">
              {tr(l, "Founder & Managing Director", "المؤسس والمدير العام")}
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
