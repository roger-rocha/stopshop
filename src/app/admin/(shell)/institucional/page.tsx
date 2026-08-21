import Link from "next/link";
import { Pencil, ExternalLink } from "lucide-react";
import { legalPages } from "@/lib/data/legal";
import { getLegalPage } from "@/lib/server/queries";
import { formatDateBR } from "@/lib/utils";
import { PageHeader } from "../_components/PageHeader";

export const dynamic = "force-dynamic";
export const metadata = { title: "Institucional" };

export default async function InstitucionalPage() {
  const pages = await Promise.all(
    legalPages.map((page) => getLegalPage(page.slug))
  );

  return (
    <div>
      <PageHeader
        title="Institucional"
        description="Textos das políticas exibidas no rodapé do site."
      />

      <div className="overflow-hidden rounded-[20px] border border-border-default bg-white shadow-card">
        <table className="w-full text-sm">
          <thead className="bg-surface-soft text-left text-xs uppercase tracking-wider text-text-muted">
            <tr>
              <th className="px-5 py-3 font-medium">Página</th>
              <th className="px-5 py-3 font-medium">Última atualização</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {pages.map((page) => (
              <tr key={page.slug} className="hover:bg-surface-soft/50">
                <td className="px-5 py-3">
                  <span className="font-medium text-text-primary">
                    {page.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-text-muted">
                    /{page.slug}
                  </span>
                </td>
                <td className="px-5 py-3 text-text-secondary">
                  {formatDateBR(page.updatedAt)}
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="inline-flex items-center gap-4">
                    <Link
                      href={`/${page.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-text-primary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Ver
                    </Link>
                    <Link
                      href={`/admin/institucional/${page.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-brand-navy hover:text-brand-coral"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Editar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
