"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireSession } from "@/lib/auth";
import { segmentSchema } from "@/lib/validators";

export type SegmentFormState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

function parseSegmentForm(formData: FormData) {
  return segmentSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    color: formData.get("color") ?? "#1B2A4A",
    image: formData.get("image") ?? "",
    storeCount: formData.get("storeCount") ?? 0,
    position: formData.get("position") ?? 0,
  });
}

function revalidateSegments() {
  revalidatePath("/admin/segments");
  revalidatePath("/");
  revalidatePath("/lojas");
  revalidatePath("/segmentos", "layout");
}

export async function createSegmentAction(
  _prev: SegmentFormState,
  formData: FormData
): Promise<SegmentFormState> {
  await requireSession();
  const parsed = parseSegmentForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Verifique os campos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  try {
    await db.insert(schema.segments).values(parsed.data);
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error && error.message.includes("UNIQUE")
          ? "Já existe um segmento com esse slug."
          : "Não foi possível salvar o segmento.",
    };
  }
  revalidateSegments();
  redirect("/admin/segments");
}

export async function updateSegmentAction(
  id: number,
  _prev: SegmentFormState,
  formData: FormData
): Promise<SegmentFormState> {
  await requireSession();
  const parsed = parseSegmentForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Verifique os campos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  try {
    await db
      .update(schema.segments)
      .set({ ...parsed.data, updatedAt: Math.floor(Date.now() / 1000) })
      .where(eq(schema.segments.id, id));
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error && error.message.includes("UNIQUE")
          ? "Já existe um segmento com esse slug."
          : "Não foi possível atualizar o segmento.",
    };
  }
  revalidateSegments();
  redirect("/admin/segments");
}

export async function deleteSegmentAction(id: number) {
  await requireSession();
  await db.delete(schema.segments).where(eq(schema.segments.id, id));
  revalidateSegments();
  redirect("/admin/segments");
}
