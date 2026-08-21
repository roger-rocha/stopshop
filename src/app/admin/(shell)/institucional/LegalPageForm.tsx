"use client";

import { useActionState } from "react";
import { saveLegalPageAction } from "@/lib/server/actions/legal";
import type { SettingsState } from "@/lib/server/actions/settings";
import { Field, inputCls, textareaCls } from "../_components/Field";
import { StatusMessage } from "../settings/StatusMessage";
import type { LegalPage } from "@/lib/server/queries";

const initial: SettingsState = { status: "idle" };

export function LegalPageForm({ page }: { page: LegalPage }) {
  const action = saveLegalPageAction.bind(null, page.slug);
  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <form action={formAction} className="space-y-5">
      <StatusMessage state={state} />

      <Field label="Título">
        <input
          name="title"
          defaultValue={page.title}
          required
          className={inputCls}
        />
      </Field>

      <Field label="Descrição" hint="Texto curto exibido abaixo do título">
        <textarea
          name="description"
          defaultValue={page.description}
          rows={2}
          required
          className={textareaCls}
        />
      </Field>

      <Field
        label="Conteúdo"
        hint="## título de seção · ### subtítulo · - item de lista · **negrito** · [texto](link). Linha em branco separa parágrafos."
      >
        <textarea
          name="body"
          defaultValue={page.body}
          rows={26}
          required
          className={`${textareaCls} font-mono text-xs leading-relaxed`}
        />
      </Field>

      <div className="flex items-center justify-end gap-3 border-t border-border-default pt-5">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-button bg-brand-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90 disabled:opacity-60"
        >
          {pending ? "Salvando…" : "Salvar alterações"}
        </button>
      </div>
    </form>
  );
}
