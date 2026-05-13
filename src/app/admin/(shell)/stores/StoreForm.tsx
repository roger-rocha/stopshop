"use client";

import { useActionState } from "react";
import {
  createStoreAction,
  updateStoreAction,
  type StoreFormState,
} from "@/lib/server/actions/stores";
import { Field, inputCls } from "../_components/Field";
import type { Segment, Store } from "@/db/schema";

const initial: StoreFormState = { status: "idle" };

interface StoreFormProps {
  segments: Pick<Segment, "id" | "slug" | "name">[];
  store?: Store;
}

export function StoreForm({ segments, store }: StoreFormProps) {
  const action = store
    ? updateStoreAction.bind(null, store.id)
    : createStoreAction;
  const [state, formAction, pending] = useActionState(action, initial);

  const errors = state.status === "error" ? state.fieldErrors ?? {} : {};

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" && !state.fieldErrors && (
        <div className="rounded-button bg-brand-coral/10 px-3 py-2 text-sm text-brand-coral">
          {state.message}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome" error={errors.name?.[0]}>
          <input
            name="name"
            defaultValue={store?.name ?? ""}
            required
            className={inputCls}
          />
        </Field>
        <Field
          label="Slug"
          hint="Use letras minúsculas e hífens, ex.: hering"
          error={errors.slug?.[0]}
        >
          <input
            name="slug"
            defaultValue={store?.slug ?? ""}
            required
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Foto/Logo (URL)"
          hint="Caminho local (/logos/x.png) ou URL completa"
          error={errors.photo?.[0]}
        >
          <input
            name="photo"
            defaultValue={store?.photo ?? ""}
            className={inputCls}
          />
        </Field>
        <Field
          label="Segmento"
          hint="Categoria principal"
          error={errors.segment?.[0]}
        >
          <select
            name="segment"
            defaultValue={store?.segment ?? ""}
            required
            className={inputCls}
          >
            <option value="">Selecione…</option>
            {segments.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Foto da fachada (URL)"
          hint="Imagem grande para destaque"
          error={errors.storefront?.[0]}
        >
          <input
            name="storefront"
            defaultValue={store?.storefront ?? ""}
            className={inputCls}
          />
        </Field>
        <Field
          label="Instagram (handle)"
          hint="Sem @, ex.: colcci"
          error={errors.instagram?.[0]}
        >
          <input
            name="instagram"
            defaultValue={store?.instagram ?? ""}
            className={inputCls}
          />
        </Field>
      </div>

      <Field
        label="Categorias"
        hint="Separe por vírgula. Ex.: Moda Feminina, Moda Masculina"
        error={errors.categories?.[0]}
      >
        <input
          name="categories"
          defaultValue={store?.categories?.join(", ") ?? ""}
          className={inputCls}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Telefone" error={errors.phone?.[0]}>
          <input
            name="phone"
            defaultValue={store?.phone ?? ""}
            className={inputCls}
            placeholder="47XXXXXXXXX"
          />
        </Field>
        <Field label="WhatsApp" error={errors.whatsapp?.[0]}>
          <input
            name="whatsapp"
            defaultValue={store?.whatsapp ?? ""}
            className={inputCls}
            placeholder="55XXXXXXXXXXX"
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Localização" error={errors.location?.[0]}>
          <input
            name="location"
            defaultValue={store?.location ?? ""}
            required
            className={inputCls}
            placeholder="Bloco A, Loja 12"
          />
        </Field>
        <Field label="Piso" error={errors.floor?.[0]}>
          <input
            name="floor"
            defaultValue={store?.floor ?? "Térreo"}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Destaque" hint="Exibir entre as lojas em destaque na home">
        <label className="mt-1 inline-flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={store?.featured ?? false}
            className="h-4 w-4 rounded border-border-default text-brand-coral focus:ring-brand-coral/30"
          />
          <span className="text-sm text-text-secondary">Em destaque</span>
        </label>
      </Field>

      <div className="flex items-center justify-end gap-3 border-t border-border-default pt-5">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-button bg-brand-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90 disabled:opacity-60"
        >
          {pending ? "Salvando…" : store ? "Salvar alterações" : "Criar loja"}
        </button>
      </div>
    </form>
  );
}
