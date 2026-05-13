"use client";

import { useActionState } from "react";
import {
  saveContactAction,
  type SettingsState,
} from "@/lib/server/actions/settings";
import { Field, inputCls } from "../_components/Field";
import type { ContactSettings } from "@/lib/validators";
import { StatusMessage } from "./StatusMessage";

const initial: SettingsState = { status: "idle" };

export function ContactSettingsForm({ contact }: { contact: ContactSettings }) {
  const [state, formAction, pending] = useActionState(saveContactAction, initial);

  return (
    <form action={formAction} className="space-y-5">
      <StatusMessage state={state} />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Telefone" hint="Apenas dígitos (DDD + número)">
          <input name="phone" defaultValue={contact.phone} className={inputCls} />
        </Field>
        <Field label="WhatsApp" hint="Inclua o código do país: 55XX...">
          <input
            name="whatsapp"
            defaultValue={contact.whatsapp}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Email">
        <input
          name="email"
          type="email"
          defaultValue={contact.email}
          className={inputCls}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Endereço (linha 1)">
          <input
            name="addressLine1"
            defaultValue={contact.addressLine1}
            className={inputCls}
          />
        </Field>
        <Field label="Endereço (linha 2)">
          <input
            name="addressLine2"
            defaultValue={contact.addressLine2}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        <Field label="Bairro">
          <input
            name="neighborhood"
            defaultValue={contact.neighborhood}
            className={inputCls}
          />
        </Field>
        <Field label="Cidade">
          <input name="city" defaultValue={contact.city} className={inputCls} />
        </Field>
        <Field label="Estado">
          <input name="state" defaultValue={contact.state} className={inputCls} />
        </Field>
        <Field label="CEP">
          <input name="zip" defaultValue={contact.zip} className={inputCls} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Horários">
          <input name="hours" defaultValue={contact.hours} className={inputCls} />
        </Field>
        <Field label="Observação (domingos)">
          <input
            name="sundayNote"
            defaultValue={contact.sundayNote}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="rounded-button bg-brand-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90 disabled:opacity-60"
        >
          {pending ? "Salvando…" : "Salvar"}
        </button>
      </div>
    </form>
  );
}
