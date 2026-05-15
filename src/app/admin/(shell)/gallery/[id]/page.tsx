import { notFound } from "next/navigation";
import { getGalleryImageById } from "@/lib/server/queries";
import { deleteGalleryImageAction } from "@/lib/server/actions/gallery";
import { PageHeader } from "../../_components/PageHeader";
import { GalleryImageForm } from "../GalleryImageForm";
import { DeleteButton } from "../../_components/DeleteButton";

export const metadata = { title: "Editar foto" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditGalleryImagePage({ params }: PageProps) {
  const { id } = await params;
  const imageId = Number(id);
  if (!Number.isInteger(imageId)) notFound();

  const item = await getGalleryImageById(imageId);
  if (!item) notFound();

  const handleDelete = deleteGalleryImageAction.bind(null, imageId);

  return (
    <div>
      <PageHeader
        title="Editar foto"
        description={item.alt}
        backHref="/admin/gallery"
        action={
          <DeleteButton
            action={handleDelete}
            confirmMessage="Tem certeza que deseja excluir esta foto?"
          />
        }
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <GalleryImageForm item={item} />
      </div>
    </div>
  );
}
