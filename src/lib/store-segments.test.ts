import assert from "node:assert/strict";
import { test } from "node:test";
import { storeBelongsToSegment } from "./store-segments";

test("keeps primary membership and accepts a secondary category", () => {
  const store = { segment: "servicos", categories: ["Farmácia"] };
  assert.equal(storeBelongsToSegment(store, { slug: "servicos", name: "Serviços" }), true);
  assert.equal(storeBelongsToSegment(store, { slug: "farmacia", name: "Farmácia" }), true);
  assert.equal(storeBelongsToSegment(store, { slug: "laboratorio", name: "Laboratório" }), false);
});

test("matches legacy CMS category names after renaming a segment", () => {
  assert.equal(storeBelongsToSegment({ segment: "outro", categories: ["Alimentação"] }, { slug: "alimentacao", name: "Gastronomia" }), true);
  assert.equal(storeBelongsToSegment({ segment: "outro", categories: ["Acessórios e Bolsas"] }, { slug: "acessorios", name: "Presentes e acessórios" }), true);
  assert.equal(storeBelongsToSegment({ segment: "outro", categories: ["Fitness"] }, { slug: "moda-fitness", name: "Moda Fitness" }), true);
});

test("ignores accents and punctuation without using partial matches", () => {
  const segment = { slug: "beleza-e-bem-estar", name: "Beleza e bem-estar" };
  assert.equal(storeBelongsToSegment({ segment: "outro", categories: ["BELEZA E BEM ESTAR"] }, segment), true);
  assert.equal(storeBelongsToSegment({ segment: "outro", categories: ["Beleza"] }, segment), false);
});

test("a store with both primary and secondary membership is counted once", () => {
  const stores = [{ segment: "calcados", categories: ["Calçados", "Calçados femininos"] }];
  assert.equal(stores.filter((store) => storeBelongsToSegment(store, { slug: "calcados", name: "Calçados" })).length, 1);
});
