"use client";

import { Check } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { CounterAnimation } from "@/components/motion/CounterAnimation";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

const bullets = [
  "Preços até 70% abaixo do varejo tradicional",
  "Compra mínima a partir de 6 peças por modelo",
  "Mais de 80 lojas com opção atacado",
  "Atendimento especializado para lojistas",
];

const stats = [
  { value: 70, suffix: "%", label: "Economia no atacado" },
  { value: 80, suffix: "+", label: "Lojas atacadistas" },
  { value: 160, suffix: "+", label: "Marcas disponíveis" },
];

export function AtacadoCTA() {
  return (
    <section className="bg-brand-navy py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <AnimateOnScroll>
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-coral">
              Atacado em Brusque
            </span>
            <h2 className="mt-3 font-display text-[length:var(--font-size-heading)] font-bold text-white">
              Compre no atacado com preços imbatíveis
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              O Stop Shop é referência em atacado de moda em Santa Catarina. Lojistas de todo o Brasil vêm até Brusque para renovar seus estoques.
            </p>

            <StaggerChildren className="mt-8 space-y-4">
              {bullets.map((bullet) => (
                <StaggerItem key={bullet} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-coral">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-white/80">{bullet}</span>
                </StaggerItem>
              ))}
            </StaggerChildren>

            <div className="mt-8">
              <CTAButton href="/atacado" size="lg">
                Saiba Mais sobre Atacado
              </CTAButton>
            </div>
          </AnimateOnScroll>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:gap-8">
            {stats.map((stat) => (
              <AnimateOnScroll key={stat.label}>
                <div className="rounded-card border border-white/10 bg-white/5 p-6 text-center lg:text-left">
                  <div className="font-display text-4xl font-bold text-brand-coral">
                    <CounterAnimation
                      target={stat.value}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="mt-2 text-sm text-white/60">{stat.label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
