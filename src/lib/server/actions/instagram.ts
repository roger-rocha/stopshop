"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireSession } from "@/lib/auth";
import { instagramPostSchema } from "@/lib/validators";

export type InstagramFormState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

function parseInstagramForm(formData: FormData) {
  return instagramPostSchema.safeParse({
    image: formData.get("image") ?? "",
    alt: formData.get("alt"),
    link: formData.get("link") ?? "",
    position: formData.get("position") ?? 0,
  });
}

function revalidateInstagram() {
  revalidatePath("/admin/instagram");
  revalidatePath("/");
}

export async function createInstagramPostAction(
  _prev: InstagramFormState,
  formData: FormData
): Promise<InstagramFormState> {
  await requireSession();
  const parsed = parseInstagramForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Verifique os campos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  try {
    await db.insert(schema.instagramPosts).values(parsed.data);
  } catch {
    return { status: "error", message: "Não foi possível salvar a publicação." };
  }
  revalidateInstagram();
  redirect("/admin/instagram");
}

export async function updateInstagramPostAction(
  id: number,
  _prev: InstagramFormState,
  formData: FormData
): Promise<InstagramFormState> {
  await requireSession();
  const parsed = parseInstagramForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Verifique os campos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  try {
    await db
      .update(schema.instagramPosts)
      .set({ ...parsed.data, updatedAt: Math.floor(Date.now() / 1000) })
      .where(eq(schema.instagramPosts.id, id));
  } catch {
    return {
      status: "error",
      message: "Não foi possível atualizar a publicação.",
    };
  }
  revalidateInstagram();
  redirect("/admin/instagram");
}

export async function deleteInstagramPostAction(id: number) {
  await requireSession();
  await db.delete(schema.instagramPosts).where(eq(schema.instagramPosts.id, id));
  revalidateInstagram();
  redirect("/admin/instagram");
}
