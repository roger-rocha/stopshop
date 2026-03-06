import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { posts } from "@/lib/data/posts";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    return { title: "Post não encontrado" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        actions={[
          { label: "Voltar ao blog", href: "/blog", variant: "secondary" },
          { label: "Ver lojas", href: "/lojas", variant: "ghost" },
        ]}
        stats={[
          { label: "Leitura", value: post.readingTime ?? "4 min" },
          {
            label: "Data",
            value: new Date(post.date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
          },
          { label: "Tema", value: post.category },
        ]}
      />

      <article className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="overflow-hidden rounded-[32px] border border-border-default bg-white shadow-card">
          <div className="relative aspect-[1.9/1]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="max-w-none">
              {post.content.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mb-5 text-lg leading-relaxed text-text-secondary last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
