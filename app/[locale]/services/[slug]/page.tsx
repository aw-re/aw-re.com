import Link from "next/link";
import { notFound } from "next/navigation";
import { PageSchema } from "@/components/seo";
import { Button, PageHero } from "@/components/ui";
import { serviceDetails } from "@/data/service-details";
import { projects, services, t, tr } from "@/data/site";
import { getLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/metadata";
import { projectPath, servicePath } from "@/lib/site-urls";

type ServicePageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

async function getServicePage({ params }: ServicePageProps) {
  const locale = await getLocale(params);
  const { slug } = await params;
  const service = services.find((entry) => entry.slug === slug);
  if (!service) notFound();
  const detail = serviceDetails[service.slug];
  return {
    locale,
    service,
    detail,
    path: servicePath(service.slug),
    title: t(locale, detail.title),
    description: t(locale, detail.description),
  };
}

export async function generateMetadata(props: ServicePageProps) {
  const { locale, path, title, description } = await getServicePage(props);
  return pageMetadata(locale, path, title, description);
}

export default async function ServicePage(props: ServicePageProps) {
  const { locale, service, detail, path, title, description } = await getServicePage(props);
  const servicesName = tr(locale, "Services", "خدماتنا");
  const examples = projects.filter((project) => detail.relatedProjects.includes(project.slug));
  return (
    <>
      <PageSchema
        locale={locale}
        path={path}
        name={title}
        description={description}
        parents={[{ name: servicesName, path: "/services" }]}
        service
      />
      <PageHero eyebrow={servicesName} title={title} description={description} />
      <div className="container service-guide">
        <div>
          <section className="service-guide-section" aria-labelledby="service-scope">
            <h2 id="service-scope">{tr(locale, "What we can help you build", "كيف نساعدك؟")}</h2>
            <p>{t(locale, service.useCase)}</p>
            <ul className="service-guide-list">
              {service.capabilities.map((capability) => (
                <li key={capability[0]}>{t(locale, capability)}</li>
              ))}
            </ul>
          </section>
          <section className="service-guide-section" aria-labelledby="service-questions">
            <h2 id="service-questions">{tr(locale, "Common questions", "أسئلة شائعة")}</h2>
            {detail.questions.map(({ question, answer }) => (
              <div key={question[0]}>
                <h3>{t(locale, question)}</h3>
                <p>{t(locale, answer)}</p>
              </div>
            ))}
          </section>
        </div>
        <aside className="service-guide-aside case-disclosure">
          <h2>{tr(locale, "Discuss your project", "لنتحدث عن مشروعك")}</h2>
          <p>{tr(locale, "Tell us what your team needs and which tools you use today.", "أخبرنا بما يحتاجه فريقك والأدوات التي تستخدمونها حاليًا.")}</p>
          <Button href={`/${locale}/contact?service=${service.slug}`}>
            {tr(locale, "Start a project", "ابدأ مشروعك")}
          </Button>
          {examples.length > 0 && (
            <>
              <h3>{tr(locale, "Related work", "أعمال ذات صلة")}</h3>
              <ul className="service-guide-links">
                {examples.map((project) => (
                  <li key={project.slug}>
                    <Link href={`/${locale}${projectPath(project.slug)}`}>{t(locale, project.name)}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <Link className="service-guide-back" href={`/${locale}/services`}>{tr(locale, "Explore all services", "تصفّح جميع الخدمات")}</Link>
        </aside>
      </div>
    </>
  );
}
