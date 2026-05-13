"use client";

import { useActionState } from "react";
import {
  createPostAction,
  updatePostAction,
  type PostFormState,
} from "@/lib/server/actions/posts";
import { Field, inputCls, textareaCls } from "../_components/Field";
import type { Post } from "@/db/schema";

const initial: PostFormState = { status: "idle" };

interface PostFormProps {
  post?: Post;
}

export function PostForm({ post }: PostFormProps) {
  const action = post ? updatePostAction.bind(null, post.id) : createPostAction;
  const [state, formAction, pending] = useActionState(action, initial);
  const errors = state.status === "error" ? state.fieldErrors ?? {} : {};

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" && !state.fieldErrors && (
        <div className="rounded-button bg-brand-coral/10 px-3 py-2 text-sm text-brand-coral">
          {state.message}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Título" error={errors.title?.[0]}>
          <input
            name="title"
            defaultValue={post?.title ?? ""}
            required
            className={inputCls}
          />
        </Field>
        <Field
          label="Slug"
          hint="ex.: alto-verao-2026"
          error={errors.slug?.[0]}
        >
          <input
            name="slug"
            defaultValue={post?.slug ?? ""}
            required
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Resumo" hint="Aparece nos cards do blog" error={errors.excerpt?.[0]}>
        <textarea
          name="excerpt"
          defaultValue={post?.excerpt ?? ""}
          required
          rows={3}
          className={textareaCls}
        />
      </Field>

      <Field
        label="Imagem (URL)"
        hint="Imagem de capa do post"
        error={errors.image?.[0]}
      >
        <input
          name="image"
          defaultValue={post?.image ?? ""}
          required
          className={inputCls}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Data" error={errors.date?.[0]}>
          <input
            type="date"
            name="date"
            defaultValue={post?.date ?? new Date().toISOString().slice(0, 10)}
            required
            className={inputCls}
          />
        </Field>
        <Field label="Categoria" error={errors.category?.[0]}>
          <input
            name="category"
            defaultValue={post?.category ?? ""}
            required
            className={inputCls}
            placeholder="Moda, Eventos, ..."
          />
        </Field>
        <Field
          label="Tempo de leitura"
          hint="Opcional, ex.: 4 min"
          error={errors.readingTime?.[0]}
        >
          <input
            name="readingTime"
            defaultValue={post?.readingTime ?? ""}
            className={inputCls}
          />
        </Field>
      </div>

      <Field
        label="Conteúdo"
        hint="Separe parágrafos com uma linha em branco"
        error={errors.content?.[0]}
      >
        <textarea
          name="content"
          defaultValue={post?.content?.join("\n\n") ?? ""}
          rows={10}
          className={textareaCls}
        />
      </Field>

      <Field label="Status">
        <label className="mt-1 inline-flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published ?? true}
            className="h-4 w-4 rounded border-border-default text-brand-coral focus:ring-brand-coral/30"
          />
          <span className="text-sm text-text-secondary">Publicado</span>
        </label>
      </Field>

      <div className="flex items-center justify-end gap-3 border-t border-border-default pt-5">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-button bg-brand-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90 disabled:opacity-60"
        >
          {pending ? "Salvando…" : post ? "Salvar alterações" : "Criar post"}
        </button>
      </div>
    </form>
  );
}
