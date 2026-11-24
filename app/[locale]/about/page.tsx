import Image from "next/image";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { copy, t, tr } from "@/data/site";
import { companyOwner } from "@/data/company-owner";
import { PageHero, Socials } from "@/components/ui";
import { BrandVisual } from "@/components/visuals";
import { WhySection, ProcessSection, ContactCTA } from "@/components/sections";
import { PageSchema } from "@/components/seo";

const aboutDescription = [
  `Meet ${companyOwner.name[0]}, owner of AW-RE Tech and a software developer focused on digital systems, AI and automation. AW-RE Tech is based in Sana’a, Yemen.`,
  `تعرّف على ${companyOwner.name[1]}، صاحب شركة أوري تك في صنعاء، اليمن، ومطوّر برمجيات وحلول رقمية يركز على الذكاء الاصطناعي والأتمتة.`,
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
    tr(l, `${companyOwner.name[0]}, Company Owner`, `${companyOwner.name[1]}، صاحب الشركة`),
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
      <section
        className="container founder-section"
        id={companyOwner.fragment}
        aria-labelledby="company-owner-name"
      >
        <div className="founder-grid">
          <Image
            src={companyOwner.portrait}
            width={852}
            height={1280}
            sizes="(max-width: 640px) 128px, (max-width: 900px) 160px, 180px"
            alt={t(l, companyOwner.name)}
            className="founder-image"
          />
          <div>
            <h2 id="company-owner-name">{t(l, companyOwner.name)}</h2>
            <p className="founder-role">
              {t(l, companyOwner.ownershipTitle)}
              {tr(l, " · ", "، ")}
              {t(l, companyOwner.occupation)}
            </p>
            <p className="founder-bio">{t(l, companyOwner.bio)}</p>
            <Socials locale={l} />
          </div>
        </div>
      </section>
      <WhySection locale={l} />
      <ProcessSection locale={l} />
      <ContactCTA locale={l} />
    </>
  );
}
