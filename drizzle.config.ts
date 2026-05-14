import { defineConfig } from "drizzle-kit";
import { mkdirSync } from "node:fs";
import path from "node:path";

const raw = process.env.DATABASE_URL ?? "file:./data/stopshop.db";
const authToken = process.env.DATABASE_AUTH_TOKEN;

let url = raw;
if (raw.startsWith("file:")) {
  const filePath = raw.slice("file:".length);
  const absolute = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);
  mkdirSync(path.dirname(absolute), { recursive: true });
  url = `file:${absolute}`;
}

export default authToken
  ? defineConfig({
      schema: "./src/db/schema.ts",
      out: "./drizzle",
      dialect: "turso",
      dbCredentials: { url, authToken },
    })
  : defineConfig({
      schema: "./src/db/schema.ts",
      out: "./drizzle",
      dialect: "sqlite",
      dbCredentials: { url },
    });
