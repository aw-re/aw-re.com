import { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/site-urls";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: ["OAI-SearchBot", "PerplexityBot"], allow: "/", disallow: "/api/" },
    ],
    sitemap: `${siteOrigin}/sitemap.xml`,
  };
}
