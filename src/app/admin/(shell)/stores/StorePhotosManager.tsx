"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { ImagePlus, Loader2, X, ChevronUp, ChevronDown } from "lucide-react";

interface StorePhotosManagerProps {
  defaultPhotos: string[];
  onUploadingChange: (uploading: boolean) => void;
  fieldError?: string;
}

export function StorePhotosManager({ defaultPhotos, onUploadingChange, fieldError }: StorePhotosManagerProps) {
  const [slides, setSlides] = useState<string[]>(defaultPhotos);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    if (slides.length + files.length > 12) {
      setError("Envie até 12 fotos por loja.");
      return;
    }
    const selected = Array.from(files);
    if (selected.some((file) => !["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"].includes(file.type) || file.size > 8 * 1024 * 1024)) {
      setError("Use JPG, PNG, WebP, AVIF ou GIF de até 8 MB por foto.");
      return;
    }
    setUploading(true);
    onUploadingChange(true);
    setError(null);
    try {
      for (const file of selected) {
        setProgress(0);
        const blob = await upload(`stores/${file.name}`, file, {
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
      onUploadingChange(false);
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
        Fotos da loja e dos produtos
      </span>

      {/* Uma URL por foto, na ordem definida. */}
      {slides.map((url) => (
        <input key={url} type="hidden" name="photos" value={url} />
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
                  alt={`Foto ${index + 1}`}
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
                disabled={uploading}
                onClick={() => remove(index)}
                aria-label={`Remover foto ${index + 1}`}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-navy/80 text-white transition-colors hover:bg-brand-coral"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <div className="absolute bottom-2 right-2 flex gap-1">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={uploading || index === 0}
                  aria-label="Mover foto para antes"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-text-secondary transition-colors hover:bg-white disabled:opacity-40"
                >
                  <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={uploading || index === slides.length - 1}
                  aria-label="Mover foto para depois"
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
        disabled={uploading || slides.length >= 12}
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
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {error || fieldError ? (
        <span className="block text-xs text-brand-coral">{error || fieldError}</span>
      ) : (
        <span className="block text-xs text-text-muted">
          Até 12 fotos de 8 MB cada. Reordene pelas setas; as fotos ficam
          disponíveis no card e na galeria ampliada da loja.
        </span>
      )}
    </div>
  );
}
