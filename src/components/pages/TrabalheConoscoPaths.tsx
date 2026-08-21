"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, ChevronRight, Store } from "lucide-react";
import { cn } from "@/lib/utils";

type AreaKey = "stop-shop" | "lojistas";

const areas = [
  {
    key: "stop-shop" as const,
    icon: Building2,
    title: "Trabalhe no Stop Shop",
    description:
      "Vagas da administração do shopping: atendimento, marketing, manutenção, segurança e mais.",
  },
  {
    key: "lojistas" as const,
    icon: Store,
    title: "Trabalhe nas lojas do shopping",
    description:
      "Oportunidades abertas pelos lojistas do Stop Shop em vendas, estoque e gerência.",
  },
];

export function TrabalheConoscoPaths() {
  const [selected, setSelected] = useState<AreaKey>("stop-shop");
  const active = areas.find((area) => area.key === selected)!;

  return (
    <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16">
      <div className="grid gap-5 sm:grid-cols-2">
        {areas.map((area) => (
          <button
            key={area.key}
            type="button"
            onClick={() => setSelected(area.key)}
            aria-pressed={selected === area.key}
            className={cn(
              "flex items-start gap-4 rounded-[28px] border p-7 text-left shadow-card transition-colors",
              selected === area.key
                ? "border-brand-coral bg-white"
                : "border-border-default bg-white hover:border-brand-coral/50"
            )}
          >
            <span
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                selected === area.key
                  ? "bg-brand-coral text-white"
                  : "bg-brand-coral/10 text-brand-coral"
              )}
            >
              <area.icon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1 font-display text-xl font-bold text-text-primary">
                {area.title}
                <ChevronRight className="h-4 w-4 text-text-muted" />
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-text-secondary">
                {area.description}
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          Vagas — {active.title}
        </h2>

        {/* Ainda não há um cadastro de vagas: enquanto isso, o candidato é
            direcionado ao contato. */}
        <div className="mt-4 rounded-[28px] border border-dashed border-border-subtle bg-surface-soft px-6 py-12 text-center">
          <p className="font-medium text-text-primary">
            Nenhuma vaga aberta no momento.
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
            Assim que novas oportunidades forem publicadas, elas aparecem aqui.
            Você também pode enviar o seu currículo para o nosso banco de
            talentos.
          </p>
          <Link
            href="/contato"
            className="mt-8 inline-flex items-center justify-center rounded-pill bg-brand-coral px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-coral-dark"
          >
            Enviar currículo
          </Link>
        </div>
      </div>
    </section>
  );
}
