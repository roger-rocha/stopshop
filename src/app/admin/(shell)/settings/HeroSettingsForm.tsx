"use client";

import { useActionState } from "react";
import { saveHeroAction, type SettingsState } from "@/lib/server/actions/settings";
import { Field, inputCls, textareaCls } from "../_components/Field";
import { ImageUpload } from "../_components/ImageUpload";
import type { HeroSettings } from "@/lib/validators";
import { StatusMessage } from "./StatusMessage";

const initial: SettingsState = { status: "idle" };

export function HeroSettingsForm({ hero }: { hero: HeroSettings }) {
  const [state, formAction, pending] = useActionState(saveHeroAction, initial);

  return (
    <form action={formAction} className="space-y-5">
      <StatusMessage state={state} />

      <Field label="Eyebrow" hint="Texto pequeno acima do título">
        <input name="eyebrow" defaultValue={hero.eyebrow} className={inputCls} />
      </Field>

      <Field label="Título principal">
        <textarea
          name="title"
          defaultValue={hero.title}
          rows={3}
          required
          className={textareaCls}
        />
      </Field>

      <Field
        label="Trecho em destaque"
        hint="Parte do título exibida em cor de destaque (deve aparecer no título)"
      >
        <input
          name="titleHighlight"
          defaultValue={hero.titleHighlight}
          className={inputCls}
        />
      </Field>

      <ImageUpload
        name="image"
        label="Imagem de fundo do banner"
        hint="Quando enviada, substitui o vídeo de fundo do hero. Deixe vazio para manter o vídeo."
        defaultValue={hero.image}
        folder="hero"
        variant="wide"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Texto do botão">
          <input name="ctaLabel" defaultValue={hero.ctaLabel} className={inputCls} />
        </Field>
        <Field label="Link do botão">
          <input name="ctaHref" defaultValue={hero.ctaHref} className={inputCls} />
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
