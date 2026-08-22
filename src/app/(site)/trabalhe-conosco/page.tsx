import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { TrabalheConoscoPaths } from "@/components/pages/TrabalheConoscoPaths";
import { getPublishedJobOpenings } from "@/lib/server/queries";

// Pré-renderizada no build. As ações do admin já chamam revalidatePath, mas a
// janela cobre escrita feita fora do painel (script de conteúdo, edição direta
// no banco), que senão só apareceria no deploy seguinte.
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Trabalhe Conosco",
  description:
    "Vagas na administração do Stop Shop e nas lojas do shopping em Brusque, SC.",
};

export default async function TrabalheConoscoPage() {
  const jobs = await getPublishedJobOpenings();

  return (
    <>
      <PageHero
        eyebrow="Institucional"
        title="Trabalhe conosco"
        description="Escolha por onde quer começar: as vagas da administração do Stop Shop ou as oportunidades abertas pelas lojas do shopping."
      />
      <TrabalheConoscoPaths jobs={jobs} />
    </>
  );
}
