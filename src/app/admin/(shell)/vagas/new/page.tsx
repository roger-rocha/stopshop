import { PageHeader } from "../../_components/PageHeader";
import { JobForm } from "../JobForm";

export const metadata = { title: "Nova vaga" };

export default function NewJobPage() {
  return (
    <div>
      <PageHeader
        title="Nova vaga"
        description="A vaga aparece na página Trabalhe Conosco, na aba escolhida abaixo."
        backHref="/admin/vagas"
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <JobForm />
      </div>
    </div>
  );
}
