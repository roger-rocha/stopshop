import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAllSegments } from "@/lib/server/queries";
import { PageHeader } from "../_components/PageHeader";

export const dynamic = "force-dynamic";
export const metadata = { title: "Segmentos" };

export default async function SegmentsPage() {
  const segments = await getAllSegments();

  return (
    <div>
      <PageHeader
        title="Segmentos"
        description={`${segments.length} segmentos cadastrados`}
        action={
          <Link
            href="/admin/segments/new"
            className="inline-flex items-center gap-2 rounded-button bg-brand-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90"
          >
            <Plus className="h-4 w-4" />
            Novo segmento
          </Link>
        }
      />

      <div className="overflow-hidden rounded-[20px] border border-border-default bg-white shadow-card">
        {segments.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-medium text-text-primary">Nenhum segmento cadastrado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-soft text-left text-xs uppercase tracking-wider text-text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Nome</th>
                  <th className="px-5 py-3 font-medium">Slug</th>
                  <th className="px-5 py-3 font-medium">Cor</th>
                  <th className="px-5 py-3 font-medium">Lojas</th>
                  <th className="px-5 py-3 font-medium">Ordem</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {segments.map((segment) => (
                  <tr key={segment.id} className="hover:bg-surface-soft/50">
                    <td className="px-5 py-3 font-medium text-text-primary">
                      {segment.name}
                    </td>
                    <td className="px-5 py-3 text-text-secondary">{segment.slug}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="h-4 w-4 rounded-full border border-border-default"
                          style={{ backgroundColor: segment.color }}
                          aria-hidden="true"
                        />
                        <span className="text-xs text-text-muted">{segment.color}</span>
                      </span>
                    </td>
                    <td className="px-5 py-3 text-text-secondary">{segment.storeCount}</td>
                    <td className="px-5 py-3 text-text-secondary">{segment.position}</td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/segments/${segment.id}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-brand-navy hover:text-brand-coral"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
