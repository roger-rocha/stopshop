"use client";

import { useActionState } from "react";
import {
  saveListSettingAction,
  type SettingsState,
} from "@/lib/server/actions/settings";
import { textareaCls } from "../_components/Field";
import { StatusMessage } from "./StatusMessage";

const initial: SettingsState = { status: "idle" };

type ListKey = "highlights" | "wholesaleBenefits" | "stopCredBenefits";

interface ListSettingsFormProps {
  settingKey: ListKey;
  items: string[];
}

export function ListSettingsForm({ settingKey, items }: ListSettingsFormProps) {
  const action = saveListSettingAction.bind(null, settingKey);
  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <form action={formAction} className="space-y-4">
      <StatusMessage state={state} />

      <label className="block">
        <span className="text-sm font-medium text-text-primary">
          Itens (um por linha)
        </span>
        <textarea
          name="items"
          defaultValue={items.join("\n")}
          rows={Math.max(4, items.length + 1)}
          className={`${textareaCls} mt-1`}
        />
      </label>

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
