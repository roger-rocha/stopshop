import { PageHeader } from "../../_components/PageHeader";
import { PostForm } from "../PostForm";

export const metadata = { title: "Novo post" };

export default function NewPostPage() {
  return (
    <div>
      <PageHeader
        title="Novo post"
        description="Publique um artigo no blog do Stop Shop."
        backHref="/admin/posts"
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <PostForm />
      </div>
    </div>
  );
}
