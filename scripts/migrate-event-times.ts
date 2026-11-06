/**
 * Adds nullable event times without changing existing events.
 * Run with the intended database explicitly configured in DATABASE_URL:
 * pnpm exec tsx --env-file=.env.local scripts/migrate-event-times.ts
 */
import { createClient, type Client } from "@libsql/client";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const timeColumns = ["start_time", "end_time"] as const;

export async function migrateEventTimes(client: Client): Promise<string[]> {
  const transaction = await client.transaction("write");
  try {
    const info = await transaction.execute('PRAGMA table_info("events")');
    if (info.rows.length === 0) {
      throw new Error("A tabela events não existe. Execute pnpm db:push no banco correto antes desta migração.");
    }

    const existing = new Set(info.rows.map((column) => String(column.name)));
    const added: string[] = [];
    for (const column of timeColumns) {
      if (existing.has(column)) continue;
      // Identifiers come only from the fixed list above, never from user input.
      await transaction.execute(`ALTER TABLE "events" ADD COLUMN "${column}" TEXT`);
      added.push(column);
    }
    await transaction.commit();
    return added;
  } finally {
    transaction.close();
  }
}

async function main() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    throw new Error("Configure DATABASE_URL explicitamente antes de executar a migração de horários.");
  }
  const client = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN });
  try {
    const added = await migrateEventTimes(client);
    console.log(added.length
      ? `Migração concluída. Colunas adicionadas: ${added.join(", ")}. Eventos existentes preservados.`
      : "Nenhuma alteração necessária: as colunas de horários já existem.");
  } finally {
    client.close();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : "Não foi possível migrar os horários dos eventos.");
    process.exitCode = 1;
  });
}
