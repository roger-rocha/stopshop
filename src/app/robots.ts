import type { MetadataRoute } from "next";
import { getSeoSettings } from "@/lib/server/seo";

export const revalidate = 3600;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await getSeoSettings();

  return {
    // Public pages stay crawlable so search engines can read their noindex tags.
    // The maintenance proxy separately blocks crawling while the site is closed.
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    ...(seo.indexable && { sitemap: new URL("/sitemap.xml", seo.siteUrl).href }),
    host: seo.siteUrl,
  };
}
