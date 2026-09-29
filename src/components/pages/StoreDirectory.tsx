"use client";

import { useMemo, useState } from "react";
import { StoreGallery } from "@/components/ui/StoreGallery";
import { matchesStoreSearch, normalizeStoreSearch as normalize, isWholesaleSearch, retailSearchMessage } from "@/lib/store-search";
import { Instagram, Search } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { storeBelongsToSegment } from "@/lib/store-segments";
import { cn, whatsappLink } from "@/lib/utils";
import type { Segment, Store } from "@/db/schema";

interface StoreDirectoryProps {
  initialSegment?: string;
  initialQuery?: string;
  segments: Segment[];
  stores: Store[];
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const OTHER_LETTER = "#";

function initialLetter(name: string) {
  const first = normalize(name).charAt(0).toUpperCase();
  return /[A-Z]/.test(first) ? first : OTHER_LETTER;
}

function instagramUrl(handle: string | null) {
  if (!handle) return null;
  return handle.startsWith("http")
    ? handle
    : `https://instagram.com/${handle.replace(/^@/, "")}`;
}

export function StoreDirectory({
  initialSegment = "todos",
  initialQuery = "",
  segments,
  stores,
}: StoreDirectoryProps) {
  const [selectedSegment, setSelectedSegment] = useState(initialSegment);
  const [query, setQuery] = useState(initialQuery);
  const [letter, setLetter] = useState<string | null>(null);

  const activeSegment = segments.find((segment) => segment.slug === selectedSegment);

  const matchingStores = useMemo(() => stores.filter((store) => {
    const matchesSegment = selectedSegment === "todos" ||
      (activeSegment !== undefined && storeBelongsToSegment(store, activeSegment));
    return matchesSegment && matchesStoreSearch(store, query);
  }).sort((a, b) => a.name.localeCompare(b.name, "pt-BR")), [query, selectedSegment, activeSegment, stores]);

  const filteredStores = useMemo(() => matchingStores.filter((store) =>
    letter === null || initialLetter(store.name) === letter
  ), [letter, matchingStores]);

  const availableLetters = useMemo(() =>
    new Set(matchingStores.map((store) => initialLetter(store.name))), [matchingStores]);

  const grouped = useMemo(() => {
    const map = new Map<string, Store[]>();
    for (const store of filteredStores) {
      const key = initialLetter(store.name);
      const list = map.get(key);
      if (list) list.push(store);
      else map.set(key, [store]);
    }
    return [...map.entries()];
  }, [filteredStores]);

  const segmentCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const segment of segments) {
      counts.set(segment.slug, stores.filter((store) => storeBelongsToSegment(store, segment)).length);
    }
    return counts;
  }, [segments, stores]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Categorias — coluna lateral */}
        <aside>
          <h2 className="font-display text-xl font-bold text-text-primary">
            Qual loja você procura?
          </h2>

          <label className="mt-4 flex items-center gap-3 rounded-pill border border-border-default bg-surface-soft px-4 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-text-muted" />
            <input
              value={query}
              onChange={(event) => { setQuery(event.target.value); setLetter(null); }}
              placeholder="Buscar loja, produto ou categoria"
              aria-label="Buscar loja, produto ou categoria"
              className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
            />
          </label>

          <h3 className="mt-8 font-display text-lg font-bold text-text-primary">
            Categorias
          </h3>
          <ul className="mt-3 space-y-1">
            <li>
              <button
                type="button"
                onClick={() => setSelectedSegment("todos")}
                aria-pressed={selectedSegment === "todos"}
                className={cn(
                  "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  selectedSegment === "todos"
                    ? "bg-brand-coral/10 font-semibold text-brand-coral"
                    : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                )}
              >
                Todas as categorias
                <span className="ml-1 text-text-muted">({stores.length})</span>
              </button>
            </li>
            {segments.map((segment) => (
              <li key={segment.slug}>
                <button
                  type="button"
                  onClick={() => setSelectedSegment(segment.slug)}
                  aria-pressed={selectedSegment === segment.slug}
                  className={cn(
                    "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    selectedSegment === segment.slug
                      ? "bg-brand-coral/10 font-semibold text-brand-coral"
                      : "text-text-secondary hover:bg-surface-muted hover:text-text-primary"
                  )}
                >
                  {segment.name}
                  <span className="ml-1 text-text-muted">
                    ({segmentCounts.get(segment.slug) ?? 0})
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Abecedário + listagem */}
        <div>
          <nav
            aria-label="Filtrar por letra"
            className="flex flex-wrap items-center gap-x-1 gap-y-2 border-b border-border-default pb-5"
          >
            <button
              type="button"
              onClick={() => setLetter(null)}
              aria-pressed={letter === null}
              className={cn(
                "rounded px-2 py-1 text-sm font-semibold transition-colors",
                letter === null
                  ? "text-brand-coral"
                  : "text-text-secondary hover:text-brand-coral"
              )}
            >
              Todas
            </button>
            {[OTHER_LETTER, ...ALPHABET].map((char) => {
              const enabled = availableLetters.has(char);
              return (
                <button
                  key={char}
                  type="button"
                  disabled={!enabled}
                  onClick={() => setLetter(letter === char ? null : char)}
                  aria-pressed={letter === char}
                  className={cn(
                    "rounded px-2 py-1 text-sm font-medium transition-colors",
                    !enabled && "cursor-default text-text-muted/40",
                    enabled && letter === char && "text-brand-coral",
                    enabled &&
                      letter !== char &&
                      "text-text-secondary hover:text-brand-coral"
                  )}
                >
                  {char}
                </button>
              );
            })}
          </nav>

          <p
            className="mt-5 text-sm text-text-secondary"
            aria-live="polite"
            aria-atomic="true"
          >
            {filteredStores.length}{" "}
            {filteredStores.length === 1 ? "loja encontrada" : "lojas encontradas"}
          </p>

          {grouped.map(([groupLetter, groupStores]) => (
            <section key={groupLetter} className="mt-8">
              <h3 className="font-display text-2xl font-bold text-text-primary">
                {groupLetter}
              </h3>
              <ul className="mt-3 divide-y divide-border-default border-y border-border-default">
                {groupStores.map((store) => (
                  <li key={store.id}>
                    <StoreRow store={store} />
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {filteredStores.length === 0 && (
            <div className="mt-8 rounded-[28px] border border-dashed border-border-subtle bg-surface-soft px-6 py-12 text-center">
              <p className="font-medium text-text-primary">{isWholesaleSearch(query) ? "Compras no varejo" : "Nenhuma loja encontrada."}</p>
              <p className="mt-2 text-sm text-text-secondary">
                {isWholesaleSearch(query) ? retailSearchMessage : "Tente outro termo de busca, letra ou categoria."}
              </p>
              <button type="button" onClick={() => { setQuery(""); setLetter(null); setSelectedSegment("todos"); }} className="mt-4 font-semibold text-brand-coral">Ver todas as lojas</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StoreRow({ store }: { store: Store }) {
  const instagram = instagramUrl(store.instagram);

  return (
    <article className="group grid gap-4 py-6 sm:grid-cols-[minmax(0,180px)_minmax(0,1fr)_auto] sm:items-center sm:gap-7">
      <StoreGallery store={store} preferLogo className="w-full max-w-[220px] shrink-0 rounded-[20px] border border-border-default bg-white sm:max-w-none" />

      <div className="min-w-0">
        <h4 className="font-display text-xl font-bold text-text-primary">
          {store.name}
        </h4>
        <p className="mt-0.5 text-sm text-text-muted">
          {store.categories[0] ?? ""}
        </p>
        {store.description && (
          <p className="mt-2 line-clamp-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
            {store.description}
          </p>
        )}
        <p className="mt-2 text-sm text-text-muted">
          {store.location}
          {store.floor ? ` · ${store.floor}` : ""}
        </p>
      </div>

      <div className="flex items-center gap-2 sm:justify-end">
        {store.whatsapp && (
          <a
            href={whatsappLink(
              store.whatsapp,
              `Olá! Gostaria de saber mais sobre a loja ${store.name} no Stop Shop.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp/10 text-whatsapp transition-colors hover:bg-whatsapp hover:text-white"
            aria-label={`WhatsApp ${store.name}`}
          >
            <WhatsAppIcon className="h-4 w-4" />
          </a>
        )}
        {instagram && (
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-coral/10 text-brand-coral transition-colors hover:bg-brand-coral hover:text-white"
            aria-label={`Instagram ${store.name}`}
          >
            <Instagram className="h-4 w-4" />
          </a>
        )}
      </div>
    </article>
  );
}
