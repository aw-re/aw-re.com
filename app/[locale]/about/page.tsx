import Image from "next/image";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { copy, t, tr } from "@/data/site";
import { developerProfile } from "@/data/developer-profile";
import { PageHero, Socials } from "@/components/ui";
import { BrandVisual } from "@/components/visuals";
import { WhySection, ProcessSection, ContactCTA } from "@/components/sections";
import { PageSchema } from "@/components/seo";

const aboutDescription = [
  `Meet ${developerProfile.name[0]}, a software and digital solutions developer at AW-RE Tech focused on AI, automation and digital systems.`,
  `تعرّف على ${developerProfile.name[1]}، مطوّر برمجيات وحلول رقمية في أوري تك، يركز على الذكاء الاصطناعي والأتمتة والأنظمة الرقمية.`,
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
    tr(l, `${developerProfile.name[0]}, Software Developer`, `${developerProfile.name[1]}، مطوّر برمجيات`),
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
        className="container about-profile-section"
        id={developerProfile.fragment}
        aria-labelledby="about-profile-name"
      >
        <div className="about-profile-grid">
          <Image
            src={developerProfile.portrait}
            width={852}
            height={1280}
            sizes="(max-width: 640px) 128px, (max-width: 900px) 160px, 180px"
            alt={t(l, developerProfile.name)}
            className="about-profile-image"
          />
          <div>
            <h2 id="about-profile-name">{t(l, developerProfile.name)}</h2>
            <p className="about-profile-role">{t(l, developerProfile.role)}</p>
            <p className="about-profile-bio">{t(l, developerProfile.bio)}</p>
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
