"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { opportunityFormats } from "@/lib/data/open-store";

export function OpenStoreFormats() {
  return (
    <section
      id="formatos"
      className="scroll-mt-24 bg-white px-[var(--spacing-section-x)] py-[var(--spacing-section-y)]"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Formatos"
          title="Um espaço para cada tipo de operação"
          subtitle="Do primeiro ponto de venda à expansão de uma rede consolidada, há um formato que cabe no seu plano de negócio."
          align="left"
          className="max-w-2xl"
        />

        <StaggerChildren className="grid gap-5 md:grid-cols-3">
          {opportunityFormats.map((format) => (
            <StaggerItem key={format.subject} className="h-full">
              <Link
                href={`#formulario`}
                data-subject={format.subject}
                className="group flex h-full flex-col rounded-[28px] border border-border-default bg-surface-soft p-7 shadow-card transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand-coral/30 hover:shadow-card-hover"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy text-white">
                    <format.icon className="h-5 w-5" />
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border-default bg-white text-text-muted transition-colors group-hover:border-brand-coral group-hover:bg-brand-coral group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <h3 className="mt-6 font-display text-3xl font-bold text-text-primary">
                  {format.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {format.description}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-border-default pt-5">
                  {format.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2.5 text-sm text-text-primary">
                      <Check className="h-4 w-4 shrink-0 text-brand-coral" strokeWidth={2.5} />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <span className="mt-auto pt-6 text-sm font-semibold text-brand-coral">
                  Tenho interesse
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
