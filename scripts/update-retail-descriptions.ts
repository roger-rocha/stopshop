/**
 * Revisa apenas as descrições conhecidas que ainda promovem atacado/revenda.
 * Prévia: pnpm exec tsx --env-file=.env.local scripts/update-retail-descriptions.ts
 * Aplicar: acrescente --apply. Textos editados pelo cliente ficam para revisão.
 */
import { and, eq } from "drizzle-orm";
import { db, schema } from "../src/db/client";

const revisions = [
  { slug: "baby-h-store", before: "Moda bebê e infantil direto da fábrica, no atacado e no varejo. Do enxoval às primeiras peças, com acessórios para completar o look dos pequenos.", after: "Moda bebê e infantil direto da fábrica. Do enxoval às primeiras peças, com acessórios para completar o look dos pequenos." },
  { slug: "sufatex", before: "Indústria brusquense de cama, mesa e banho. Jogos de toalha, roupa de cama e enxoval direto da fábrica, no atacado e no varejo.", after: "Indústria brusquense de cama, mesa e banho. Jogos de toalha, roupa de cama e enxoval direto da fábrica." },
  { slug: "linda-lu", before: "Moda feminina com lojas em Brusque e em Ilhota, atendendo no atacado e no varejo. Peças do dia a dia com acessórios para completar.", after: "Moda feminina com lojas em Brusque e em Ilhota, com atendimento no varejo. Peças do dia a dia com acessórios para completar." },
  { slug: "ciafox", before: "Fabricação própria com modelagens exclusivas para elas e eles, no atacado e no varejo. Direto de quem produz, sem intermediário.", after: "Fabricação própria com modelagens exclusivas para elas e eles. Direto de quem produz, sem intermediário." },
  { slug: "moon", before: "Bolsas e acessórios no atacado e no varejo, com envio para todo o Brasil. Da bolsa de trabalho à de festa, no piso garagem.", after: "Bolsas e acessórios, com envio para todo o Brasil. Da bolsa de trabalho à de festa, no piso garagem." },
  { slug: "pano-velho", before: "Jeanswear brusquense com mais de duas décadas de fábrica. Denim de origem brasileira, produção própria e atendimento direto a lojistas e revendedores.", after: "Jeanswear brusquense com mais de duas décadas de fábrica. Denim de origem brasileira e produção própria." },
];

async function main() {
  const apply = process.argv.includes("--apply");
  const rows = await db.select({ slug: schema.stores.slug, description: schema.stores.description }).from(schema.stores);
  const changes = revisions.filter((revision) => rows.some((row) => row.slug === revision.slug && row.description === revision.before));
  const review = rows.filter((row) => /atacad|revendedor/i.test(row.description) && !changes.some((change) => change.slug === row.slug));
  for (const change of changes) console.log(`${change.slug}\nAntes: ${change.before}\nDepois: ${change.after}\n`);
  if (apply && changes.length) {
    const updates = changes.map((change) => db.update(schema.stores)
      .set({ description: change.after, updatedAt: Math.floor(Date.now() / 1000) })
      .where(and(eq(schema.stores.slug, change.slug), eq(schema.stores.description, change.before))));
    const [first, ...rest] = updates;
    const results = await db.batch([first!, ...rest]);
    console.log(`${results.reduce((sum, result) => sum + result.rowsAffected, 0)} descrição(ões) atualizada(s).`);
  } else {
    console.log(`${changes.length} descrição(ões) para atualizar. ${apply ? "Nenhuma alteração necessária." : "Prévia; nenhuma alteração aplicada."}`);
  }
  if (review.length) console.log(`Revisão manual necessária: ${review.map((row) => row.slug).join(", ")}`);
}

main().catch(() => { console.error("Não foi possível revisar as descrições. Verifique a conexão com o banco."); process.exitCode = 1; });
