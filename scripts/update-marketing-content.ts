/** Apply the September 22 marketing categories and headline, preserving CMS media and store links. */
import { eq } from "drizzle-orm";
import { db, schema } from "../src/db/client";
import { segments } from "../src/lib/data/segments";
import { defaultHeroContent } from "../src/lib/site";

async function main() {
  await db.transaction(async (tx) => {
    const existing = await tx.select().from(schema.segments);
    let position = Math.max(-1, ...existing.map((segment) => segment.position)) + 1;
    for (const segment of segments) {
      const saved = existing.find((item) => item.slug === segment.slug);
      if (!saved) {
        await tx.insert(schema.segments).values({
          name: segment.name, slug: segment.slug, color: segment.color,
          image: segment.image ?? null, storeCount: 0, position: position++,
        });
      } else if (
        (segment.slug === "acessorios" && saved.name === "Acessórios") ||
        (segment.slug === "alimentacao" && saved.name === "Alimentação")
      ) {
        await tx.update(schema.segments).set({ name: segment.name })
          .where(eq(schema.segments.id, saved.id));
      }
    }

    const [hero] = await tx.select().from(schema.settings).where(eq(schema.settings.key, "hero"));
    const current = hero ? JSON.parse(hero.value) : { ...defaultHeroContent, image: "", slides: [] };
    const value = JSON.stringify({ ...current, title: defaultHeroContent.title, titleHighlight: defaultHeroContent.titleHighlight });
    await tx.insert(schema.settings).values({ key: "hero", value })
      .onConflictDoUpdate({ target: schema.settings.key, set: { value, updatedAt: Math.floor(Date.now() / 1000) } });
  });
  console.log("Categorias e título atualizados; imagens e vínculos de lojas preservados.");
}

main().catch((error) => { console.error(error); process.exit(1); });
