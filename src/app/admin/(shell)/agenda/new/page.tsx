import { PageHeader } from "../../_components/PageHeader";
import { EventForm } from "../EventForm";

export const metadata = { title: "Novo evento" };

export default function NewEventPage() {
  return (
    <div>
      <PageHeader
        title="Novo evento"
        description="Adicione uma ação ou evento ao carrossel da Agenda na home."
        backHref="/admin/agenda"
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <EventForm />
      </div>
    </div>
  );
}
