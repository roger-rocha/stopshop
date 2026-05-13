"use client";

import { Clock } from "lucide-react";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";

const weekdays = [
  { label: "Seg", hours: "09h–19h" },
  { label: "Ter", hours: "09h–19h" },
  { label: "Qua", hours: "09h–19h" },
  { label: "Qui", hours: "09h–19h" },
  { label: "Sex", hours: "09h–19h" },
  { label: "Sáb", hours: "09h–19h" },
  { label: "Dom", hours: "Fechado", muted: true },
];

export function OpeningHoursStrip() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-[var(--spacing-section-x)] py-8 sm:py-10">
        <AnimateOnScroll>
          <div className="flex flex-col gap-5 rounded-2xl border border-border-default bg-surface-soft px-5 py-5 shadow-card sm:px-7 sm:py-6 lg:flex-row lg:items-center lg:gap-8">
            <div className="flex items-center gap-3 lg:shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-coral/10 text-brand-coral">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-coral">
                  Funcionamento
                </p>
                <p className="font-display text-base font-bold text-text-primary sm:text-lg">
                  Estamos abertos
                </p>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-4 gap-2 sm:grid-cols-7 sm:gap-3">
              {weekdays.map((day) => (
                <div
                  key={day.label}
                  className="flex flex-col items-center rounded-xl border border-border-default bg-white px-2 py-3 text-center"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                    {day.label}
                  </span>
                  <span
                    className={
                      day.muted
                        ? "mt-1 text-xs font-medium text-text-muted sm:text-sm"
                        : "mt-1 text-xs font-bold text-text-primary sm:text-sm"
                    }
                  >
                    {day.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-3 text-center text-xs text-text-muted sm:text-left">
            Domingos e feriados com horário divulgado antecipadamente.
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
