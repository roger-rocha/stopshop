import { notFound } from "next/navigation";
import { getPostById } from "@/lib/server/queries";
import { deletePostAction } from "@/lib/server/actions/posts";
import { PageHeader } from "../../_components/PageHeader";
import { PostForm } from "../PostForm";
import { DeleteButton } from "../../_components/DeleteButton";

export const metadata = { title: "Editar post" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isInteger(postId)) notFound();

  const post = await getPostById(postId);
  if (!post) notFound();

  const handleDelete = deletePostAction.bind(null, postId);

  return (
    <div>
      <PageHeader
        title={post.title}
        description={`Editando /${post.slug}`}
        backHref="/admin/posts"
        action={
          <DeleteButton
            action={handleDelete}
            confirmMessage={`Tem certeza que deseja excluir "${post.title}"?`}
          />
        }
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <PostForm post={post} />
      </div>
    </div>
  );
}
