import { notFound } from "next/navigation";
import { getAllServices, getServiceById } from "@/lib/server/queries";
import { deleteServiceAction } from "@/lib/server/actions/services";
import { PageHeader } from "../../_components/PageHeader";
import { ServiceForm } from "../ServiceForm";
import { DeleteButton } from "../../_components/DeleteButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Editar serviço" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: PageProps) {
  const { id } = await params;
  const serviceId = Number(id);
  if (!Number.isInteger(serviceId)) notFound();

  const [service, services] = await Promise.all([
    getServiceById(serviceId),
    getAllServices(),
  ]);
  if (!service) notFound();

  const categories = [
    ...new Set(services.map((s) => s.category.trim()).filter(Boolean)),
  ].sort();
  const handleDelete = deleteServiceAction.bind(null, serviceId);

  return (
    <div>
      <PageHeader
        title={service.name}
        description={service.category ? `Editando • ${service.category}` : "Editando serviço"}
        backHref="/admin/servicos"
        action={
          <DeleteButton
            action={handleDelete}
            confirmMessage={`Tem certeza que deseja excluir "${service.name}"?`}
          />
        }
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <ServiceForm service={service} categories={categories} />
      </div>
    </div>
  );
}
