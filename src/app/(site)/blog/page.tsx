import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { getAllPosts } from "@/lib/server/queries";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Acompanhe novidades, lançamentos e bastidores do Stop Shop em Brusque, SC.",
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return dateFormatter.format(parsed);
}

export default async function BlogPage() {
  const posts = await getAllPosts({ onlyPublished: true });

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Histórias, tendências e bastidores"
        description="Conteúdos sobre moda, atacado e os movimentos do shopping em Brusque."
      />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        {posts.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-border-subtle bg-surface-soft px-6 py-12 text-center">
            <p className="font-medium text-text-primary">
              Em breve traremos novos conteúdos.
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Enquanto isso, conheça as lojas do Stop Shop em /lojas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-[20px] border border-border-default bg-white shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-coral">
                    {post.category}
                  </p>
                  <h2 className="mt-2 font-display text-lg font-bold text-text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-text-muted">
                    <span>{formatDate(post.date)}</span>
                    {post.readingTime && <span>{post.readingTime}</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
