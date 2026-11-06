"use client";

import { useActionState, useState, type SyntheticEvent } from "react";
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
  const [values, setValues] = useState(() => ({
    title: event?.title ?? "",
    description: event?.description ?? "",
    dateLabel: event?.dateLabel ?? "",
    startDate: event?.startDate ?? "",
    endDate: event?.endDate ?? "",
    startTime: event?.startTime ?? "",
    endTime: event?.endTime ?? "",
    ctaHref: event?.ctaHref ?? "",
    position: String(event?.position ?? 0),
  }));
  const errors = state.status === "error" ? state.fieldErrors ?? {} : {};

  function field(name: keyof typeof values) {
    const updateValue = (event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.currentTarget.value;
      setValues((current) => current[name] === value ? current : { ...current, [name]: value });
    };

    return {
      name,
      value: values[name],
      onChange: updateValue,
      onInput: updateValue,
      "aria-invalid": Boolean(errors[name]?.length),
      disabled: pending,
    };
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" && (
        <div role="alert" className="rounded-button bg-brand-coral/10 px-3 py-2 text-sm text-brand-coral">
          {state.message}
        </div>
      )}

      <Field label="Título" error={errors.title?.[0]}>
        <input
          {...field("title")}
          required
          className={inputCls}
        />
      </Field>

      <ImageUpload
        name="image"
        label="Arte do banner"
        hint="A mesma arte aparece no carrossel da home e no cartão do evento no calendário (ex.: 1600×500). Inclua o texto da ação na própria arte."
        defaultValue={event?.image}
        folder="agenda"
        variant="wide"
        error={errors.image?.[0]}
      />

      <Field
        label="Descrição"
        hint="Opcional — anotação interna, não aparece no banner nem no calendário."
        error={errors.description?.[0]}
      >
        <textarea
          {...field("description")}
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
          {...field("dateLabel")}
          required
          className={inputCls}
        />
      </Field>

      <fieldset className="space-y-4 rounded-button border border-border-default p-4 sm:p-5">
        <legend className="px-2 font-medium text-text-primary">Datas e horários no calendário</legend>
        <p className="text-sm leading-relaxed text-text-secondary">
          Informe uma data para marcar o evento no calendário. Sem data de início,
          ele aparece somente no carrossel de banners.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Data de início"
            hint="Primeiro dia em que o evento acontece."
            error={errors.startDate?.[0]}
          >
            <input
              {...field("startDate")}
              type="date"
              required={Boolean(values.startTime || values.endTime)}
              className={inputCls}
            />
          </Field>
          <Field
            label="Data de fim"
            hint="Opcional — deixe vazio para um único dia. Depois desta data o evento sai do carrossel de banners."
            error={errors.endDate?.[0]}
          >
            <input
              {...field("endDate")}
              type="date"
              min={values.startDate || undefined}
              className={inputCls}
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Horário de início" error={errors.startTime?.[0]}>
            <input
              {...field("startTime")}
              type="time"
              step={60}
              required={Boolean(values.endTime)}
              className={inputCls}
            />
          </Field>
          <Field label="Horário de fim" error={errors.endTime?.[0]}>
            <input
              {...field("endTime")}
              type="time"
              step={60}
              min={values.startTime || undefined}
              required={Boolean(values.startTime)}
              className={inputCls}
            />
          </Field>
        </div>
        <p className="text-xs leading-relaxed text-text-muted">
          Os horários são opcionais. Preencha início e fim ou deixe ambos vazios para
          exibir &quot;Horário a confirmar&quot;. Em um período, o evento aparece em todos
          os dias, incluindo início e fim, com o mesmo horário em cada dia.
        </p>
      </fieldset>

      <Field
        label="Link do banner"
        hint="Opcional — o banner inteiro vira um link, ex.: /lojas ou URL externa"
        error={errors.ctaHref?.[0]}
      >
        <input
          {...field("ctaHref")}
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
          {...field("position")}
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
