"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, X } from "lucide-react";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { cn } from "@/lib/utils";
import type { Service } from "@/db/schema";

const ALL = "todos";

// Além de acentos e caixa, derruba hífen/espaço/pontuação dos dois lados da
// comparação — sem isso, buscar "wifi" não acha "Wi-Fi gratuito".
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

export function ServicesDirectory({ services }: { services: Service[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const service of services) {
      const key = service.category.trim();
      if (!key) continue;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0], "pt-BR"));
  }, [services]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return services.filter((service) => {
      const matchesCategory =
        category === ALL || service.category.trim() === category;
      const matchesQuery =
        q.length === 0 ||
        normalize(service.name).includes(q) ||
        normalize(service.description).includes(q) ||
        normalize(service.category).includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query, services]);

  const hasFilters = query.trim().length > 0 || category !== ALL;

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
      {/* Busca + categorias em um bloco só, para não parecerem dois controles soltos */}
      <div className="rounded-[28px] border border-border-default bg-white p-5 shadow-card sm:p-6">
        <label className="flex items-center gap-3 rounded-pill border border-border-default bg-surface-soft px-5 py-3 transition-colors focus-within:border-brand-coral">
          <Search className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar um serviço"
            aria-label="Buscar um serviço"
            className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpar busca"
              className="shrink-0 text-text-muted transition-colors hover:text-text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>

        {categories.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            <CategoryPill
              label="Todos"
              count={services.length}
              active={category === ALL}
              onClick={() => setCategory(ALL)}
            />
            {categories.map(([name, count]) => (
              <CategoryPill
                key={name}
                label={name}
                count={count}
                active={category === name}
                onClick={() => setCategory(name)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-text-secondary" aria-live="polite" aria-atomic="true">
          {filtered.length}{" "}
          {filtered.length === 1 ? "serviço encontrado" : "serviços encontrados"}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory(ALL);
            }}
            className="text-sm font-medium text-brand-coral transition-colors hover:text-brand-coral-dark"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <StaggerChildren
          // Sem key de remontagem: o stagger roda uma vez na entrada e os cards
          // filtrados entram já visíveis. Remontar a cada filtro devolveria o
          // grid para opacity 0 e dependeria do observer disparar de novo — se
          // não disparasse, o conteúdo sumiria.
          amount={0.05}
          className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((service) => (
            <StaggerItem key={service.id} className="h-full">
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      ) : (
        <div className="mt-6 rounded-[28px] border border-dashed border-border-subtle bg-surface-soft px-6 py-16 text-center">
          <p className="font-medium text-text-primary">
            Nenhum serviço encontrado.
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            Tente outro termo de busca ou escolha outra categoria.
          </p>
        </div>
      )}
    </div>
  );
}

function CategoryPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      aria-pressed={active}
      className={cn(
        "rounded-pill border px-4 py-2 text-sm font-medium transition-colors duration-200",
        active
          ? "border-brand-coral bg-brand-coral text-white"
          : "border-border-default bg-white text-text-secondary hover:border-brand-coral/30 hover:text-text-primary"
      )}
    >
      {label}
      <span className={cn("ml-1.5", active ? "text-white/70" : "text-text-muted")}>
        {count}
      </span>
    </motion.button>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col rounded-[24px] border border-border-default bg-white p-6 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <span
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coral/10 text-brand-coral transition-colors duration-300 group-hover:bg-brand-coral group-hover:text-white"
      >
        <ServiceIcon name={service.icon} className="h-5 w-5" />
      </span>

      <h2 className="mt-5 font-display text-lg font-bold leading-snug text-text-primary">
        {service.name}
      </h2>

      {service.description && (
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
          {service.description}
        </p>
      )}

      {service.category && (
        <span className="mt-5 inline-flex w-fit rounded-pill bg-surface-muted px-3 py-1 text-xs font-medium text-text-secondary">
          {service.category}
        </span>
      )}
    </article>
  );
}
