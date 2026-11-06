import assert from "node:assert/strict";
import { after, before, beforeEach, test } from "node:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { sql } from "drizzle-orm";
import { DEFAULT_PAGE_SEO, DEFAULT_SEO_SETTINGS, resolvePageSeo, SEO_PAGE_PREFIX, SEO_SETTINGS_KEY } from "../seo";
import { DEFAULT_REPORTING_CHANNEL, REPORTING_CHANNEL_KEY } from "../reporting-channel";

let directory: string;
let db: typeof import("@/db").db;
let seo: typeof import("./seo");
let sitemap: typeof import("@/app/sitemap").default;
let robots: typeof import("@/app/robots").default;

before(async () => {
  directory = await mkdtemp(path.join(tmpdir(), "stopshop-seo-test-"));
  process.env.DATABASE_URL = `file:${directory}/test.db`;
  process.env.DATABASE_AUTH_TOKEN = "";
  ({ db } = await import("@/db"));
  seo = await import("./seo");
  ({ default: sitemap } = await import("@/app/sitemap"));
  ({ default: robots } = await import("@/app/robots"));
  await db.run(sql`CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at INTEGER NOT NULL DEFAULT 0)`);
  await db.run(sql`CREATE TABLE posts (id INTEGER PRIMARY KEY, title TEXT NOT NULL, slug TEXT NOT NULL, excerpt TEXT NOT NULL, image TEXT NOT NULL, published INTEGER NOT NULL, updated_at INTEGER NOT NULL)`);
  await db.run(sql`CREATE TABLE segments (id INTEGER PRIMARY KEY, name TEXT NOT NULL, slug TEXT NOT NULL, image TEXT, updated_at INTEGER NOT NULL)`);
});

beforeEach(async () => {
  await db.run(sql`DELETE FROM settings`);
  await db.run(sql`DELETE FROM posts`);
  await db.run(sql`DELETE FROM segments`);
});

after(async () => {
  db?.$client.close();
  if (directory) await rm(directory, { recursive: true, force: true });
});

async function setting(key: string, value: unknown, updatedAt = 1_800_000_000) {
  await db.run(sql`INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (${key}, ${JSON.stringify(value)}, ${updatedAt})`);
}

test("missing and malformed saved settings fall back safely without breaking public metadata", async () => {
  assert.deepEqual(await seo.getSeoSettings(), DEFAULT_SEO_SETTINGS);
  assert.deepEqual(await seo.getPageSeo("/lojas"), DEFAULT_PAGE_SEO);
  await db.run(sql`INSERT INTO settings (key, value) VALUES (${SEO_SETTINGS_KEY}, 'invalid-json')`);
  await setting(`${SEO_PAGE_PREFIX}/lojas`, { image: "javascript:alert(1)" });
  assert.deepEqual(await seo.getSeoSettings(), DEFAULT_SEO_SETTINGS);
  assert.deepEqual(await seo.getPageSeo("/lojas"), DEFAULT_PAGE_SEO);
  const metadata = await seo.getSeoMetadata("/lojas", "/lojas");
  assert.deepEqual(metadata.title, { absolute: "Lojas | Stop Shop" });
});

test("saved values are applied to public metadata and clearing an override restores its content fallback", async () => {
  await setting(SEO_SETTINGS_KEY, { ...DEFAULT_SEO_SETTINGS, siteUrl: "https://shopping.example", titleTemplate: "%s • Shopping", defaultImage: "/default.jpg" });
  await setting(`${SEO_PAGE_PREFIX}/lojas`, { ...DEFAULT_PAGE_SEO, title: "Diretório de marcas", description: "Descrição editorial.", indexable: false });
  let metadata = await seo.getSeoMetadata("/lojas", "/lojas");
  assert.deepEqual(metadata.title, { absolute: "Diretório de marcas • Shopping" });
  assert.equal(metadata.description, "Descrição editorial.");
  assert.deepEqual(metadata.alternates, { canonical: "https://shopping.example/lojas" });
  assert.deepEqual(metadata.robots, { index: false, follow: true });
  await setting(`${SEO_PAGE_PREFIX}/lojas`, DEFAULT_PAGE_SEO);
  metadata = await seo.getSeoMetadata("/lojas", "/lojas");
  assert.deepEqual(metadata.title, { absolute: "Lojas • Shopping" });
  assert.match(metadata.description ?? "", /Explore as lojas/);
});

test("the admin catalog keeps unpublished posts and SEO overrides survive slug changes", async () => {
  await db.run(sql`INSERT INTO posts VALUES (7, 'Artigo publicado', 'antigo', 'Resumo', '/post.jpg', 1, 1700000000), (8, 'Rascunho', 'rascunho', 'Resumo privado', '/draft.jpg', 0, 1700000000)`);
  await db.run(sql`INSERT INTO segments (id, name, slug, updated_at) VALUES (4, 'Moda feminina', 'feminina', 1700000000)`);
  await setting(`${SEO_PAGE_PREFIX}post:7`, { ...DEFAULT_PAGE_SEO, title: "Título otimizado" });
  await setting(`${SEO_PAGE_PREFIX}segment:4`, { ...DEFAULT_PAGE_SEO, description: "Descrição otimizada" });
  await db.run(sql`UPDATE posts SET slug = 'novo' WHERE id = 7`);
  await db.run(sql`UPDATE segments SET slug = 'novo-segmento' WHERE id = 4`);
  const entries = await seo.getSeoEntries();
  assert.equal(entries.find((entry) => entry.key === "post:7")?.settings.title, "Título otimizado");
  assert.equal(entries.find((entry) => entry.key === "post:7")?.path, "/blog/novo");
  assert.equal(entries.find((entry) => entry.key === "segment:4")?.settings.description, "Descrição otimizada");
  assert.equal(entries.find((entry) => entry.key === "segment:4")?.path, "/segmentos/novo-segmento");
  assert.equal(entries.find((entry) => entry.key === "post:8")?.published, false);
  assert.equal(entries.some((entry) => entry.path === "/atacado" || entry.path.startsWith("/admin")), false);
});

test("sitemap excludes drafts, noindex, opted-out and duplicate canonical pages with actual modification dates", async () => {
  await db.run(sql`INSERT INTO posts VALUES (1, 'Publicado', 'publicado', 'Resumo', '/post.jpg', 1, 1700000000), (2, 'Rascunho', 'rascunho', 'Resumo', '/post.jpg', 0, 1700000000)`);
  await setting(`${SEO_PAGE_PREFIX}/lojas`, { ...DEFAULT_PAGE_SEO, indexable: false });
  await setting(`${SEO_PAGE_PREFIX}/sobre`, { ...DEFAULT_PAGE_SEO, includeInSitemap: false });
  await setting(`${SEO_PAGE_PREFIX}/contato`, { ...DEFAULT_PAGE_SEO, canonical: "/localizacao" });
  const entries = await sitemap();
  const urls = entries.map((entry) => entry.url);
  assert.ok(urls.includes("https://stopshop.com.br/blog/publicado"));
  for (const pathname of ["/blog/rascunho", "/lojas", "/sobre", "/contato"]) {
    assert.equal(urls.includes(`https://stopshop.com.br${pathname}`), false, pathname);
  }
  assert.equal(entries.find((entry) => entry.url.endsWith("/blog/publicado"))?.lastModified?.toString(), new Date(1_700_000_000_000).toString());
  assert.equal(entries.find((entry) => entry.url === "https://stopshop.com.br/")?.lastModified, undefined);
});

test("legacy invalid images on drafts, published posts and segments do not break the catalog or sitemap", async () => {
  await db.run(sql`INSERT INTO posts VALUES (1, 'Legado publicado', 'legado', 'Resumo', 'https://', 1, 1700000000), (2, 'Rascunho legado', 'rascunho-legado', 'Resumo', 'https://', 0, 1700000000)`);
  await db.run(sql`INSERT INTO segments (id, name, slug, image, updated_at) VALUES (1, 'Moda', 'moda', 'https://', 1700000000)`);
  await setting(SEO_SETTINGS_KEY, { ...DEFAULT_SEO_SETTINGS, defaultImage: "/global.jpg" });
  const global = await seo.getSeoSettings();
  const catalog = await seo.getSeoEntries();
  for (const key of ["post:1", "post:2", "segment:1"]) {
    const entry = catalog.find((item) => item.key === key);
    assert.ok(entry, key);
    assert.equal(resolvePageSeo(global, entry.settings, entry.defaults, entry.path).image, "https://stopshop.com.br/global.jpg", key);
    const metadata = await seo.getSeoMetadata(entry.key, entry.path, entry.defaults);
    assert.deepEqual(metadata.openGraph?.images, [{ url: "https://stopshop.com.br/global.jpg", alt: global.defaultImageAlt }]);
  }
  const urls = (await sitemap()).map((entry) => entry.url);
  assert.ok(urls.includes("https://stopshop.com.br/blog/legado"));
  assert.ok(urls.includes("https://stopshop.com.br/segmentos/moda"));
  assert.equal(urls.includes("https://stopshop.com.br/blog/rascunho-legado"), false);
});

test("legal page previews use CMS metadata as their fallback", async () => {
  await setting("legalPrivacy", { title: "Privacidade revisada", description: "Como tratamos seus dados.", body: "Texto da política atualizado." });
  const entry = (await seo.getSeoEntries()).find((item) => item.key === "/politica-de-privacidade");
  assert.deepEqual(entry?.defaults, { title: "Privacidade revisada", description: "Como tratamos seus dados." });
});

test("reporting channel content feeds SEO previews and sitemap dates while preserving SEO overrides", async () => {
  const config = { ...DEFAULT_REPORTING_CHANNEL, eyebrow: "Canal de Ética", metaDescription: "Fale com a equipe responsável.", email: "relatos@example.com" };
  await setting(REPORTING_CHANNEL_KEY, config);
  const { getReportingChannel } = await import("./reporting-channel");
  assert.deepEqual(await getReportingChannel(), config);
  const entry = (await seo.getSeoEntries()).find((item) => item.key === "/denuncia");
  assert.deepEqual(entry?.defaults, { title: config.eyebrow, description: config.metaDescription });
  assert.equal(entry?.updatedAt, 1_800_000_000);
  let metadata = await seo.getSeoMetadata("/denuncia", "/denuncia", entry?.defaults);
  assert.equal(metadata.description, config.metaDescription);
  await setting(`${SEO_PAGE_PREFIX}/denuncia`, { ...DEFAULT_PAGE_SEO, description: "Resumo personalizado no SEO." });
  metadata = await seo.getSeoMetadata("/denuncia", "/denuncia", entry?.defaults);
  assert.equal(metadata.description, "Resumo personalizado no SEO.");
  const item = (await sitemap()).find((row) => row.url.endsWith("/denuncia"));
  assert.equal(item?.lastModified?.toString(), new Date(1_800_000_000_000).toString());
});

test("global noindex empties the sitemap but keeps crawlers able to read public noindex tags", async () => {
  await setting(SEO_SETTINGS_KEY, { ...DEFAULT_SEO_SETTINGS, siteUrl: "https://shopping.example", indexable: false });
  assert.deepEqual(await sitemap(), []);
  const crawlerRules = await robots();
  assert.equal(crawlerRules.sitemap, undefined);
  assert.equal(crawlerRules.host, "https://shopping.example");
  assert.deepEqual(crawlerRules.rules, { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] });
  await setting(SEO_SETTINGS_KEY, { ...DEFAULT_SEO_SETTINGS, siteUrl: "https://shopping.example" });
  assert.equal((await robots()).sitemap, "https://shopping.example/sitemap.xml");
});
