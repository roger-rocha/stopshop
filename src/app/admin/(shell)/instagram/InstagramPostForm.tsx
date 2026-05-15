"use client";

import { useActionState } from "react";
import {
  createInstagramPostAction,
  updateInstagramPostAction,
  type InstagramFormState,
} from "@/lib/server/actions/instagram";
import { Field, inputCls } from "../_components/Field";
import { ImageUpload } from "../_components/ImageUpload";
import type { InstagramPost } from "@/db/schema";

const initial: InstagramFormState = { status: "idle" };

interface InstagramPostFormProps {
  item?: InstagramPost;
}

export function InstagramPostForm({ item }: InstagramPostFormProps) {
  const action = item
    ? updateInstagramPostAction.bind(null, item.id)
    : createInstagramPostAction;
  const [state, formAction, pending] = useActionState(action, initial);
  const errors = state.status === "error" ? state.fieldErrors ?? {} : {};

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" && !state.fieldErrors && (
        <div className="rounded-button bg-brand-coral/10 px-3 py-2 text-sm text-brand-coral">
          {state.message}
        </div>
      )}

      <ImageUpload
        name="image"
        label="Imagem da publicação"
        hint="Imagem do post do Instagram — fica recortada em quadrado na home"
        defaultValue={item?.image}
        folder="instagram"
        variant="wide"
        error={errors.image?.[0]}
      />

      <Field
        label="Descrição (acessibilidade)"
        hint="Ex.: Look da semana"
        error={errors.alt?.[0]}
      >
        <input
          name="alt"
          defaultValue={item?.alt ?? ""}
          required
          className={inputCls}
        />
      </Field>

      <Field
        label="Link da publicação"
        hint="Opcional — URL do post no Instagram. Vazio leva ao perfil."
        error={errors.link?.[0]}
      >
        <input
          name="link"
          defaultValue={item?.link ?? ""}
          className={inputCls}
          placeholder="https://instagram.com/p/..."
        />
      </Field>

      <Field
        label="Ordem"
        hint="Menor número aparece primeiro"
        error={errors.position?.[0]}
      >
        <input
          type="number"
          name="position"
          defaultValue={item?.position ?? 0}
          min={0}
          className={inputCls}
        />
      </Field>

      <div className="flex items-center justify-end gap-3 border-t border-border-default pt-5">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-button bg-brand-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90 disabled:opacity-60"
        >
          {pending ? "Salvando…" : item ? "Salvar alterações" : "Adicionar publicação"}
        </button>
      </div>
    </form>
  );
}
