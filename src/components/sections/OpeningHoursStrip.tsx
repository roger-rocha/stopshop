"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarDays, Clock, ArrowUpRight, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { adjacentMonth, calendarWeeks, dateLabel, monthLabel, scheduleMonths, type OpeningDate, type OpeningSchedule } from "@/lib/opening-schedule";
import { eventMonths, eventsOnDate, eventTimeLabel, type CalendarEvent } from "@/lib/event-calendar";
import styles from "./OpeningHoursStrip.module.css";

const weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

function hoursLabel(entry: OpeningDate) {
  return entry.closed ? "Fechado" : `${entry.opens.replace(":00", "h").replace(":", "h")} às ${entry.closes.replace(":00", "h").replace(":", "h")}`;
}

function selectedDateLabel(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long", day: "numeric", month: "long", timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

function EventCard({ event }: { event: CalendarEvent }) {
  return (
    <article className={styles.eventCard}>
      <div className={styles.eventArtwork}>
        <Image src={event.image} alt={event.title} fill sizes="(min-width: 1280px) 776px, (min-width: 1024px) 60vw, 90vw" className={styles.eventImage} />
      </div>
      <div className={styles.eventInfo}>
        <h4 className={styles.eventTitle}>{event.title}</h4>
        <p className={styles.eventTime}><Clock aria-hidden="true" size={15} />{eventTimeLabel(event)}</p>
      </div>
    </article>
  );
}

export function OpeningHoursStrip({ schedule, events, currentMonth, regularHours, whatsapp }: {
  schedule: OpeningSchedule;
  events: CalendarEvent[];
  currentMonth: string;
  regularHours: string;
  whatsapp: string;
}) {
  const [month, setMonth] = useState(currentMonth);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const months = [...new Set([...scheduleMonths(schedule.entries, currentMonth), ...eventMonths(events), month])].sort();
  const entries = new Map(schedule.entries.map((entry) => [entry.date, entry]));
  const weeks = calendarWeeks(month);
  const days = weeks.flat().filter((date): date is string => date !== null);
  const dailyEvents = new Map(days.map((date) => [date, eventsOnDate(events, date)]));
  const firstEventDate = days.find((date) => dailyEvents.get(date)!.length > 0);
  const firstMarkedDate = firstEventDate ?? days.find((date) => entries.has(date));
  const activeDate = selectedDate?.startsWith(month) ? selectedDate : firstMarkedDate ?? null;
  const activeEntry = activeDate ? entries.get(activeDate) : undefined;
  const activeEvents = activeDate ? dailyEvents.get(activeDate) ?? [] : [];

  function changeMonth(next: string) {
    setMonth(next);
    setSelectedDate(null);
  }

  const daySummary = activeDate
    ? `${selectedDateLabel(activeDate)}. ${activeEvents.length} ${activeEvents.length === 1 ? "evento" : "eventos"}.${activeEntry ? ` Shopping: ${hoursLabel(activeEntry)}.` : ""}`
    : `Calendário de ${monthLabel(month)}. Selecione um dia para consultar a programação.`;

  return (
    <section id="horarios" aria-labelledby="opening-schedule-title" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}><span aria-hidden="true" />Agenda Stop Shop</p>
            <h2 id="opening-schedule-title" className={styles.title}>Programe sua <span>visita.</span></h2>
          </div>
          <p className={styles.intro}>Escolha um dia e confira os eventos<br className={styles.desktopBreak} /> e horários do shopping.</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.calendarColumn}>
            <div className={styles.calendar}>
              <div className={styles.calendarTopline}>
                <span><CalendarDays size={15} aria-hidden="true" />Calendário</span>
                <span>{month.slice(0, 4)}</span>
              </div>
              <div className={styles.monthNavigation}>
                <button type="button" aria-label="Mês anterior" onClick={() => changeMonth(adjacentMonth(month, -1))} className={styles.monthButton}><ChevronLeft size={19} aria-hidden="true" /></button>
                <label className={styles.monthPicker}>
                  <span className="sr-only">Mês da agenda</span>
                  <select value={month} onChange={(event) => changeMonth(event.target.value)}>
                    {months.map((item) => <option key={item} value={item} aria-label={monthLabel(item)}>{monthLabel(item).split(" de ")[0]}</option>)}
                  </select>
                  <ChevronDown size={15} aria-hidden="true" />
                </label>
                <button type="button" aria-label="Próximo mês" onClick={() => changeMonth(adjacentMonth(month, 1))} className={styles.monthButton}><ChevronRight size={19} aria-hidden="true" /></button>
              </div>

              <table className={styles.calendarTable} aria-label={`Calendário de ${monthLabel(month)}`}>
                <thead><tr>{weekdays.map((day) => <th key={day} scope="col"><abbr title={day}>{day.slice(0, 3)}</abbr></th>)}</tr></thead>
                <tbody>{weeks.map((week, index) => <tr key={index}>
                  {week.map((date, column) => {
                    const entry = date ? entries.get(date) : undefined;
                    const eventCount = date ? dailyEvents.get(date)!.length : 0;
                    const selected = activeDate === date;
                    return <td key={date ?? `blank-${column}`}>
                      {date && <button
                        type="button"
                        onClick={() => setSelectedDate(date)}
                        aria-pressed={selected}
                        aria-controls="calendar-day-details"
                        aria-label={`${dateLabel(date)} de ${month.slice(0, 4)}. ${eventCount ? `${eventCount} ${eventCount === 1 ? "evento" : "eventos"}. ` : ""}${entry ? `Shopping: ${hoursLabel(entry)}` : "Consultar detalhes"}${entry?.label ? `. ${entry.label}` : ""}`}
                        data-selected={selected || undefined}
                        data-event={eventCount > 0 || undefined}
                        data-closed={entry?.closed || undefined}
                        className={styles.day}
                      >
                        <span>{Number(date.slice(-2))}</span>
                        <span aria-hidden="true" className={styles.dayMarkers}>
                          {eventCount > 0 && <span className={styles.eventDot} />}
                          {entry && <span className={entry.closed ? styles.closedDot : styles.hoursDot} />}
                        </span>
                      </button>}
                    </td>;
                  })}
                </tr>)}</tbody>
              </table>

              <div className={styles.legend}>
                <span><i aria-hidden="true" className={styles.eventDot} />Evento</span>
                <span><i aria-hidden="true" className={styles.hoursDot} />Horário especial</span>
                <span><i aria-hidden="true" className={styles.closedDot} />Fechado</span>
              </div>
            </div>
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className={styles.contact}>
              <span>Dúvidas sobre sua visita?<strong>Fale com o atendimento</strong></span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>

          <div className={styles.program}>
            <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{daySummary}</p>
            <div className={styles.programHeader}>
              <div>
                <p className={styles.programLabel}>Sua programação</p>
                <h3 id="calendar-day-title" className={styles.dayTitle}>{activeDate ? selectedDateLabel(activeDate) : "Encontre seu próximo passeio"}</h3>
              </div>
              {activeEvents.length > 0 && <span className={styles.eventCount}>{activeEvents.length} {activeEvents.length === 1 ? "evento" : "eventos"}</span>}
            </div>
            <div id="calendar-day-details" role="region" aria-labelledby="calendar-day-title">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={activeDate ?? month}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reducedMotion ? 0 : -3 }}
                  transition={{ duration: reducedMotion ? 0 : 0.16, ease: "easeOut" }}
                >
                  {activeEvents.length > 0 ? <ul aria-label="Eventos do dia" className={styles.eventList}>
                    {activeEvents.map((event) => <li key={event.id}><EventCard event={event} /></li>)}
                  </ul> : <div className={styles.emptyState}>
                    <span className={styles.emptyIcon} aria-hidden="true"><CalendarDays size={28} strokeWidth={1.4} /></span>
                    <h4>{activeDate ? "Sem eventos neste dia" : "Ainda sem programação"}</h4>
                    <p>{activeDate ? "Ainda não há eventos cadastrados para esta data. Confira outros dias no calendário e planeje sua visita." : `A programação de ${monthLabel(month)} ainda não foi divulgada. Selecione uma data para consultar o funcionamento.`}</p>
                  </div>}

                  <div className={styles.openingHours}>
                    <span className={styles.hoursIcon} aria-hidden="true"><Clock size={19} strokeWidth={1.7} /></span>
                    <div>
                      <p className={styles.hoursHeading}>Funcionamento do shopping</p>
                      <p className={styles.hoursValue} data-closed={activeEntry?.closed || undefined}>{activeEntry ? hoursLabel(activeEntry) : regularHours}</p>
                      <p className={styles.hoursNote}>{activeEntry ? activeEntry.label || "Horário especial para esta data." : "Para domingos e feriados, confirme com nosso atendimento."}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <p className={styles.footnote}>Os horários de funcionamento podem variar de acordo com a loja.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
