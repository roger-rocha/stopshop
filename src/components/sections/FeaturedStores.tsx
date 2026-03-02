"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { StoreCard } from "@/components/ui/StoreCard";
import { CTAButton } from "@/components/ui/CTAButton";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { stores } from "@/lib/data/stores";

export function FeaturedStores() {
  const featured = stores.filter((s) => s.featured).slice(0, 6);

  return (
    <section className="bg-surface-light py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title="Lojas em Destaque"
          subtitle="Conheça algumas das marcas que fazem do Stop Shop o melhor destino de compras"
        />

        <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((store) => (
            <StaggerItem key={store.id}>
              <StoreCard store={store} />
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
