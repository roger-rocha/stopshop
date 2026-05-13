import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import path from "node:path";

const envPath = path.join(process.cwd(), ".env.local");
const examplePath = path.join(process.cwd(), ".env.example");

if (existsSync(envPath)) {
  console.log("✓ .env.local already exists, leaving it as is.");
  process.exit(0);
}

if (!existsSync(examplePath)) {
  console.error("✗ .env.example not found. Aborting.");
  process.exit(1);
}

const template = readFileSync(examplePath, "utf8");
const secret = randomBytes(32).toString("base64");
const rendered = template.replace(/^AUTH_SECRET=.*$/m, `AUTH_SECRET=${secret}`);

writeFileSync(envPath, rendered, { mode: 0o600 });

console.log("✓ .env.local created with a fresh AUTH_SECRET.");
console.log("  Edit ADMIN_EMAIL / ADMIN_PASSWORD before running `pnpm db:seed`.");
