"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { segments } from "@/lib/data/segments";

export function SegmentCarousel() {
  return (
    <section className="py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title="Explore por Segmento"
          highlight="Segmento"
          subtitle="Encontre exatamente o que você procura entre nossos mais de 13 segmentos de moda"
        />

        <StaggerChildren className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {segments.map((segment) => (
            <StaggerItem key={segment.id}>
              <Link href={`/segmentos/${segment.slug}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="group relative overflow-hidden rounded-card bg-surface-card border border-border-subtle hover:border-brand-gold/30 transition-all duration-300"
                  style={{ aspectRatio: "4/3" }}
                >
                  {/* Colored overlay */}
                  <div
                    className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: segment.color }}
                  />

                  {/* Content */}
                  <div className="relative flex h-full flex-col items-center justify-center p-4 text-center">
                    <div
                      className="mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${segment.color}20` }}
                    >
                      <div
                        className="h-5 w-5 rounded-full"
                        style={{ backgroundColor: segment.color }}
                      />
                    </div>
                    <h3 className="font-display text-sm font-bold text-text-primary sm:text-base">
                      {segment.name}
                    </h3>
                    <span className="mt-1 text-xs text-text-muted">
                      {segment.storeCount} lojas
                    </span>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
