"use client";

import { Clock } from "lucide-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";

const schedule = [
  { label: "Segunda a sábado", hours: "09h às 19h" },
  { label: "Domingos e feriados", hours: "Horário especial", muted: true },
];

export function OpeningHoursStrip() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-[var(--spacing-section-x)] py-8 sm:py-10">
        <AnimateOnScroll>
          <div className="flex flex-col gap-5 rounded-2xl border border-border-default bg-surface-soft px-6 py-6 shadow-card sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-coral/10 text-brand-coral">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-coral">
                  Horário de funcionamento
                </p>
                <p className="font-display text-xl font-bold text-text-primary sm:text-2xl">
                  Estamos abertos
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
              {schedule.map((item) => (
                <div key={item.label} className="flex items-baseline justify-between gap-3 sm:flex-col sm:items-end sm:justify-start sm:text-right">
                  <span className="text-sm text-text-muted">{item.label}</span>
                  <span
                    className={
                      item.muted
                        ? "font-display text-base font-semibold text-text-secondary"
                        : "font-display text-lg font-bold text-text-primary"
                    }
                  >
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-3 text-center text-xs text-text-muted sm:text-left">
            Domingos e feriados com horário divulgado antecipadamente. Horários podem variar de acordo com a loja.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
