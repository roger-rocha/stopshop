import { PageHeader } from "../../_components/PageHeader";
import { EventForm } from "../EventForm";

export const metadata = { title: "Novo evento" };

export default function NewEventPage() {
  return (
    <div>
      <PageHeader
        title="Novo evento"
        description="Adicione um banner à Agenda. Informe uma data para incluir o evento no calendário da home e os horários quando estiverem definidos."
        backHref="/admin/agenda"
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <EventForm />
      </div>
    </div>
  );
}
