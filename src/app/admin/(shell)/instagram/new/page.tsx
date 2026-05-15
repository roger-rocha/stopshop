import { PageHeader } from "../../_components/PageHeader";
import { InstagramPostForm } from "../InstagramPostForm";

export const metadata = { title: "Nova publicação" };

export default function NewInstagramPostPage() {
  return (
    <div>
      <PageHeader
        title="Nova publicação"
        description="Adicione uma imagem à grade do Instagram na home."
        backHref="/admin/instagram"
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <InstagramPostForm />
      </div>
    </div>
  );
}
