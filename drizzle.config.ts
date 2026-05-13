import { defineConfig } from "drizzle-kit";
import path from "node:path";

const url =
  process.env.DATABASE_URL ??
  `file:${path.join(process.cwd(), "data", "stopshop.db")}`;

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: { url },
});
