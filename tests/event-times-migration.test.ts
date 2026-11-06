import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { createClient } from "@libsql/client";
import { migrateEventTimes } from "../scripts/migrate-event-times";

test("migration runs twice without changing legacy events or populated times", async () => {
  const directory = await mkdtemp(join(tmpdir(), "stopshop-event-times-"));
  const client = createClient({ url: `file:${join(directory, "test.db")}` });
  try {
    await client.execute(`CREATE TABLE events (
      id INTEGER PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL,
      image TEXT NOT NULL, date_label TEXT NOT NULL, start_date TEXT, end_date TEXT,
      cta_label TEXT, cta_href TEXT, position INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL
    )`);
    await client.execute({
      sql: "INSERT INTO events VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      args: [7, "Evento legado", "Descrição preservada", "/arte.jpg", "20 de dezembro", "2026-12-20", null, null, "/lojas", 3, 100, 200],
    });
    const before = (await client.execute("SELECT * FROM events")).rows[0];
    assert.deepEqual(await migrateEventTimes(client), ["start_time", "end_time"]);
    assert.deepEqual(await migrateEventTimes(client), []);
    const after = (await client.execute("SELECT * FROM events")).rows[0];
    for (const key of Object.keys(before)) assert.equal(after[key], before[key], key);
    assert.equal(after.start_time, null);
    assert.equal(after.end_time, null);
    assert.equal((await client.execute("SELECT COUNT(*) AS count FROM events")).rows[0].count, 1);
    await client.execute("UPDATE events SET start_time = '14:00', end_time = '18:00' WHERE id = 7");
    assert.deepEqual(await migrateEventTimes(client), []);
    const withTimes = (await client.execute("SELECT start_time, end_time FROM events WHERE id = 7")).rows[0];
    assert.equal(withTimes.start_time, "14:00");
    assert.equal(withTimes.end_time, "18:00");
  } finally {
    client.close();
    await rm(directory, { recursive: true, force: true });
  }
});

test("migration completes a partially migrated schema", async () => {
  const directory = await mkdtemp(join(tmpdir(), "stopshop-event-times-partial-"));
  const client = createClient({ url: `file:${join(directory, "test.db")}` });
  try {
    await client.execute("CREATE TABLE events (id INTEGER PRIMARY KEY, start_time TEXT)");
    await client.execute("INSERT INTO events (id, start_time) VALUES (1, '14:00')");
    assert.deepEqual(await migrateEventTimes(client), ["end_time"]);
    const row = (await client.execute("SELECT * FROM events")).rows[0];
    assert.equal(row.start_time, "14:00");
    assert.equal(row.end_time, null);
  } finally {
    client.close();
    await rm(directory, { recursive: true, force: true });
  }
});

test("missing events table fails clearly without creating a replacement", async () => {
  const directory = await mkdtemp(join(tmpdir(), "stopshop-event-times-missing-"));
  const client = createClient({ url: `file:${join(directory, "test.db")}` });
  try {
    await assert.rejects(migrateEventTimes(client), /tabela events não existe.*pnpm db:push/);
    const result = await client.execute("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'events'");
    assert.equal(result.rows.length, 0);
  } finally {
    client.close();
    await rm(directory, { recursive: true, force: true });
  }
});
