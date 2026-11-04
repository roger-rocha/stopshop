"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import type { SeoEntry } from "@/lib/seo";
import { inputCls } from "../_components/Field";

export function SeoPageList({ entries, indexable }: { entries: SeoEntry[]; indexable: boolean }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("");
  const normalized = query.toLocaleLowerCase("pt-BR");
  const filtered = entries.filter((entry) => (!group || entry.group === group) && `${entry.label} ${entry.path}`.toLocaleLowerCase("pt-BR").includes(normalized));
  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1"><span className="sr-only">Buscar página</span><Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-text-muted" aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar pelo nome ou endereço…" className={`${inputCls} min-h-11 pl-9`} /></label>
        <label><span className="sr-only">Tipo de página</span><select value={group} onChange={(event) => setGroup(event.target.value)} className={`${inputCls} min-h-11 sm:w-44`}><option value="">Todos os tipos</option><option>Páginas</option><option>Blog</option><option>Segmentos</option></select></label>
      </div>
      <p aria-live="polite" className="mb-3 text-xs text-text-muted">{filtered.length} {filtered.length === 1 ? "página encontrada" : "páginas encontradas"}</p>
      <ul className="divide-y divide-border-default">
        {filtered.map((entry) => {
          const customized = Boolean(entry.settings.title || entry.settings.description || entry.settings.image || entry.settings.imageAlt || entry.settings.canonical || !entry.settings.indexable || !entry.settings.includeInSitemap);
          const blocked = !indexable || !entry.settings.indexable;
          return (
            <li key={entry.key} className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><p className="text-sm font-medium text-text-primary">{entry.label}</p><span className="rounded-full bg-surface-soft px-2 py-0.5 text-[10px] text-text-secondary">{entry.group}</span></div><p className="mt-1 break-all text-xs text-text-muted">{entry.path}</p><div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]"><span className={customized ? "text-brand-navy" : "text-text-muted"}>{customized ? "SEO personalizado" : "Conteúdo automático"}</span><span aria-hidden="true" className="text-border-default">·</span><span className={!entry.published || blocked ? "text-amber-700" : "text-emerald-700"}>{!entry.published ? "Rascunho" : blocked ? "Fora das buscas" : "Indexação permitida"}</span>{entry.published && !blocked && !entry.settings.includeInSitemap && <span className="text-text-muted">· Fora do sitemap</span>}</div></div>
              <div className="flex shrink-0 gap-2">{entry.published && <Link href={entry.path} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${entry.label} no site`} className="flex min-h-11 w-11 items-center justify-center rounded-button border border-border-default text-text-secondary transition-colors hover:bg-surface-soft"><ArrowUpRight className="h-4 w-4" aria-hidden="true" /></Link>}<Link href={`/admin/seo/page?key=${encodeURIComponent(entry.key)}`} className="inline-flex min-h-11 items-center gap-2 rounded-button bg-brand-navy/5 px-4 text-xs font-medium text-brand-navy transition-colors hover:bg-brand-navy/10"><SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />Editar SEO</Link></div>
            </li>
          );
        })}
      </ul>
      {filtered.length === 0 && <div className="rounded-xl bg-surface-soft px-5 py-10 text-center"><p className="text-sm font-medium">Nenhuma página encontrada</p><p className="mt-1 text-xs text-text-secondary">Tente outro nome ou selecione todos os tipos.</p></div>}
    </div>
  );
}
