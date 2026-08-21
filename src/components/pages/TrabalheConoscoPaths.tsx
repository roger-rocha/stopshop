"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, Building2, ChevronRight, MapPin, Store } from "lucide-react";
import { RichText } from "@/components/ui/RichText";
import { cn } from "@/lib/utils";
import type { JobOpening } from "@/db/schema";

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

/** Aceita e-mail ou URL no mesmo campo do admin e devolve um href utilizável. */
function applyHref(applyTo: string | null): string | null {
  const value = applyTo?.trim();
  if (!value) return null;
  if (/^(https?:\/\/|mailto:|tel:)/i.test(value)) return value;
  if (value.startsWith("/")) return value;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return `mailto:${value}`;
  return `https://${value}`;
}

export function TrabalheConoscoPaths({ jobs }: { jobs: JobOpening[] }) {
  const [selected, setSelected] = useState<AreaKey>("stop-shop");
  const active = areas.find((area) => area.key === selected)!;
  const areaJobs = jobs.filter((job) => job.area === selected);

  const countFor = (key: AreaKey) =>
    jobs.filter((job) => job.area === key).length;

  return (
    <section className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16">
      <div className="grid gap-5 sm:grid-cols-2">
        {areas.map((area) => {
          const count = countFor(area.key);
          return (
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
                <span className="mt-3 block text-sm font-medium text-brand-coral">
                  {count === 0
                    ? "Nenhuma vaga aberta"
                    : `${count} ${count === 1 ? "vaga aberta" : "vagas abertas"}`}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          Vagas — {active.title}
        </h2>

        {areaJobs.length > 0 ? (
          <ul className="mt-5 space-y-4">
            {areaJobs.map((job) => (
              <li key={job.id}>
                <JobCard job={job} />
              </li>
            ))}
          </ul>
        ) : (
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
        )}
      </div>
    </section>
  );
}

function JobCard({ job }: { job: JobOpening }) {
  const href = applyHref(job.applyTo);
  const external = href?.startsWith("http") ?? false;
  const meta = [job.company, job.type].filter(Boolean).join(" · ");

  return (
    <article className="rounded-[28px] border border-border-default bg-white p-7 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold text-text-primary">
            {job.title}
          </h3>
          {meta && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-text-secondary">
              <Briefcase className="h-3.5 w-3.5 shrink-0 text-text-muted" />
              {meta}
            </p>
          )}
          {job.location && (
            <p className="mt-1 flex items-center gap-1.5 text-sm text-text-muted">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {job.location}
            </p>
          )}
        </div>

        {href ? (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="shrink-0 rounded-pill bg-brand-coral px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-coral-dark"
          >
            Candidatar-se
          </a>
        ) : (
          <Link
            href="/contato"
            className="shrink-0 rounded-pill bg-brand-coral px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-coral-dark"
          >
            Candidatar-se
          </Link>
        )}
      </div>

      {job.description && <RichText content={job.description} className="mt-5" />}
    </article>
  );
}
