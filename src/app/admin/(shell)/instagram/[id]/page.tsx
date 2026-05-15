import { notFound } from "next/navigation";
import { getInstagramPostById } from "@/lib/server/queries";
import { deleteInstagramPostAction } from "@/lib/server/actions/instagram";
import { PageHeader } from "../../_components/PageHeader";
import { InstagramPostForm } from "../InstagramPostForm";
import { DeleteButton } from "../../_components/DeleteButton";

export const metadata = { title: "Editar publicação" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditInstagramPostPage({ params }: PageProps) {
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isInteger(postId)) notFound();

  const item = await getInstagramPostById(postId);
  if (!item) notFound();

  const handleDelete = deleteInstagramPostAction.bind(null, postId);

  return (
    <div>
      <PageHeader
        title="Editar publicação"
        description={item.alt}
        backHref="/admin/instagram"
        action={
          <DeleteButton
            action={handleDelete}
            confirmMessage="Tem certeza que deseja excluir esta publicação?"
          />
        }
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <InstagramPostForm item={item} />
      </div>
    </div>
  );
}
