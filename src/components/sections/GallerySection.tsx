"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { InstitutionalVideo } from "@/components/ui/InstitutionalVideo";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";
import type { GalleryImage } from "@/db/schema";

const highlights = [
  { value: "30+", label: "anos de história" },
  { value: "160+", label: "lojas em um só lugar" },
  { value: "4", label: "pavimentos planejados" },
  { value: "310+", label: "vagas de estacionamento" },
];

interface GallerySectionProps {
  images: GalleryImage[];
}

export function GallerySection({ images }: GallerySectionProps) {
  return (
    <section className="relative overflow-hidden bg-surface-light py-[var(--spacing-section-y)]">
      {/* Subtle ornament */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-brand-coral/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-[var(--spacing-section-x)]">
        <SectionHeader
          label="Sobre o Stop Shop"
          title="Um espaço pensado para a experiência de compra"
          highlight="experiência de compra"
          subtitle="Ambientes planejados para facilitar a circulação, valorizar as lojas e tornar a visita mais confortável para clientes, lojistas e excursões."
          light
        />

        <AnimateOnScroll className="mb-10">
          <InstitutionalVideo
            src="https://mayoqfpgidrxfis3.public.blob.vercel-storage.com/videos/video-insti.mp4"
            poster="https://mayoqfpgidrxfis3.public.blob.vercel-storage.com/videos/video-insti-poster.jpg"
          />
        </AnimateOnScroll>

        <AnimateOnScroll>
          <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center rounded-2xl border border-border-default bg-white px-4 py-7 text-center shadow-card sm:py-9"
              >
                <p className="font-display text-5xl font-bold leading-none text-brand-navy sm:text-6xl">
                  {item.value}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-text-muted sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>

      {images.length > 0 && (
        <StaggerChildren className="grid grid-cols-2 gap-3 px-[var(--spacing-section-x)] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[180px]">
          {images.map((image, i) => (
            <StaggerItem
              key={image.id}
              className={i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
            >
              <div className="group relative h-full min-h-[180px] overflow-hidden rounded-xl sm:min-h-[200px]">
                <Image
                  src={image.image}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                  sizes={i === 0 ? "50vw" : "25vw"}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      )}
    </section>
  );
}
