import type { Metadata } from "next";
import { LegalPageContent } from "@/components/pages/LegalPageContent";
import { getLegalPage } from "@/lib/server/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("politica-de-privacidade");
  return { title: page.title, description: page.description };
}

export default async function PoliticaPrivacidadePage() {
  const page = await getLegalPage("politica-de-privacidade");
  return <LegalPageContent page={page} />;
}
