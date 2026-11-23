"use client";

import { useActionState, useState } from "react";
import { CheckboxField } from "../_components/CheckboxField";
import { FormStatus } from "../_components/FormStatus";
import {
  createServiceAction,
  updateServiceAction,
  type ServiceFormState,
} from "@/lib/server/actions/services";
import { serviceIcons } from "@/lib/data/service-icons";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { Field, inputCls, textareaCls } from "../_components/Field";
import type { Service } from "@/db/schema";

const initial: ServiceFormState = { status: "idle" };

const iconEntries = Object.entries(serviceIcons);

interface ServiceFormProps {
  service?: Service;
  /** Categorias já cadastradas, sugeridas no campo. */
  categories: string[];
}

export function ServiceForm({ service, categories }: ServiceFormProps) {
  const action = service
    ? updateServiceAction.bind(null, service.id)
    : createServiceAction;
  const [state, formAction, pending] = useActionState(action, initial);
  const errors = state.status === "error" ? state.fieldErrors ?? {} : {};

  const [icon, setIcon] = useState(service?.icon ?? "destaque");

  return (
    <form action={formAction} onReset={(event) => event.preventDefault()} className="space-y-6">

      <Field label="Nome do serviço" error={errors.name?.[0]}>
        <input
          name="name"
          defaultValue={service?.name ?? ""}
          required
          className={inputCls}
          placeholder="Ex.: Wi-Fi gratuito"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Categoria"
          hint="Organize os serviços por categoria. Reaproveite as já usadas."
          error={errors.category?.[0]}
        >
          <input
            name="category"
            defaultValue={service?.category ?? ""}
            list="service-categories"
            className={inputCls}
            placeholder="Ex.: Conveniência"
          />
          <datalist id="service-categories">
            {categories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
        </Field>

        <Field label="Ícone" error={errors.icon?.[0]}>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-button bg-brand-coral/10 text-brand-coral">
              <ServiceIcon name={icon} className="h-5 w-5" />
            </span>
            <select
              name="icon"
              value={icon}
              onChange={(event) => setIcon(event.target.value)}
              className={inputCls}
            >
              {iconEntries.map(([key, entry]) => (
                <option key={key} value={key}>
                  {entry.label}
                </option>
              ))}
            </select>
          </div>
        </Field>
      </div>

      <Field
        label="Descrição"
        hint="Texto exibido ao abrir o card no site. Inclua localização, horário, telefone e valor quando disponíveis. Use quebras de linha para separar as informações."
        error={errors.description?.[0]}
      >
        <textarea
          name="description"
          defaultValue={service?.description ?? ""}
          rows={6}
          maxLength={2000}
          placeholder="Descreva o serviço e as informações úteis para o visitante."
          className={textareaCls}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <CheckboxField
          label="Publicado"
          name="published"
          option="Visível no site"
          hint="Desmarque para esconder o serviço do site"
          defaultChecked={service?.published ?? true}
        />
        <Field
          label="Ordem"
          hint="Menor número aparece primeiro"
          error={errors.position?.[0]}
        >
          <input
            type="number"
            name="position"
            defaultValue={service?.position ?? 0}
            min={0}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-border-default pt-5">
        <FormStatus state={state} />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-button bg-brand-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90 disabled:opacity-60"
        >
          {pending ? "Salvando…" : service ? "Salvar alterações" : "Criar serviço"}
        </button>
      </div>
    </form>
  );
}
