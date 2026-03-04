"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { StoreCard } from "@/components/ui/StoreCard";
import { CTAButton } from "@/components/ui/CTAButton";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { stores } from "@/lib/data/stores";

export function FeaturedStores() {
  const featured = stores.filter((s) => s.featured).slice(0, 6);

  return (
    <section className="bg-surface-card/50 py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title="Lojas em Destaque"
          highlight="Destaque"
          subtitle="Conheça algumas das marcas que fazem do Stop Shop o melhor destino de compras"
        />

        {/* Bento grid: first card larger on desktop */}
        <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          {featured.map((store, i) => (
            <StaggerItem
              key={store.id}
              className={i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}
            >
              <StoreCard store={store} className="h-full" />
            </StaggerItem>
          ))}
        </StaggerChildren>

        <div className="mt-12 text-center">
          <CTAButton href="/lojas" variant="secondary">
            Ver Todas as Lojas
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
