import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { AsyncLocalStorage } from "node:async_hooks";
import { SignJWT } from "jose";
import { sql } from "drizzle-orm";

let directory: string;
let proxy: typeof import("./proxy").proxy;
let config: typeof import("./proxy").config;
let db: typeof import("./db").db;
let adminToken: string;
let NextRequest: typeof import("next/server").NextRequest;
let unstable_doesMiddlewareMatch: typeof import("next/experimental/testing/server").unstable_doesMiddlewareMatch;

before(async () => {
  directory = await mkdtemp(path.join(tmpdir(), "stopshop-maintenance-test-"));
  process.env.DATABASE_URL = `file:${directory}/test.db`;
  process.env.DATABASE_AUTH_TOKEN = "";
  process.env.AUTH_SECRET = randomBytes(32).toString("hex");
  Object.assign(globalThis, { AsyncLocalStorage });
  ({ NextRequest } = await import("next/server"));
  ({ unstable_doesMiddlewareMatch } = await import("next/experimental/testing/server"));
  ({ proxy, config } = await import("./proxy"));
  ({ db } = await import("./db"));
  await db.run(sql`CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at INTEGER NOT NULL DEFAULT 0)`);
  const { signSession } = await import("./lib/session");
  adminToken = await signSession({ userId: 1, email: "admin@example.test" });
});

after(async () => {
  db.$client.close();
  await rm(directory, { recursive: true, force: true });
});

function request(url: string, token?: string) {
  return new NextRequest(`https://stopshop.test${url}`, {
    headers: token ? { cookie: `stopshop_session=${token}` } : undefined,
  });
}

test("the guard covers public routes, data, crawlers and dotted URLs", () => {
  for (const url of ["/", "/lojas", "/blog/exemplo", "/arquivo.html", "/api/stores/search", "/robots.txt", "/sitemap.xml", "/llms.txt", "/admin/settings"]) {
    assert.equal(unstable_doesMiddlewareMatch({ config, nextConfig: {}, url }), true, url);
  }
  for (const url of ["/_next/static/chunk.js", "/_next/image", "/favicon.ico", "/logos/logo-new.png", "/images/stopshop-logo.png"]) {
    assert.equal(unstable_doesMiddlewareMatch({ config, nextConfig: {}, url }), false, url);
  }
});

test("visitors receive only the maintenance page by default", async () => {
  for (const url of ["/", "/lojas?busca=teste", "/blog/exemplo", "/desconhecida", "/em-construcao"]) {
    const response = await proxy(request(url));
    assert.equal(response.status, 503, url);
    assert.equal(response.headers.get("x-middleware-rewrite"), "https://stopshop.test/em-construcao");
    assert.match(response.headers.get("cache-control") ?? "", /private, no-store/);
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.equal(response.headers.get("retry-after"), "3600");
  }
});

test("admin login remains accessible and protected admin pages still redirect", async () => {
  assert.equal((await proxy(request("/admin/login"))).headers.get("x-middleware-next"), "1");
  const response = await proxy(request("/admin/settings?teste=1"));
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "https://stopshop.test/admin/login?next=%2Fadmin%2Fsettings");
});

test("a valid admin session can browse the whole site without shared caching", async () => {
  for (const url of ["/", "/lojas", "/blog/exemplo", "/admin/settings", "/api/stores/search"]) {
    const response = await proxy(request(url, adminToken));
    assert.equal(response.headers.get("x-middleware-next"), "1", url);
    assert.match(response.headers.get("cache-control") ?? "", /private, no-store/);
    assert.equal(response.headers.get("vercel-cdn-cache-control"), "no-store");
  }
});

test("forged, expired and malformed signed sessions do not unlock previews", async () => {
  const key = new TextEncoder().encode(process.env.AUTH_SECRET);
  const expired = await new SignJWT({ userId: 1, email: "admin@example.test" }).setProtectedHeader({ alg: "HS256" }).setExpirationTime(1).sign(key);
  const malformed = await new SignJWT({ userId: "1", email: "admin@example.test" }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1h").sign(key);
  for (const token of ["fake-session", `${adminToken.slice(0, -10)}xxxxxxxxxx`, expired, malformed]) {
    assert.equal((await proxy(request("/lojas", token))).status, 503);
  }
});

test("public data and crawler routes do not disclose content during maintenance", async () => {
  const api = await proxy(request("/api/stores/search?q=teste"));
  assert.equal(api.status, 503);
  assert.match((await api.json()).error, /em construção/);
  for (const url of ["/sitemap.xml", "/llms.txt"]) {
    const response = await proxy(request(url));
    assert.equal(response.status, 503);
    assert.doesNotMatch(await response.text(), /<urlset|Shopping de Moda/);
  }
  assert.equal(await (await proxy(request("/robots.txt"))).text(), "User-agent: *\nDisallow: /\n");
  const post = await proxy(new NextRequest("https://stopshop.test/contato", { method: "POST" }));
  assert.equal(post.status, 503);
});

test("the Blob callback keeps its existing route-level authentication", async () => {
  assert.equal((await proxy(request("/api/admin/upload"))).headers.get("x-middleware-next"), "1");
});

test("publishing and closing take effect on the next request", async () => {
  await db.run(sql`INSERT INTO settings (key, value) VALUES ('sitePublished', 'true')`);
  let response = await proxy(request("/lojas"));
  assert.equal(response.headers.get("x-middleware-next"), "1");
  assert.equal(response.headers.get("x-robots-tag"), null);
  await db.run(sql`UPDATE settings SET value = 'false' WHERE key = 'sitePublished'`);
  assert.equal((await proxy(request("/lojas"))).status, 503);
  await db.run(sql`UPDATE settings SET value = 'invalid' WHERE key = 'sitePublished'`);
  response = await proxy(request("/lojas"));
  assert.equal(response.status, 503);
});

test("an unavailable setting fails closed while administrators retain access", async () => {
  await db.run(sql`DROP TABLE settings`);
  assert.equal((await proxy(request("/lojas"))).status, 503);
  assert.equal((await proxy(request("/lojas", adminToken))).headers.get("x-middleware-next"), "1");
});
