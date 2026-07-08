"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { eventStatusLabel, type AgendaEventWithStatus } from "@/lib/events";
import { cn } from "@/lib/utils";

const ROTATE_INTERVAL = 6000;

interface AgendaSectionProps {
  events: AgendaEventWithStatus[];
}

export function AgendaSection({ events }: AgendaSectionProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = events.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total]
  );

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const id = setInterval(next, ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, total, next]);

  if (total === 0) return null;

  const event = events[Math.min(index, total - 1)];

  const banner = (
    <>
      <AnimatePresence mode="sync">
        <motion.div
          key={event.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1280px"
          />
        </motion.div>
      </AnimatePresence>

      {/* Scrim discreto para legibilidade dos chips */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />

      {/* Status + título/data */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
        <div className="min-w-0">
          <span className="inline-flex items-center rounded-pill bg-brand-coral px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
            {eventStatusLabel[event.status]}
          </span>
          <p className="mt-1.5 truncate font-display text-base font-bold text-white sm:text-lg">
            {event.title}
          </p>
        </div>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-pill bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm sm:inline-flex">
          <CalendarDays className="h-3.5 w-3.5 text-brand-gold" aria-hidden="true" />
          {event.dateLabel}
        </span>
      </div>
    </>
  );

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-[var(--spacing-section-x)] pb-10 pt-2 sm:pb-12">
        {/* Cabeçalho compacto */}
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-coral">
            Agenda
          </p>
          <p className="hidden text-xs text-text-muted sm:block">
            Ações ativas e próximas no Stop Shop
          </p>
        </div>

        <div
          className="group relative overflow-hidden rounded-2xl border border-border-default bg-brand-navy shadow-card"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="relative aspect-[16/8] w-full sm:aspect-[21/7] lg:aspect-[21/6]">
            {event.ctaHref ? (
              <Link
                href={event.ctaHref}
                aria-label={`${event.title} — ${event.dateLabel}`}
                className="absolute inset-0 block"
              >
                {banner}
              </Link>
            ) : (
              banner
            )}
          </div>

          {/* Setas */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Banner anterior"
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand-navy shadow-card backdrop-blur-sm transition-all hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Próximo banner"
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand-navy shadow-card backdrop-blur-sm transition-all hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {total > 1 && (
          <div className="mt-3 flex justify-center gap-2">
            {events.map((e, i) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir para banner ${i + 1}: ${e.title}`}
                aria-current={i === index}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index
                    ? "w-7 bg-brand-coral"
                    : "w-1.5 bg-border-default hover:bg-text-muted"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
