import { notFound } from "next/navigation";
import { getAllSegments, getStoreById } from "@/lib/server/queries";
import { deleteStoreAction } from "@/lib/server/actions/stores";
import { PageHeader } from "../../_components/PageHeader";
import { StoreForm } from "../StoreForm";
import { DeleteButton } from "../../_components/DeleteButton";

export const metadata = { title: "Editar loja" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditStorePage({ params }: PageProps) {
  const { id } = await params;
  const storeId = Number(id);
  if (!Number.isInteger(storeId)) notFound();

  const [store, segments] = await Promise.all([
    getStoreById(storeId),
    getAllSegments(),
  ]);
  if (!store) notFound();

  const handleDelete = deleteStoreAction.bind(null, storeId);

  return (
    <div>
      <PageHeader
        title={store.name}
        description={`Editando loja /${store.slug}`}
        backHref="/admin/stores"
        action={
          <DeleteButton
            action={handleDelete}
            confirmMessage={`Tem certeza que deseja excluir "${store.name}"?`}
          />
        }
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <StoreForm segments={segments} store={store} />
      </div>
    </div>
  );
}
