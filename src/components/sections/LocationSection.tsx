"use client";

import { MapPin, Clock, Navigation } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { slideInLeft, slideInRight } from "@/lib/animations";

const hours = [
  { day: "Segunda a Sexta", time: "09:00 – 19:00", days: [1, 2, 3, 4, 5] },
  { day: "Sábado", time: "09:00 – 17:00", days: [6] },
  { day: "Domingo", time: "Fechado", days: [0] },
];

export function LocationSection() {
  const today = new Date().getDay();

  return (
    <section className="py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Map placeholder */}
          <AnimateOnScroll variants={slideInLeft}>
            <div className="relative h-80 overflow-hidden rounded-card bg-surface-muted lg:h-full lg:min-h-[400px]">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-text-muted">
                <MapPin className="h-12 w-12" />
                <span className="text-sm font-medium">Mapa interativo</span>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Info */}
          <AnimateOnScroll variants={slideInRight}>
            <div>
              <h2 className="font-display text-[length:var(--font-size-heading)] font-bold text-brand-navy">
                Como Chegar
              </h2>

              <div className="mt-6 flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-coral" />
                <div>
                  <p className="font-medium text-text-primary">
                    Rod. Antônio Heil, 301
                  </p>
                  <p className="text-sm text-text-secondary">
                    Brusque, SC — CEP 88353-100
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="mt-8">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-brand-coral" />
                  <h3 className="font-display text-lg font-bold text-brand-navy">
                    Horário de Funcionamento
                  </h3>
                </div>

                <div className="mt-4 space-y-3">
                  {hours.map((schedule) => (
                    <div
                      key={schedule.day}
                      className={`flex items-center justify-between rounded-button px-4 py-3 text-sm ${
                        schedule.days.includes(today)
                          ? "bg-brand-coral/10 font-semibold text-brand-coral"
                          : "bg-surface-light text-text-secondary"
                      }`}
                    >
                      <span>{schedule.day}</span>
                      <span>{schedule.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direction buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton
                  href="https://maps.google.com/?q=Stop+Shop+Brusque"
                  external
                  size="md"
                >
                  <Navigation className="h-4 w-4" />
                  Abrir no Google Maps
                </CTAButton>
                <CTAButton
                  href="https://maps.apple.com/?q=Stop+Shop+Brusque"
                  external
                  variant="secondary"
                  size="md"
                >
                  Abrir no Apple Maps
                </CTAButton>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
