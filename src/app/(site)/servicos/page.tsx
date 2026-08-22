import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesDirectory } from "@/components/pages/ServicesDirectory";
import { PendingContent } from "@/components/pages/PendingContent";
import { getPublishedServices } from "@/lib/server/queries";
import { storeOpeningHours } from "@/lib/site";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Estacionamento, acessibilidade, praça de alimentação e demais comodidades disponíveis para quem visita o Stop Shop em Brusque, SC.",
};

export default async function ServicosPage() {
  const services = await getPublishedServices();

  return (
    <>
      <PageHero
        eyebrow="Serviços"
        title="Comodidades para a sua visita"
        description="Estrutura pensada para deixar a experiência de compra mais confortável e prática, do estacionamento à praça de alimentação."
        actions={[{ label: "Falar com a equipe", href: "/contato", variant: "secondary" }]}
        stats={
          services.length > 0
            ? [{ label: "Serviços disponíveis", value: String(services.length) }]
            : []
        }
      >
        {services.length > 0 && (
          <div className="mb-5 rounded-2xl border border-border-default bg-surface-soft px-5 py-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-coral">
              Funcionamento
            </p>
            <p className="mt-2 text-base font-medium text-text-primary">
              {storeOpeningHours.title}
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              {storeOpeningHours.weekdays}
            </p>
            <p className="text-sm text-text-secondary">{storeOpeningHours.sunday}</p>
          </div>
        )}
      </PageHero>

      {services.length > 0 ? (
        <ServicesDirectory services={services} />
      ) : (
        <PendingContent note="Os serviços ainda serão cadastrados pela equipe do Stop Shop." />
      )}
    </>
  );
}
