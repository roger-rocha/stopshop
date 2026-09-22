"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useRef } from "react";
import { SectionBackground } from "@/components/ui/SectionBackground";
import type { Segment } from "@/db/schema";

interface SegmentCarouselProps {
  segments: Pick<Segment, "name" | "slug" | "storeCount" | "image">[];
}

interface SegmentCardData {
  name: string;
  slug: string;
  count: number;
  image: string | null;
}

function SegmentCard({ name, slug, count, image }: SegmentCardData) {
  return (
    <Link href={`/segmentos/${slug}`} className="block">
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="group relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: "3/4" }}
      >
        {image ? <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 65vw, 25vw"
        />
        : <div className="flex h-full items-center justify-center bg-brand-navy"><ShoppingBag aria-hidden="true" className="h-24 w-24 text-white/30" strokeWidth={1} /></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-brand-navy/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display text-lg font-bold text-white">{name}</h3>
          <span className="mt-1.5 inline-block rounded-pill bg-white/90 px-2.5 py-0.5 text-xs font-medium text-brand-navy">
            {count} {count === 1 ? "loja" : "lojas"}
          </span>
          <span className="mt-3 flex w-fit items-center gap-1.5 rounded-pill bg-brand-coral px-3.5 py-1.5 text-xs font-semibold text-white shadow-card transition-transform group-hover:translate-x-0.5">
            Ver Lojas
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

export function SegmentCarousel({ segments }: SegmentCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const segmentCards: SegmentCardData[] = segments.map((segment) => ({
    name: segment.name,
    slug: segment.slug,
    count: segment.storeCount,
    image: segment.image,
  }));

  return (
    <section className="relative isolate overflow-hidden bg-surface-light py-[var(--spacing-section-y)]">
      <SectionBackground src="/images/sections/segmentos.jpg" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-brand-coral/5 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-brand-gold/8 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-[var(--spacing-section-x)]">
        <SectionHeader
          label="Segmentos"
          title="Explore por categoria"
          highlight="categoria"
          subtitle="Navegue pelos principais segmentos do Stop Shop e descubra marcas para comprar com praticidade."
          light
        />

        <div className="mb-5 flex justify-end gap-2">
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              aria-label={direction === -1 ? "Categorias anteriores" : "Próximas categorias"}
              onClick={() => {
                const carousel = carouselRef.current;
                if (carousel) carousel.scrollBy({ left: direction * carousel.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border-default bg-white text-brand-navy hover:bg-surface-muted"
            >
              {direction === -1 ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            </button>
          ))}
        </div>
        <div ref={carouselRef} role="region" aria-label="Categorias de lojas" tabIndex={0} className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5">
          {segmentCards.map((seg) => (
            <div key={seg.slug} className="w-[75%] shrink-0 snap-start sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]">
              <SegmentCard {...seg} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
