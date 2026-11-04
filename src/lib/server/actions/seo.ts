"use server";

import { revalidatePath } from "next/cache";
import { db, schema } from "@/db";
import { requireSession } from "@/lib/auth";
import { pageSeoSchema, SEO_PAGE_PREFIX, SEO_SETTINGS_KEY, seoSettingsSchema } from "@/lib/seo";
import { getSeoEntries } from "@/lib/server/seo";

export type SeoActionState =
  | { status: "idle"; message?: string; fieldErrors?: Record<string, string[] | undefined> }
  | { status: "success"; message: string; fieldErrors?: Record<string, string[] | undefined> }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[] | undefined> };

async function saveSetting(key: string, value: unknown) {
  const values = { value: JSON.stringify(value), updatedAt: Math.floor(Date.now() / 1000) };
  await db.insert(schema.settings).values({ key, ...values }).onConflictDoUpdate({ target: schema.settings.key, set: values });
}

function refreshSeo() {
  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/robots.txt");
  revalidatePath("/admin/seo", "layout");
}

export async function saveSeoSettingsAction(_prev: SeoActionState, formData: FormData): Promise<SeoActionState> {
  await requireSession();
  const parsed = seoSettingsSchema.safeParse({
    ...Object.fromEntries(formData),
    indexable: formData.get("indexable") === "on",
    structuredData: formData.get("structuredData") === "on",
    socialLinks: String(formData.get("socialLinks") ?? "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean),
  });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Revise os campos.", fieldErrors: parsed.error.flatten().fieldErrors };
  }
  try {
    await saveSetting(SEO_SETTINGS_KEY, parsed.data);
  } catch {
    return { status: "error", message: "Não foi possível salvar o SEO. Tente novamente." };
  }
  refreshSeo();
  return { status: "success", message: "Configurações de SEO salvas e aplicadas ao site." };
}

export async function savePageSeoAction(key: string, _prev: SeoActionState, formData: FormData): Promise<SeoActionState> {
  await requireSession();
  const parsed = pageSeoSchema.safeParse({
    ...Object.fromEntries(formData),
    indexable: formData.get("indexable") === "on",
    includeInSitemap: formData.get("includeInSitemap") === "on",
  });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Revise os campos.", fieldErrors: parsed.error.flatten().fieldErrors };
  }
  try {
    const entries = await getSeoEntries();
    if (!entries.some((entry) => entry.key === key)) {
      return { status: "error", message: "Esta página não existe mais. Volte à lista de páginas." };
    }
    await saveSetting(`${SEO_PAGE_PREFIX}${key}`, parsed.data);
  } catch {
    return { status: "error", message: "Não foi possível salvar o SEO desta página. Tente novamente." };
  }
  refreshSeo();
  return { status: "success", message: "SEO da página salvo e aplicado ao site." };
}
