import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PendingContent } from "@/components/pages/PendingContent";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Serviços e comodidades disponíveis para quem visita o Stop Shop em Brusque, SC.",
};

export default function ServicosPage() {
  return (
    <>
      <PageHero
        eyebrow="Serviços"
        title="Comodidades para a sua visita"
        description="Estrutura pensada para deixar a experiência de compra mais confortável e prática."
      />
      <PendingContent note="A lista de serviços ainda será definida junto à equipe do Stop Shop." />
    </>
  );
}
