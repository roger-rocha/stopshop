"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTAButton } from "@/components/ui/CTAButton";
import { StaggerChildren, StaggerItem } from "@/components/motion/StaggerChildren";
import { posts } from "@/lib/data/posts";

export function BlogPreview() {
  return (
    <section className="py-[var(--spacing-section-y)] px-[var(--spacing-section-x)]">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title="Últimas Notícias"
          highlight="Notícias"
          subtitle="Fique por dentro das novidades, tendências e eventos do Stop Shop"
        />

        <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="overflow-hidden rounded-card bg-surface-card border border-border-subtle shadow-card transition-all hover:shadow-card-hover hover:border-brand-gold/30">
                  {/* Image placeholder */}
                  <div className="h-48 bg-surface-elevated group-hover:bg-surface-elevated/80 transition-colors" />

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

                    <h3 className="mt-3 font-display text-lg font-bold text-text-primary group-hover:text-brand-gold transition-colors">
                      {post.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <div className="mt-12 text-center">
          <CTAButton href="/blog" variant="secondary">
            Ver Blog
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
