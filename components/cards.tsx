import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Locale, services, projects, t, copy, tr } from "@/data/site";
import { Icon } from "./ui";
import { ProjectVisual } from "./visuals";
export function ServiceCard({
  service,
  index,
  locale,
}: {
  service: (typeof services)[number];
  index: number;
  locale: Locale;
}) {
  return (
    <Link className="service-card" href={`/${locale}/services#${service.slug}`}>
      <div className="icon-box">
        <Icon name={service.icon} />
      </div>
      <h3>{t(locale, service.name)}</h3>
      <p>{t(locale, service.description)}</p>
      <span className="text-link">
        {t(locale, copy.learn)}
        <ArrowRight size={16} className="direction-arrow" />
      </span>
      <span className="card-number" aria-hidden="true">
        0{index + 1}
      </span>
    </Link>
  );
}
export function ProjectCard({
  project,
  locale,
}: {
  project: (typeof projects)[number];
  locale: Locale;
}) {
  return (
    <Link className="project-card" href={`/${locale}/projects/${project.slug}`}>
      <ProjectVisual kind={project.kind} />
      <div className="project-card-body">
        <span className="project-category">{t(locale, project.category)}</span>
        <div className="project-title">
          <h3>{t(locale, project.name)}</h3>
          <span className="arrow-circle">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <p>{t(locale, project.description)}</p>
        <ul
          className="tags"
          aria-label={tr(locale, "Technologies", "التقنيات")}
        >
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
