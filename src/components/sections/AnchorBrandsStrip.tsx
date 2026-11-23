"use client";

import Image from "next/image";
import type { BrandLogo as Brand } from "@/lib/brand-logos";

/** Faixa de logos gerenciada em /admin/marcas; sem logos, a seção não aparece. */
export function AnchorBrandsStrip({ brands }: { brands: Brand[] }) {
  if (brands.length === 0) return null;
  // Duplicate the list so the marquee can loop seamlessly
  const loop = [...brands, ...brands];

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

function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <div className="flex h-16 shrink-0 items-center justify-center px-3">
      <Image
        src={brand.logo}
        alt={brand.name}
        width={400}
        height={96}
        className="h-12 w-auto max-w-[200px] object-contain opacity-80 transition-opacity hover:opacity-100"
      />
    </div>
  );
}
