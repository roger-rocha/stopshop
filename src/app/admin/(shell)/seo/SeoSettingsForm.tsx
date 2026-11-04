"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { ChevronDown, Save } from "lucide-react";
import type { SeoSettings } from "@/lib/seo";
import { saveSeoSettingsAction, type SeoActionState } from "@/lib/server/actions/seo";
import { Field, inputCls, textareaCls } from "../_components/Field";
import { CharacterGuide, SeoImageField, SeoPreview, SeoStatus, SeoToggle, seoButtonCls } from "./SeoComponents";

const initial: SeoActionState = { status: "idle" };

export function SeoSettingsForm({ settings }: { settings: SeoSettings }) {
  const [state, action, pending] = useActionState(saveSeoSettingsAction, initial);
  const [values, setValues] = useState(settings);
  const [imageUploading, setImageUploading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const busy = pending || imageUploading || logoUploading;
  const set = <K extends keyof SeoSettings>(key: K, value: SeoSettings[K]) => setValues((previous) => ({ ...previous, [key]: value }));
  const error = (key: string) => state.status === "error" ? state.fieldErrors?.[key]?.[0] : undefined;

  return (
    <form action={action} onReset={(event) => event.preventDefault()} onSubmit={(event) => { if (imageUploading || logoUploading) event.preventDefault(); }} className="space-y-6">
      <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome do site" error={error("siteName")}><input required name="siteName" value={values.siteName} onChange={(event) => set("siteName", event.target.value)} className={inputCls} /></Field>
            <Field label="Endereço principal" hint="Domínio oficial, com https://." error={error("siteUrl")}><input required type="url" name="siteUrl" value={values.siteUrl} onChange={(event) => set("siteUrl", event.target.value)} className={inputCls} /></Field>
          </div>
          <Field label="Título padrão e da página inicial" error={error("defaultTitle")}><input required name="defaultTitle" value={values.defaultTitle} onChange={(event) => set("defaultTitle", event.target.value)} className={inputCls} /><CharacterGuide value={values.defaultTitle} recommended={60} /></Field>
          <Field label="Formato dos títulos das páginas" hint="Use %s uma vez para representar o título. Exemplo: %s | Stop Shop." error={error("titleTemplate")}><input required name="titleTemplate" value={values.titleTemplate} onChange={(event) => set("titleTemplate", event.target.value)} className={inputCls} /></Field>
          <Field label="Descrição padrão" hint="Usada quando a página não tem uma descrição própria." error={error("defaultDescription")}><textarea required name="defaultDescription" value={values.defaultDescription} onChange={(event) => set("defaultDescription", event.target.value)} className={textareaCls} /><CharacterGuide value={values.defaultDescription} recommended={160} /></Field>
          <SeoImageField error={error("defaultImage")} onUploadingChange={setImageUploading} name="defaultImage" label="Imagem padrão de compartilhamento" value={values.defaultImage} onChange={(value) => set("defaultImage", value)} hint="Sugestão: 1200 × 630 px. As páginas podem usar uma imagem própria." />
          <Field label="Descrição da imagem" hint="Descreva o que aparece na imagem para leitores de tela." error={error("defaultImageAlt")}><input name="defaultImageAlt" value={values.defaultImageAlt} onChange={(event) => set("defaultImageAlt", event.target.value)} className={inputCls} /></Field>
        </div>
        <SeoPreview title={values.defaultTitle} description={values.defaultDescription} url={values.siteUrl} siteName={values.siteName} image={values.defaultImage} imageAlt={values.defaultImageAlt} />
      </div>

      <details className="group rounded-2xl border border-border-default">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium [&::-webkit-details-marker]:hidden"><span>Buscadores e indexação</span><ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
        <div className="space-y-5 border-t border-border-default p-5">
          <SeoToggle name="indexable" checked={values.indexable} onChange={(value) => set("indexable", value)} label="Permitir que o site apareça nas buscas" hint="Ao desativar, todas as páginas recebem noindex e são retiradas do sitemap. A remoção dos resultados depende de uma nova visita do buscador." />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Verificação do Google Search Console" hint="Cole apenas o código do atributo content, sem a tag HTML." error={error("googleVerification")}><input name="googleVerification" value={values.googleVerification} onChange={(event) => set("googleVerification", event.target.value)} className={inputCls} autoComplete="off" /></Field>
            <Field label="Verificação do Bing Webmaster Tools" hint="Cole apenas o código de verificação, sem a tag HTML." error={error("bingVerification")}><input name="bingVerification" value={values.bingVerification} onChange={(event) => set("bingVerification", event.target.value)} className={inputCls} autoComplete="off" /></Field>
          </div>
        </div>
      </details>

      <details className="group rounded-2xl border border-border-default">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium [&::-webkit-details-marker]:hidden"><span>Identidade do shopping nos buscadores</span><ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
        <div className="space-y-5 border-t border-border-default p-5">
          <SeoToggle name="structuredData" checked={values.structuredData} onChange={(value) => set("structuredData", value)} label="Publicar dados estruturados" hint="Ajuda os buscadores a identificar o shopping e as perguntas frequentes do site. Não garante uma apresentação especial nos resultados." />
          <div className="grid items-start gap-5 sm:grid-cols-2">
            <SeoImageField error={error("logo")} onUploadingChange={setLogoUploading} name="logo" label="Logo do shopping" value={values.logo} onChange={(value) => set("logo", value)} hint="Use uma imagem nítida, preferencialmente quadrada." />
            <Field label="Perfis oficiais nas redes sociais" hint="Uma URL completa por linha." error={error("socialLinks")}><textarea name="socialLinks" value={values.socialLinks.join("\n")} onChange={(event) => set("socialLinks", event.target.value.split("\n"))} className={textareaCls} /></Field>
          </div>
          <p className="text-sm leading-relaxed text-text-secondary">Endereço, telefone e dados de contato vêm das <Link href="/admin/settings" className="font-medium text-brand-navy underline underline-offset-4">configurações do site</Link>.</p>
        </div>
      </details>
      <SeoStatus state={state} />
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-default pt-5"><p className="max-w-sm text-xs leading-relaxed text-text-muted">As alterações são aplicadas ao site ao salvar. Cada página pode ter seu próprio título, descrição e imagem.</p><button type="submit" disabled={busy} className={seoButtonCls}><Save className="h-4 w-4" aria-hidden="true" />{pending ? "Salvando…" : imageUploading || logoUploading ? "Enviando imagem…" : "Salvar configurações de SEO"}</button></div>
    </form>
  );
}
