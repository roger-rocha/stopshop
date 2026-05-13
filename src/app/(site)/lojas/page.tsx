import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { StoreDirectory } from "@/components/pages/StoreDirectory";
import { getAllSegments, getAllStores } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Lojas",
  description:
    "Explore as lojas do Stop Shop, filtre por segmento e encontre marcas de moda, acessórios, alimentação e muito mais em Brusque.",
};

export default async function LojasPage() {
  const [segments, stores] = await Promise.all([
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
          { label: "Funcionamento", value: "09h - 19h" },
        ]}
      />
      <StoreDirectory segments={segments} stores={stores} />
    </>
  );
}
