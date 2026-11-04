"use client";

import { useActionState, useState } from "react";
import { ChevronDown, RotateCcw, Save } from "lucide-react";
import { DEFAULT_PAGE_SEO, resolvePageSeo, type PageSeo, type SeoEntry, type SeoSettings } from "@/lib/seo";
import { savePageSeoAction, type SeoActionState } from "@/lib/server/actions/seo";
import { Field, inputCls, textareaCls } from "../_components/Field";
import { CharacterGuide, SeoImageField, SeoPreview, SeoStatus, SeoToggle, seoButtonCls } from "./SeoComponents";

const initial: SeoActionState = { status: "idle" };

export function SeoPageForm({ entry, settings }: { entry: SeoEntry; settings: SeoSettings }) {
  const [state, action, pending] = useActionState(savePageSeoAction.bind(null, entry.key), initial);
  const [values, setValues] = useState(entry.settings);
  const [uploading, setUploading] = useState(false);
  const set = <K extends keyof PageSeo>(key: K, value: PageSeo[K]) => setValues((previous) => ({ ...previous, [key]: value }));
  const error = (key: string) => state.status === "error" ? state.fieldErrors?.[key]?.[0] : undefined;
  const fallback = resolvePageSeo(settings, DEFAULT_PAGE_SEO, entry.defaults, entry.path);
  let preview = fallback;
  try { preview = resolvePageSeo(settings, values, entry.defaults, entry.path); }
  catch { preview = resolvePageSeo(settings, { ...values, image: "", canonical: "" }, entry.defaults, entry.path); }
  const defaultTitle = entry.path === "/" ? settings.defaultTitle : entry.defaults.title;

  return (
    <form action={action} onReset={(event) => event.preventDefault()} onSubmit={(event) => { if (uploading) event.preventDefault(); }} className="space-y-6">
      <div className="rounded-xl bg-brand-navy/5 px-4 py-3 text-sm leading-relaxed text-text-secondary">Deixe um campo vazio para usar o conteúdo automático. A prévia já mostra o resultado com os padrões do site.</div>
      <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-5">
          <Field label="Título para os buscadores" hint={entry.path === "/" ? "O título da página inicial não recebe o complemento do site." : `O formato ${settings.titleTemplate} será aplicado automaticamente.`} error={error("title")}><input name="title" value={values.title} onChange={(event) => set("title", event.target.value)} placeholder={defaultTitle} maxLength={200} className={inputCls} /><CharacterGuide value={preview.title} recommended={60} /></Field>
          <Field label="Descrição para os buscadores" error={error("description")}><textarea name="description" value={values.description} onChange={(event) => set("description", event.target.value)} placeholder={fallback.description} maxLength={500} className={textareaCls} /><CharacterGuide value={preview.description} recommended={160} /></Field>
          <SeoImageField error={error("image")} onUploadingChange={setUploading} name="image" label="Imagem de compartilhamento desta página" value={values.image} onChange={(value) => set("image", value)} hint="Sugestão: 1200 × 630 px. Sem uma imagem própria, será usada a imagem do conteúdo ou o padrão do site." />
          <Field label="Descrição da imagem" error={error("imageAlt")}><input name="imageAlt" value={values.imageAlt} onChange={(event) => set("imageAlt", event.target.value)} placeholder={fallback.imageAlt} maxLength={200} className={inputCls} /></Field>
        </div>
        <SeoPreview title={preview.title} description={preview.description} url={preview.canonical} siteName={settings.siteName} image={preview.image} imageAlt={preview.imageAlt} />
      </div>
      <details className="group rounded-2xl border border-border-default">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium [&::-webkit-details-marker]:hidden"><span>Indexação e endereço principal</span><ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
        <div className="space-y-5 border-t border-border-default p-5">
          {!settings.indexable && <p className="rounded-button bg-amber-50 p-3 text-sm text-amber-900">A indexação está desativada nas configurações gerais de SEO. Esta página continuará fora das buscas enquanto essa opção estiver desativada.</p>}
          {!entry.published && <p className="text-sm text-text-secondary">Este post está em rascunho. As configurações serão usadas quando ele for publicado.</p>}
          <SeoToggle name="indexable" checked={values.indexable} onChange={(value) => set("indexable", value)} label="Permitir esta página nos buscadores" hint="Ao desativar, a página recebe noindex e sai do sitemap. Isso não restringe o acesso dos visitantes à página." />
          <SeoToggle name="includeInSitemap" checked={values.includeInSitemap} onChange={(value) => set("includeInSitemap", value)} label="Incluir no sitemap" hint="A página precisa estar publicada, permitir indexação e usar seu próprio endereço principal para aparecer no sitemap." />
          <Field label="URL principal da página (canonical)" hint="Preencha apenas se o endereço preferencial for diferente do atual. Não cria um redirecionamento." error={error("canonical")}><input name="canonical" value={values.canonical} onChange={(event) => set("canonical", event.target.value)} placeholder={fallback.canonical} className={inputCls} /></Field>
        </div>
      </details>
      <SeoStatus state={state} />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-default pt-5"><button type="button" disabled={pending || uploading} onClick={() => setValues({ ...DEFAULT_PAGE_SEO })} className="inline-flex min-h-11 items-center gap-2 rounded-button px-3 text-xs font-medium text-text-secondary transition-colors hover:bg-surface-soft disabled:opacity-60"><RotateCcw className="h-4 w-4" aria-hidden="true" />Restaurar campos automáticos</button><button type="submit" disabled={pending || uploading} className={seoButtonCls}><Save className="h-4 w-4" aria-hidden="true" />{pending ? "Salvando…" : uploading ? "Enviando imagem…" : "Salvar SEO da página"}</button></div>
      <p className="text-xs text-text-muted">Restaurar limpa as personalizações deste formulário. Salve para aplicar.</p>
    </form>
  );
}
