"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { segments } from "@/lib/data/segments";

const segmentCards = segments.slice(0, 6).map((segment) => ({
  name: segment.name,
  slug: segment.slug,
  count: segment.storeCount,
  image:
    segment.image ??
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
}));

function SegmentCard({ name, slug, count, image }: (typeof segmentCards)[number]) {
  return (
    <Link href={`/segmentos/${slug}`} className="block">
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="group relative overflow-hidden rounded-2xl"
        style={{ aspectRatio: "3/4" }}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 65vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display text-lg font-bold text-white">{name}</h3>
          <span className="mt-1.5 inline-block rounded-pill bg-white/90 px-2.5 py-0.5 text-xs font-medium text-brand-navy">
            {count} lojas
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

export function SegmentCarousel() {
  return (
    <section className="overflow-hidden bg-surface-light py-[var(--spacing-section-y)]">
      <div className="mx-auto max-w-7xl px-[var(--spacing-section-x)]">
        <SectionHeader
          label="Segmentos"
          title="Explore por categoria"
          highlight="categoria"
          subtitle="Navegue pelos principais segmentos do Stop Shop e descubra marcas para comprar com praticidade."
          light
        />

        {/* Desktop: grid */}
        <StaggerChildren className="hidden lg:grid grid-cols-3 gap-5">
          {segmentCards.map((seg) => (
            <StaggerItem key={seg.slug}>
              <SegmentCard {...seg} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>

      {/* Mobile: horizontal scroll — full-bleed, contained to this section */}
      <div className="flex gap-4 overflow-x-auto scroll-px-[var(--spacing-section-x)] snap-x snap-mandatory px-[var(--spacing-section-x)] pb-4 scrollbar-hide lg:hidden">
        {segmentCards.map((seg) => (
          <div key={seg.slug} className="w-[65vw] shrink-0 snap-start sm:w-[45vw]">
            <SegmentCard {...seg} />
          </div>
        ))}
      </div>
    </section>
  );
}
