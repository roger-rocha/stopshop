"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireSession } from "@/lib/auth";
import { postSchema } from "@/lib/validators";

export type PostFormState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

function parsePostForm(formData: FormData) {
  return postSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    image: formData.get("image"),
    date: formData.get("date"),
    category: formData.get("category"),
    readingTime: formData.get("readingTime") ?? "",
    content: formData.get("content") ?? "",
    published: formData.get("published"),
  });
}

function revalidatePosts() {
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath("/blog", "layout");
}

export async function createPostAction(
  _prev: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  await requireSession();
  const parsed = parsePostForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Verifique os campos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  try {
    await db.insert(schema.posts).values(parsed.data);
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error && error.message.includes("UNIQUE")
          ? "Já existe um post com esse slug."
          : "Não foi possível salvar o post.",
    };
  }
  revalidatePosts();
  redirect("/admin/posts");
}

export async function updatePostAction(
  id: number,
  _prev: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  await requireSession();
  const parsed = parsePostForm(formData);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Verifique os campos.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  try {
    await db
      .update(schema.posts)
      .set({ ...parsed.data, updatedAt: Math.floor(Date.now() / 1000) })
      .where(eq(schema.posts.id, id));
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error && error.message.includes("UNIQUE")
          ? "Já existe um post com esse slug."
          : "Não foi possível atualizar o post.",
    };
  }
  revalidatePosts();
  redirect("/admin/posts");
}

export async function deletePostAction(id: number) {
  await requireSession();
  await db.delete(schema.posts).where(eq(schema.posts.id, id));
  revalidatePosts();
  redirect("/admin/posts");
}
