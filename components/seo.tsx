import { companyContact } from "@/data/contact";
import { companyOwner, ownerProfilePath } from "@/data/company-owner";
import { t, tr, type Locale } from "@/data/site";
import { arabicBrandName, brandName, defaultDescription } from "@/lib/metadata";
import { locales, publicUrl, siteOrigin } from "@/lib/site-urls";

const websiteId = `${siteOrigin}/#website`;
const organizationId = `${siteOrigin}/#organization`;
type SchemaNode = Record<string, unknown>;
type PageLink = { name: string; path: string };

function JsonLd({ nodes }: { nodes: SchemaNode[] }) {
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  }).replace(/</g, "\\u003c");
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}

export function SiteSchema({ locale }: { locale: Locale }) {
  return (
    <JsonLd
      nodes={[
        {
          "@type": "Organization",
          "@id": organizationId,
          name: brandName,
          alternateName: arabicBrandName,
          url: `${siteOrigin}/`,
          description: defaultDescription(locale),
          logo: `${siteOrigin}/icons/aw-re-512.png`,
          email: companyContact.email,
          telephone: companyContact.phone,
          address: {
            "@type": "PostalAddress",
            addressLocality: tr(locale, "Sana’a", "صنعاء"),
            addressCountry: "YE",
          },
          sameAs: ["https://github.com/aw-re"],
        },
        {
          "@type": "WebSite",
          "@id": websiteId,
          url: `${siteOrigin}/`,
          name: brandName,
          alternateName: arabicBrandName,
          inLanguage: locales,
          publisher: { "@id": organizationId },
        },
      ]}
    />
  );
}

export function PageSchema({
  locale,
  path,
  name,
  description,
  type = "WebPage",
  parents = [],
  entries,
  service,
}: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  parents?: PageLink[];
  entries?: PageLink[];
  service?: boolean;
}) {
  const url = publicUrl(locale, path);
  const page: SchemaNode = {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
    publisher: { "@id": organizationId },
  };
  const nodes = [page];

  if (path) {
    const id = `${url}#breadcrumb`;
    page.breadcrumb = { "@id": id };
    const trail = [{ name: tr(locale, "Home", "الرئيسية"), path: "" }, ...parents, { name, path }];
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": id,
      itemListElement: trail.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: publicUrl(locale, crumb.path),
      })),
    });
  }

  if (entries) {
    page.mainEntity = {
      "@type": "ItemList",
      itemListElement: entries.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: entry.name,
        url: publicUrl(locale, entry.path),
      })),
    };
  } else if (service) {
    const id = `${url}#service`;
    page.mainEntity = { "@id": id };
    nodes.push({
      "@type": "Service",
      "@id": id,
      url,
      name,
      serviceType: name,
      description,
      provider: { "@id": organizationId },
    });
  } else if (type === "AboutPage" || type === "ContactPage") {
    page.mainEntity = { "@id": organizationId };
  }

  if (type === "AboutPage") {
    const id = publicUrl("en", ownerProfilePath);
    page.mentions = { "@id": id };
    nodes.push({
      "@type": "Person",
      "@id": id,
      url: publicUrl(locale, ownerProfilePath),
      name: t(locale, companyOwner.name),
      alternateName: t(locale === "ar" ? "en" : "ar", companyOwner.name),
      jobTitle: [t(locale, companyOwner.ownershipTitle), t(locale, companyOwner.occupation)],
      description: t(locale, companyOwner.bio),
      image: `${siteOrigin}${companyOwner.portrait}`,
      affiliation: { "@id": organizationId },
    });
  }

  return <JsonLd nodes={nodes} />;
}
