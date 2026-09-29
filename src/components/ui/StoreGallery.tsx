"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, Store, X } from "lucide-react";
import { getStoreImages } from "@/lib/store-images";
import { cn } from "@/lib/utils";

type GalleryStore = { name: string; photo: string; storefront: string | null; photos?: string[] };

export function StoreGallery({ store, preferLogo = false, className, children }: {
  store: GalleryStore;
  preferLogo?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const images = getStoreImages(store, preferLogo);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const image = images[index] ?? images[0];
  const move = (direction: number) => setIndex((current) => (current + direction + images.length) % images.length);

  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const opener = trigger.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element?.showModal();
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, [open]);

  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-muted", className)}>
      {image ? (
        <>
          <button ref={trigger} type="button" onClick={() => setOpen(true)} aria-label={`Ampliar fotos de ${store.name}`} className="absolute inset-0 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand-coral">
            <Image src={image} alt={store.name} fill sizes="(max-width: 640px) 100vw, 33vw" className={image === store.photo ? "object-contain p-5" : "object-cover"} />
            <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-brand-navy/85 px-2.5 py-1.5 text-xs text-white"><Expand className="h-3.5 w-3.5" aria-hidden="true" />{images.length > 1 ? `${index + 1}/${images.length}` : "Ampliar"}</span>
          </button>
          {images.length > 1 && (
            <div className="absolute bottom-2 left-2 flex gap-1">
              <button type="button" onClick={() => move(-1)} aria-label={`Foto anterior de ${store.name}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-brand-navy shadow"><ChevronLeft className="h-4 w-4" /></button>
              <button type="button" onClick={() => move(1)} aria-label={`Próxima foto de ${store.name}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-brand-navy shadow"><ChevronRight className="h-4 w-4" /></button>
            </div>
          )}
        </>
      ) : (
        <div className="flex h-full items-center justify-center text-text-muted"><Store className="h-10 w-10" aria-hidden="true" /></div>
      )}
      {children ? <div className="pointer-events-none absolute inset-0">{children}</div> : null}
      {open && (
        <dialog ref={dialog} aria-labelledby={titleId} onCancel={() => setOpen(false)} onClose={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }} onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        }} className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-5xl overflow-hidden rounded-2xl bg-white p-0 text-brand-navy shadow-xl backdrop:bg-black/80">
          <header className="flex items-center justify-between gap-4 px-4 py-3">
            <h2 id={titleId} className="min-w-0 font-semibold">{store.name}</h2>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fechar galeria" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-muted"><X className="h-5 w-5" /></button>
          </header>
          <div className="relative h-[min(65dvh,700px)] bg-surface-soft">
            <Image src={image} alt={`${store.name} — foto ${index + 1} de ${images.length}`} fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-contain" />
          </div>
          <footer className="flex items-center justify-center gap-5 px-4 py-3">
            <button type="button" disabled={images.length < 2} onClick={() => move(-1)} aria-label="Foto anterior" className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-muted disabled:opacity-30"><ChevronLeft className="h-5 w-5" /></button>
            <span aria-live="polite" aria-atomic="true" className="text-sm">{index + 1} de {images.length}</span>
            <button type="button" disabled={images.length < 2} onClick={() => move(1)} aria-label="Próxima foto" className="flex h-11 w-11 items-center justify-center rounded-full bg-surface-muted disabled:opacity-30"><ChevronRight className="h-5 w-5" /></button>
          </footer>
        </dialog>
      )}
    </div>
  );
}
