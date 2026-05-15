"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireSession } from "@/lib/auth";
import { galleryImageSchema } from "@/lib/validators";

export type GalleryFormState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

function parseGalleryForm(formData: FormData) {
  return galleryImageSchema.safeParse({
    image: formData.get("image") ?? "",
    alt: formData.get("alt"),
    position: formData.get("position") ?? 0,
  });
}

function revalidateGallery() {
  revalidatePath("/admin/gallery");
  revalidatePath("/");
}

export async function createGalleryImageAction(
  _prev: GalleryFormState,
  formData: FormData
): Promise<GalleryFormState> {
  await requireSession();
  const parsed = parseGalleryForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Verifique os campos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  try {
    await db.insert(schema.galleryImages).values(parsed.data);
  } catch {
    return { status: "error", message: "Não foi possível salvar a imagem." };
  }
  revalidateGallery();
  redirect("/admin/gallery");
}

export async function updateGalleryImageAction(
  id: number,
  _prev: GalleryFormState,
  formData: FormData
): Promise<GalleryFormState> {
  await requireSession();
  const parsed = parseGalleryForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Verifique os campos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  try {
    await db
      .update(schema.galleryImages)
      .set({ ...parsed.data, updatedAt: Math.floor(Date.now() / 1000) })
      .where(eq(schema.galleryImages.id, id));
  } catch {
    return {
      status: "error",
      message: "Não foi possível atualizar a imagem.",
    };
  }
  revalidateGallery();
  redirect("/admin/gallery");
}

export async function deleteGalleryImageAction(id: number) {
  await requireSession();
  await db.delete(schema.galleryImages).where(eq(schema.galleryImages.id, id));
  revalidateGallery();
  redirect("/admin/gallery");
}
