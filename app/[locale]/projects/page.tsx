import { Info } from "lucide-react";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { projects, copy, t, tr } from "@/data/site";
import { PageHero } from "@/components/ui";
import { ProjectCard } from "@/components/cards";
import { ContactCTA } from "@/components/sections";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const l = await getLocale(params);
  return pageMetadata(
    l,
    "/projects",
    tr(l, "Projects", "المشاريع"),
    t(l, copy.projectsIntro),
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
      <PageHero
        eyebrow={tr(l, "SELECTED WORK", "أعمال مختارة")}
        title={tr(
          l,
          "Work that solves real problems.",
          "أعمال تعالج تحديات حقيقية.",
        )}
        description={t(l, copy.projectsIntro)}
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
