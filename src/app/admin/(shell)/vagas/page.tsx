import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAllJobOpenings } from "@/lib/server/queries";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/PageHeader";

export const dynamic = "force-dynamic";
export const metadata = { title: "Vagas" };

const areaLabel: Record<string, string> = {
  "stop-shop": "Stop Shop",
  lojistas: "Lojas do shopping",
};

export default async function VagasPage() {
  const jobs = await getAllJobOpenings();
  const published = jobs.filter((job) => job.published).length;

  return (
    <div>
      <PageHeader
        title="Vagas"
        description={`${jobs.length} cadastradas • ${published} publicadas`}
        action={
          <Link
            href="/admin/vagas/new"
            className="inline-flex items-center gap-2 rounded-button bg-brand-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90"
          >
            <Plus className="h-4 w-4" />
            Nova vaga
          </Link>
        }
      />

      <div className="overflow-hidden rounded-[20px] border border-border-default bg-white shadow-card">
        {jobs.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-medium text-text-primary">
              Nenhuma vaga cadastrada.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Enquanto não houver vagas, a página Trabalhe Conosco mostra o convite
              para enviar currículo.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-soft text-left text-xs uppercase tracking-wider text-text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Vaga</th>
                  <th className="px-5 py-3 font-medium">Onde aparece</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-surface-soft/50">
                    <td className="px-5 py-3">
                      <span className="font-medium text-text-primary">
                        {job.title}
                      </span>
                      {job.company && (
                        <span className="mt-0.5 block text-xs text-text-muted">
                          {job.company}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-text-secondary">
                      {areaLabel[job.area] ?? job.area}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={cn(
                          "inline-flex rounded-pill px-2 py-0.5 text-xs font-medium",
                          job.published
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-surface-muted text-text-muted"
                        )}
                      >
                        {job.published ? "Publicada" : "Rascunho"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/vagas/${job.id}`}
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
