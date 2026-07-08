"use client";

import { useActionState } from "react";
import {
  createEventAction,
  updateEventAction,
  type EventFormState,
} from "@/lib/server/actions/events";
import { Field, inputCls, textareaCls } from "../_components/Field";
import { ImageUpload } from "../_components/ImageUpload";
import type { AgendaEvent } from "@/db/schema";

const initial: EventFormState = { status: "idle" };

interface EventFormProps {
  event?: AgendaEvent;
}

export function EventForm({ event }: EventFormProps) {
  const action = event
    ? updateEventAction.bind(null, event.id)
    : createEventAction;
  const [state, formAction, pending] = useActionState(action, initial);
  const errors = state.status === "error" ? state.fieldErrors ?? {} : {};

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" && !state.fieldErrors && (
        <div className="rounded-button bg-brand-coral/10 px-3 py-2 text-sm text-brand-coral">
          {state.message}
        </div>
      )}

      <Field label="Título" error={errors.title?.[0]}>
        <input
          name="title"
          defaultValue={event?.title ?? ""}
          required
          className={inputCls}
        />
      </Field>

      <ImageUpload
        name="image"
        label="Arte do banner"
        hint="A arte aparece em formato panorâmico na home (ex.: 1600×500). Inclua o texto da ação na própria arte."
        defaultValue={event?.image}
        folder="agenda"
        variant="wide"
        error={errors.image?.[0]}
      />

      <Field
        label="Descrição"
        hint="Opcional — anotação interna, não aparece no banner"
        error={errors.description?.[0]}
      >
        <textarea
          name="description"
          defaultValue={event?.description ?? ""}
          rows={2}
          className={textareaCls}
        />
      </Field>

      <Field
        label="Data (texto exibido)"
        hint="Ex.: 01 a 12 de Maio · Toda quinta-feira"
        error={errors.dateLabel?.[0]}
      >
        <input
          name="dateLabel"
          defaultValue={event?.dateLabel ?? ""}
          required
          className={inputCls}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Início"
          hint="Opcional — usado para calcular o status"
          error={errors.startDate?.[0]}
        >
          <input
            type="date"
            name="startDate"
            defaultValue={event?.startDate ?? ""}
            className={inputCls}
          />
        </Field>
        <Field
          label="Fim"
          hint="Opcional — depois desta data o evento sai da home"
          error={errors.endDate?.[0]}
        >
          <input
            type="date"
            name="endDate"
            defaultValue={event?.endDate ?? ""}
            className={inputCls}
          />
        </Field>
      </div>

      <Field
        label="Link do banner"
        hint="Opcional — o banner inteiro vira um link, ex.: /lojas ou URL externa"
        error={errors.ctaHref?.[0]}
      >
        <input
          name="ctaHref"
          defaultValue={event?.ctaHref ?? ""}
          className={inputCls}
        />
      </Field>

      <Field
        label="Ordem"
        hint="Menor número aparece primeiro no carrossel"
        error={errors.position?.[0]}
      >
        <input
          type="number"
          name="position"
          defaultValue={event?.position ?? 0}
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
          {pending ? "Salvando…" : event ? "Salvar alterações" : "Criar evento"}
        </button>
      </div>
    </form>
  );
}
