import { NextResponse } from "next/server";
import { getAllStores } from "@/lib/server/queries";

// Lista enxuta para o autocomplete de busca (nome, slug, segmento, categorias).
// Cacheada por 5 min — a lista de lojas muda raramente.
export const revalidate = 300;

export async function GET() {
  const stores = await getAllStores();
  const list = stores.map((s) => ({
    name: s.name,
    slug: s.slug,
    segment: s.segment,
    categories: s.categories,
    location: s.location,
  }));
  return NextResponse.json(list);
}
