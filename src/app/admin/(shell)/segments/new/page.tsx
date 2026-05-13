import { PageHeader } from "../../_components/PageHeader";
import { SegmentForm } from "../SegmentForm";

export const metadata = { title: "Novo segmento" };

export default function NewSegmentPage() {
  return (
    <div>
      <PageHeader
        title="Novo segmento"
        description="Adicione uma nova categoria de lojas."
        backHref="/admin/segments"
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <SegmentForm />
      </div>
    </div>
  );
}
