import assert from "node:assert/strict";
import { test } from "node:test";
import { slugFromForm, slugify } from "../src/lib/slug";
import { storeSchema } from "../src/lib/validators";

test("slugify turns store names typed by the client into valid slugs", () => {
  assert.equal(slugify("ÉFATA PLUS"), "efata-plus");
  assert.equal(slugify("Rota da Linguiça"), "rota-da-linguica");
  assert.equal(slugify("  Tex Wear "), "tex-wear");
  assert.equal(slugify("Baby&H Store"), "baby-e-h-store");
  assert.equal(slugify("Olho D'Água"), "olho-d-agua");
});

test("an empty slug falls back to the name", () => {
  assert.equal(slugFromForm("", "Pipoca da Villa"), "pipoca-da-villa");
  assert.equal(slugFromForm(null, "Milk Moo"), "milk-moo");
  assert.equal(slugFromForm("Clinica Stella", "Outro"), "clinica-stella");
});

test("client-typed store data passes validation once the slug is normalized", () => {
  const parsed = storeSchema.safeParse({
    name: "Éfata Plus",
    slug: slugFromForm("Éfata Plus", "Éfata Plus"),
    photo: "",
    storefront: "",
    photos: [],
    description: "",
    instagram: "@efataplus",
    categories: "",
    segment: "moda-feminina",
    phone: "",
    whatsapp: "",
    location: "Sala 30 - Piso Térreo",
    floor: "Térreo",
    featured: null,
  });
  assert.equal(parsed.success, true);
});

test("unique violations are detected through Drizzle's wrapped error", async () => {
  const { isUniqueViolation } = await import("../src/lib/server/db-errors");
  const cause = Object.assign(new Error("SQLITE_CONSTRAINT: UNIQUE constraint failed: stores.slug"), { code: "SQLITE_CONSTRAINT_UNIQUE" });
  const wrapped = new Error("Failed query: insert into \"stores\" ...", { cause });
  assert.equal(isUniqueViolation(wrapped), true);
  assert.equal(isUniqueViolation(new Error("Failed query", { cause: new Error("network") })), false);
  assert.equal(isUniqueViolation("nope"), false);
});

test("position errors are in Portuguese", async () => {
  const { galleryImageSchema } = await import("../src/lib/validators");
  const parsed = galleryImageSchema.safeParse({ image: "https://x/y.png", alt: "Foto", position: "-1" });
  assert.equal(parsed.success, false);
  assert.equal(parsed.error?.issues[0]?.message, "Use um número igual ou maior que zero.");
});
