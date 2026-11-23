"use client";

import { useActionState } from "react";
import { FormStatus } from "../_components/FormStatus";
import {
  saveListSettingAction,
  type SettingsState,
} from "@/lib/server/actions/settings";
import { Field, textareaCls } from "../_components/Field";

const initial: SettingsState = { status: "idle" };

type ListKey = "highlights";

interface ListSettingsFormProps {
  settingKey: ListKey;
  items: string[];
}

export function ListSettingsForm({ settingKey, items }: ListSettingsFormProps) {
  const action = saveListSettingAction.bind(null, settingKey);
  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <form action={formAction} onReset={(event) => event.preventDefault()} className="space-y-4">

      <Field label="Itens" hint="Um item por linha">
        <textarea
          name="items"
          defaultValue={items.join("\n")}
          rows={Math.max(4, items.length + 1)}
          className={textareaCls}
        />
      </Field>

      <div className="flex items-center justify-end gap-3">
        <FormStatus state={state} />
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
