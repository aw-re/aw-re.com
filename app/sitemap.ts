import { MetadataRoute } from "next";
import { indexablePaths, languageAlternates, locales, publicUrl } from "@/lib/site-urls";
export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePaths.flatMap((path) =>
    locales.map((locale) => ({
      url: publicUrl(locale, path),
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
