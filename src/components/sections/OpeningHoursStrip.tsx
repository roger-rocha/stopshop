"use client";

import { useState } from "react";
import { CalendarDays, Clock, ArrowUpRight, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { adjacentMonth, calendarWeeks, dateLabel, monthLabel, scheduleMonths, type OpeningDate, type OpeningSchedule } from "@/lib/opening-schedule";

const weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

function hoursLabel(entry: OpeningDate) {
  return entry.closed ? "Fechado" : `${entry.opens.replace(":00", "h").replace(":", "h")} às ${entry.closes.replace(":00", "h").replace(":", "h")}`;
}

export function OpeningHoursStrip({ schedule, currentMonth, regularHours, whatsapp }: {
  schedule: OpeningSchedule;
  currentMonth: string;
  regularHours: string;
  whatsapp: string;
}) {
  const [month, setMonth] = useState(currentMonth);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const months = [...new Set([...scheduleMonths(schedule.entries, currentMonth), month])].sort();
  const entries = new Map(schedule.entries.map((entry) => [entry.date, entry]));
  const dates = schedule.entries.filter((entry) => entry.date.startsWith(month)).sort((a, b) => a.date.localeCompare(b.date));
  const activeDate = selectedDate?.startsWith(month) ? selectedDate : dates[0]?.date ?? null;
  const activeEntry = activeDate ? entries.get(activeDate) : undefined;

  function changeMonth(next: string) {
    setMonth(next);
    setSelectedDate(null);
  }

  return (
    <section id="horarios" aria-labelledby="opening-schedule-title" className="bg-white scroll-mt-28">
      <div className="mx-auto max-w-7xl px-[var(--spacing-section-x)] py-8 sm:py-10">
        <div className="overflow-hidden rounded-2xl border border-border-default bg-surface-soft lg:grid lg:grid-cols-[1fr_1.6fr]">
          <div className="p-6 sm:p-8">
            <CalendarDays aria-hidden="true" className="mb-4 h-7 w-7 text-brand-coral" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-coral">Planeje sua visita</p>
            <h2 id="opening-schedule-title" className="mt-2 font-display text-2xl font-bold text-text-primary sm:text-3xl">Calendário de funcionamento</h2>
            <div className="mt-5 flex items-start gap-2 text-sm text-text-secondary">
              <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              <div><p className="font-semibold text-text-primary">Horário habitual</p><p className="mt-1">{regularHours}</p></div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">Veja os domingos, feriados e outras datas especiais. Selecione um dia no calendário para conferir os detalhes.</p>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy underline-offset-4 hover:underline">Consultar atendimento <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>
          </div>

          <div className="min-w-0 border-t border-border-default bg-white p-4 sm:p-8 lg:border-l lg:border-t-0">
            <div className="mb-5 flex items-center justify-between gap-2">
              <button type="button" aria-label="Mês anterior" onClick={() => changeMonth(adjacentMonth(month, -1))} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-soft hover:text-brand-navy focus-visible:outline-brand-coral"><ChevronLeft aria-hidden="true" className="h-5 w-5" /></button>
              <label className="relative min-w-0 text-center">
                <span className="sr-only">Mês da agenda</span>
                <select value={month} onChange={(event) => changeMonth(event.target.value)} className="w-full appearance-none rounded-lg bg-white py-2 pl-2 pr-7 font-body text-base font-semibold capitalize text-text-primary focus-visible:outline-brand-coral">
                  {months.map((item) => <option key={item} value={item} aria-label={monthLabel(item)}>{monthLabel(item).split(" de ")[0]}</option>)}
                </select>
                <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
              </label>
              <button type="button" aria-label="Próximo mês" onClick={() => changeMonth(adjacentMonth(month, 1))} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-text-secondary hover:bg-surface-soft hover:text-brand-navy focus-visible:outline-brand-coral"><ChevronRight aria-hidden="true" className="h-5 w-5" /></button>
            </div>

            <table className="w-full table-fixed border-separate border-spacing-1" aria-label={`Calendário de ${monthLabel(month)}`}>
              <thead><tr>{weekdays.map((day) => <th key={day} scope="col" className="pb-2 text-center text-[11px] font-medium text-text-secondary"><abbr title={day} className="no-underline">{day.slice(0, 3)}</abbr></th>)}</tr></thead>
              <tbody>
                {calendarWeeks(month).map((week, index) => <tr key={index}>
                  {week.map((date, column) => {
                    const entry = date ? entries.get(date) : undefined;
                    return <td key={date ?? `blank-${column}`} className="p-0 align-top">
                      {date && <button type="button" onClick={() => setSelectedDate(date)} aria-pressed={activeDate === date} aria-label={`${dateLabel(date)} de ${month.slice(0, 4)}. ${entry ? hoursLabel(entry) : "Consultar detalhes"}${entry?.label ? `. ${entry.label}` : ""}`} className={`flex min-h-12 w-full flex-col items-center justify-center gap-1.5 rounded-lg py-2 font-body text-sm tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy ${activeDate === date ? "bg-brand-navy font-semibold text-white" : entry?.closed ? "bg-red-50 text-red-700 hover:bg-red-100" : entry ? "bg-brand-coral/10 font-semibold text-brand-coral hover:bg-brand-coral/20" : "text-text-secondary hover:bg-surface-soft"}`}>
                        <span>{Number(date.slice(-2))}</span>
                        {entry ? <span aria-hidden="true" className={`h-1 w-1 rounded-full ${activeDate === date ? "bg-white" : entry.closed ? "bg-red-600" : "bg-brand-coral"}`} /> : <span aria-hidden="true" className="h-1" />}
                      </button>}
                    </td>;
                  })}
                </tr>)}
              </tbody>
            </table>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-text-secondary">
              <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-coral" />Horário cadastrado</span>
              <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-red-600" />Fechado</span>
            </div>
            <div aria-live="polite" aria-atomic="true" className="mt-5 min-h-28 border-t border-border-default pt-5">
              {activeDate ? <>
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                  <p className="text-sm font-medium text-text-secondary first-letter:uppercase">{dateLabel(activeDate)}</p>
                  {activeEntry && <p className={`font-body text-xl font-semibold tracking-tight tabular-nums ${activeEntry.closed ? "text-red-700" : "text-brand-navy"}`}>{hoursLabel(activeEntry)}</p>}
                </div>
                {activeEntry ? activeEntry.label && <p className="mt-2 text-sm text-text-secondary">{activeEntry.label}</p> : <p className="mt-2 text-sm leading-relaxed text-text-secondary">Não há horário específico cadastrado para esta data. Para domingos e feriados, confirme com nosso atendimento.</p>}
              </> : <p className="text-sm leading-relaxed text-text-secondary">As datas especiais de {monthLabel(month)} ainda não foram divulgadas. Consulte nosso atendimento para confirmar sua visita em domingos e feriados.</p>}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-text-secondary">Os destaques indicam as datas cadastradas. Os horários podem variar de acordo com a loja.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
