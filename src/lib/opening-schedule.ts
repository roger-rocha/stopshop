import { z } from "zod";

const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Informe um horário válido.");
const date = z.iso.date("Informe uma data válida.");

const entrySchema = z.discriminatedUnion("closed", [
  z.object({ date, label: z.string().trim().max(80), closed: z.literal(true) }),
  z.object({ date, label: z.string().trim().max(80), closed: z.literal(false), opens: time, closes: time })
    .refine((entry) => entry.closes > entry.opens, { message: "O fechamento deve ser depois da abertura.", path: ["closes"] }),
]);

export const openingScheduleSchema = z.object({
  entries: z.array(entrySchema).max(366, "Cadastre até 366 datas.")
    .refine((entries) => new Set(entries.map((entry) => entry.date)).size === entries.length, "Há datas repetidas na agenda."),
});

export type OpeningSchedule = z.infer<typeof openingScheduleSchema>;
export type OpeningDate = OpeningSchedule["entries"][number];

export function shoppingMonth(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit" }).formatToParts(now);
  return `${parts.find((part) => part.type === "year")!.value}-${parts.find((part) => part.type === "month")!.value}`;
}

export function scheduleMonths(entries: OpeningDate[], currentMonth: string) {
  return [...new Set([currentMonth, ...entries.map((entry) => entry.date.slice(0, 7)).filter((month) => month >= currentMonth)])].sort();
}

export function monthLabel(month: string) {
  return new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${month}-01T12:00:00Z`));
}

export function dateLabel(date: string) {
  return new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "2-digit", month: "2-digit", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

/** Sunday-first weeks, with blank cells outside the selected month. */
export function calendarWeeks(month: string) {
  const first = new Date(`${month}-01T12:00:00Z`);
  const days = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
  const cells: (string | null)[] = Array.from({ length: Math.ceil((first.getUTCDay() + days) / 7) * 7 }, (_, index) => {
    const day = index - first.getUTCDay() + 1;
    return day >= 1 && day <= days ? `${month}-${String(day).padStart(2, "0")}` : null;
  });
  return Array.from({ length: cells.length / 7 }, (_, index) => cells.slice(index * 7, index * 7 + 7));
}

export function adjacentMonth(month: string, offset: number) {
  const date = new Date(`${month}-01T12:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + offset);
  return date.toISOString().slice(0, 7);
}
