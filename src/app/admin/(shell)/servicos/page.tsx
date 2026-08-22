import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAllServices } from "@/lib/server/queries";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/PageHeader";

export const dynamic = "force-dynamic";
export const metadata = { title: "Serviços" };

export default async function ServicosAdminPage() {
  const services = await getAllServices();
  const published = services.filter((service) => service.published).length;

  return (
    <div>
      <PageHeader
        title="Serviços"
        description={`${services.length} cadastrados • ${published} publicados`}
        action={
          <Link
            href="/admin/servicos/new"
            className="inline-flex items-center gap-2 rounded-button bg-brand-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90"
          >
            <Plus className="h-4 w-4" />
            Novo serviço
          </Link>
        }
      />

      <div className="overflow-hidden rounded-[20px] border border-border-default bg-white shadow-card">
        {services.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-medium text-text-primary">
              Nenhum serviço cadastrado.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Sem serviços, a página /servicos mostra apenas um aviso de conteúdo
              em preparação.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-soft text-left text-xs uppercase tracking-wider text-text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Serviço</th>
                  <th className="px-5 py-3 font-medium">Categoria</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {services.map((service) => (
                    <tr key={service.id} className="hover:bg-surface-soft/50">
                      <td className="px-5 py-3">
                        <span className="flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-button bg-brand-coral/10 text-brand-coral">
                            <ServiceIcon name={service.icon} className="h-4 w-4" />
                          </span>
                          <span className="font-medium text-text-primary">
                            {service.name}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-3 text-text-secondary">
                        {service.category || "—"}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={cn(
                            "inline-flex rounded-pill px-2 py-0.5 text-xs font-medium",
                            service.published
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-surface-muted text-text-muted"
                          )}
                        >
                          {service.published ? "Publicado" : "Rascunho"}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Link
                          href={`/admin/servicos/${service.id}`}
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
