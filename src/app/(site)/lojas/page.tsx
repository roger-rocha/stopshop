import type { Metadata } from "next";
import { StoreDirectory } from "@/components/pages/StoreDirectory";
import { getAllSegments, getAllStores } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Lojas",
  description:
    "Explore as lojas do Stop Shop, filtre por segmento e encontre marcas de moda, acessórios, alimentação e muito mais em Brusque.",
};

export default async function LojasPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const [{ q }, segments, stores] = await Promise.all([
    searchParams,
    getAllSegments(),
    getAllStores(),
  ]);

  return (
    <div className="pt-24 sm:pt-[120px]">
      <h1 className="sr-only">Lojas do Stop Shop</h1>
      <StoreDirectory
        segments={segments}
        stores={stores}
        initialQuery={q ?? ""}
      />
    </div>
  );
}
