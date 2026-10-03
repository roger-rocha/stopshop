"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireSession } from "@/lib/auth";
import { contactSettingsSchema, heroSettingsSchema } from "@/lib/validators";
import { openingScheduleSchema } from "@/lib/opening-schedule";
import { SITE_VISIBILITY_KEY } from "@/lib/server/site-visibility";

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

export async function saveSiteVisibilityAction(
  _prev: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  await requireSession();
  const visibility = formData.get("visibility");
  if (visibility !== "maintenance" && visibility !== "published") {
    return { status: "error", message: "Escolha a disponibilidade do site." };
  }

  const published = visibility === "published";
  await upsertSetting(SITE_VISIBILITY_KEY, published);
  revalidateAll();
  return {
    status: "success",
    message: published
      ? "Site publicado. Todos os visitantes já podem acessar."
      : "Site em construção. Apenas administradores logados podem navegar.",
  };
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
    image: formData.get("image") ?? "",
    slides: formData.getAll("slides").filter((v): v is string => typeof v === "string"),
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

export async function saveOpeningScheduleAction(
  _prev: SettingsState,
  formData: FormData
): Promise<SettingsState> {
  await requireSession();
  let input: unknown;
  try {
    input = JSON.parse(String(formData.get("schedule") ?? ""));
  } catch {
    return { status: "error", message: "Não foi possível ler a agenda." };
  }
  const parsed = openingScheduleSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Revise as datas da agenda." };
  }
  parsed.data.entries.sort((a, b) => a.date.localeCompare(b.date));
  await upsertSetting("openingSchedule", parsed.data);
  revalidateAll();
  return { status: "success", message: "Agenda de funcionamento atualizada." };
}

export async function saveListSettingAction(
  key: "highlights",
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
