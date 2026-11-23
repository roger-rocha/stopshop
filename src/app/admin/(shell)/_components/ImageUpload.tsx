"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { ImagePlus, Loader2, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCEPTED_FORMATS_ERROR, ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES, type ImageSpec } from "@/lib/image-specs";
import { ImageSpecHint } from "./ImageSpecHint";

interface ImageUploadProps {
  /** Nome do campo — vai como input hidden, exatamente como o antigo campo de texto. */
  name: string;
  label: string;
  hint?: string;
  error?: string;
  defaultValue?: string | null;
  /** Prefixo do caminho no Blob, ex.: "stores", "segments", "hero". */
  folder: string;
  /**
   * Formato do preview, igual ao uso no site: "wide" 16:9, "banner" 16:5 (agenda, 1600x500),
   * "photo" 4:3 (lojas), "portrait" 3:4 (segmentos), "square" 1:1 (Instagram)
   * e "logo" quadrado pequeno com object-contain.
   */
  variant?: "wide" | "banner" | "photo" | "portrait" | "square" | "logo";
  /** Medida ideal e cuidados de corte, exibidos sob o campo. */
  spec?: ImageSpec;
}

export function ImageUpload({
  name,
  label,
  hint,
  error,
  defaultValue,
  folder,
  variant = "wide",
  spec,
}: ImageUploadProps) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type) || file.size > MAX_IMAGE_BYTES) {
      setUploadError(ACCEPTED_FORMATS_ERROR);
      return;
    }
    setUploading(true);
    setUploadError(null);
    setProgress(0);
    try {
      const blob = await upload(`${folder}/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/admin/upload",
        onUploadProgress: ({ percentage }) => setProgress(percentage),
      });
      setUrl(blob.url);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Não foi possível enviar a imagem."
      );
    } finally {
      setUploading(false);
    }
  }

  const displayError = error ?? uploadError ?? undefined;
  const isLogo = variant === "logo";
  const frameCls = {
    wide: "aspect-video w-full max-w-xl",
    banner: "aspect-[16/5] w-full",
    photo: "aspect-[4/3] w-full max-w-xl",
    portrait: "aspect-[3/4] w-full max-w-60",
    square: "aspect-square w-full max-w-xs",
    // Xadrez atrás do logo: PNG branco com fundo transparente continua visível.
    logo: "aspect-square max-w-[160px] bg-[conic-gradient(#e7e2da_25%,#fff_0_50%,#e7e2da_0_75%,#fff_0)] bg-[length:16px_16px]",
  }[variant];

  return (
    <div className="space-y-1">
      <span className="block text-sm font-medium text-text-primary">{label}</span>

      {/* Carrega a URL no formulário — mesma interface do antigo campo de texto. */}
      <input type="hidden" name={name} value={url} />

      <div className="space-y-2">
        <div
          className={cn(
            "relative overflow-hidden rounded-button border border-border-default bg-surface-muted",
            frameCls
          )}
        >
          {url ? (
            <Image
              src={url}
              alt={label}
              fill
              unoptimized
              className={isLogo ? "object-contain p-3" : "object-cover"}
            />
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex h-full w-full flex-col items-center justify-center gap-1 text-text-muted transition-colors hover:bg-surface-elevated"
            >
              <ImagePlus className="h-6 w-6" aria-hidden="true" />
              <span className="text-xs">Enviar imagem</span>
            </button>
          )}

          {uploading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-brand-navy/70 text-white">
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              <span className="text-xs font-medium">{progress}%</span>
            </div>
          )}

          {url && !uploading && (
            <button
              type="button"
              onClick={() => setUrl("")}
              aria-label="Remover imagem"
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-navy/80 text-white transition-colors hover:bg-brand-coral"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>

        {url && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 rounded-button border border-border-default bg-white px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface-muted disabled:opacity-60"
          >
            <Upload className="h-3.5 w-3.5" aria-hidden="true" />
            Trocar imagem
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          className="hidden"
          onChange={(e) => {
            handleFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </div>

      {hint && !displayError && (
        <span className="block text-xs text-text-muted">{hint}</span>
      )}
      {spec && !displayError && <ImageSpecHint spec={spec} />}
      {displayError && (
        <span className="block text-xs text-brand-coral">{displayError}</span>
      )}
    </div>
  );
}
