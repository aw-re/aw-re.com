import { serviceDetails } from "@/data/service-details";
import { companyOwner, ownerProfilePath } from "@/data/company-owner";
import { projects, services, t, tr, type Locale } from "@/data/site";
import { defaultDescription } from "@/lib/metadata";
import { projectPath, publicUrl, servicePath } from "@/lib/site-urls";

export const dynamic = "force-static";

function linksFor(locale: Locale) {
  return [
    `## ${tr(locale, "English resources", "مصادر باللغة العربية")}`,
    "",
    `- [${tr(locale, "About AW-RE Tech", "عن أوري تك")}](${publicUrl(locale, "/about")})`,
    `- [${t(locale, companyOwner.name)}](${publicUrl(locale, ownerProfilePath)}): ${t(locale, companyOwner.ownershipTitle)}. ${t(locale, companyOwner.bio)}`,
    ...services.map(({ slug }) => {
      const detail = serviceDetails[slug];
      return `- [${t(locale, detail.title)}](${publicUrl(locale, servicePath(slug))}): ${t(locale, detail.description)}`;
    }),
    ...projects.map((project) =>
      `- [${t(locale, project.name)}](${publicUrl(locale, projectPath(project.slug))}): ${t(locale, project.description)}`,
    ),
    `- [${tr(locale, "Contact", "التواصل")}](${publicUrl(locale, "/contact")})`,
  ].join("\n");
}

export function GET() {
  const content = [
    "# AW-RE Tech (أوري تك)",
    "",
    `> ${defaultDescription("en")}`,
    "",
    defaultDescription("ar"),
    "",
    linksFor("en"),
    "",
    linksFor("ar"),
    "",
  ].join("\n");
  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
