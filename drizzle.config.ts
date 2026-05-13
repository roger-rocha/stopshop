import { defineConfig } from "drizzle-kit";
import { mkdirSync } from "node:fs";
import path from "node:path";

const raw = process.env.DATABASE_URL ?? "file:./data/stopshop.db";
const filePath = raw.startsWith("file:") ? raw.slice(5) : raw;
const absolute = path.isAbsolute(filePath)
  ? filePath
  : path.join(process.cwd(), filePath);

mkdirSync(path.dirname(absolute), { recursive: true });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: { url: `file:${absolute}` },
});
