import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PendingContent } from "@/components/pages/PendingContent";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Política de cookies do Stop Shop — quais cookies o site utiliza e para quê.",
};

export default function PoliticaCookiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Institucional"
        title="Política de Cookies"
        description="Quais cookies o site do Stop Shop utiliza e como você pode gerenciá-los."
      />
      <PendingContent note="O texto da política de cookies será fornecido pela equipe jurídica do Stop Shop." />
    </>
  );
}
