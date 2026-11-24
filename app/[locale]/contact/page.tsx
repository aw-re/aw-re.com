import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { copy, t, tr, services } from "@/data/site";
import { PageSchema } from "@/components/seo";
import { PageHero, ContactDetails } from "@/components/ui";
import ContactForm from "@/components/contact-form";

const contactDescription = [
  "Contact AW-RE Tech in Sana’a, Yemen, by email or WhatsApp to discuss software development, AI automation, dashboards or IT consulting.",
  "تواصل مع أوري تك في صنعاء، اليمن، عبر البريد أو واتساب لمناقشة تطوير البرمجيات أو الأتمتة أو لوحات البيانات أو الاستشارات التقنية.",
] as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return pageMetadata(
    l,
    "/contact",
    tr(l, "Contact Us for a Project", "تواصل معنا لبدء مشروع"),
    t(l, contactDescription),
  );
}
export default async function Contact({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const l = await getLocale(params);
  const { service } = await searchParams;
  const selected = services.some((s) => s.slug === service) ? service : "";
  return (
    <>
      <PageSchema
        locale={l}
        path="/contact"
        name={tr(l, "Contact AW-RE Tech", "تواصل مع أوري تك")}
        description={t(l, contactDescription)}
        type="ContactPage"
      />
      <PageHero
        eyebrow={tr(l, "LET’S TALK", "لنتحدث")}
        title={tr(l, "Contact AW-RE Tech", "تواصل مع أوري تك")}
        description={t(l, copy.ctaText)}
      />
      <section className="container contact-page">
        <div className="contact-intro">
          <p>
            {tr(
              l,
              "Whether you have a defined brief or an idea you’re still exploring, we’d like to hear about it. Tell us where you want to go.",
              "سواء كانت لديك متطلبات واضحة أو فكرة ما زلت تستكشفها، يسعدنا أن نسمع منك. أخبرنا بما تطمح إلى تحقيقه.",
            )}
          </p>
          <ContactDetails locale={l} />
          <p className="contact-aside-note">
            {tr(
              l,
              "Prefer a direct conversation? Reach us by email or WhatsApp. We’ll discuss your needs and the best next step.",
              "تفضّل التواصل المباشر؟ راسلنا عبر البريد أو واتساب لنناقش احتياجاتك والخطوة المناسبة التالية.",
            )}
          </p>
        </div>
        <ContactForm locale={l} initialService={selected} />
      </section>
    </>
  );
}
