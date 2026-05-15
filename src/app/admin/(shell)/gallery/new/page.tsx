import { PageHeader } from "../../_components/PageHeader";
import { GalleryImageForm } from "../GalleryImageForm";

export const metadata = { title: "Nova foto" };

export default function NewGalleryImagePage() {
  return (
    <div>
      <PageHeader
        title="Nova foto"
        description="Adicione uma foto interna à galeria da seção Sobre."
        backHref="/admin/gallery"
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <GalleryImageForm />
      </div>
    </div>
  );
}
