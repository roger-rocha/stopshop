export const normalizeStoreSearch = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

export const isWholesaleSearch = (query: string) =>
  /\batacad\w*/.test(normalizeStoreSearch(query));

export const retailSearchMessage =
  "O Stop Shop é um shopping de varejo. Explore nossas lojas por nome, produto ou categoria para suas compras.";

type SearchableStore = {
  name: string;
  description: string;
  location: string;
  categories: string[];
};

export function matchesStoreSearch(store: SearchableStore, query: string) {
  const normalized = normalizeStoreSearch(query);
  if (isWholesaleSearch(normalized)) return false;
  const searchable = normalizeStoreSearch(
    [store.name, store.description, store.location, ...store.categories].join(" ")
  );
  return normalized.split(/\s+/).every((term) => searchable.includes(term));
}
