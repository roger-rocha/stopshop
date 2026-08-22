import type { Metadata } from "next";
import { LegalPageContent } from "@/components/pages/LegalPageContent";
import { getLegalPage } from "@/lib/server/queries";

// Pré-renderizada no build. As ações do admin já chamam revalidatePath, mas a
// janela cobre escrita feita fora do painel (script de conteúdo, edição direta
// no banco), que senão só apareceria no deploy seguinte.
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("politica-de-cookies");
  return { title: page.title, description: page.description };
}

export default async function PoliticaCookiesPage() {
  const page = await getLegalPage("politica-de-cookies");
  return <LegalPageContent page={page} />;
}
