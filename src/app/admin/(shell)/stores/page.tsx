import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAllStores } from "@/lib/server/queries";
import { PageHeader } from "../_components/PageHeader";

export const dynamic = "force-dynamic";
export const metadata = { title: "Lojas" };

export default async function StoresPage() {
  const stores = await getAllStores();

  return (
    <div>
      <PageHeader
        title="Lojas"
        description={`${stores.length} lojas cadastradas`}
        action={
          <Link
            href="/admin/stores/new"
            className="inline-flex items-center gap-2 rounded-button bg-brand-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90"
          >
            <Plus className="h-4 w-4" />
            Nova loja
          </Link>
        }
      />

      <div className="overflow-hidden rounded-[20px] border border-border-default bg-white shadow-card">
        {stores.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-medium text-text-primary">Nenhuma loja cadastrada.</p>
            <p className="mt-1 text-sm text-text-secondary">
              Clique em &quot;Nova loja&quot; para adicionar a primeira.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-soft text-left text-xs uppercase tracking-wider text-text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Nome</th>
                  <th className="px-5 py-3 font-medium">Segmento</th>
                  <th className="px-5 py-3 font-medium">Localização</th>
                  <th className="px-5 py-3 font-medium">Destaque</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {stores.map((store) => (
                  <tr key={store.id} className="hover:bg-surface-soft/50">
                    <td className="px-5 py-3 font-medium text-text-primary">
                      {store.name}
                      <span className="ml-2 text-xs text-text-muted">/{store.slug}</span>
                    </td>
                    <td className="px-5 py-3 text-text-secondary">{store.segment}</td>
                    <td className="px-5 py-3 text-text-secondary">{store.location}</td>
                    <td className="px-5 py-3">
                      {store.featured ? (
                        <span className="inline-flex rounded-pill bg-brand-coral/10 px-2 py-0.5 text-xs font-medium text-brand-coral">
                          Sim
                        </span>
                      ) : (
                        <span className="text-xs text-text-muted">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/stores/${store.id}`}
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
