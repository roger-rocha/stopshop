"use client";

import { useActionState } from "react";
import { FormStatus } from "../_components/FormStatus";
import { saveAboutHeroAction, type SettingsState } from "@/lib/server/actions/settings";
import type { AboutHero } from "@/lib/validators";
import { imageSpecs } from "@/lib/image-specs";
import { Field, inputCls } from "../_components/Field";
import { ImageUpload } from "../_components/ImageUpload";

const initial: SettingsState = { status: "idle" };

export function AboutHeroForm({ about }: { about: AboutHero }) {
  const [state, formAction, pending] = useActionState(saveAboutHeroAction, initial);

  return (
    <form action={formAction} onReset={(event) => event.preventDefault()} className="space-y-5">
      <ImageUpload
        name="image"
        label="Imagem do topo"
        hint="Aparece ao lado do título “O ninho da moda de Brusque.”"
        defaultValue={about.image}
        folder="about"
        variant="photo"
        spec={imageSpecs.aboutHero}
      />

      <Field label="Descrição da imagem" hint="Lida por leitores de tela e usada pelos buscadores.">
        <input name="alt" defaultValue={about.alt} required maxLength={200} className={inputCls} />
      </Field>

      <Field label="Legenda" hint="Texto pequeno abaixo da imagem. Deixe em branco para não exibir.">
        <input name="caption" defaultValue={about.caption} maxLength={120} className={inputCls} />
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
