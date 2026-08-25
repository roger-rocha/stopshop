/**
 * Publica os serviços iniciais da página /servicos.
 *
 * O deploy roda `drizzle-kit push` (cria a tabela) mas não roda o seed, então
 * sem isto a página sobe vazia. Idempotente por nome: insere só o que ainda não
 * existe, nunca sobrescreve nem apaga o que o cliente editou em /admin/servicos.
 * É assim que um serviço novo adicionado ao código chega a um banco já populado.
 *
 * Uso: pnpm content:seed-services
 */
import { db, schema } from "../src/db/client";
import { seedServices } from "../src/lib/data/services";

async function main() {
  const existing = await db
    .select({ name: schema.services.name })
    .from(schema.services);

  const existingNames = new Set(existing.map((s) => s.name));
  const missing = seedServices.filter((s) => !existingNames.has(s.name));

  if (missing.length === 0) {
    console.log(`Nada a fazer — ${existing.length} serviços já cadastrados.`);
    return;
  }

  await db.insert(schema.services).values(missing);
  console.log(`${missing.length} serviço(s) inserido(s):`);
  for (const service of missing) {
    console.log(`  • ${service.name} (${service.category})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
