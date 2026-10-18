import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Locale, services, projects, t, tr, copy } from "@/data/site";
import { companyContact } from "@/data/contact";
import { homeCopy, homeServiceSummaries } from "@/data/home";
import { Button } from "./ui";
import { BrandVisual, ProjectVisual } from "./visuals";

function HomeSectionHeading({
  id,
  label,
  title,
  href,
  action,
}: {
  id: string;
  label: string;
  title: string;
  href: string;
  action: string;
}) {
  return (
    <div className="home-section-heading">
      <div>
        <p className="home-kicker">{label}</p>
        <h2 id={id}>{title}</h2>
      </div>
      <Link href={href} className="home-text-link">
        {action}
        <ArrowRight size={16} className="direction-arrow" />
      </Link>
    </div>
  );
}

export function HomeServices({ locale }: { locale: Locale }) {
  return (
    <section
      className="home-section home-services"
      aria-labelledby="home-services-title"
    >
      <div className="container">
        <HomeSectionHeading
          id="home-services-title"
          label={tr(locale, "OUR EXPERTISE", "مجالات خبرتنا")}
          title={t(locale, homeCopy.servicesTitle)}
          href={`/${locale}/services`}
          action={tr(locale, "Explore Services", "اكتشف خدماتنا")}
        />
        <div className="home-services-grid">
          {services.map((service, index) => (
            <Link
              href={`/${locale}/services#${service.slug}`}
              className="home-service"
              key={service.slug}
            >
              <span className="home-service-index" aria-hidden="true">
                0{index + 1}
              </span>
              <div className="home-service-title">
                <h3>{t(locale, service.name)}</h3>
                <ArrowUpRight size={17} />
              </div>
              <p>{t(locale, homeServiceSummaries[service.slug])}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeProjects({ locale }: { locale: Locale }) {
  return (
    <section
      className="home-section home-work"
      aria-labelledby="home-work-title"
    >
      <div className="container">
        <HomeSectionHeading
          id="home-work-title"
          label={tr(locale, "SELECTED WORK", "أعمال مختارة")}
          title={t(locale, homeCopy.workTitle)}
          href={`/${locale}/projects`}
          action={tr(locale, "All Projects", "جميع المشاريع")}
        />
        <div className="home-work-grid">
          {projects.slice(0, 2).map((project) => (
            <Link
              href={`/${locale}/projects/${project.slug}`}
              className="home-work-card"
              key={project.slug}
            >
              <ProjectVisual kind={project.kind} />
              <div className="home-work-caption">
                <div>
                  <p className="home-work-category">
                    {t(locale, project.category)}
                  </p>
                  <h3>{t(locale, project.name)}</h3>
                </div>
                <ArrowUpRight size={22} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeClosing({ locale }: { locale: Locale }) {
  return (
    <section
      className="home-section home-closing"
      aria-labelledby="home-closing-title"
    >
      <div className="container home-closing-grid">
        <div className="home-closing-copy">
          <p className="home-kicker">
            {tr(locale, "THE AW-RE APPROACH", "رؤيتنا في أوري تك")}
          </p>
          <h2 id="home-closing-title">{t(locale, homeCopy.closingTitle)}</h2>
          <p className="home-closing-description">
            {t(locale, homeCopy.closingText)}
          </p>
          <div className="home-closing-actions">
            <Button href={`/${locale}/contact`}>{t(locale, copy.start)}</Button>
            <Link href={`/${locale}/about`} className="home-text-link">
              {tr(locale, "About AW-RE", "عن أوري تك")}
              <ArrowRight size={16} className="direction-arrow" />
            </Link>
          </div>
          <a className="home-email" href={`mailto:${companyContact.email}`}>
            <span dir="ltr">{companyContact.email}</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
        <BrandVisual />
      </div>
    </section>
  );
}
