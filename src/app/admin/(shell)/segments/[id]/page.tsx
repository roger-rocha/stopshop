import { notFound } from "next/navigation";
import { getSegmentById } from "@/lib/server/queries";
import { deleteSegmentAction } from "@/lib/server/actions/segments";
import { PageHeader } from "../../_components/PageHeader";
import { SegmentForm } from "../SegmentForm";
import { DeleteButton } from "../../_components/DeleteButton";

export const metadata = { title: "Editar segmento" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSegmentPage({ params }: PageProps) {
  const { id } = await params;
  const segmentId = Number(id);
  if (!Number.isInteger(segmentId)) notFound();

  const segment = await getSegmentById(segmentId);
  if (!segment) notFound();

  const handleDelete = deleteSegmentAction.bind(null, segmentId);

  return (
    <div>
      <PageHeader
        title={segment.name}
        description={`Editando segmento /${segment.slug}`}
        backHref="/admin/segments"
        action={
          <DeleteButton
            action={handleDelete}
            confirmMessage={`Tem certeza que deseja excluir "${segment.name}"?`}
          />
        }
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <SegmentForm segment={segment} />
      </div>
    </div>
  );
}
