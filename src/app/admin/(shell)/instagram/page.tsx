import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { getInstagramPosts } from "@/lib/server/queries";
import { PageHeader } from "../_components/PageHeader";

export const dynamic = "force-dynamic";
export const metadata = { title: "Instagram" };

export default async function InstagramPage() {
  const posts = await getInstagramPosts();

  return (
    <div>
      <PageHeader
        title="Instagram"
        description={`${posts.length} publicações na grade da home`}
        action={
          <Link
            href="/admin/instagram/new"
            className="inline-flex items-center gap-2 rounded-button bg-brand-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90"
          >
            <Plus className="h-4 w-4" />
            Nova publicação
          </Link>
        }
      />

      {posts.length === 0 ? (
        <div className="rounded-[20px] border border-border-default bg-white px-6 py-12 text-center shadow-card">
          <p className="font-medium text-text-primary">
            Nenhuma publicação cadastrada.
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Clique em &quot;Nova publicação&quot; para adicionar a primeira.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/admin/instagram/${post.id}`}
              className="group relative block aspect-square overflow-hidden rounded-[14px] border border-border-default bg-surface-muted shadow-card transition-shadow hover:shadow-card-hover"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                unoptimized
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 33vw, 16vw"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
