"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { siteSocialLinks } from "@/lib/site";

const posts = [
  {
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    alt: "Look da semana",
  },
  {
    src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    alt: "Coleção de inverno",
  },
  {
    src: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80",
    alt: "Vitrine de moda",
  },
  {
    src: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80",
    alt: "Detalhe de loja",
  },
  {
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    alt: "Vibe do shopping",
  },
  {
    src: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80",
    alt: "Bastidores",
  },
];

const instagramHandle =
  siteSocialLinks.find((l) => l.label === "Instagram")?.href ??
  "https://instagram.com/stopshop";

export function InstagramFeed() {
  return (
    <section className="bg-white py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            label="@stopshopbrusque"
            title="Siga a gente no Instagram"
            highlight="Instagram"
            subtitle="Novidades, lançamentos das lojas e os bastidores do Stop Shop."
            align="left"
            light
            className="mb-0"
          />
          <a
            href={instagramHandle}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-coral px-5 py-3 text-sm font-semibold text-white shadow-glow-coral transition-colors hover:bg-brand-coral-dark"
          >
            <Instagram className="h-4 w-4" />
            Seguir no Instagram
          </a>
        </div>

        <StaggerChildren className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {posts.map((post, i) => (
            <StaggerItem key={post.src}>
              <a
                href={instagramHandle}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl"
                aria-label={`Abrir Instagram — ${post.alt}`}
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-brand-navy/0 opacity-0 transition-all duration-300 group-hover:bg-brand-navy/55 group-hover:opacity-100">
                  <Instagram className="h-6 w-6 text-white" />
                </div>
                {i === 0 && (
                  <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-brand-navy">
                    Novo
                  </span>
                )}
              </a>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
