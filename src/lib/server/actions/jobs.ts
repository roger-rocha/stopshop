"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireSession } from "@/lib/auth";
import { jobOpeningSchema } from "@/lib/validators";

export type JobFormState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

function parseJobForm(formData: FormData) {
  return jobOpeningSchema.safeParse({
    title: formData.get("title"),
    area: formData.get("area"),
    company: formData.get("company") ?? "",
    type: formData.get("type") ?? "",
    location: formData.get("location") ?? "",
    description: formData.get("description") ?? "",
    applyTo: formData.get("applyTo") ?? "",
    published: formData.get("published"),
    position: formData.get("position") ?? 0,
  });
}

function revalidateJobs() {
  revalidatePath("/admin/vagas");
  revalidatePath("/trabalhe-conosco");
}

export async function createJobAction(
  _prev: JobFormState,
  formData: FormData
): Promise<JobFormState> {
  await requireSession();
  const parsed = parseJobForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Verifique os campos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  try {
    await db.insert(schema.jobOpenings).values(parsed.data);
  } catch {
    return { status: "error", message: "Não foi possível salvar a vaga." };
  }
  revalidateJobs();
  redirect("/admin/vagas");
}

export async function updateJobAction(
  id: number,
  _prev: JobFormState,
  formData: FormData
): Promise<JobFormState> {
  await requireSession();
  const parsed = parseJobForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Verifique os campos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  try {
    await db
      .update(schema.jobOpenings)
      .set({ ...parsed.data, updatedAt: Math.floor(Date.now() / 1000) })
      .where(eq(schema.jobOpenings.id, id));
  } catch {
    return { status: "error", message: "Não foi possível atualizar a vaga." };
  }
  revalidateJobs();
  redirect("/admin/vagas");
}

export async function deleteJobAction(id: number) {
  await requireSession();
  await db.delete(schema.jobOpenings).where(eq(schema.jobOpenings.id, id));
  revalidateJobs();
  redirect("/admin/vagas");
}
