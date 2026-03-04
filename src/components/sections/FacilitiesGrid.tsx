"use client";

import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

const steps = [
  {
    number: "01",
    title: "+160 Marcas",
    description:
      "O maior mix de marcas de moda da região, reunidas em um único endereço.",
  },
  {
    number: "02",
    title: "Atacado e Varejo",
    description:
      "Compre para sua loja ou para uso pessoal — com preços imbatíveis nos dois formatos.",
  },
  {
    number: "03",
    title: "Estrutura Premium",
    description:
      "Ambiente climatizado, estacionamento gratuito, praça de alimentação e muito conforto.",
  },
  {
    number: "04",
    title: "Localização Privilegiada",
    description:
      "Fácil acesso pela BR-101, em Brusque, SC — polo de moda de Santa Catarina.",
  },
];

export function FacilitiesGrid() {
  return (
    <section className="py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title="Por que visitar o Stop Shop?"
          highlight="Stop Shop"
          subtitle="Tudo que você precisa para uma experiência de compras completa"
        />

        <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <StaggerItem key={step.number} className="relative">
              <div className="group rounded-card border border-border-subtle bg-surface-card p-8 text-center transition-all hover:border-brand-gold/30 h-full">
                {/* Large faded number */}
                <span className="font-display text-6xl font-bold text-brand-gold/15">
                  {step.number}
                </span>

                <h3 className="mt-2 font-display text-lg font-bold text-text-primary">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>

              {/* Arrow connector (hidden on last item and on mobile) */}
              {index < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-text-muted lg:block">
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
