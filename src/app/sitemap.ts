import type { MetadataRoute } from "next";
import { getAllSegments, getAllPosts } from "@/lib/server/queries";

const BASE_URL = "https://stopshop.com.br";

const STATIC_ROUTES = [
  "/",
  "/lojas",
  "/localizacao",
  "/stop-cred",
  "/cadastro",
  "/atacado",
  "/contato",
  "/blog",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [segments, posts] = await Promise.all([
    getAllSegments(),
    getAllPosts({ onlyPublished: true }),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const segmentRoutes: MetadataRoute.Sitemap = segments.map((segment) => ({
    url: `${BASE_URL}/segmentos/${segment.slug}`,
    lastModified: new Date(segment.updatedAt * 1000),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt * 1000),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...segmentRoutes, ...postRoutes];
}
