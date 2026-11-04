import type { MetadataRoute } from "next";
import { resolvePageSeo } from "@/lib/seo";
import { getSeoEntries, getSeoSettings } from "@/lib/server/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seo = await getSeoSettings();
  if (!seo.indexable) return [];

  const entries = await getSeoEntries();

  return entries.flatMap((entry) => {
    if (!entry.published) return [];
    const resolved = resolvePageSeo(seo, entry.settings, entry.defaults, entry.path);
    const url = new URL(entry.path, seo.siteUrl).href;
    if (
      !resolved.indexable ||
      !resolved.includeInSitemap ||
      resolved.canonical !== url
    ) {
      return [];
    }

    const changeFrequency = entry.path === "/" ? "weekly" : entry.group === "Blog" ? "yearly" : "monthly";
    const priority = entry.path === "/" ? 1 : entry.group === "Blog" ? 0.5 : entry.group === "Segmentos" ? 0.6 : 0.7;

    return [{
      url,
      ...(entry.updatedAt && { lastModified: new Date(entry.updatedAt * 1000) }),
      changeFrequency,
      priority,
    }];
  });
}
