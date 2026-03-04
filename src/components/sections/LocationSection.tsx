"use client";

import { MapPin, Clock, Navigation } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { slideInLeft, slideInRight } from "@/lib/animations";

const hours = [
  { day: "Segunda a Sábado", time: "09:00 – 19:00" },
];

export function LocationSection() {
  return (
    <section className="bg-surface-dark py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Info */}
          <AnimateOnScroll variants={slideInLeft}>
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-coral">
              Localização
            </span>
            <h2 className="mt-3 font-display text-[length:var(--font-size-heading)] font-bold text-brand-cream">
              Como chegar
            </h2>

            <div className="mt-6 flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-coral" />
              <div>
                <p className="font-medium text-brand-cream">
                  Rodovia Antônio Heil, 635
                </p>
                <p className="text-sm text-text-secondary">
                  Santa Terezinha · Brusque, SC
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 shrink-0 text-brand-coral" />
              <div>
                <p className="font-medium text-brand-cream">Seg – Sáb</p>
                <p className="text-sm text-text-secondary">09h às 19h</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-text-secondary">
              Telefone: (47) 3255-7000
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton
                href="https://maps.google.com/?q=Stop+Shop+Brusque"
                external
                variant="secondary"
                className="rounded-full"
              >
                <Navigation className="h-4 w-4" />
                Google Maps
              </CTAButton>
              <CTAButton
                href="https://waze.com/ul?q=Stop+Shop+Brusque"
                external
                variant="secondary"
                className="rounded-full"
              >
                <Navigation className="h-4 w-4" />
                Waze
              </CTAButton>
            </div>
          </AnimateOnScroll>

          {/* Map placeholder */}
          <AnimateOnScroll variants={slideInRight}>
            <div className="relative h-80 overflow-hidden rounded-2xl bg-surface-card border border-border-subtle lg:h-full lg:min-h-[400px]">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-text-muted">
                <MapPin className="h-12 w-12 text-brand-coral/30" />
                <span className="text-sm font-medium">Mapa interativo</span>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
