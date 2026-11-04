import Link from "next/link";
import { ArrowUpRight, FileSearch, Globe2, ScanSearch } from "lucide-react";
import { getSeoEntries, getSeoSettings } from "@/lib/server/seo";
import { getSitePublished } from "@/lib/server/site-visibility";
import { PageHeader } from "../_components/PageHeader";
import { SeoSettingsForm } from "./SeoSettingsForm";
import { SeoPageList } from "./SeoPageList";

export const dynamic = "force-dynamic";
export const metadata = { title: "SEO" };

export default async function SeoPage() {
  const [settings, entries, published] = await Promise.all([getSeoSettings(), getSeoEntries(), getSitePublished()]);
  const customized = entries.filter(({ settings: page }) => page.title || page.description || page.image || page.imageAlt || page.canonical || !page.indexable || !page.includeInSitemap).length;
  return (
    <div>
      <PageHeader title="SEO do site" description="Cuide de como o Stop Shop aparece nas buscas e ao compartilhar um link." action={<a href="#paginas" className="inline-flex min-h-11 items-center gap-2 rounded-button border border-border-default bg-white px-4 text-xs font-medium text-brand-navy transition-colors hover:bg-surface-soft"><FileSearch className="h-4 w-4" aria-hidden="true" />Editar por página</a>} />
      {!published && <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950"><p className="font-medium">O site está em modo de construção</p><p className="mt-1">Você pode preparar o SEO agora. A indexação pública continua bloqueada até publicar o site em <Link href="/admin/settings" className="font-medium underline underline-offset-4">Configurações</Link>.</p></div>}
      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        <Summary icon={FileSearch} label="Páginas gerenciadas" value={String(entries.length)} detail="Inclui posts e segmentos" />
        <Summary icon={ScanSearch} label="SEO personalizado" value={String(customized)} detail="As demais usam o conteúdo automático" />
        <Summary icon={Globe2} label="Indexação pública" value={!published ? "Em construção" : settings.indexable ? "Permitida" : "Desativada"} detail="Cada página também tem seu controle" />
      </div>
      <section id="configuracoes" className="scroll-mt-6 rounded-[20px] border border-border-default bg-white p-5 shadow-card sm:p-7">
        <header className="mb-6"><h2 className="font-display text-xl font-bold">Configurações gerais</h2><p className="mt-1 text-sm text-text-secondary">Identidade, apresentação dos links e padrões para todo o site.</p></header>
        <SeoSettingsForm settings={settings} />
      </section>
      <section id="paginas" className="mt-8 scroll-mt-6 rounded-[20px] border border-border-default bg-white p-5 shadow-card sm:p-7">
        <header className="mb-6"><h2 className="font-display text-xl font-bold">SEO por página</h2><p className="mt-1 text-sm text-text-secondary">Personalize os resultados das páginas, posts e segmentos em um só lugar.</p></header>
        <SeoPageList entries={entries} indexable={settings.indexable} />
      </section>
      <section className="mt-8 rounded-2xl bg-surface-soft p-5 sm:p-6">
        <h2 className="text-sm font-medium">Arquivos para os buscadores</h2><p className="mt-1 text-xs leading-relaxed text-text-secondary">O sitemap e o robots.txt são gerados automaticamente a partir das configurações. Alterações nos resultados das buscas dependem de uma nova leitura pelos buscadores.</p>
        <div className="mt-3 flex flex-wrap gap-3"><Link href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-xs font-medium text-brand-navy">Abrir sitemap.xml<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link><Link href="/robots.txt" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-xs font-medium text-brand-navy">Abrir robots.txt<ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link></div>
      </section>
    </div>
  );
}

function Summary({ icon: Icon, label, value, detail }: { icon: typeof Globe2; label: string; value: string; detail: string }) {
  return <div className="rounded-2xl border border-border-default bg-white p-5"><div className="flex items-center gap-2 text-xs text-text-secondary"><Icon className="h-4 w-4 text-brand-navy" aria-hidden="true" />{label}</div><p className="mt-3 text-xl font-medium tabular-nums text-text-primary">{value}</p><p className="mt-1 text-[11px] leading-relaxed text-text-muted">{detail}</p></div>;
}
