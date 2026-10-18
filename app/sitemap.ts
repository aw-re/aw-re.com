import { MetadataRoute } from "next";
import { projects } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/services",
    "/projects",
    "/about",
    "/contact",
    ...projects.map((p) => `/projects/${p.slug}`),
  ];
  return paths.flatMap((path) =>
    ["en", "ar"].map((locale) => ({
      url: `https://aw-re.com/${locale}${path}`,
      alternates: {
        languages: {
          en: `https://aw-re.com/en${path}`,
          ar: `https://aw-re.com/ar${path}`,
        },
      },
    })),
  );
}
