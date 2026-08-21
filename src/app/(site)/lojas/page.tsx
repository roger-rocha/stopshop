import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { StoreDirectory } from "@/components/pages/StoreDirectory";
import { getAllSegments, getAllStores } from "@/lib/server/queries";
import { storeOpeningHours } from "@/lib/site";

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
    <>
      <PageHero
        eyebrow="Lojas"
        title="Mais de 160 marcas em um só lugar"
        description="Explore o guia de compras do Stop Shop, descubra segmentos, compare opções e planeje a sua visita com mais praticidade."
        actions={[
          { label: "Ver localização", href: "/localizacao", variant: "secondary" },
          { label: "Falar com a equipe", href: "/contato", variant: "ghost" },
        ]}
        stats={[
          { label: "Marcas e operações", value: `${stores.length}+` },
          { label: "Segmentos para explorar", value: String(segments.length) },
        ]}
      >
        <div className="mb-5 rounded-2xl border border-border-default bg-surface-soft px-5 py-4">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-coral">
            Horário das lojas
          </p>
          <p className="mt-2 text-base font-medium text-text-primary">
            {storeOpeningHours.title}
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {storeOpeningHours.weekdays}
          </p>
          <p className="text-sm text-text-secondary">
            {storeOpeningHours.sunday}
          </p>
        </div>
      </PageHero>
      <StoreDirectory
        segments={segments}
        stores={stores}
        initialQuery={q ?? ""}
      />
    </>
  );
}
