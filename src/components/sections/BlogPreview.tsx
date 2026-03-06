"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { posts } from "@/lib/data/posts";

export function BlogPreview() {
  return (
    <section className="bg-surface-light py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Blog"
          title="Últimas novidades"
          highlight="novidades"
          subtitle="Conteúdo com campanhas, tendências e informações úteis para clientes e compradores que acompanham o Stop Shop."
          light
        />

        <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="overflow-hidden rounded-[28px] border border-border-default bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
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
                      <span className="text-text-secondary">
                        {new Date(post.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="mt-3 font-body text-lg font-semibold text-text-primary transition-colors line-clamp-2 group-hover:text-brand-coral">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-2">
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
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 font-medium text-brand-coral transition-colors hover:text-brand-coral-dark"
          >
            Ver todos os posts
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
