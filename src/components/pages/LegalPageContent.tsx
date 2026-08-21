import { PageHero } from "@/components/ui/PageHero";
import { RichText } from "@/components/ui/RichText";
import { formatDateBR } from "@/lib/utils";
import type { LegalPage } from "@/lib/server/queries";

export function LegalPageContent({ page }: { page: LegalPage }) {
  return (
    <>
      <PageHero
        eyebrow="Institucional"
        title={page.title}
        description={page.description}
      />

      <section className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <p className="text-sm text-text-muted">
          Última atualização: {formatDateBR(page.updatedAt)}
        </p>
        <RichText content={page.body} className="mt-8" />
      </section>
    </>
  );
}
