/**
 * Publica os serviços iniciais da página /servicos.
 *
 * O deploy roda `drizzle-kit push` (cria a tabela) mas não roda o seed, então
 * sem isto a página sobe vazia. Idempotente: não faz nada se já houver serviço
 * cadastrado, para nunca duplicar nem sobrescrever o que o cliente editou.
 *
 * Uso: pnpm content:seed-services
 */
import { db, schema } from "../src/db/client";
import { seedServices } from "../src/lib/data/services";

async function main() {
  const existing = await db.$count(schema.services);
  if (existing > 0) {
    console.log(`Nada a fazer — ${existing} serviços já cadastrados.`);
    return;
  }

  await db.insert(schema.services).values(seedServices);
  console.log(`${seedServices.length} serviços inseridos:`);
  for (const service of seedServices) {
    console.log(`  • ${service.name} (${service.category})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
