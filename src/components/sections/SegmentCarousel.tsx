"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

const segmentCards = [
  { name: "Moda Feminina", slug: "moda-feminina", count: 45, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80" },
  { name: "Moda Masculina", slug: "moda-masculina", count: 30, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80" },
  { name: "Jeans", slug: "jeans", count: 20, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80" },
  { name: "Moda Infantil", slug: "moda-infantil", count: 25, image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80" },
  { name: "Lingerie", slug: "lingerie", count: 15, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80" },
  { name: "Acessórios", slug: "acessorios", count: 14, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" },
  { name: "Plus Size", slug: "plus-size", count: 12, image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80" },
  { name: "Fitness", slug: "fitness", count: 12, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80" },
];

function SegmentCard({ name, slug, count, image }: (typeof segmentCards)[number]) {
  return (
    <Link href={`/segmentos/${slug}`} className="block">
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative overflow-hidden rounded-card"
        style={{ aspectRatio: "3/4" }}
      >
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 65vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display text-lg font-bold text-brand-cream">{name}</h3>
          <span className="mt-1.5 inline-block rounded-pill bg-brand-coral px-2.5 py-0.5 text-xs font-medium text-white">
            {count} lojas
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

export function SegmentCarousel() {
  return (
    <section className="bg-brand-cream py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Segmentos"
          title="Explore por categoria"
          highlight="categoria"
          light
        />

        {/* Mobile: horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide lg:hidden -mx-[var(--spacing-section-x)] px-[var(--spacing-section-x)]">
          {segmentCards.map((seg) => (
            <div key={seg.slug} className="shrink-0 w-[65vw] sm:w-[45vw] snap-start">
              <SegmentCard {...seg} />
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <StaggerChildren className="hidden lg:grid grid-cols-4 gap-5">
          {segmentCards.map((seg) => (
            <StaggerItem key={seg.slug}>
              <SegmentCard {...seg} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
