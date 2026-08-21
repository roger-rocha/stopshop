/**
 * Aplica no banco o texto do hero definido na reunião de 20/08:
 * "160 lojas" → "160 marcas", título em três linhas e sem o botão
 * "Explore as lojas". O hero é conteúdo de CMS, então mudar o default no código
 * não alcança instalações que já têm o registro salvo.
 *
 * Uso: pnpm content:update-hero
 * Idempotente — preserva o eyebrow, as imagens e os slides já cadastrados.
 */
import { eq } from "drizzle-orm";
import { db, schema } from "../src/db/client";
import { defaultHeroContent } from "../src/lib/site";

async function main() {
  const [row] = await db
    .select()
    .from(schema.settings)
    .where(eq(schema.settings.key, "hero"))
    .limit(1);

  const current = row ? (JSON.parse(row.value) as Record<string, unknown>) : {};

  const next = {
    eyebrow: defaultHeroContent.eyebrow,
    image: "",
    slides: [],
    ctaHref: defaultHeroContent.ctaHref,
    ...current,
    // Só o texto e o botão mudam.
    title: defaultHeroContent.title,
    titleHighlight: defaultHeroContent.titleHighlight,
    ctaLabel: defaultHeroContent.ctaLabel,
  };

  const value = JSON.stringify(next);

  if (row) {
    await db
      .update(schema.settings)
      .set({ value, updatedAt: Math.floor(Date.now() / 1000) })
      .where(eq(schema.settings.key, "hero"));
  } else {
    await db.insert(schema.settings).values({ key: "hero", value });
  }

  console.log("Hero atualizado:\n" + next.title);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
