"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireSession } from "@/lib/auth";
import { storeSchema } from "@/lib/validators";

export type StoreFormState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

function parseStoreForm(formData: FormData) {
  return storeSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    photo: formData.get("photo") ?? "",
    storefront: formData.get("storefront") ?? "",
    instagram: formData.get("instagram") ?? "",
    categories: formData.get("categories") ?? "",
    segment: formData.get("segment"),
    phone: formData.get("phone") ?? "",
    whatsapp: formData.get("whatsapp") ?? "",
    location: formData.get("location"),
    floor: formData.get("floor") ?? "Térreo",
    featured: formData.get("featured"),
  });
}

function revalidateStores() {
  revalidatePath("/admin/stores");
  revalidatePath("/");
  revalidatePath("/lojas");
  revalidatePath("/segmentos", "layout");
}

export async function createStoreAction(
  _prev: StoreFormState,
  formData: FormData
): Promise<StoreFormState> {
  await requireSession();
  const parsed = parseStoreForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Verifique os campos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  try {
    await db.insert(schema.stores).values(parsed.data);
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error && error.message.includes("UNIQUE")
          ? "Já existe uma loja com esse slug."
          : "Não foi possível salvar a loja.",
    };
  }
  revalidateStores();
  redirect("/admin/stores");
}

export async function updateStoreAction(
  id: number,
  _prev: StoreFormState,
  formData: FormData
): Promise<StoreFormState> {
  await requireSession();
  const parsed = parseStoreForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Verifique os campos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  try {
    await db
      .update(schema.stores)
      .set({ ...parsed.data, updatedAt: Math.floor(Date.now() / 1000) })
      .where(eq(schema.stores.id, id));
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error && error.message.includes("UNIQUE")
          ? "Já existe uma loja com esse slug."
          : "Não foi possível atualizar a loja.",
    };
  }
  revalidateStores();
  redirect("/admin/stores");
}

export async function deleteStoreAction(id: number) {
  await requireSession();
  await db.delete(schema.stores).where(eq(schema.stores.id, id));
  revalidateStores();
  redirect("/admin/stores");
}
