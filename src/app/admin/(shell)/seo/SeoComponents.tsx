"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { Check, Globe2, ImagePlus, Loader2, Upload, X } from "lucide-react";
import type { SeoActionState } from "@/lib/server/actions/seo";
import { inputCls } from "../_components/Field";

export const seoButtonCls = "inline-flex min-h-11 items-center justify-center gap-2 rounded-button bg-brand-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-coral disabled:cursor-wait disabled:opacity-60";

export function SeoStatus({ state }: { state: SeoActionState }) {
  return (
    <div aria-live="polite" aria-atomic="true">
      {state.status !== "idle" && (
        <p role={state.status === "error" ? "alert" : undefined} className={`rounded-button px-4 py-3 text-sm ${state.status === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
          {state.status === "success" && <Check className="mr-2 inline h-4 w-4" aria-hidden="true" />}
          {state.message}
        </p>
      )}
    </div>
  );
}

export function CharacterGuide({ value, recommended }: { value: string; recommended: number }) {
  return <span className={`block text-xs tabular-nums ${value.length > recommended ? "text-amber-700" : "text-text-muted"}`}>{value.length} caracteres · referência de até {recommended}</span>;
}

export function SeoToggle({ name, label, hint, checked, onChange }: { name: string; label: string; hint: string; checked: boolean; onChange: (value: boolean) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    // React 19 resets the native form after an action. Controlled checkboxes keep
    // their initial defaultChecked, so align the reset value with our live state.
    if (inputRef.current) inputRef.current.defaultChecked = checked;
  }, [checked]);

  return (
    <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl bg-surface-soft p-4">
      <input ref={inputRef} name={name} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-brand-navy" />
      <span><span className="block text-sm font-medium text-text-primary">{label}</span><span className="mt-1 block text-xs leading-relaxed text-text-secondary">{hint}</span></span>
    </label>
  );
}

export function SeoImageField({ name, label, value, onChange, hint, error: fieldError, onUploadingChange }: { name: string; label: string; value: string; onChange: (value: string) => void; hint?: string; error?: string; onUploadingChange?: (value: boolean) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  async function handleUpload(file?: File) {
    if (!file) return;
    setUploading(true);
    onUploadingChange?.(true);
    setError("");
    setProgress(0);
    try {
      const result = await upload(`seo/${file.name}`, file, { access: "public", handleUploadUrl: "/api/admin/upload", onUploadProgress: ({ percentage }) => setProgress(percentage) });
      onChange(result.url);
    } catch {
      setError("Não foi possível enviar a imagem. Tente novamente ou informe uma URL.");
    } finally {
      setUploading(false);
      onUploadingChange?.(false);
    }
  }
  return (
    <div className="space-y-2">
      <label className="block space-y-1">
        <span className="text-sm font-medium text-text-primary">{label}</span>
        <input name={name} value={value} readOnly={uploading} onChange={(event) => onChange(event.target.value)} placeholder="https://… ou /images/…" className={inputCls} />
      </label>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" disabled={uploading} onClick={() => input.current?.click()} className="inline-flex min-h-11 items-center gap-2 rounded-button border border-border-default px-3 text-xs font-medium transition-colors hover:bg-surface-soft disabled:opacity-60">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Upload className="h-4 w-4" aria-hidden="true" />}{uploading ? `Enviando ${progress}%` : "Enviar imagem"}
        </button>
        {value && <button type="button" disabled={uploading} onClick={() => onChange("")} className="inline-flex min-h-11 items-center gap-1 rounded-button px-3 text-xs text-text-secondary hover:bg-surface-soft"><X className="h-4 w-4" aria-hidden="true" />Remover</button>}
      </div>
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="hidden" aria-label={`Enviar ${label.toLowerCase()}`} onChange={(event) => { void handleUpload(event.target.files?.[0]); event.target.value = ""; }} />
      {hint && <p className="text-xs leading-relaxed text-text-muted">{hint}</p>}
      {(fieldError || error) && <p role="alert" className="text-xs text-red-700">{fieldError || error}</p>}
    </div>
  );
}

export function SeoPreview({ title, description, url, siteName, image, imageAlt }: { title: string; description: string; url: string; siteName: string; image: string; imageAlt: string }) {
  let hostname = "stopshop.com.br";
  let imageUrl = "";
  try { hostname = new URL(url).hostname; } catch { /* Incomplete URL while typing. */ }
  try {
    const parsed = new URL(image, url);
    if (image && ["http:", "https:"].includes(parsed.protocol)) imageUrl = parsed.href;
  } catch { /* Invalid images are validated when saving. */ }
  return (
    <aside className="space-y-6 rounded-2xl bg-surface-soft p-5 xl:sticky xl:top-6">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Prévia na busca</h3>
        <div className="mt-4 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-soft"><Globe2 className="h-4 w-4 text-text-secondary" aria-hidden="true" /></span><div className="min-w-0"><p className="truncate text-xs text-text-primary">{siteName}</p><p className="truncate text-[11px] text-text-secondary">{url}</p></div></div>
          <p className="mt-3 break-words text-lg leading-snug text-[#1a0dab]">{title || "Título da página"}</p>
          <p className="mt-1 break-words text-xs leading-relaxed text-text-secondary">{description || "A descrição da página aparecerá aqui."}</p>
        </div>
      </div>
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Ao compartilhar</h3>
        <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="relative aspect-[1200/630] bg-brand-navy/5">
            {imageUrl ? <Image key={imageUrl} src={imageUrl} alt={imageAlt || "Imagem de compartilhamento"} fill unoptimized className="object-cover outline outline-1 -outline-offset-1 outline-black/10" /> : <div className="flex h-full items-center justify-center gap-2 text-xs text-text-muted"><ImagePlus className="h-5 w-5" aria-hidden="true" />Imagem de compartilhamento</div>}
          </div>
          <div className="p-4"><p className="text-[10px] uppercase tracking-wide text-text-muted">{hostname}</p><p className="mt-1 break-words text-sm font-medium text-text-primary">{title || "Título da página"}</p><p className="mt-1 line-clamp-2 break-words text-xs leading-relaxed text-text-secondary">{description}</p></div>
        </div>
      </div>
      <p className="text-xs leading-relaxed text-text-muted">Prévia ilustrativa. Buscadores e redes sociais podem adaptar o texto, o recorte e o tempo de atualização.</p>
    </aside>
  );
}
