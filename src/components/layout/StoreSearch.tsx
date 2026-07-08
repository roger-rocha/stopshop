"use client";

import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useId,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { Search, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StoreLite = {
  name: string;
  slug: string;
  segment: string;
  categories: string[];
  location: string;
};

// Cache em nível de módulo: a lista é buscada uma única vez por carregamento de
// página, compartilhada entre a busca do desktop e a do menu mobile.
let storesCache: Promise<StoreLite[]> | null = null;
function loadStores(): Promise<StoreLite[]> {
  if (!storesCache) {
    storesCache = fetch("/api/stores/search")
      .then((res) => (res.ok ? (res.json() as Promise<StoreLite[]>) : []))
      .catch(() => []);
  }
  return storesCache;
}

// Remove acentos e caixa para busca tolerante ("cafe" acha "Café").
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const MAX_RESULTS = 7;

interface StoreSearchProps {
  /** "solid" (fundo claro) ou "transparent" (sobre o hero). */
  tone?: "solid" | "transparent";
  className?: string;
  /** Chamado após navegar — ex.: fechar o menu mobile. */
  onNavigate?: () => void;
  placeholder?: string;
}

export function StoreSearch({
  tone = "solid",
  className,
  onNavigate,
  placeholder = "Qual loja você procura?",
}: StoreSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [stores, setStores] = useState<StoreLite[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const transparent = tone === "transparent";

  const ensureLoaded = () => {
    if (stores.length === 0) loadStores().then(setStores);
  };

  const matches = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [] as StoreLite[];
    return stores
      .filter(
        (s) =>
          normalize(s.name).includes(q) ||
          s.categories.some((c) => normalize(c).includes(q))
      )
      .slice(0, MAX_RESULTS);
  }, [query, stores]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  // Fecha ao clicar fora.
  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const navigate = (term: string) => {
    const trimmed = term.trim();
    router.push(trimmed ? `/lojas?q=${encodeURIComponent(trimmed)}` : "/lojas");
    setOpen(false);
    setQuery("");
    setActiveIndex(-1);
    onNavigate?.();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (activeIndex >= 0 && matches[activeIndex]) {
      navigate(matches[activeIndex].name);
    } else {
      navigate(query);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open || matches.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % matches.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i <= 0 ? matches.length - 1 : i - 1));
    }
  };

  const showPanel = open && query.trim().length > 0;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <form
        onSubmit={handleSubmit}
        role="search"
        className={cn(
          "flex items-center gap-2 rounded-pill border px-4 py-2 transition-colors",
          transparent
            ? "border-white/25 bg-white/10 backdrop-blur-sm focus-within:border-white/60"
            : "border-border-default bg-surface-soft focus-within:border-brand-coral"
        )}
      >
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            ensureLoaded();
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label={placeholder}
          role="combobox"
          aria-expanded={showPanel && matches.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined
          }
          autoComplete="off"
          className={cn(
            "w-full bg-transparent text-sm outline-none [&::-webkit-search-cancel-button]:appearance-none",
            transparent
              ? "text-white placeholder:text-white/70"
              : "text-text-primary placeholder:text-text-muted"
          )}
        />
        <button
          type="submit"
          aria-label="Buscar lojas"
          className={cn(
            "shrink-0 transition-colors",
            transparent
              ? "text-white/80 hover:text-white"
              : "text-text-muted hover:text-brand-coral"
          )}
        >
          <Search className="h-4 w-4" />
        </button>
      </form>

      {showPanel && (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-border-default bg-white shadow-nav"
        >
          {matches.length > 0 ? (
            <ul className="max-h-[min(60vh,22rem)] overflow-y-auto py-1.5">
              {matches.map((store, index) => (
                <li key={store.slug}>
                  <button
                    type="button"
                    id={`${listId}-opt-${index}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    onMouseDown={(event) => {
                      // mousedown evita o blur fechar antes do clique
                      event.preventDefault();
                      navigate(store.name);
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                      index === activeIndex
                        ? "bg-brand-coral/[0.08]"
                        : "hover:bg-surface-muted"
                    )}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-text-muted">
                      <StoreIcon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-text-primary">
                        {store.name}
                      </span>
                      <span className="block truncate text-xs text-text-muted">
                        {store.categories[0] ?? store.location}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-text-muted">
              Nenhuma loja encontrada para “{query.trim()}”.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
