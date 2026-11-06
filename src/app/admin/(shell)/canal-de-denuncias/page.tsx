import type { Metadata } from "next";
import { getReportingChannel } from "@/lib/server/reporting-channel";
import { PageHeader } from "../_components/PageHeader";
import { ReportingChannelForm } from "./ReportingChannelForm";

export const metadata: Metadata = { title: "Canal de Denúncias" };
export const dynamic = "force-dynamic";

export default async function ReportingChannelAdminPage() {
  const config = await getReportingChannel();

  return (
    <div>
      <PageHeader
        title="Canal de Denúncias"
        description="Edite os textos da página e os canais disponíveis para receber relatos."
      />
      <ReportingChannelForm config={config} />
    </div>
  );
}
