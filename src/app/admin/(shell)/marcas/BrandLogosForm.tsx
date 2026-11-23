"use client";

import { useActionState, useRef, useState } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { ChevronDown, ChevronUp, ImagePlus, Loader2, RotateCcw, Trash2 } from "lucide-react";
import { saveBrandLogosAction, type SettingsState } from "@/lib/server/actions/settings";
import { MAX_BRAND_LOGOS, type BrandLogo } from "@/lib/brand-logos";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES, imageSpecs } from "@/lib/image-specs";
import { FormStatus } from "../_components/FormStatus";
import { ImageSpecHint } from "../_components/ImageSpecHint";
import { inputCls } from "../_components/Field";

const initial: SettingsState = { status: "idle" };

type Row = BrandLogo & { id: string };

const withIds = (brands: BrandLogo[]): Row[] =>
  brands.map((brand) => ({ ...brand, id: crypto.randomUUID() }));

/** "le-lis-blanc_logo.png" -> "Le Lis Blanc Logo": sugestão de nome a partir do arquivo. */
function nameFromFile(fileName: string) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\p{L}/gu, (letter) => letter.toUpperCase());
}

export function BrandLogosForm({ brands, defaults }: { brands: BrandLogo[]; defaults: BrandLogo[] }) {
  const [state, formAction, pending] = useActionState(saveBrandLogosAction, initial);
  const [rows, setRows] = useState<Row[]>(() => withIds(brands));
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const update = (id: string, patch: Partial<BrandLogo>) =>
    setRows((items) => items.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const move = (index: number, dir: -1 | 1) =>
    setRows((items) => {
      const target = index + dir;
      if (target < 0 || target >= items.length) return items;
      const next = [...items];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const selected = Array.from(files);
    if (rows.length + selected.length > MAX_BRAND_LOGOS) {
      setUploadError(`Use até ${MAX_BRAND_LOGOS} logos.`);
      return;
    }
    if (selected.some((file) => !ACCEPTED_IMAGE_TYPES.includes(file.type) || file.size > MAX_IMAGE_BYTES)) {
      setUploadError("Use PNG, WebP, JPG, AVIF ou GIF de até 8 MB por logo.");
      return;
    }
    setUploading(true);
    setUploadError(null);
    try {
      for (const file of selected) {
        setProgress(0);
        const blob = await upload(`brands/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/admin/upload",
          onUploadProgress: ({ percentage }) => setProgress(percentage),
        });
        setRows((items) => [...items, { id: crypto.randomUUID(), name: nameFromFile(file.name), logo: blob.url }]);
      }
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Não foi possível enviar o logo.");
    } finally {
      setUploading(false);
    }
  }

  const payload = JSON.stringify(rows.map(({ name, logo }) => ({ name, logo })));

  return (
    <form
      action={formAction}
      onReset={(event) => event.preventDefault()}
      onSubmit={(event) => {
        if (uploading) event.preventDefault();
      }}
      className="space-y-6"
    >
      <input type="hidden" name="brands" value={payload} />

      {rows.length === 0 ? (
        <p className="rounded-button border border-dashed border-border-default px-4 py-6 text-center text-sm text-text-secondary">
          Nenhum logo na lista. Sem logos, a faixa de marcas fica oculta no site.
        </p>
      ) : (
        <ol className="space-y-3">
          {rows.map((row, index) => (
            <li
              key={row.id}
              className="flex flex-col gap-3 rounded-button border border-border-default bg-white p-3 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 shrink-0 text-center text-xs font-semibold text-text-muted">{index + 1}</span>
                {/* Xadrez atrás do logo: PNG branco/transparente continua visível. */}
                <div className="relative h-14 w-32 shrink-0 overflow-hidden rounded-button border border-border-default bg-[conic-gradient(#e7e2da_25%,#fff_0_50%,#e7e2da_0_75%,#fff_0)] bg-[length:16px_16px]">
                  <Image src={row.logo} alt={row.name || `Logo ${index + 1}`} fill unoptimized className="object-contain p-2" />
                </div>
              </div>

              <label className="min-w-0 flex-1">
                <span className="sr-only">Nome da marca {index + 1}</span>
                <input
                  value={row.name}
                  onChange={(event) => update(row.id, { name: event.target.value })}
                  maxLength={80}
                  required
                  placeholder="Nome da marca"
                  className={inputCls}
                />
              </label>

              <div className="flex items-center gap-1 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label={`Mover ${row.name || `logo ${index + 1}`} para antes`}
                  className="flex h-10 w-10 items-center justify-center rounded-button border border-border-default text-text-secondary transition-colors hover:bg-surface-soft disabled:opacity-40"
                >
                  <ChevronUp className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === rows.length - 1}
                  aria-label={`Mover ${row.name || `logo ${index + 1}`} para depois`}
                  className="flex h-10 w-10 items-center justify-center rounded-button border border-border-default text-text-secondary transition-colors hover:bg-surface-soft disabled:opacity-40"
                >
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setRows((items) => items.filter((item) => item.id !== row.id))}
                  aria-label={`Remover ${row.name || `logo ${index + 1}`}`}
                  className="flex h-10 w-10 items-center justify-center rounded-button border border-border-default text-brand-coral transition-colors hover:bg-brand-coral/10"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ol>
      )}

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading || rows.length >= MAX_BRAND_LOGOS}
          className="flex w-full flex-col items-center justify-center gap-1 rounded-button border border-dashed border-border-default bg-surface-muted py-6 text-text-muted transition-colors hover:bg-surface-elevated disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
              <span className="text-xs font-medium">{progress}%</span>
            </>
          ) : (
            <>
              <ImagePlus className="h-6 w-6" aria-hidden="true" />
              <span className="text-xs">Adicionar logos</span>
            </>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          multiple
          className="hidden"
          onChange={(event) => {
            handleFiles(event.target.files);
            event.target.value = "";
          }}
        />
        {uploadError ? (
          <span role="alert" className="block text-xs text-brand-coral">{uploadError}</span>
        ) : (
          <ImageSpecHint spec={imageSpecs.brandLogo} />
        )}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border-default pt-5">
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Trocar a lista atual pelos logos padrão? As alterações só valem depois de salvar.")) {
              setRows(withIds(defaults));
            }
          }}
          disabled={pending || uploading}
          className="mr-auto inline-flex min-h-10 items-center gap-2 rounded-button px-3 text-xs font-medium text-text-secondary transition-colors hover:bg-surface-soft disabled:opacity-60"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Restaurar logos padrão
        </button>
        <FormStatus state={state} />
        <button
          type="submit"
          disabled={pending || uploading}
          className="rounded-button bg-brand-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90 disabled:opacity-60"
        >
          {pending ? "Salvando…" : uploading ? "Enviando logo…" : "Salvar logos"}
        </button>
      </div>
    </form>
  );
}
