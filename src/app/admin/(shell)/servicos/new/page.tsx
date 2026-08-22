import { getAllServices } from "@/lib/server/queries";
import { PageHeader } from "../../_components/PageHeader";
import { ServiceForm } from "../ServiceForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Novo serviço" };

export default async function NewServicePage() {
  const services = await getAllServices();
  const categories = [
    ...new Set(services.map((s) => s.category.trim()).filter(Boolean)),
  ].sort();

  return (
    <div>
      <PageHeader
        title="Novo serviço"
        description="O serviço aparece na grade da página Serviços."
        backHref="/admin/servicos"
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <ServiceForm categories={categories} />
      </div>
    </div>
  );
}
