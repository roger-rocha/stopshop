import { eq } from "drizzle-orm";
import { mkdirSync, writeFileSync } from "node:fs";
import { db, schema } from "../src/db/client";
import { categoryPhotos } from "../src/lib/data/category-photos";
import { storeBelongsToSegment } from "../src/lib/store-segments";

// Additive classification based on the existing store descriptions and product ranges.
// Preserve the primary segment and all categories already entered in the CMS.
const additions: Record<string, string[]> = {
  "farmacia-farmazul": ["Farmácia", "Beleza e bem-estar"],
  "neo-vida-clinica-odontologica": ["Beleza e bem-estar"],
  "heinz-willrich-laboratorios": ["Laboratório"],
  arezzo: ["Calçados femininos"],
  melissa: ["Calçados femininos"],
  "via-marte": ["Calçados femininos"],
  "giulia-bardo": ["Calçados", "Calçados femininos"],
  altenburg: ["Casa e decoração"],
  sufatex: ["Casa e decoração"],
  "alto-giro": ["Esportes"],
  luzzoo: ["Esportes"],
  "cotton-cotton": ["Esportes"],
  "banka-panka": ["Esportes"],
  "allan-malhas": ["Malhas"],
  cardium: ["Malhas"],
  "soft-bonni": ["Malhas"],
  "dahui-havana-jack": ["Surfwear", "Moda Praia"],
};

async function main() {
  const apply = process.argv.includes("--apply");
  const [stores, segments] = await Promise.all([
    db.select().from(schema.stores), db.select().from(schema.segments),
  ]);
  for (const slug of Object.keys(additions)) {
    if (!stores.some((store) => store.slug === slug)) throw new Error(`Loja ausente: ${slug}`);
  }
  for (const segment of segments) {
    if (!categoryPhotos[segment.slug]) throw new Error(`Foto ausente: ${segment.slug}`);
  }
  if (apply) {
    mkdirSync(".codex/backups", { recursive: true });
    const backup = `.codex/backups/categories-${Date.now()}.json`;
    writeFileSync(backup, JSON.stringify({ stores, segments }, null, 2));
    console.log(`Backup: ${backup}`);
    await db.transaction(async (tx) => {
      const currentStores = await tx.select().from(schema.stores);
      for (const store of currentStores) {
        const extra = additions[store.slug];
        if (!extra) continue;
        const categories = [...new Set([...store.categories, ...extra])];
        await tx.update(schema.stores).set({ categories, updatedAt: Math.floor(Date.now() / 1000) })
          .where(eq(schema.stores.id, store.id));
      }
      const updatedStores = await tx.select().from(schema.stores);
      for (const segment of segments) {
        await tx.update(schema.segments).set({
          image: categoryPhotos[segment.slug],
          storeCount: updatedStores.filter((store) => storeBelongsToSegment(store, segment)).length,
          updatedAt: Math.floor(Date.now() / 1000),
        }).where(eq(schema.segments.id, segment.id));
      }
    });
  }
  const projected = stores.map((store) => ({
    ...store, categories: [...new Set([...store.categories, ...(additions[store.slug] ?? [])])],
  }));
  for (const segment of segments) {
    const matches = projected.filter((store) => storeBelongsToSegment(store, segment));
    console.log(`${segment.name}: ${matches.length} — ${matches.map((store) => store.name).join(", ")}`);
  }
  console.log(apply ? "Catálogo atualizado." : "Prévia sem alterações. Use --apply para salvar.");
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
