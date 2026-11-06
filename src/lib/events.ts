import type { AgendaEvent } from "@/db/schema";
import { shoppingDate } from "@/lib/opening-schedule";

export type EventStatus = "upcoming" | "active" | "ongoing" | "ended";

// Status é derivado das datas: sem data de início, o evento é permanente
// ("ongoing"); depois da data de fim, ele é "ended" e sai do carrossel.
export function getEventStatus(
  event: Pick<AgendaEvent, "startDate" | "endDate">,
  today = shoppingDate()
): EventStatus {
  // Older records may have an end date without a start date.
  if (event.endDate && today > event.endDate) return "ended";
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

export type AgendaBanner = Pick<AgendaEventWithStatus, "id" | "title" | "image" | "dateLabel" | "ctaHref" | "status">;

export function toAgendaBanners(events: AgendaEvent[], today?: string): AgendaBanner[] {
  return withEventStatus(events, today)
    .filter((event) => event.status !== "ended")
    .map(({ id, title, image, dateLabel, ctaHref, status }) => ({ id, title, image, dateLabel, ctaHref, status }));
}

export function withEventStatus(
  events: AgendaEvent[],
  today?: string
): AgendaEventWithStatus[] {
  return events.map((event) => ({
    ...event,
    status: getEventStatus(event, today),
  }));
}
