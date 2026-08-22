"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { processSteps } from "@/lib/data/open-store";

export function OpenStoreProcess() {
  return (
    <section className="bg-surface-light px-[var(--spacing-section-x)] py-[var(--spacing-section-y)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Como funciona"
          title="Da primeira conversa à inauguração em quatro etapas"
          subtitle="Um processo claro, com acompanhamento do time comercial e técnico em todas as fases."
          align="left"
          className="max-w-2xl"
        />

        <StaggerChildren className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Linha que conecta as etapas no desktop */}
          <div
            aria-hidden="true"
            className="absolute left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] top-7 hidden h-px bg-[linear-gradient(90deg,transparent,var(--color-border-subtle)_10%,var(--color-border-subtle)_90%,transparent)] lg:block"
          />

          {processSteps.map((step, index) => (
            <StaggerItem key={step.title} className="relative">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-border-subtle bg-white font-display text-xl font-bold text-brand-coral shadow-card">
                {index + 1}
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-text-primary">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                {step.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
