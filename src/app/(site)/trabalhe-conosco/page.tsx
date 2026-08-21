import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { TrabalheConoscoPaths } from "@/components/pages/TrabalheConoscoPaths";

export const metadata: Metadata = {
  title: "Trabalhe Conosco",
  description:
    "Vagas na administração do Stop Shop e nas lojas do shopping em Brusque, SC.",
};

export default function TrabalheConoscoPage() {
  return (
    <>
      <PageHero
        eyebrow="Institucional"
        title="Trabalhe conosco"
        description="Escolha por onde quer começar: as vagas da administração do Stop Shop ou as oportunidades abertas pelas lojas do shopping."
      />
      <TrabalheConoscoPaths />
    </>
  );
}
