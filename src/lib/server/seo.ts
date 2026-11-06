import "server-only";

import { cache } from "react";
import { eq, like } from "drizzle-orm";
import type { Metadata } from "next";
import { db, schema } from "@/db";
import {
  buildSeoMetadata,
  DEFAULT_PAGE_SEO,
  DEFAULT_SEO_SETTINGS,
  pageSeoSchema,
  SEO_PAGE_PREFIX,
  SEO_SETTINGS_KEY,
  seoSettingsSchema,
  STATIC_SEO_PAGES,
  type PageSeo,
  type SeoDefaults,
  type SeoEntry,
} from "@/lib/seo";
import { getLegalPage } from "./queries";
import { getReportingChannelRecord } from "./reporting-channel";

function parseObject(value?: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(value ?? "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function parsePageSeo(value?: string): PageSeo {
  const result = pageSeoSchema.safeParse({ ...DEFAULT_PAGE_SEO, ...parseObject(value) });
  return result.success ? result.data : { ...DEFAULT_PAGE_SEO };
}

export const getSeoSettings = cache(async () => {
  const [row] = await db.select().from(schema.settings).where(eq(schema.settings.key, SEO_SETTINGS_KEY)).limit(1);
  const result = seoSettingsSchema.safeParse({ ...DEFAULT_SEO_SETTINGS, ...parseObject(row?.value) });
  return result.success ? result.data : { ...DEFAULT_SEO_SETTINGS };
});

export const getPageSeo = cache(async (key: string) => {
  const [row] = await db.select().from(schema.settings).where(eq(schema.settings.key, `${SEO_PAGE_PREFIX}${key}`)).limit(1);
  return parsePageSeo(row?.value);
});

export async function getSeoMetadata(key: string, path: string, defaults?: SeoDefaults, extra: Metadata = {}): Promise<Metadata> {
  const [settings, page] = await Promise.all([getSeoSettings(), getPageSeo(key)]);
  const fallback = defaults ?? STATIC_SEO_PAGES.find((entry) => entry.path === path) ?? { title: "", description: "" };
  return buildSeoMetadata(settings, page, fallback, path, extra);
}

/** Stable entity IDs keep SEO overrides attached when a post or segment changes slug. */
export const getSeoEntries = cache(async (): Promise<SeoEntry[]> => {
  const [rows, posts, segments, privacy, cookies, reporting] = await Promise.all([
    db.select().from(schema.settings).where(like(schema.settings.key, "seo:%")),
    db.select({ id: schema.posts.id, title: schema.posts.title, slug: schema.posts.slug, excerpt: schema.posts.excerpt, image: schema.posts.image, published: schema.posts.published, updatedAt: schema.posts.updatedAt }).from(schema.posts).orderBy(schema.posts.title),
    db.select({ id: schema.segments.id, name: schema.segments.name, slug: schema.segments.slug, image: schema.segments.image, updatedAt: schema.segments.updatedAt }).from(schema.segments).orderBy(schema.segments.name),
    getLegalPage("politica-de-privacidade"),
    getLegalPage("politica-de-cookies"),
    getReportingChannelRecord(),
  ]);
  const saved = new Map(rows.map((row) => [row.key, row]));
  const globalUpdatedAt = saved.get(SEO_SETTINGS_KEY)?.updatedAt ?? 0;

  function entry(data: Omit<SeoEntry, "settings">): SeoEntry {
    const row = saved.get(`${SEO_PAGE_PREFIX}${data.key}`);
    return {
      ...data,
      settings: parsePageSeo(row?.value),
      updatedAt: Math.max(data.updatedAt ?? 0, row?.updatedAt ?? 0, globalUpdatedAt) || undefined,
    };
  }

  return [
    ...STATIC_SEO_PAGES.map((page) => {
      const legal = page.path === "/politica-de-privacidade" ? privacy : page.path === "/politica-de-cookies" ? cookies : null;
      return entry({
        key: page.path, path: page.path, label: page.label, group: "Páginas", published: true,
        defaults: legal ? { title: legal.title, description: legal.description }
          : page.path === "/denuncia" ? { title: reporting.config.eyebrow, description: reporting.config.metaDescription }
          : { title: page.title, description: page.description },
        updatedAt: legal ? Date.parse(legal.updatedAt) / 1000 : page.path === "/denuncia" ? reporting.updatedAt : undefined,
      });
    }),
    ...posts.map((post) => entry({
      key: `post:${post.id}`, path: `/blog/${post.slug}`, label: post.title, group: "Blog", published: post.published,
      defaults: { title: post.title, description: post.excerpt, image: post.image }, updatedAt: post.updatedAt,
    })),
    ...segments.map((segment) => entry({
      key: `segment:${segment.id}`, path: `/segmentos/${segment.slug}`, label: segment.name, group: "Segmentos", published: true,
      defaults: { title: segment.name, description: `Explore as lojas do segmento ${segment.name} no Stop Shop.`, image: segment.image ?? undefined }, updatedAt: segment.updatedAt,
    })),
  ];
});
