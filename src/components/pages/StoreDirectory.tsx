"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SegmentPill } from "@/components/ui/SegmentPill";
import { StoreCard } from "@/components/ui/StoreCard";
import type { Segment, Store } from "@/db/schema";

interface StoreDirectoryProps {
  initialSegment?: string;
  segments: Segment[];
  stores: Store[];
}

export function StoreDirectory({
  initialSegment = "todos",
  segments,
  stores,
}: StoreDirectoryProps) {
  const [selectedSegment, setSelectedSegment] = useState(initialSegment);
  const [query, setQuery] = useState("");

  const filteredStores = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return stores.filter((store) => {
      const matchesSegment =
        selectedSegment === "todos" || store.segment === selectedSegment;

      const matchesQuery =
        normalizedQuery.length === 0 ||
        store.name.toLowerCase().includes(normalizedQuery) ||
        store.location.toLowerCase().includes(normalizedQuery) ||
        store.categories.some((category) =>
          category.toLowerCase().includes(normalizedQuery)
        );

      return matchesSegment && matchesQuery;
    });
  }, [query, selectedSegment]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
      <div className="rounded-[28px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-coral">
              Guia de compras
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-text-primary sm:text-4xl">
              Encontre a loja ideal para a sua compra
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary">
              Filtre por segmento, procure por marca ou pesquise pela localização da
              loja dentro do Stop Shop.
            </p>
          </div>

          <label className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-surface-soft px-4 py-3">
            <Search className="h-4 w-4 text-text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar marca, categoria ou localização"
              className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <SegmentPill
            name="Todos os segmentos"
            color="var(--color-brand-coral)"
            active={selectedSegment === "todos"}
            onClick={() => setSelectedSegment("todos")}
          />
          {segments.map((segment) => (
            <SegmentPill
              key={segment.slug}
              name={segment.name}
              color={segment.color}
              active={selectedSegment === segment.slug}
              onClick={() => setSelectedSegment(segment.slug)}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-text-secondary" aria-live="polite" aria-atomic="true">
          {filteredStores.length} {filteredStores.length === 1 ? "loja encontrada" : "lojas encontradas"}
        </p>
        <p className="text-sm text-text-muted">Segunda a sábado, das 09h às 19h</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filteredStores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>

      {filteredStores.length === 0 && (
        <div className="mt-6 rounded-[28px] border border-dashed border-border-subtle bg-surface-soft px-6 py-12 text-center">
          <p className="font-medium text-text-primary">Nenhuma loja encontrada.</p>
          <p className="mt-2 text-sm text-text-secondary">
            Tente outro termo de busca ou selecione um segmento diferente.
          </p>
        </div>
      )}
    </div>
  );
}
