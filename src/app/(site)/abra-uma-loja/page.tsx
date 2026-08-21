import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PendingContent } from "@/components/pages/PendingContent";

export const metadata: Metadata = {
  title: "Abra uma loja",
  description:
    "Quer abrir uma loja no Stop Shop? Fale com o time comercial e conheça as oportunidades disponíveis.",
};

export default function AbraUmaLojaPage() {
  return (
    <>
      <PageHero
        eyebrow="Abra uma loja"
        title="Faça parte do ninho da moda"
        description="Converse com o nosso time comercial e conheça as oportunidades para instalar a sua marca no Stop Shop."
        actions={[{ label: "Falar com o comercial", href: "/contato" }]}
      />
      <PendingContent note="As informações sobre disponibilidade de lojas e condições comerciais ainda serão definidas." />
    </>
  );
}
