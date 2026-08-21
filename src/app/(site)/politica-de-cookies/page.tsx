import type { Metadata } from "next";
import { LegalPageContent } from "@/components/pages/LegalPageContent";
import { getLegalPage } from "@/lib/server/queries";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("politica-de-cookies");
  return { title: page.title, description: page.description };
}

export default async function PoliticaCookiesPage() {
  const page = await getLegalPage("politica-de-cookies");
  return <LegalPageContent page={page} />;
}
