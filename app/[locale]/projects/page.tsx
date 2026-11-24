import { Info } from "lucide-react";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { projects, t, tr } from "@/data/site";
import { PageHero } from "@/components/ui";
import { ProjectCard } from "@/components/cards";
import { ContactCTA } from "@/components/sections";
import { PageSchema } from "@/components/seo";
import { projectPath } from "@/lib/site-urls";

const projectsDescription = [
  "Explore AW-RE Tech projects in business reporting, field sales management and pharmaceutical market intelligence.",
  "تصفّح مشاريع أوري تك في تقارير الأعمال، وإدارة فرق المبيعات الميدانية، وأنظمة معلومات السوق الدوائي.",
] as const;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return pageMetadata(
    l,
    "/projects",
    tr(l, "Business Software & Data Projects", "مشاريع برمجيات الأعمال وأنظمة البيانات"),
    t(l, projectsDescription),
  );
}
export default async function Projects({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return (
    <>
      <PageSchema
        locale={l}
        path="/projects"
        name={tr(l, "Projects", "المشاريع")}
        description={t(l, projectsDescription)}
        type="CollectionPage"
        entries={projects.map((p) => ({ name: t(l, p.name), path: projectPath(p.slug) }))}
      />
      <PageHero
        eyebrow={tr(l, "SELECTED WORK", "أعمال مختارة")}
        title={tr(
          l,
          "Business software and data projects",
          "مشاريع برمجيات الأعمال وأنظمة البيانات",
        )}
        description={t(l, projectsDescription)}
      />
      <section className="container projects-page-grid">
        <div className="projects-grid">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} locale={l} />
          ))}
        </div>
        <p className="projects-note">
          <Info size={14} />
          {tr(
            l,
            "Interface illustrations show the project categories. Detailed case studies are available upon request.",
            "رسومات الواجهات توضيحية لمجالات المشاريع. تفاصيل دراسات الحالة متاحة عند الطلب.",
          )}
        </p>
      </section>
      <ContactCTA locale={l} />
    </>
  );
}
