"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StoreCard } from "@/components/ui/StoreCard";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { stores } from "@/lib/data/stores";

const featuredStores = stores.filter((store) => store.featured).slice(0, 5);

export function FeaturedStores() {
  const [featured, ...rest] = featuredStores;

  return (
    <section className="bg-white py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Lojas em Destaque"
          title="Conheça algumas das nossas lojas"
          highlight="nossas lojas"
          subtitle="Uma seleção de marcas que traduz a diversidade do Stop Shop em diferentes segmentos de moda."
          light
        />

        <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured large card */}
          <StaggerItem className="sm:col-span-2 sm:row-span-2">
            <StoreCard store={featured} variant="featured" />
          </StaggerItem>

          {/* Remaining stores */}
          {rest.map((store) => (
            <StaggerItem key={store.name}>
              <StoreCard store={store} />
            </StaggerItem>
          ))}
        </StaggerChildren>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href="/lojas"
            className="group inline-flex items-center gap-2 font-medium text-brand-coral transition-colors hover:text-brand-coral-dark"
          >
            Ver todas as lojas
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
