import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildSeoMetadata,
  DEFAULT_PAGE_SEO,
  DEFAULT_SEO_SETTINGS,
  formatSeoTitle,
  pageSeoSchema,
  resolvePageSeo,
  seoSettingsSchema,
  serializeJsonLd,
} from "./seo";

const defaults = { title: "Lojas", description: "Encontre sua loja em Brusque." };

test("the home title and description inherit global settings without repeating the title suffix", () => {
  const settings = { ...DEFAULT_SEO_SETTINGS, defaultTitle: "Stop Shop — Moda em Brusque", defaultDescription: "Uma nova descrição." };
  const home = resolvePageSeo(settings, DEFAULT_PAGE_SEO, defaults, "/");
  assert.equal(home.title, settings.defaultTitle);
  assert.equal(home.description, settings.defaultDescription);
  assert.equal(home.canonical, "https://stopshop.com.br/");
  assert.equal(resolvePageSeo(settings, { ...DEFAULT_PAGE_SEO, title: "Um título exclusivo" }, defaults, "/").title, "Um título exclusivo");
});

test("blank page fields follow the page content, then the global defaults", () => {
  const settings = { ...DEFAULT_SEO_SETTINGS, defaultImage: "/social.jpg", defaultImageAlt: "Fachada do shopping" };
  const page = resolvePageSeo(settings, DEFAULT_PAGE_SEO, defaults, "/lojas");
  assert.equal(page.title, "Lojas | Stop Shop");
  assert.equal(page.description, defaults.description);
  assert.equal(page.image, "https://stopshop.com.br/social.jpg");
  assert.equal(page.imageAlt, "Fachada do shopping");
  assert.equal(resolvePageSeo(settings, DEFAULT_PAGE_SEO, { title: "", description: "" }, "/lojas").description, settings.defaultDescription);
  assert.equal(formatSeoTitle("", settings), settings.defaultTitle);
  assert.equal(formatSeoTitle("Descontos $& e $`", settings), "Descontos $& e $` | Stop Shop");
});

test("page overrides produce matching absolute titles, canonical links and social cards", () => {
  const page = {
    ...DEFAULT_PAGE_SEO,
    title: "Moda nova",
    description: "Conheça a coleção.",
    image: "/colecao.jpg",
    imageAlt: "Coleção de verão",
    canonical: "https://stopshop.com.br/colecao",
  };
  const metadata = buildSeoMetadata(DEFAULT_SEO_SETTINGS, page, defaults, "/blog/colecao", {
    openGraph: { type: "article", publishedTime: "2026-11-04" },
  });
  assert.deepEqual(metadata.title, { absolute: "Moda nova | Stop Shop" });
  assert.deepEqual(metadata.alternates, { canonical: "https://stopshop.com.br/colecao" });
  assert.deepEqual(metadata.robots, { index: true, follow: true });
  assert.deepEqual(metadata.openGraph, {
    type: "article",
    publishedTime: "2026-11-04",
    locale: "pt_BR",
    siteName: "Stop Shop",
    title: "Moda nova | Stop Shop",
    description: "Conheça a coleção.",
    url: "https://stopshop.com.br/colecao",
    images: [{ url: "https://stopshop.com.br/colecao.jpg", alt: "Coleção de verão" }],
  });
  assert.deepEqual(metadata.twitter, {
    card: "summary_large_image",
    title: "Moda nova | Stop Shop",
    description: "Conheça a coleção.",
    images: [{ url: "https://stopshop.com.br/colecao.jpg", alt: "Coleção de verão" }],
  });
});

test("post images take priority over global images and can be replaced individually", () => {
  const settings = { ...DEFAULT_SEO_SETTINGS, defaultImage: "/global.jpg" };
  const post = { ...defaults, image: "/post.jpg" };
  assert.equal(resolvePageSeo(settings, DEFAULT_PAGE_SEO, post, "/blog/post").image, "https://stopshop.com.br/post.jpg");
  assert.equal(resolvePageSeo(settings, { ...DEFAULT_PAGE_SEO, image: "/override.jpg" }, post, "/blog/post").image, "https://stopshop.com.br/override.jpg");
  assert.deepEqual(buildSeoMetadata(DEFAULT_SEO_SETTINGS, DEFAULT_PAGE_SEO, defaults, "/lojas").twitter, {
    card: "summary", title: "Lojas | Stop Shop", description: defaults.description, images: [],
  });
});

test("invalid legacy content images safely fall back to the global image or an image-free card", () => {
  const settings = { ...DEFAULT_SEO_SETTINGS, defaultImage: "/global.jpg", defaultImageAlt: "Fachada do shopping" };
  for (const image of ["https://", "javascript:alert(1)", "//external.example/photo.jpg", "invalid photo.jpg"]) {
    const content = { ...defaults, image };
    const resolved = resolvePageSeo(settings, DEFAULT_PAGE_SEO, content, "/blog/legado");
    assert.equal(resolved.image, "https://stopshop.com.br/global.jpg", image);
    assert.equal(resolved.imageAlt, settings.defaultImageAlt, image);
    assert.deepEqual(buildSeoMetadata(settings, DEFAULT_PAGE_SEO, content, "/blog/legado").openGraph?.images, [
      { url: "https://stopshop.com.br/global.jpg", alt: "Fachada do shopping" },
    ]);
    const withoutImage = buildSeoMetadata(DEFAULT_SEO_SETTINGS, DEFAULT_PAGE_SEO, content, "/blog/legado");
    assert.deepEqual(withoutImage.openGraph?.images, []);
    assert.deepEqual(withoutImage.twitter, {
      card: "summary", title: "Lojas | Stop Shop", description: defaults.description, images: [],
    });
  }
  const override = resolvePageSeo(settings, { ...DEFAULT_PAGE_SEO, image: "/override.jpg" }, { ...defaults, image: "https://" }, "/blog/legado");
  assert.equal(override.image, "https://stopshop.com.br/override.jpg");
});

test("global and page noindex both override sitemap inclusion while keeping links crawlable", () => {
  for (const [settings, page] of [
    [{ ...DEFAULT_SEO_SETTINGS, indexable: false }, DEFAULT_PAGE_SEO],
    [DEFAULT_SEO_SETTINGS, { ...DEFAULT_PAGE_SEO, indexable: false }],
  ] as const) {
    const resolved = resolvePageSeo(settings, page, defaults, "/lojas");
    assert.equal(resolved.indexable, false);
    assert.equal(resolved.includeInSitemap, false);
    assert.deepEqual(buildSeoMetadata(settings, page, defaults, "/lojas").robots, { index: false, follow: true });
  }
  const hidden = resolvePageSeo(DEFAULT_SEO_SETTINGS, { ...DEFAULT_PAGE_SEO, includeInSitemap: false }, defaults, "/lojas");
  assert.equal(hidden.indexable, true);
  assert.equal(hidden.includeInSitemap, false);
});

test("canonical URLs pointing elsewhere remove the duplicate from the sitemap", () => {
  for (const canonical of ["/sobre", "https://example.com/lojas"]) {
    const resolved = resolvePageSeo(DEFAULT_SEO_SETTINGS, { ...DEFAULT_PAGE_SEO, canonical }, defaults, "/lojas");
    assert.equal(resolved.includeInSitemap, false);
  }
  assert.equal(resolvePageSeo(DEFAULT_SEO_SETTINGS, { ...DEFAULT_PAGE_SEO, canonical: "/lojas" }, defaults, "/lojas").includeInSitemap, true);
});

test("SEO URL inputs reject executable, ambiguous, credentialed and fragment URLs", () => {
  for (const value of ["javascript:alert(1)", "data:text/html,hello", "//evil.example/a", "/\\evil.example/a", "https://name:password@example.com/", "https://example.com/a#section", "https://example.com/a b", "relative.jpg"]) {
    for (const field of ["image", "canonical"] as const) {
      assert.equal(pageSeoSchema.safeParse({ ...DEFAULT_PAGE_SEO, [field]: value }).success, false, `${field}: ${value}`);
    }
  }
  for (const value of ["", "/images/social.jpg", "https://cdn.example.com/social.jpg", "http://localhost:3000/social.jpg"]) {
    assert.equal(pageSeoSchema.safeParse({ ...DEFAULT_PAGE_SEO, image: value }).success, true, value);
  }
});

test("global validation normalizes the site origin and requires a single title placeholder and verification code", () => {
  assert.equal(seoSettingsSchema.parse({ ...DEFAULT_SEO_SETTINGS, siteUrl: "https://EXAMPLE.com/" }).siteUrl, "https://example.com");
  for (const siteUrl of ["example.com", "https://example.com/path", "https://example.com/?search=1", "https://user:pass@example.com"]) {
    assert.equal(seoSettingsSchema.safeParse({ ...DEFAULT_SEO_SETTINGS, siteUrl }).success, false, siteUrl);
  }
  for (const titleTemplate of ["Stop Shop", "%s | %s"]) {
    assert.equal(seoSettingsSchema.safeParse({ ...DEFAULT_SEO_SETTINGS, titleTemplate }).success, false);
  }
  assert.equal(seoSettingsSchema.safeParse({ ...DEFAULT_SEO_SETTINGS, googleVerification: '<meta name="google-site-verification" content="abc">' }).success, false);
  assert.equal(seoSettingsSchema.safeParse({ ...DEFAULT_SEO_SETTINGS, googleVerification: "abc-123_X=", bingVerification: "0ABCDEF123" }).success, true);
  assert.equal(seoSettingsSchema.safeParse({ ...DEFAULT_SEO_SETTINGS, socialLinks: ["/instagram"] }).success, false);
});

test("JSON-LD cannot terminate its script tag when editable content contains HTML", () => {
  const value = { name: '</script><script>alert("x")</script>', description: "Roupas & acessórios" };
  const serialized = serializeJsonLd(value);
  assert.doesNotMatch(serialized, /</);
  assert.deepEqual(JSON.parse(serialized), value);
});
