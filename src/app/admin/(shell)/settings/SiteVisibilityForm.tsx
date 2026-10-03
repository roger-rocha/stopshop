"use client";

import { useActionState, useState } from "react";
import {
  saveSiteVisibilityAction,
  type SettingsState,
} from "@/lib/server/actions/settings";
import { StatusMessage } from "./StatusMessage";

const initial: SettingsState = { status: "idle" };

export function SiteVisibilityForm({ published }: { published: boolean }) {
  const [isPublished, setIsPublished] = useState(published);
  const [state, formAction, pending] = useActionState(
    saveSiteVisibilityAction,
    initial
  );

  return (
    <form action={formAction} className="space-y-5">
      <StatusMessage state={state} />

      <p className="text-sm leading-relaxed text-text-secondary">
        Enquanto o site estiver em construção, os visitantes verão apenas a
        página de aviso. Administradores conectados continuam com acesso a todo o
        site e ao painel.
      </p>

      <fieldset disabled={pending} className="space-y-3">
        <legend className="mb-3 text-sm font-medium text-text-primary">
          Disponibilidade do site
        </legend>

        <label
          className={`flex cursor-pointer items-start gap-3 rounded-card border p-4 transition-colors ${
            !isPublished
              ? "border-brand-navy bg-brand-navy/5"
              : "border-border-default bg-white"
          }`}
        >
          <input
            type="radio"
            name="visibility"
            value="maintenance"
            checked={!isPublished}
            onChange={() => setIsPublished(false)}
            required
            className="mt-1 h-4 w-4 shrink-0 accent-brand-navy"
          />
          <span>
            <span className="block text-sm font-medium text-text-primary">
              Em construção
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-text-secondary">
              Mostra o aviso de que voltaremos em breve.
            </span>
          </span>
        </label>

        <label
          className={`flex cursor-pointer items-start gap-3 rounded-card border p-4 transition-colors ${
            isPublished
              ? "border-brand-navy bg-brand-navy/5"
              : "border-border-default bg-white"
          }`}
        >
          <input
            type="radio"
            name="visibility"
            value="published"
            checked={isPublished}
            onChange={() => setIsPublished(true)}
            className="mt-1 h-4 w-4 shrink-0 accent-brand-navy"
          />
          <span>
            <span className="block text-sm font-medium text-text-primary">
              Publicado
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-text-secondary">
              Libera todas as páginas do site para os visitantes.
            </span>
          </span>
        </label>
      </fieldset>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="rounded-button bg-brand-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90 disabled:opacity-60"
        >
          {pending ? "Salvando…" : "Salvar disponibilidade"}
        </button>
      </div>
    </form>
  );
}
