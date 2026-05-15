import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { getGalleryImages } from "@/lib/server/queries";
import { PageHeader } from "../_components/PageHeader";

export const dynamic = "force-dynamic";
export const metadata = { title: "Galeria" };

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <div>
      <PageHeader
        title="Galeria (Sobre)"
        description={`${images.length} fotos na seção "Sobre o Stop Shop"`}
        action={
          <Link
            href="/admin/gallery/new"
            className="inline-flex items-center gap-2 rounded-button bg-brand-navy px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90"
          >
            <Plus className="h-4 w-4" />
            Nova foto
          </Link>
        }
      />

      {images.length === 0 ? (
        <div className="rounded-[20px] border border-border-default bg-white px-6 py-12 text-center shadow-card">
          <p className="font-medium text-text-primary">
            Nenhuma foto na galeria.
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Clique em &quot;Nova foto&quot; para adicionar a primeira.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <Link
              key={image.id}
              href={`/admin/gallery/${image.id}`}
              className="group overflow-hidden rounded-[16px] border border-border-default bg-white shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div className="relative aspect-video bg-surface-muted">
                <Image
                  src={image.image}
                  alt={image.alt}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <p className="truncate px-3 py-2 text-xs text-text-secondary">
                {image.alt}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
