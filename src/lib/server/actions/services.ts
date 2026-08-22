"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireSession } from "@/lib/auth";
import { serviceSchema } from "@/lib/validators";

export type ServiceFormState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

function parseServiceForm(formData: FormData) {
  return serviceSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category") ?? "",
    icon: formData.get("icon") ?? "destaque",
    description: formData.get("description") ?? "",
    published: formData.get("published"),
    position: formData.get("position") ?? 0,
  });
}

function revalidateServices() {
  revalidatePath("/admin/servicos");
  revalidatePath("/servicos");
}

export async function createServiceAction(
  _prev: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await requireSession();
  const parsed = parseServiceForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Verifique os campos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  try {
    await db.insert(schema.services).values(parsed.data);
  } catch {
    return { status: "error", message: "Não foi possível salvar o serviço." };
  }
  revalidateServices();
  redirect("/admin/servicos");
}

export async function updateServiceAction(
  id: number,
  _prev: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await requireSession();
  const parsed = parseServiceForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Verifique os campos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  try {
    await db
      .update(schema.services)
      .set({ ...parsed.data, updatedAt: Math.floor(Date.now() / 1000) })
      .where(eq(schema.services.id, id));
  } catch {
    return { status: "error", message: "Não foi possível atualizar o serviço." };
  }
  revalidateServices();
  redirect("/admin/servicos");
}

export async function deleteServiceAction(id: number) {
  await requireSession();
  await db.delete(schema.services).where(eq(schema.services.id, id));
  revalidateServices();
  redirect("/admin/servicos");
}
