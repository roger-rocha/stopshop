"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { ImagePlus, Loader2, X, ChevronUp, ChevronDown } from "lucide-react";

interface HeroSlidesManagerProps {
  defaultSlides: string[];
}

export function HeroSlidesManager({ defaultSlides }: HeroSlidesManagerProps) {
  const [slides, setSlides] = useState<string[]>(defaultSlides);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        setProgress(0);
        const blob = await upload(`hero/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/admin/upload",
          onUploadProgress: ({ percentage }) => setProgress(percentage),
        });
        setSlides((prev) => [...prev, blob.url]);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível enviar a imagem."
      );
    } finally {
      setUploading(false);
    }
  }

  const remove = (index: number) =>
    setSlides((prev) => prev.filter((_, i) => i !== index));

  const move = (index: number, dir: -1 | 1) =>
    setSlides((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-text-primary">
        Imagens do banner (carrossel)
      </span>

      {/* URLs enviadas ao formulário — uma por slide, na ordem definida. */}
      {slides.map((url) => (
        <input key={url} type="hidden" name="slides" value={url} />
      ))}

      {slides.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {slides.map((url, index) => (
            <li
              key={url}
              className="relative overflow-hidden rounded-button border border-border-default bg-surface-muted"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={url}
                  alt={`Slide ${index + 1}`}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <span className="absolute left-2 top-2 rounded-full bg-brand-navy/80 px-2 py-0.5 text-[11px] font-medium text-white">
                {index + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label={`Remover slide ${index + 1}`}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-navy/80 text-white transition-colors hover:bg-brand-coral"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <div className="absolute bottom-2 right-2 flex gap-1">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label="Mover para cima"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-text-secondary transition-colors hover:bg-white disabled:opacity-40"
                >
                  <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === slides.length - 1}
                  aria-label="Mover para baixo"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-text-secondary transition-colors hover:bg-white disabled:opacity-40"
                >
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
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
            <span className="text-xs">Adicionar imagens</span>
          </>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {error ? (
        <span className="block text-xs text-brand-coral">{error}</span>
      ) : (
        <span className="block text-xs text-text-muted">
          Envie uma ou mais imagens. Elas giram automaticamente no banner da
          home. Sem imagens, o vídeo padrão é exibido.
        </span>
      )}
    </div>
  );
}
