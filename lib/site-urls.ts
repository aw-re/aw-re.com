import { projects, services, type Locale } from "@/data/site";

export const siteOrigin = "https://aw-re.com";
export const locales = ["en", "ar"] as const satisfies readonly Locale[];
export const servicePath = (slug: (typeof services)[number]["slug"]) =>
  `/services/${slug}`;
export const projectPath = (slug: (typeof projects)[number]["slug"]) =>
  `/projects/${slug}`;

export function publicUrl(locale: Locale, path = "") {
  return `${siteOrigin}/${locale}${path}`;
}

export function languageAlternates(path: string) {
  const en = publicUrl("en", path);
  return { en, ar: publicUrl("ar", path), "x-default": en };
}

export const indexablePaths = [
  "",
  "/services",
  "/projects",
  "/about",
  "/contact",
  ...services.map(({ slug }) => servicePath(slug)),
  ...projects.map(({ slug }) => projectPath(slug)),
];
