"use client";

import { useActionState } from "react";
import {
  createJobAction,
  updateJobAction,
  type JobFormState,
} from "@/lib/server/actions/jobs";
import { Field, inputCls, textareaCls } from "../_components/Field";
import type { JobOpening } from "@/db/schema";

const initial: JobFormState = { status: "idle" };

interface JobFormProps {
  job?: JobOpening;
}

export function JobForm({ job }: JobFormProps) {
  const action = job ? updateJobAction.bind(null, job.id) : createJobAction;
  const [state, formAction, pending] = useActionState(action, initial);
  const errors = state.status === "error" ? state.fieldErrors ?? {} : {};

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" && !state.fieldErrors && (
        <div className="rounded-button bg-brand-coral/10 px-3 py-2 text-sm text-brand-coral">
          {state.message}
        </div>
      )}

      <Field label="Título da vaga" error={errors.title?.[0]}>
        <input
          name="title"
          defaultValue={job?.title ?? ""}
          required
          className={inputCls}
          placeholder="Ex.: Auxiliar de limpeza"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Onde a vaga aparece"
          hint="Define em qual das duas abas do Trabalhe Conosco a vaga é listada"
          error={errors.area?.[0]}
        >
          <select
            name="area"
            defaultValue={job?.area ?? "stop-shop"}
            className={inputCls}
          >
            <option value="stop-shop">Trabalhe no Stop Shop</option>
            <option value="lojistas">Trabalhe nas lojas do shopping</option>
          </select>
        </Field>
        <Field
          label="Loja / empresa"
          hint="Opcional — use nas vagas de lojistas"
          error={errors.company?.[0]}
        >
          <input
            name="company"
            defaultValue={job?.company ?? ""}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Tipo de contratação"
          hint="Opcional — ex.: Efetivo, Estágio, Temporário"
          error={errors.type?.[0]}
        >
          <input name="type" defaultValue={job?.type ?? ""} className={inputCls} />
        </Field>
        <Field
          label="Local"
          hint="Opcional — ex.: Bloco A, Loja 12"
          error={errors.location?.[0]}
        >
          <input
            name="location"
            defaultValue={job?.location ?? ""}
            className={inputCls}
          />
        </Field>
      </div>

      <Field
        label="Descrição"
        hint="Aceita ## título, - lista, **negrito** e [texto](link)"
        error={errors.description?.[0]}
      >
        <textarea
          name="description"
          defaultValue={job?.description ?? ""}
          rows={8}
          className={textareaCls}
        />
      </Field>

      <Field
        label="Como se candidatar"
        hint="Cole um e-mail ou um link (formulário, WhatsApp). Vazio: o botão leva para a página de contato."
        error={errors.applyTo?.[0]}
      >
        <input
          name="applyTo"
          defaultValue={job?.applyTo ?? ""}
          className={inputCls}
          placeholder="vagas@stopshop.com.br"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Publicada" hint="Desmarque para esconder a vaga do site">
          <label className="mt-1 inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              defaultChecked={job?.published ?? true}
              className="h-4 w-4 rounded border-border-default text-brand-coral focus:ring-brand-coral/30"
            />
            <span className="text-sm text-text-secondary">Visível no site</span>
          </label>
        </Field>
        <Field
          label="Ordem"
          hint="Menor número aparece primeiro"
          error={errors.position?.[0]}
        >
          <input
            type="number"
            name="position"
            defaultValue={job?.position ?? 0}
            min={0}
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
          {pending ? "Salvando…" : job ? "Salvar alterações" : "Criar vaga"}
        </button>
      </div>
    </form>
  );
}
