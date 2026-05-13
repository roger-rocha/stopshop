"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { AnimateOnScroll } from "@/components/motion/AnimateOnScroll";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&q=80",
    alt: "Corredor principal do Stop Shop",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    alt: "Vitrines e lojas de moda",
  },
  {
    src: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80",
    alt: "Praça de alimentação",
  },
  {
    src: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    alt: "Vitrines de marcas",
  },
  {
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
    alt: "Ambiente interno",
  },
  {
    src: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
    alt: "Espaço de descanso",
  },
  {
    src: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&q=80",
    alt: "Detalhes da decoração",
  },
  {
    src: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=800&q=80",
    alt: "Iluminação do mall",
  },
];

const highlights = [
  { value: "30+", label: "anos de história" },
  { value: "160+", label: "lojas em um só lugar" },
  { value: "4", label: "pavimentos planejados" },
  { value: "310+", label: "vagas de estacionamento" },
];

export function GallerySection() {
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

        <AnimateOnScroll>
          <div className="mb-10 grid grid-cols-2 gap-4 rounded-2xl border border-border-default bg-white p-6 sm:grid-cols-4 sm:gap-8 sm:p-8">
            {highlights.map((item) => (
              <div key={item.label} className="text-center sm:text-left">
                <p className="font-display text-3xl font-bold text-brand-navy sm:text-4xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-text-muted sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>

      <StaggerChildren className="grid grid-cols-2 gap-3 px-[var(--spacing-section-x)] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[180px]">
        {galleryImages.map((img, i) => (
          <StaggerItem
            key={img.src}
            className={img.span ?? ""}
          >
            <div className="group relative h-full min-h-[180px] overflow-hidden rounded-xl sm:min-h-[200px]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                sizes={i === 0 ? "50vw" : "25vw"}
              />
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </section>
  );
}
