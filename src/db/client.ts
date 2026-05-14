import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { mkdirSync } from "node:fs";
import path from "node:path";
import * as schema from "./schema";

const raw = process.env.DATABASE_URL ?? "file:./data/stopshop.db";
const authToken = process.env.DATABASE_AUTH_TOKEN;

let url = raw;
if (raw.startsWith("file:")) {
  const filePath = raw.slice("file:".length);
  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  url = `file:${absolutePath}`;
}

const client = createClient({ url, authToken });

export const db = drizzle(client, { schema });
export { schema };
