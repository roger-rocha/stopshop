import { getAllSegments } from "@/lib/server/queries";
import { PageHeader } from "../../_components/PageHeader";
import { StoreForm } from "../StoreForm";

export const metadata = { title: "Nova loja" };

export default async function NewStorePage() {
  const segments = await getAllSegments();
  return (
    <div>
      <PageHeader
        title="Nova loja"
        description="Cadastre uma nova marca no Stop Shop."
        backHref="/admin/stores"
      />
      <div className="rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8">
        <StoreForm segments={segments} />
      </div>
    </div>
  );
}
