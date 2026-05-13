"use client";

import { useActionState } from "react";
import {
  createSegmentAction,
  updateSegmentAction,
  type SegmentFormState,
} from "@/lib/server/actions/segments";
import { Field, inputCls } from "../_components/Field";
import type { Segment } from "@/db/schema";

const initial: SegmentFormState = { status: "idle" };

interface SegmentFormProps {
  segment?: Segment;
}

export function SegmentForm({ segment }: SegmentFormProps) {
  const action = segment
    ? updateSegmentAction.bind(null, segment.id)
    : createSegmentAction;
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
        <Field label="Nome" error={errors.name?.[0]}>
          <input
            name="name"
            defaultValue={segment?.name ?? ""}
            required
            className={inputCls}
          />
        </Field>
        <Field
          label="Slug"
          hint="Use letras minúsculas e hífens, ex.: moda-feminina"
          error={errors.slug?.[0]}
        >
          <input
            name="slug"
            defaultValue={segment?.slug ?? ""}
            required
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Cor (hex)" error={errors.color?.[0]}>
          <input
            name="color"
            type="color"
            defaultValue={segment?.color ?? "#1B2A4A"}
            className={`${inputCls} h-10 cursor-pointer p-1`}
          />
        </Field>
        <Field
          label="Imagem (URL)"
          hint="Imagem usada nos cards do site"
          error={errors.image?.[0]}
        >
          <input
            name="image"
            defaultValue={segment?.image ?? ""}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Contagem de lojas"
          hint="Quantidade exibida no card"
          error={errors.storeCount?.[0]}
        >
          <input
            name="storeCount"
            type="number"
            min={0}
            defaultValue={segment?.storeCount ?? 0}
            className={inputCls}
          />
        </Field>
        <Field
          label="Ordem"
          hint="Menor valor aparece primeiro"
          error={errors.position?.[0]}
        >
          <input
            name="position"
            type="number"
            min={0}
            defaultValue={segment?.position ?? 0}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-border-default pt-5">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-button bg-brand-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90 disabled:opacity-60"
        >
          {pending ? "Salvando…" : segment ? "Salvar alterações" : "Criar segmento"}
        </button>
      </div>
    </form>
  );
}
