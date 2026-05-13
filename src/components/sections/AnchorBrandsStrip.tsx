"use client";

import Image from "next/image";
import { anchorBrands } from "@/lib/data/anchor-brands";
import { cn } from "@/lib/utils";

export function AnchorBrandsStrip() {
  // Duplicate the list so the marquee can loop seamlessly
  const loop = [...anchorBrands, ...anchorBrands];

  return (
    <section className="relative overflow-hidden border-y border-border-default bg-white py-8">
      <div className="mx-auto max-w-7xl px-[var(--spacing-section-x)]">
        <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
          Marcas que você encontra no Stop Shop
        </p>
      </div>

      <div
        className="group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent_0,#000_8%,#000_92%,transparent_100%)]"
        aria-label="Marcas em destaque"
      >
        <div className="animate-marquee flex shrink-0 items-center gap-12 pr-12 group-hover:[animation-play-state:paused]">
          {loop.map((brand, i) => (
            <BrandLogo brand={brand} key={`${brand.name}-${i}`} />
          ))}
        </div>
        <div
          aria-hidden="true"
          className="animate-marquee flex shrink-0 items-center gap-12 pr-12 group-hover:[animation-play-state:paused]"
        >
          {loop.map((brand, i) => (
            <BrandLogo brand={brand} key={`${brand.name}-dup-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandLogo({ brand }: { brand: (typeof anchorBrands)[number] }) {
  return (
    <div
      className={cn(
        "flex h-14 shrink-0 items-center justify-center px-3",
        brand.anchor && "min-w-[140px]"
      )}
    >
      {brand.logo ? (
        <Image
          src={brand.logo}
          alt={brand.name}
          width={120}
          height={48}
          className="h-10 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
        />
      ) : (
        <span
          className={cn(
            "font-display text-xl font-bold tracking-tight",
            brand.anchor ? "text-brand-navy" : "text-text-secondary"
          )}
        >
          {brand.name}
        </span>
      )}
    </div>
  );
}
