"use client";

import Image from "next/image";
import { CTAButton } from "@/components/ui/CTAButton";
import { CounterAnimation } from "@/components/motion/CounterAnimation";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { slideInLeft, slideInRight } from "@/lib/animations";

const atacadoStats = [
  { value: 48, suffix: "%", label: "Moda Feminina" },
  { value: 28, suffix: "%", label: "Moda Masculina" },
  { value: 14, suffix: "%", label: "Moda Infantil" },
  { value: 10, suffix: "%", label: "Jeans" },
];

export function AtacadoCTA() {
  return (
    <section className="relative overflow-hidden py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-surface-dark/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5">
          <AnimateOnScroll variants={slideInLeft} className="lg:col-span-3">
            <span className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-coral-light">
              Atacado
            </span>
            <h2 className="mt-3 font-display text-[length:var(--font-size-heading)] font-bold text-brand-cream">
              Preço de fábrica para lojistas
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-text-secondary">
              Ambiente climatizado, central de guias, transporte para o Catarina Moda Shopping a cada 30 minutos.
            </p>
            <div className="mt-8">
              <CTAButton href="/atacado" size="lg" className="rounded-full">
                Saiba mais sobre atacado
              </CTAButton>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variants={slideInRight} className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {atacadoStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-card border border-border-subtle bg-surface-card/60 backdrop-blur-sm p-5 text-center"
                >
                  <div className="font-display text-3xl font-bold text-brand-coral-light lg:text-4xl">
                    <CounterAnimation target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
