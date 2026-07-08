/**
 * One-off import: registers the scraped stopshop.com.br/lojas stores into
 * production (Turso) and re-hosts each storefront photo to Vercel Blob.
 *
 * Requires DATABASE_URL, DATABASE_AUTH_TOKEN and BLOB_READ_WRITE_TOKEN in
 * .env.local (production values). Run with:
 *   node --env-file=.env.local node_modules/.bin/tsx scripts/import-stores.ts
 *
 * Idempotent: stores whose slug already exists are skipped.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";
import { put } from "@vercel/blob";

type Scraped = {
  name: string;
  slug: string;
  segment: string;
  primary: string;
  categories: string[];
  instagram: string;
  location: string;
  floor: string;
  sourceImg: string;
  storefront: string;
  photo: string;
};

const DRY = process.argv.includes("--dry");

// Load production secrets from .env.local (DATABASE_URL, DATABASE_AUTH_TOKEN,
// BLOB_READ_WRITE_TOKEN). Ignore if the file is absent — vars may be in the env.
try {
  process.loadEnvFile(path.join(process.cwd(), ".env.local"));
} catch {
  /* no .env.local — rely on process.env */
}

const { DATABASE_URL, DATABASE_AUTH_TOKEN, BLOB_READ_WRITE_TOKEN } = process.env;
if (!DATABASE_URL || !DATABASE_AUTH_TOKEN) {
  throw new Error("Faltando DATABASE_URL / DATABASE_AUTH_TOKEN no .env.local");
}
if (!BLOB_READ_WRITE_TOKEN) {
  throw new Error("Faltando BLOB_READ_WRITE_TOKEN no .env.local");
}

const db = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });

const stores: Scraped[] = JSON.parse(
  readFileSync(path.join(__dirname, "scraped-stores.json"), "utf-8")
);

function extOf(url: string) {
  const m = url.toLowerCase().match(/\.(jpe?g|png|webp|gif)(?:\?|$)/);
  return m ? m[1].replace("jpeg", "jpg") : "jpg";
}
const CT: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

async function rehost(slug: string, srcUrl: string): Promise<string> {
  const res = await fetch(srcUrl, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) throw new Error(`download ${res.status} ${srcUrl}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 500) throw new Error(`imagem muito pequena (${buf.length}b)`);
  const ext = extOf(srcUrl);
  const blob = await put(`stores/${slug}.${ext}`, buf, {
    access: "public",
    contentType: CT[ext] ?? "image/jpeg",
    token: BLOB_READ_WRITE_TOKEN,
    allowOverwrite: true,
    addRandomSuffix: false,
  });
  return blob.url;
}

async function slugExists(slug: string): Promise<boolean> {
  const r = await db.execute({
    sql: "select 1 from stores where slug = ? limit 1",
    args: [slug],
  });
  return r.rows.length > 0;
}

async function main() {
  let inserted = 0,
    skipped = 0,
    failed = 0;
  for (const s of stores) {
    try {
      if (await slugExists(s.slug)) {
        console.log(`= skip (existe): ${s.name} [${s.slug}]`);
        skipped++;
        continue;
      }
      let storefront = s.storefront;
      if (!DRY) {
        storefront = await rehost(s.slug, s.sourceImg);
      }
      if (DRY) {
        console.log(`~ dry: ${s.name} [${s.slug}] seg=${s.segment}`);
        continue;
      }
      await db.execute({
        sql: `insert into stores
          (name, slug, photo, storefront, instagram, categories, segment, phone, whatsapp, location, floor, featured)
          values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
        args: [
          s.name,
          s.slug,
          s.photo ?? "",
          storefront,
          s.instagram || null,
          JSON.stringify(s.categories),
          s.segment,
          null,
          null,
          s.location,
          s.floor,
        ],
      });
      console.log(`✓ ${s.name} [${s.slug}] → ${storefront}`);
      inserted++;
    } catch (err) {
      failed++;
      console.error(`✗ ${s.name} [${s.slug}]:`, (err as Error).message);
    }
  }
  console.log(
    `\n== inseridas: ${inserted} | puladas: ${skipped} | falhas: ${failed} | total: ${stores.length}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
