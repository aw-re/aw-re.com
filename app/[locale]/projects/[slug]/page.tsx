import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { projects, services, t, tr } from "@/data/site";
import { serviceDetails } from "@/data/service-details";
import { PageSchema } from "@/components/seo";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { projectPath, servicePath } from "@/lib/site-urls";
import { PageHero, Button } from "@/components/ui";
import { ProjectVisual } from "@/components/visuals";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const l = await getLocale(params);
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return pageMetadata(
    l,
    projectPath(p.slug),
    t(l, p.name),
    t(l, p.description),
  );
}
export default async function Project({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const l = await getLocale(params);
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const relatedServices = services.filter((s) => serviceDetails[s.slug].relatedProjects.includes(p.slug));
  return (
    <>
      <PageSchema
        locale={l}
        path={projectPath(p.slug)}
        name={t(l, p.name)}
        description={t(l, p.description)}
        parents={[{ name: tr(l, "Projects", "المشاريع"), path: "/projects" }]}
      />
      <div className="project-detail-hero">
        <PageHero
          eyebrow={t(l, p.category)}
          title={t(l, p.name)}
          description={t(l, p.description)}
        />
      </div>
      <div className="container project-detail-visual">
        <ProjectVisual kind={p.kind} large />
        <p className="visual-note">
          {tr(
            l,
            "Conceptual interface illustration. Not a screenshot of a deployed customer system.",
            "رسم توضيحي للواجهة، وليس لقطة شاشة من نظام منشور لدى عميل.",
          )}
        </p>
      </div>
      <section className="container case-content">
        <div>
          <div className="eyebrow">
            <i />
            {tr(l, "PROJECT OVERVIEW", "نظرة على المشروع")}
          </div>
          <h2>{t(l, p.name)}</h2>
          <p>{t(l, p.description)}</p>
          <h3>{tr(l, "Technology stack", "التقنيات")}</h3>
          <ul className="tags" style={{ marginTop: 18 }}>
            {p.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {relatedServices.length > 0 && (
            <>
              <h3>{tr(l, "Related services", "خدمات ذات صلة")}</h3>
              <ul className="service-guide-links">
                {relatedServices.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/${l}${servicePath(s.slug)}`}>{t(l, s.name)}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <Link className="back-link" href={`/${l}/projects`}>
            <ArrowLeft size={16} className="direction-arrow" />
            {tr(l, "All Projects", "جميع المشاريع")}
          </Link>
        </div>
        <aside className="case-disclosure">
          <h3>{tr(l, "Let’s go into the details.", "لنتحدث عن التفاصيل.")}</h3>
          <p>
            {tr(
              l,
              "Project details available upon request. Get in touch to discuss the challenge, solution, architecture, and any approved results that can be shared.",
              "تفاصيل المشروع متاحة عند الطلب. تواصل معنا لمناقشة التحدي والحل والبنية التقنية والنتائج المعتمدة التي يمكن مشاركتها.",
            )}
          </p>
          <Button href={`/${l}/contact`}>
            {tr(l, "Ask About This Project", "استفسر عن هذا المشروع")}
          </Button>
        </aside>
      </section>
    </>
  );
}
