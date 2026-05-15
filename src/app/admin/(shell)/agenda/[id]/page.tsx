import { notFound } from "next/navigation";
import { getEventById } from "@/lib/server/queries";
import { deleteEventAction } from "@/lib/server/actions/events";
import { PageHeader } from "../../_components/PageHeader";
import { EventForm } from "../EventForm";
import { DeleteButton } from "../../_components/DeleteButton";

export const metadata = { title: "Editar evento" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: PageProps) {
  const { id } = await params;
  const eventId = Number(id);
  if (!Number.isInteger(eventId)) notFound();

  const event = await getEventById(eventId);
  if (!event) notFound();

  const handleDelete = deleteEventAction.bind(null, eventId);

  return (
    <div>
      <PageHeader
        title={event.title}
        description={`Editando • ${event.dateLabel}`}
        backHref="/admin/agenda"
        action={
          <DeleteButton
            action={handleDelete}
            confirmMessage={`Tem certeza que deseja excluir "${event.title}"?`}
          />
        }
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <EventForm event={event} />
      </div>
    </div>
  );
}
