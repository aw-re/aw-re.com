import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { projects, t, tr } from "@/data/site";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
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
    `/projects/${slug}`,
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
  return (
    <>
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
