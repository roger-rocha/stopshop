import { notFound } from "next/navigation";
import { getJobOpeningById } from "@/lib/server/queries";
import { deleteJobAction } from "@/lib/server/actions/jobs";
import { PageHeader } from "../../_components/PageHeader";
import { JobForm } from "../JobForm";
import { DeleteButton } from "../../_components/DeleteButton";

export const metadata = { title: "Editar vaga" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage({ params }: PageProps) {
  const { id } = await params;
  const jobId = Number(id);
  if (!Number.isInteger(jobId)) notFound();

  const job = await getJobOpeningById(jobId);
  if (!job) notFound();

  const handleDelete = deleteJobAction.bind(null, jobId);

  return (
    <div>
      <PageHeader
        title={job.title}
        description={job.company ? `Editando • ${job.company}` : "Editando vaga"}
        backHref="/admin/vagas"
        action={
          <DeleteButton
            action={handleDelete}
            confirmMessage={`Tem certeza que deseja excluir "${job.title}"?`}
          />
        }
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <JobForm job={job} />
      </div>
    </div>
  );
}
