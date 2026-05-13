"use client";

import Link from "next/link";
import {
  Hotel,
  Bus,
  ParkingSquare,
  Clock,
  UtensilsCrossed,
  MapPinned,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

const items = [
  {
    icon: Hotel,
    title: "Hotéis parceiros",
    description:
      "Rede de hospedagem com tarifas especiais para clientes e excursões do Stop Shop.",
    href: "/contato",
    cta: "Ver hotéis",
  },
  {
    icon: Bus,
    title: "Excursões e grupos",
    description:
      "Estrutura preparada para receber ônibus, vans e grupos com atendimento dedicado.",
    href: "/atacado",
    cta: "Planejar excursão",
  },
  {
    icon: ParkingSquare,
    title: "Estacionamento gratuito",
    description:
      "Dois estacionamentos externos gratuitos e um coberto pago, com mais de 310 vagas.",
    href: "/localizacao",
    cta: "Como chegar",
  },
  {
    icon: Clock,
    title: "Horários",
    description:
      "Segunda a sábado das 09h às 19h. Domingos e feriados com horário especial divulgado.",
    href: "/localizacao",
    cta: "Ver detalhes",
  },
  {
    icon: UtensilsCrossed,
    title: "Praça de alimentação",
    description:
      "Restaurantes, lanchonetes e cafeterias com opções rápidas e variadas para todos os públicos.",
    href: "/lojas",
    cta: "Ver opções",
  },
  {
    icon: MapPinned,
    title: "Sobre Brusque",
    description:
      "Capital catarinense da moda, Brusque combina compras, gastronomia e história a 20 min de Itajaí.",
    href: "https://visitebrusque.com.br",
    external: true,
    cta: "Conhecer a cidade",
  },
];

export function PlanejeSection() {
  return (
    <section className="relative overflow-hidden bg-brand-cream py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      {/* Subtle background ornament */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-12 h-72 w-72 rounded-full bg-brand-coral/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-16 h-60 w-60 rounded-full bg-brand-gold/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeader
          label="Planeje sua viagem"
          title="Tudo o que você precisa para vir ao Stop Shop"
          highlight="vir ao Stop Shop"
          subtitle="Hospedagem, transporte, alimentação e dicas práticas para aproveitar o melhor de Brusque."
          light
        />

        <StaggerChildren className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            const linkProps = item.external
              ? { target: "_blank" as const, rel: "noopener noreferrer" }
              : {};
            return (
              <StaggerItem key={item.title}>
                <Link
                  href={item.href}
                  {...linkProps}
                  className="group flex h-full flex-col rounded-2xl border border-border-default bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-coral/10 text-brand-coral transition-colors group-hover:bg-brand-coral group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-coral transition-transform group-hover:translate-x-0.5">
                    {item.cta}
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
