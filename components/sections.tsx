import { ArrowRight } from "lucide-react";
import { Locale, t, tr, copy, pillars, process } from "@/data/site";
import { SectionHeader, Icon, Button } from "./ui";
export function WhySection({ locale }: { locale: Locale }) {
  return (
    <section className="section why-section">
      <div className="container">
        <SectionHeader
          number="03"
          label={tr(locale, "WHY AW-RE", "لماذا أوري تك")}
          title={t(locale, copy.whyTitle)}
          description={t(locale, copy.whyIntro)}
        />
        <div className="pillars">
          {pillars.map((p) => (
            <div className="pillar" key={p.icon}>
              <div className="icon-box">
                <Icon name={p.icon} />
              </div>
              <div>
                <h3>{t(locale, p.name)}</h3>
                <p>{t(locale, p.text)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function ProcessSection({ locale }: { locale: Locale }) {
  return (
    <section className="section process-section">
      <div className="container">
        <SectionHeader
          number="04"
          label={tr(locale, "OUR PROCESS", "منهجية العمل")}
          title={t(locale, copy.processTitle)}
        />
        <ol className="process-list">
          {process.map(([name, desc], i) => (
            <li key={i}>
              <span className="step-number">0{i + 1}</span>
              <div>
                <h3>{t(locale, name)}</h3>
                <p>{t(locale, desc)}</p>
              </div>
              {i < 4 && (
                <ArrowRight size={17} className="step-arrow direction-arrow" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
export function ContactCTA({ locale }: { locale: Locale }) {
  return (
    <section className="section cta-section">
      <div className="container cta-inner">
        <div className="eyebrow">
          <i />
          {tr(locale, "YOUR NEXT CHAPTER", "خطوتك القادمة")}
        </div>
        <h2>{t(locale, copy.ctaTitle)}</h2>
        <p>{t(locale, copy.ctaText)}</p>
        <Button href={`/${locale}/contact`}>{t(locale, copy.start)}</Button>
        <div className="cta-brand" aria-hidden="true">
          AW<span>—</span>RE
        </div>
      </div>
    </section>
  );
}
