import type { AgendaEvent } from "@/db/schema";

export type EventStatus = "upcoming" | "active" | "ongoing" | "ended";

// Status é derivado das datas: sem data de início, o evento é permanente
// ("ongoing"); depois da data de fim, ele é "ended" e some da home.
export function getEventStatus(
  event: Pick<AgendaEvent, "startDate" | "endDate">,
  today = new Date().toISOString().slice(0, 10)
): EventStatus {
  if (!event.startDate) return "ongoing";
  if (today < event.startDate) return "upcoming";
  const end = event.endDate ?? event.startDate;
  if (today > end) return "ended";
  return "active";
}

export const eventStatusLabel: Record<EventStatus, string> = {
  upcoming: "Próximo",
  active: "Em cartaz",
  ongoing: "Em cartaz",
  ended: "Encerrado",
};

export type AgendaEventWithStatus = AgendaEvent & { status: EventStatus };

export function withEventStatus(
  events: AgendaEvent[],
  today?: string
): AgendaEventWithStatus[] {
  return events.map((event) => ({
    ...event,
    status: getEventStatus(event, today),
  }));
}
