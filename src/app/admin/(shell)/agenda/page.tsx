import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAllEvents } from "@/lib/server/queries";
import { getEventStatus, eventStatusLabel } from "@/lib/events";
import { cn } from "@/lib/utils";
import { PageHeader } from "../_components/PageHeader";

export const dynamic = "force-dynamic";
export const metadata = { title: "Agenda" };

export default async function AgendaPage() {
  const events = await getAllEvents();

  return (
    <div>
      <PageHeader
        title="Agenda"
        description={`${events.length} eventos cadastrados`}
        action={
          <Link
            href="/admin/agenda/new"
            className="inline-flex items-center gap-2 rounded-button bg-brand-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90"
          >
            <Plus className="h-4 w-4" />
            Novo evento
          </Link>
        }
      />

      <div className="overflow-hidden rounded-[20px] border border-border-default bg-white shadow-card">
        {events.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="font-medium text-text-primary">
              Nenhum evento cadastrado.
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              Clique em &quot;Novo evento&quot; para criar o primeiro.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-soft text-left text-xs uppercase tracking-wider text-text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Evento</th>
                  <th className="px-5 py-3 font-medium">Data</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-default">
                {events.map((event) => {
                  const status = getEventStatus(event);
                  return (
                    <tr key={event.id} className="hover:bg-surface-soft/50">
                      <td className="px-5 py-3 font-medium text-text-primary">
                        {event.title}
                      </td>
                      <td className="px-5 py-3 text-text-secondary">
                        {event.dateLabel}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={cn(
                            "inline-flex rounded-pill px-2 py-0.5 text-xs font-medium",
                            status === "ended"
                              ? "bg-surface-muted text-text-muted"
                              : status === "upcoming"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-emerald-100 text-emerald-700"
                          )}
                        >
                          {eventStatusLabel[status]}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Link
                          href={`/admin/agenda/${event.id}`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-brand-navy hover:text-brand-coral"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Editar
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
