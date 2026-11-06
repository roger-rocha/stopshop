"use server";

import { revalidatePath } from "next/cache";
import { db, schema } from "@/db";
import { requireSession } from "@/lib/auth";
import { REPORTING_CHANNEL_KEY, reportingChannelSchema } from "@/lib/reporting-channel";
import type { SettingsState } from "./settings";

export async function saveReportingChannelAction(
  _prev: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  await requireSession();

  const parsed = reportingChannelSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Verifique os campos da página.",
    };
  }

  const value = JSON.stringify(parsed.data);
  const updatedAt = Math.floor(Date.now() / 1000);
  try {
    await db.insert(schema.settings)
      .values({ key: REPORTING_CHANNEL_KEY, value, updatedAt })
      .onConflictDoUpdate({ target: schema.settings.key, set: { value, updatedAt } });
  } catch {
    console.error("Falha ao salvar o Canal de Denúncias.");
    return { status: "error", message: "Não foi possível salvar o Canal de Denúncias. Tente novamente." };
  }

  revalidatePath("/denuncia");
  revalidatePath("/admin/canal-de-denuncias");
  revalidatePath("/admin/seo");
  revalidatePath("/admin/seo/page");
  revalidatePath("/sitemap.xml");
  return { status: "success", message: "Canal de Denúncias atualizado no site." };
}
