"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { agendaEvents } from "@/lib/data/agenda";
import { cn } from "@/lib/utils";

const ROTATE_INTERVAL = 6000;

export function AgendaSection() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = agendaEvents.length;

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, total]);

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  const event = agendaEvents[index];

  return (
    <section className="relative bg-surface-light py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Agenda"
          title="O que está rolando no Stop Shop"
          highlight="rolando"
          subtitle="Eventos, promoções e ações especiais para você acompanhar de perto."
          light
        />

        <div
          className="relative overflow-hidden rounded-[28px] border border-border-default bg-brand-navy shadow-card"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
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
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/70 to-brand-navy/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/10 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="relative flex h-full items-end p-6 sm:p-10 lg:p-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-2xl"
                >
                  <span className="inline-flex items-center gap-2 rounded-pill bg-brand-coral px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                    {event.badge}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
                    {event.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                    {event.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/80">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-brand-gold" />
                      {event.date}
                    </span>
                    {event.cta && (
                      <Link
                        href={event.cta.href}
                        className="inline-flex items-center gap-1 font-semibold text-white underline-offset-4 hover:underline"
                      >
                        {event.cta.label} →
                      </Link>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute right-4 top-4 flex gap-2 sm:right-6 sm:top-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Evento anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-brand-navy"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Próximo evento"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-brand-navy"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-6">
            {agendaEvents.map((e, i) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir para evento ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-8 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
