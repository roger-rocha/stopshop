import type { AgendaEvent } from "@/db/schema";

/** Only the fields shown in the public calendar; description is an internal note. */
export type CalendarEvent = Pick<AgendaEvent,
  "id" | "title" | "image" | "startDate" | "endDate" | "startTime" | "endTime" | "position"
>;

export function toCalendarEvents(events: AgendaEvent[]): CalendarEvent[] {
  return events.filter((event) => event.startDate).map((event) => ({
    id: event.id,
    title: event.title,
    image: event.image,
    startDate: event.startDate,
    endDate: event.endDate,
    startTime: event.startTime,
    endTime: event.endTime,
    position: event.position,
  }));
}

/** The end date is inclusive; a missing end date means a single-day event. */
export function eventsOnDate(events: CalendarEvent[], date: string): CalendarEvent[] {
  return events.filter((event) => event.startDate && event.startDate <= date && (event.endDate || event.startDate) >= date)
    .sort((a, b) => (a.startTime || "24:00").localeCompare(b.startTime || "24:00") || a.position - b.position || a.id - b.id);
}

export function eventMonths(events: CalendarEvent[]): string[] {
  const months = new Set<string>();
  for (const event of events) {
    if (!event.startDate) continue;
    const [startYear, startMonth] = event.startDate.split("-").map(Number);
    const [endYear, endMonth] = (event.endDate || event.startDate).split("-").map(Number);
    for (let index = startYear * 12 + startMonth - 1; index <= endYear * 12 + endMonth - 1; index++) {
      months.add(`${String(Math.floor(index / 12)).padStart(4, "0")}-${String(index % 12 + 1).padStart(2, "0")}`);
    }
  }
  return [...months].sort();
}

export function eventTimeLabel(event: Pick<CalendarEvent, "startTime" | "endTime">): string {
  if (!event.startTime || !event.endTime) return "Horário a confirmar";
  const format = (time: string) => time.endsWith(":00") ? `${time.slice(0, 2)}h` : time.replace(":", "h");
  return `${format(event.startTime)} às ${format(event.endTime)}`;
}
