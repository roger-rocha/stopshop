"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

const steps = [
  {
    number: "01",
    title: "Direto de Fábrica",
    description: "Mais de 160 marcas com preços de fábrica no atacado e varejo.",
  },
  {
    number: "02",
    title: "Estrutura Completa",
    description: "Ambiente climatizado, estacionamento para 310 carros e 15 ônibus.",
  },
  {
    number: "03",
    title: "Atacado Especializado",
    description: "Central de guias e atendimento dedicado para lojistas.",
  },
  {
    number: "04",
    title: "Stop Cred",
    description: "Crediário próprio com anuidade zero e até 6x sem juros.",
  },
];

export function FacilitiesGrid() {
  return (
    <section className="bg-brand-cream py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Por que o Stop Shop?"
          title="O que nos diferencia"
          highlight="diferencia"
          light
        />

        <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <StaggerItem key={step.number} className="relative">
              <div className="group h-full rounded-2xl bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md">
                <span className="font-display text-5xl font-bold text-brand-coral/20">
                  {step.number}
                </span>
                <h3 className="mt-3 font-body text-lg font-semibold text-text-inverse">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>

              {/* Arrow connector — desktop only */}
              {index < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-brand-coral/30 lg:block">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
