import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { StoreCard } from "@/components/ui/StoreCard";
import { getSegmentBySlug, getStoresBySegment } from "@/lib/server/queries";

// Rendered on demand and cached (ISR) — avoids build-time queries to the
// remote Turso DB, which can hang the build when the DB is slow to respond.
export const revalidate = 3600;

interface SegmentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: SegmentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const segment = await getSegmentBySlug(slug);

  if (!segment) {
    return { title: "Segmento não encontrado" };
  }

  return {
    title: segment.name,
    description: `Explore as lojas do segmento ${segment.name} no Stop Shop.`,
  };
}

export default async function SegmentPage({ params }: SegmentPageProps) {
  const { slug } = await params;
  const segment = await getSegmentBySlug(slug);
  if (!segment) notFound();

  const segmentStores = await getStoresBySegment(slug);

  return (
    <>
      <PageHero
        eyebrow="Segmento"
        title={segment.name}
        description={`Veja as lojas e operações ligadas a ${segment.name.toLowerCase()} dentro do Stop Shop.`}
        actions={[
          { label: "Ver todas as lojas", href: "/lojas" },
          { label: "Como chegar", href: "/localizacao", variant: "secondary" },
        ]}
        stats={[
          { label: "Lojas listadas", value: String(segmentStores.length) },
          { label: "Categoria", value: "Moda & lifestyle" },
          { label: "Atendimento", value: "Seg - Sáb" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
        {segmentStores.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {segmentStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-border-subtle bg-surface-soft px-6 py-12 text-center">
            <p className="font-medium text-text-primary">
              Estamos atualizando a vitrine deste segmento.
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Enquanto isso, confira todas as lojas disponíveis no guia completo.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
