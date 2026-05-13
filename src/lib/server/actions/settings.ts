"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireSession } from "@/lib/auth";
import { contactSettingsSchema, heroSettingsSchema } from "@/lib/validators";

export type SettingsState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

async function upsertSetting(key: string, value: unknown) {
  const existing = await db
    .select()
    .from(schema.settings)
    .where(eq(schema.settings.key, key))
    .limit(1);
  const serialized = JSON.stringify(value);
  const now = Math.floor(Date.now() / 1000);
  if (existing.length === 0) {
    await db.insert(schema.settings).values({ key, value: serialized, updatedAt: now });
  } else {
    await db
      .update(schema.settings)
      .set({ value: serialized, updatedAt: now })
      .where(eq(schema.settings.key, key));
  }
}

function revalidateAll() {
  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
}

export async function saveHeroAction(
  _prev: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  await requireSession();
  const parsed = heroSettingsSchema.safeParse({
    eyebrow: formData.get("eyebrow") ?? "",
    title: formData.get("title") ?? "",
    titleHighlight: formData.get("titleHighlight") ?? "",
    ctaLabel: formData.get("ctaLabel") ?? "",
    ctaHref: formData.get("ctaHref") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Erro" };
  }
  await upsertSetting("hero", parsed.data);
  revalidateAll();
  return { status: "success", message: "Hero atualizado." };
}

export async function saveContactAction(
  _prev: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  await requireSession();
  const data = Object.fromEntries(formData);
  const parsed = contactSettingsSchema.safeParse(data);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Erro" };
  }
  await upsertSetting("contact", parsed.data);
  revalidateAll();
  return { status: "success", message: "Contato atualizado." };
}

export async function saveListSettingAction(
  key: "highlights" | "wholesaleBenefits" | "stopCredBenefits",
  _prev: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  await requireSession();
  const raw = (formData.get("items") as string | null) ?? "";
  const items = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  await upsertSetting(key, items);
  revalidateAll();
  return { status: "success", message: "Lista atualizada." };
}
