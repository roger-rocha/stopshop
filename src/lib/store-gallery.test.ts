import assert from "node:assert/strict";
import { test } from "node:test";
import { getStoreImages } from "./store-images";
import { matchesStoreSearch, isWholesaleSearch } from "./store-search";
import { storeSchema } from "./validators";

test("legacy stores keep their cover and gallery removes duplicate images", () => {
  const store = { photo: "https://example.com/logo.jpg", storefront: "https://example.com/front.jpg" };
  assert.deepEqual(getStoreImages(store), [store.storefront, store.photo]);
  assert.deepEqual(getStoreImages({ ...store, photos: [store.photo, "https://example.com/product.jpg"] }, true), [store.photo, store.storefront, "https://example.com/product.jpg"]);
  assert.deepEqual(getStoreImages({ photo: "", storefront: null }), []);
});

test("gallery validation accepts empty, preserves order and rejects excessive or unsafe URLs", () => {
  const store = { name: "Loja", slug: "loja", categories: [], segment: "moda", location: "Térreo" };
  assert.deepEqual(storeSchema.parse(store).photos, []);
  const photos = ["https://example.com/b.jpg", "https://example.com/a.jpg"];
  assert.deepEqual(storeSchema.parse({ ...store, photos }).photos, photos);
  assert.equal(storeSchema.safeParse({ ...store, photos: Array(13).fill(photos[0]) }).success, false);
  assert.equal(storeSchema.safeParse({ ...store, photos: ["javascript:alert(1)"] }).success, false);
});

test("search matches description, category and location without accents", () => {
  const store = { name: "Loja Especial", description: "Bolsas e acessórios para festa", location: "Piso Térreo", categories: ["Moda Feminina"] };
  for (const query of ["acessorios", "bolsas festa", "terreo", "moda feminina", " loja ", ""]) assert.equal(matchesStoreSearch(store, query), true, query);
  assert.equal(matchesStoreSearch(store, "calçados"), false);
  assert.equal(isWholesaleSearch(" ATACADO "), true);
  assert.equal(isWholesaleSearch("compras atacadistas"), true);
  assert.equal(matchesStoreSearch({ ...store, description: "Atacado e varejo" }, "atacado"), false);
});
