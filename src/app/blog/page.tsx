import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { posts } from "@/lib/data/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Acompanhe novidades, campanhas e conteúdos sobre moda e compras no Stop Shop.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Conteúdo e novidades do Stop Shop"
        description="Campanhas, lançamentos e inspirações para acompanhar o que movimenta o empreendimento ao longo do ano."
        actions={[
          { label: "Ver lojas", href: "/lojas" },
          { label: "Entrar em contato", href: "/contato", variant: "secondary" },
        ]}
        stats={[
          { label: "Publicações em destaque", value: String(posts.length) },
          { label: "Temas", value: "Moda + eventos" },
          { label: "Atualização", value: "Sazonal" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-[28px] border border-border-default bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative aspect-[1.3/1] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-pill bg-brand-coral/10 px-2.5 py-0.5 font-medium text-brand-coral">
                    {post.category}
                  </span>
                  <span className="text-text-muted">{post.readingTime}</span>
                </div>
                <h2 className="mt-4 font-display text-3xl font-bold text-text-primary transition-colors group-hover:text-brand-coral">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {post.excerpt}
                </p>
                <p className="mt-5 text-sm font-semibold text-brand-coral">Ler matéria</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
