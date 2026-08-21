"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireSession } from "@/lib/auth";
import { legalPageBySlug } from "@/lib/data/legal";
import { legalPageSchema } from "@/lib/validators";
import type { SettingsState } from "./settings";

export async function saveLegalPageAction(
  slug: string,
  _prev: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  await requireSession();

  const entry = legalPageBySlug(slug);
  if (!entry) return { status: "error", message: "Página não encontrada." };

  const parsed = legalPageSchema.safeParse({
    title: formData.get("title") ?? "",
    description: formData.get("description") ?? "",
    body: formData.get("body") ?? "",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Verifique os campos.",
    };
  }

  const value = JSON.stringify(parsed.data);
  const now = Math.floor(Date.now() / 1000);

  const existing = await db
    .select()
    .from(schema.settings)
    .where(eq(schema.settings.key, entry.settingKey))
    .limit(1);

  if (existing.length === 0) {
    await db
      .insert(schema.settings)
      .values({ key: entry.settingKey, value, updatedAt: now });
  } else {
    await db
      .update(schema.settings)
      .set({ value, updatedAt: now })
      .where(eq(schema.settings.key, entry.settingKey));
  }

  revalidatePath(`/${slug}`);
  revalidatePath("/admin/institucional");
  revalidatePath(`/admin/institucional/${slug}`);

  return { status: "success", message: "Página atualizada." };
}
