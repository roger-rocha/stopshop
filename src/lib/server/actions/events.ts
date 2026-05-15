"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireSession } from "@/lib/auth";
import { eventSchema } from "@/lib/validators";

export type EventFormState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

function parseEventForm(formData: FormData) {
  return eventSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image") ?? "",
    dateLabel: formData.get("dateLabel"),
    startDate: formData.get("startDate") ?? "",
    endDate: formData.get("endDate") ?? "",
    ctaLabel: formData.get("ctaLabel") ?? "",
    ctaHref: formData.get("ctaHref") ?? "",
    position: formData.get("position") ?? 0,
  });
}

function revalidateEvents() {
  revalidatePath("/admin/agenda");
  revalidatePath("/");
}

export async function createEventAction(
  _prev: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  await requireSession();
  const parsed = parseEventForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Verifique os campos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  try {
    await db.insert(schema.events).values(parsed.data);
  } catch {
    return { status: "error", message: "Não foi possível salvar o evento." };
  }
  revalidateEvents();
  redirect("/admin/agenda");
}

export async function updateEventAction(
  id: number,
  _prev: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  await requireSession();
  const parsed = parseEventForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Verifique os campos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  try {
    await db
      .update(schema.events)
      .set({ ...parsed.data, updatedAt: Math.floor(Date.now() / 1000) })
      .where(eq(schema.events.id, id));
  } catch {
    return {
      status: "error",
      message: "Não foi possível atualizar o evento.",
    };
  }
  revalidateEvents();
  redirect("/admin/agenda");
}

export async function deleteEventAction(id: number) {
  await requireSession();
  await db.delete(schema.events).where(eq(schema.events.id, id));
  revalidateEvents();
  redirect("/admin/agenda");
}
