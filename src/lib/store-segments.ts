import type { Segment, Store } from "@/db/schema";

const normalize = (value: string) => value.normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");

const aliases: Record<string, string[]> = {
  acessorios: ["Acessórios", "Acessórios e Bolsas"],
  alimentacao: ["Alimentação"],
  "moda-fitness": ["Fitness"],
};

export function storeBelongsToSegment(
  store: Pick<Store, "segment" | "categories">,
  segment: Pick<Segment, "slug" | "name">,
) {
  if (store.segment === segment.slug) return true;
  const names = [segment.name, ...(aliases[segment.slug] ?? [])].map(normalize);
  return store.categories.some((category) => names.includes(normalize(category)));
}
