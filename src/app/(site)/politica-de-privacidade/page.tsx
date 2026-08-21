import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PendingContent } from "@/components/pages/PendingContent";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de privacidade do Stop Shop — como tratamos os dados pessoais de quem usa o site.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <PageHero
        eyebrow="Institucional"
        title="Política de Privacidade"
        description="Como o Stop Shop coleta, usa e protege os dados pessoais de quem visita o site."
      />
      <PendingContent note="O texto da política de privacidade será fornecido pela equipe jurídica do Stop Shop." />
    </>
  );
}
