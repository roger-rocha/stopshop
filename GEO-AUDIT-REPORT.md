# GEO Audit Report: Stop Shop (Next.js Rebuild)

**Audit Date:** 2026-05-14
**Target:** `/Users/rogerrocha/Developer/Personal/stopshop` — pre-launch Next.js 16 rebuild
**Intended production domain:** https://stopshop.com.br
**Business Type:** Local Business / Shopping Center (fashion mall, Brusque/SC — 160+ brands, wholesale + retail)
**Audit Type:** Static code review (site not yet deployed to production)

---

## Scope Note

This is a **static code review** of the rebuild's source, not a live-URL crawl. The domain `stopshop.com.br` currently still serves the **old PHP site** (nginx + PHP 7.0.33, built by Dextak) — the Next.js rebuild in this repo has not gone live yet. The audit therefore measures *launch readiness*: how well the rebuild's code is set up so AI engines (ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews) can discover, crawl, understand, and cite the site once deployed.

One category — **Brand Authority** — is largely an external signal (mentions on Reddit, YouTube, news, Wikipedia, backlinks) that cannot be measured from code. Its score below reflects only **code-visible** signals (social-link correctness, `sameAs` strategy, entity cross-referencing). The established business does have real external presence; once social links are corrected and the site is live, the effective score moves.

---

## Executive Summary

**Overall GEO Score: 42/100 (Poor)**

The rebuild has good technical bones — every public page is a React Server Component that renders real content into the initial HTML, so the old site's client-rendered-hero problem (invisible to AI crawlers) is solved, and per-page metadata exists on every route. But it is **not yet citable or authoritative**. The single most damaging issue is **factual self-contradiction**: opening hours, street address, store count, and parking capacity each have 2–4 conflicting values spread across the codebase, so an AI has no authoritative answer to quote. On top of that, every machine-discovery file is missing (`sitemap.ts`, `robots.ts`, `manifest.ts`, `llms.txt`, and — critically — `metadataBase`), structured data is a single hand-written `ShoppingCenter` block with errors, there is no About/"Ninho da Moda" page, the blog is empty with no author field, and the social links point to the wrong handles.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 52/100 | 25% | 13.0 |
| Brand Authority | 38/100 | 20% | 7.6 |
| Content E-E-A-T | 31/100 | 20% | 6.2 |
| Technical GEO | 38/100 | 15% | 5.7 |
| Schema & Structured Data | 30/100 | 10% | 3.0 |
| Platform Optimization | 62/100 | 10% | 6.2 |
| **Overall GEO Score** | | | **42/100** |

### Biggest Strengths
- All public routes are server-rendered — content is in the initial HTML, readable by AI crawlers.
- Per-page `metadata` / `generateMetadata` exists on every route, including dynamic `blog/[slug]` and `segmentos/[slug]`.
- The FAQ (`src/lib/data/faq.ts` → `FAQAccordion.tsx`) renders genuine question-and-answer text in the DOM.
- `next/image` used throughout with `remotePatterns` configured; `generateStaticParams` pre-renders dynamic routes.
- Admin area correctly excluded from indexing (`robots: { index: false }` + middleware gate).

### Most Critical Gaps
- Core facts (hours, address, store count, parking) contradict each other across 4+ files.
- No `metadataBase` — breaks every OpenGraph image URL and canonical site-wide.
- No `sitemap.ts`, `robots.ts`, or `llms.txt` — nothing tells AI crawlers what exists.
- No About page; the brand's identity exists only as a one-line hero string.

---

## Critical Issues (Fix Immediately)

### C1. Core facts contradict each other across the site
An AI asked "What are Stop Shop's hours?" or "Where is it?" finds multiple conflicting answers — worse than missing data, because it actively erodes trust and produces wrong citations.

- **Opening hours:** `OpeningHoursStrip.tsx:13` shows Saturday `09h–19h`; `faq.ts:11-12` says Saturday `09h às 17h`; `site.ts:28` says "Segunda a sábado das 09h às 19h".
- **Address / NAP:** `site.ts:21-26` = "Rodovia Antônio Heil, 635", CEP `88352-288`; the homepage JSON-LD `page.tsx:50-52` = "Rod. Antônio Heil, 635", postalCode `88353-100`; `faq.ts:30` = "Rod. Antônio Heil, **301**".
- **Store count:** copy says "160+" everywhere, but JSON-LD `page.tsx:75` hardcodes exactly `160`; `segments.ts` `storeCount` values sum to ~219; only ~20 stores are actually seeded in `stores.ts`.
- **Parking:** `faq.ts:24` "mais de 500 vagas"; `localizacao/page.tsx:53` "310"; `GallerySection.tsx:48` "310+"; `PlanejeSection.tsx:37` "mais de 310".

**Fix:** Establish one verified value for each fact. Store hours, address, and parking in the `settings`/`contact` source and render *every* mention from `getContact()` — make `OpeningHoursStrip` consume it instead of a hardcoded array. Correct `faq.ts` ("301" → "635", reconcile Saturday hours) and the JSON-LD postal code. NAP consistency is a primary AI trust signal.

### C2. No `metadataBase` in the root layout
`src/app/layout.tsx` (metadata object, lines 21–40) has no `metadataBase`. Without it, every OpenGraph `images` entry and any canonical URL resolves relative to `localhost` at build time — silently breaking social/AI preview cards and canonicalization across all 11 public pages.

**Fix:** Add `metadataBase: new URL("https://stopshop.com.br")` to the root `metadata` export. One line, site-wide impact.

---

## High Priority Issues (Fix Within 1 Week)

### H1. No `src/app/sitemap.ts`
No sitemap.xml means AI crawlers and search engines have no URL inventory.
**Fix:** Create `src/app/sitemap.ts` exporting a `MetadataRoute.Sitemap` — combine the static routes from `siteNavigation` (`src/lib/site.ts:1`) with dynamic entries from `getAllPosts()`, `getAllSegments()`, and `getAllStores()` (`src/lib/server/queries.ts`); use `post.date` for `lastModified`.

### H2. No `src/app/robots.ts` (or `public/robots.txt`)
No crawl directives and no sitemap pointer.
**Fix:** Create `src/app/robots.ts` returning `{ rules: [{ userAgent: "*", allow: "/", disallow: "/admin" }], sitemap: "https://stopshop.com.br/sitemap.xml", host: "https://stopshop.com.br" }`. **Do not block AI user-agents** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) — AI visibility is the goal.

### H3. No `public/llms.txt`
The llms.txt AI-discovery standard file is absent.
**Fix:** Add `public/llms.txt` with an `# Stop Shop` H1, a one-line summary (fashion shopping center, Brusque/SC, 160+ brands, wholesale + retail), and linked sections to `/lojas`, `/localizacao`, `/atacado`, `/stop-cred`, `/blog`.

### H4. No About / "Sobre" page
The brand's core identity — "O Ninho da Moda", "30 anos de tradição" — exists only as a hero eyebrow string (`queries.ts:117-118`). `GallerySection.tsx:62` labels a photo grid "Sobre o Stop Shop" but it's just images + stat numbers; `PlanejeSection.tsx:59` links "Sobre Brusque" to an *external* site. There is no institutional narrative for an AI to cite about the entity itself.
**Fix:** Create `/sobre` with real prose — founding year, the Ninho da Moda story, the four-pavement structure, 160+ tenant scale, the mall's role in Brusque's textile economy. Add `AboutPage` schema.

### H5. Blog has no content and no author attribution
The `posts` table (`schema.ts:55-75`) has **no `author` field**; `seed.ts` seeds segments/stores/settings but **never posts**, so `/blog` renders the empty state "Em breve traremos novos conteúdos." A content surface that's both empty and structurally unable to show authorship is an E-E-A-T dead zone.
**Fix:** Add `author` (and optionally `authorBio`) to the `posts` table; seed 3–5 substantial posts; render a byline in `blog/[slug]/page.tsx` and emit `BlogPosting` JSON-LD with `author`.

### H6. Structured-data coverage is minimal
Only one JSON-LD block exists site-wide (homepage `ShoppingCenter`). Missing every other GEO-critical type: `Organization` (with `sameAs`), `FAQPage` (the Q&A content already exists in `faq.ts` — just unused), `BlogPosting` on articles, `BreadcrumbList` on deep routes, `ItemList` for the store directory.
**Fix:** Emit `FAQPage` JSON-LD on the homepage built from `faqItems`; add `BlogPosting` on `blog/[slug]`; add `BreadcrumbList` on all subpages; add `ItemList` on `/lojas`; add an `Organization` block with `sameAs`.

### H7. Wrong social handles; no entity-graph linking
`siteSocialLinks` in `src/lib/site.ts:11-15` uses `instagram.com/stopshop`, `facebook.com/stopshop`, `linkedin.com/company/stopshop` — but the real profiles are `stopshopbrusque` (IG/FB) and `youtube.com/user/NINHODAMODA`. YouTube is absent entirely. `InstagramFeed.tsx:37-38` even falls back to the wrong URL while its label correctly reads `@stopshopbrusque`. The JSON-LD has no `sameAs` array, so the site never tells AI which authoritative profiles belong to this entity.
**Fix:** Correct the handles to `stopshopbrusque`, add the YouTube channel, drop LinkedIn unless a real profile exists, and add `sameAs: [<IG>, <FB>, <YouTube>]` to the `ShoppingCenter`/`Organization` JSON-LD.

### H8. The existing `ShoppingCenter` JSON-LD has data errors
`src/app/(site)/page.tsx:39-77` — `postalCode: "88353-100"` conflicts with `site.ts` (`88352-288`); `numberOfStores: 160` (line 75) and `url` (line 45) are hardcoded rather than derived; no `@id`, `image`, `priceRange`, or `sameAs`.
**Fix:** Pull address from `getContact()`, derive `numberOfStores` from `getAllStores()`, add `"@id": "https://stopshop.com.br/#shoppingcenter"`, `image`, `priceRange`, and `sameAs`.

---

## Medium Priority Issues (Fix Within 1 Month)

- **M1. No security headers** — `next.config.ts` has no `async headers()` function. Add `X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security`, `X-Frame-Options` for `source: "/:path*"`.
- **M2. No OG/Twitter image** — root `openGraph` (`layout.tsx:35-39`) has no `images`; no `twitter` block; no `src/app/opengraph-image.*`. AI/social previews render blank. Add `src/app/opengraph-image.tsx` (1200×630) and `twitter: { card: "summary_large_image" }`.
- **M3. No favicon / icon / manifest** — no `src/app/icon.*`, `apple-icon.*`, or `manifest.ts`. Add them (`manifest.ts` with `name`, `short_name`, `lang: "pt-BR"`, `theme_color: "#1B2A4A"`).
- **M4. Thin store directory** — `stores` table has no `description` field and there is no `/lojas/[slug]` route; `StoreCard.tsx` (name + 2 category pills + location) is the only representation of a store. 160+ tenants get no indexable URL or `Store` schema. Add a `description` column, build `/lojas/[slug]` detail pages with per-store schema, and link `StoreCard` to them.
- **M5. No `BreadcrumbList`** on `blog/[slug]`, `segmentos/[slug]`, `lojas` — hurts AI hierarchy understanding.
- **M6. No `alternates.canonical`** on any of the 11 public routes (works once `metadataBase` is set — see C2).
- **M7. Key facts trapped in client-side motion components** — `AgendaSection.tsx:28-104` renders events one-at-a-time inside `AnimatePresence`; the full event set isn't in the DOM. Render all agenda items as static text (e.g. a visually-hidden list) so AI sees the whole set.
- **M8. Store-count math doesn't reconcile** — segment `storeCount` values sum to ~219, only ~20 stores are seeded, copy says "160+", schema says `160`. Decide the real number and make every surface agree (overlaps with C1).

---

## Low Priority Issues (Optimize When Possible)

- **L1. Headings are marketing slogans, not question-shaped** — "O que está rolando no Stop Shop" (`AgendaSection.tsx:36`), "Conheça algumas das nossas lojas" (`FeaturedStores.tsx:27`). Where a section answers a real question, use a heading an AI can match to a query, e.g. "Horário de funcionamento do Stop Shop".
- **L2. `cadastro` page admits it's a placeholder** — body copy at `cadastro/page.tsx:73-75` ("Esta primeira versão organiza a jornada...") is a low-trust signal if crawled. Replace with real value-prop copy before launch.
- **L3. No `revalidate` / caching strategy** — DB-backed pages have no `export const revalidate`; content edited in `/admin` may serve stale to crawlers. Add `revalidate` or `revalidatePath` in admin actions.
- **L4. Soft-404s not de-indexed** — the not-found branches of `generateMetadata` in `blog/[slug]/page.tsx:21` and `segmentos/[slug]/page.tsx:27` return only a title; also set `robots: { index: false }`.
- **L5. `keywords` only on the root layout** — minor; per-page keywords add little for GEO, and the meta descriptions are already good quality.

---

## Category Deep Dives

### AI Citability (52/100 — Poor)
Facts exist as crawlable text rather than being trapped in images, and the FAQ renders full Q&A text in the DOM — both good. But the facts **conflict with each other** (see C1), which is worse than missing them, and most section headings are generic marketing copy rather than question-shaped. The FAQ is currently the only strongly citable block on the site. Once facts are reconciled and `FAQPage` schema is added, this score rises quickly.

### Brand Authority (38/100 — code-visible signals only)
External signals (Reddit, YouTube views, news, Wikipedia, backlinks) **cannot be assessed from code** and require a separate live analysis. What the code shows is weak: wrong social handles, YouTube omitted entirely, and no `sameAs` array to connect the site to its authoritative profiles. Brusque is cross-referenced well; anchor brands are listed but never described as tenants in prose. Fixing H7 is the highest-leverage code change for this category.

### Content E-E-A-T (31/100 — Critical)
The weakest category. No `author` field on `posts`, no seeded blog content, no About page, and a store directory with zero depth (no detail pages, no descriptions). The "30 anos de tradição / Ninho da Moda" story — the strongest available expertise/experience signal — appears only as a hero eyebrow. This is a content-production gap more than a code gap, but the schema (`posts` table) needs an `author` column before that content can carry proper E-E-A-T.

### Technical GEO (38/100 — Critical)
Rendering strategy is excellent — all RSC, content in HTML, `generateStaticParams` for dynamic routes, `next/image` everywhere. The score is dragged down by the **total absence of crawl-control and discovery files**: no sitemap, no robots, no `llms.txt`, no `metadataBase`, no security headers. Crawlers can read pages but cannot discover them systematically.

### Schema & Structured Data (30/100 — Critical)
One JSON-LD block exists (homepage `ShoppingCenter`); it is structurally valid but has data errors and lacks `@id`/`image`/`sameAs`/`priceRange`. Every other GEO-critical type is missing. For a Local Business, structured data is the single biggest citability multiplier — this is the highest-ROI category to improve.

### Platform Optimization (62/100 — Fair)
The strongest category. Title template, descriptions, `keywords`, `lang="pt-BR"`, and `openGraph.locale` are set, and every public page exports unique title + description metadata. Held back by the lack of any OG image, no Twitter card config, no favicon/manifest, and no canonical alternates.

---

## Quick Wins (Implement This Week)

1. **Add `metadataBase`** to `src/app/layout.tsx` — one line, fixes OG/canonical resolution site-wide.
2. **Add `src/app/robots.ts` + `src/app/sitemap.ts`** — straightforward Next.js metadata routes; the single biggest crawlability gain.
3. **Add `public/llms.txt`** — small static file, gets the site onto the AI-discovery standard.
4. **Fix the social handles** in `src/lib/site.ts` (and `InstagramFeed.tsx`, `Footer.tsx`) — `stopshopbrusque`, add YouTube.
5. **Reconcile the contradictory facts** — pick canonical hours/address/parking/store-count values, fix `faq.ts` and the JSON-LD postal code, route every mention through `getContact()`.
6. **Emit `FAQPage` JSON-LD** on the homepage from the existing `faqItems` data — the content already exists, you just need the `<script>`.

## 30-Day Action Plan

### Week 1: Discovery & a single source of truth
- [ ] Reconcile all contradictory facts (hours, address, store count, parking) to one verified value each (C1, M8)
- [ ] Add `metadataBase` to the root layout (C2)
- [ ] Create `src/app/robots.ts`, `src/app/sitemap.ts`, `public/llms.txt` (H1, H2, H3)
- [ ] Fix social handles + add YouTube in `site.ts`, `InstagramFeed.tsx`, `Footer.tsx` (H7)

### Week 2: Structured-data layer
- [ ] Add `Organization` + `sameAs`, `FAQPage`, `BlogPosting`, `BreadcrumbList`, `ItemList` JSON-LD (H6)
- [ ] Fix the `ShoppingCenter` block's data errors; derive values from queries (H8)
- [ ] Add OG image + Twitter card; favicon/icon/manifest (M2, M3)
- [ ] Add security headers to `next.config.ts` (M1)

### Week 3: Content depth & E-E-A-T
- [ ] Build the `/sobre` (About) page with real institutional narrative + `AboutPage` schema (H4)
- [ ] Add `author` column to the `posts` table; seed 3–5 substantial blog posts with bylines (H5)
- [ ] Add `revalidate` / `revalidatePath` caching strategy (L3)

### Week 4: Store directory & citability polish
- [ ] Add `description` to `stores`; build `/lojas/[slug]` detail pages with `Store` schema (M4)
- [ ] Ensure agenda/carousel content is fully present in the DOM, not one-slide-at-a-time (M7)
- [ ] Tighten section headings to be question-shaped where they answer real queries (L1)
- [ ] Replace `cadastro` placeholder copy; add `canonical` alternates; de-index soft-404s (L2, M6, L4)
- [ ] Pre-launch QA: re-run a live GEO crawl once deployed to staging

---

## Appendix: Routes & Source Reviewed

| Route / Area | Source | Notes |
|---|---|---|
| `/` (homepage) | `src/app/(site)/page.tsx` + 13 section components | Has the only JSON-LD block; FAQ + hours live here |
| `/lojas` | `src/app/(site)/lojas/page.tsx`, `StoreDirectory.tsx`, `StoreCard.tsx` | No `ItemList` schema, no store detail pages |
| `/localizacao` | `src/app/(site)/localizacao/page.tsx` | Parking stat conflicts with FAQ |
| `/stop-cred` | `src/app/(site)/stop-cred/page.tsx` | Loyalty card content |
| `/cadastro` | `src/app/(site)/cadastro/page.tsx` | Body copy admits placeholder status |
| `/atacado` | `src/app/(site)/atacado/page.tsx` | Wholesale value-prop |
| `/contato` | `src/app/(site)/contato/page.tsx`, `ContactFormCard.tsx` | NAP surface |
| `/blog` + `/blog/[slug]` | `src/app/(site)/blog/page.tsx`, `blog/[slug]/page.tsx` | Empty (no seeded posts), no author field, no `BlogPosting` schema |
| `/segmentos/[slug]` | `src/app/(site)/segmentos/[slug]/page.tsx` | Dynamic metadata OK; no breadcrumb schema |
| Layouts & config | `src/app/layout.tsx`, `(site)/layout.tsx`, `next.config.ts`, `middleware.ts` | Missing `metadataBase`, security headers |
| Data layer | `src/db/schema.ts`, `seed.ts`, `src/lib/data/*`, `src/lib/server/queries.ts`, `src/lib/site.ts` | Source of the factual contradictions; `posts` lacks `author` |
| **Absent (expected for GEO)** | `sitemap.ts`, `robots.ts`, `manifest.ts`, `public/llms.txt`, `opengraph-image`, `icon.*` | None present |

---

*Generated by the GEO-SEO Analysis skill. Scoring methodology: weighted average across six categories (AI Citability 25%, Brand Authority 20%, Content E-E-A-T 20%, Technical GEO 15%, Schema 10%, Platform Optimization 10%). Brand Authority reflects code-visible signals only; a live audit is recommended post-launch.*
