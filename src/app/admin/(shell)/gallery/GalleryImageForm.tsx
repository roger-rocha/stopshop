"use client";

import { useActionState } from "react";
import {
  createGalleryImageAction,
  updateGalleryImageAction,
  type GalleryFormState,
} from "@/lib/server/actions/gallery";
import { Field, inputCls } from "../_components/Field";
import { ImageUpload } from "../_components/ImageUpload";
import type { GalleryImage } from "@/db/schema";

const initial: GalleryFormState = { status: "idle" };

interface GalleryImageFormProps {
  item?: GalleryImage;
}

export function GalleryImageForm({ item }: GalleryImageFormProps) {
  const action = item
    ? updateGalleryImageAction.bind(null, item.id)
    : createGalleryImageAction;
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
        label="Imagem"
        hint="Foto interna do Stop Shop — ambientes, corredores, lojas"
        defaultValue={item?.image}
        folder="gallery"
        variant="wide"
        error={errors.image?.[0]}
      />

      <Field
        label="Descrição (acessibilidade)"
        hint="Ex.: Corredor principal do Stop Shop"
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
        label="Ordem"
        hint="Menor número aparece primeiro; a primeira foto fica em destaque (maior)"
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
          {pending ? "Salvando…" : item ? "Salvar alterações" : "Adicionar imagem"}
        </button>
      </div>
    </form>
  );
}
