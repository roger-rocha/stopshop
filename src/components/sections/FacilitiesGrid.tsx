"use client";

import { Car, UtensilsCrossed, Wind, Bus } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

const facilities = [
  {
    icon: Car,
    title: "Estacionamento Gratuito",
    description: "Amplo estacionamento com mais de 500 vagas gratuitas para sua comodidade.",
  },
  {
    icon: UtensilsCrossed,
    title: "Praça de Alimentação",
    description: "Diversas opções gastronômicas para repor as energias durante suas compras.",
  },
  {
    icon: Wind,
    title: "Ambiente Climatizado",
    description: "Todo o shopping é climatizado para garantir seu conforto o ano inteiro.",
  },
  {
    icon: Bus,
    title: "Estacionamento de Ônibus",
    description: "Estrutura completa para receber excursões e ônibus de turismo de compras.",
  },
];

export function FacilitiesGrid() {
  return (
    <section className="py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title="Estrutura Completa"
          subtitle="Tudo pensado para tornar sua experiência de compras ainda melhor"
        />

        <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((facility) => (
            <StaggerItem key={facility.title}>
              <div className="rounded-card bg-surface-light p-8 text-center transition-shadow hover:shadow-card">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-coral/10">
                  <facility.icon className="h-7 w-7 text-brand-coral" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-brand-navy">
                  {facility.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {facility.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
