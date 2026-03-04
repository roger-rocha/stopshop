"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";

const blogPosts = [
  {
    slug: "alto-verao-2025",
    title: "Alto Verão 2025: tendências que chegam ao Stop Shop",
    date: "2025-01-15",
    excerpt: "Descubra as peças-chave da temporada e encontre tudo com preço de fábrica.",
    category: "Moda",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
  },
  {
    slug: "natal-2024-stop-shop",
    title: "Natal 2024: promoções especiais e horário estendido",
    date: "2024-12-10",
    excerpt: "Programação completa, sorteios e descontos exclusivos para o fim de ano.",
    category: "Eventos",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
  },
  {
    slug: "tendencias-verao-2024",
    title: "Tendências Verão 2024: o que bomba em Brusque",
    date: "2024-10-20",
    excerpt: "De linho a estampas tropicais — veja o que os lojistas estão apostando.",
    category: "Moda",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80",
  },
];

export function BlogPreview() {
  return (
    <section className="bg-brand-cream py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Blog"
          title="Últimas novidades"
          highlight="novidades"
          light
        />

        <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="rounded-pill bg-brand-coral/10 px-2.5 py-0.5 font-medium text-brand-coral">
                        {post.category}
                      </span>
                      <span className="text-text-muted">
                        {new Date(post.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="mt-3 font-body text-lg font-semibold text-text-inverse group-hover:text-brand-coral transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted line-clamp-2">
                      {post.excerpt}
                    </p>
                    <p className="mt-3 text-sm font-medium text-brand-coral group-hover:underline">
                      Ler mais →
                    </p>
                  </div>
                </article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <div className="mt-10 text-center">
          <a
            href="/blog"
            className="group inline-flex items-center gap-2 font-medium text-brand-coral transition-colors hover:text-brand-coral-dark"
          >
            Ver todos os posts
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
