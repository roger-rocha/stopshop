import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PendingContent } from "@/components/pages/PendingContent";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a história do Stop Shop, o ninho da moda de Brusque, com mais de 160 marcas de moda em um só lugar.",
};

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre"
        title="O ninho da moda de Brusque"
        description="São mais de 30 anos reunindo marcas de moda, atacado e varejo em um único endereço."
      />
      <PendingContent note="O texto institucional desta página está sendo finalizado pela equipe do Stop Shop." />
    </>
  );
}
