import { notFound } from "next/navigation";
import { legalPageBySlug } from "@/lib/data/legal";
import { getLegalPage } from "@/lib/server/queries";
import { formatDateBR } from "@/lib/utils";
import { PageHeader } from "../../_components/PageHeader";
import { LegalPageForm } from "../LegalPageForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Editar página institucional" };

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditLegalPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = legalPageBySlug(slug);
  if (!entry) notFound();

  const page = await getLegalPage(entry.slug);

  return (
    <div>
      <PageHeader
        title={page.title}
        description={`Última atualização • ${formatDateBR(page.updatedAt)}`}
        backHref="/admin/institucional"
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <LegalPageForm page={page} />
      </div>
    </div>
  );
}
