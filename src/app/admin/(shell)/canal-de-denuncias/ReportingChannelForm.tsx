"use client";

import { useActionState, useState, type ChangeEvent } from "react";
import type { ReportingChannelConfig } from "@/lib/reporting-channel";
import { saveReportingChannelAction } from "@/lib/server/actions/reporting-channel";
import type { SettingsState } from "@/lib/server/actions/settings";
import { Field, inputCls, textareaCls } from "../_components/Field";

const initial: SettingsState = { status: "idle" };
const sectionCls = "space-y-4 rounded-[20px] border border-border-default bg-white p-6 shadow-card sm:p-8";
const headingCls = "font-display text-xl font-bold text-text-primary";

export function ReportingChannelForm({ config }: { config: ReportingChannelConfig }) {
  const [state, formAction, pending] = useActionState(saveReportingChannelAction, initial);
  const [values, setValues] = useState(() => ({
    ...config,
    email: config.email ?? "",
    formUrl: config.formUrl ?? "",
    situations: config.situations.join("\n"),
  }));
  const hasDestination = Boolean(values.email.trim() || values.formUrl.trim());

  function field(name: keyof ReportingChannelConfig) {
    return {
      name,
      value: values[name],
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setValues((current) => ({ ...current, [name]: value }));
      },
      required: name !== "email" && name !== "formUrl",
    };
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="rounded-[20px] border border-border-default bg-surface-soft p-5 text-sm leading-relaxed text-text-secondary">
        <p>
          O e-mail abre o aplicativo de e-mail do visitante. O formulário abre um site externo,
          como o Google Forms. As respostas são recebidas nesses serviços e não ficam neste painel.
        </p>
        <p className="mt-2">
          Confirme com a equipe responsável quem tem acesso à caixa de e-mail e às respostas do formulário.
          As notificações do formulário devem ser configuradas no próprio serviço.
        </p>
      </div>

      {!hasDestination && (
        <div role="status" className="rounded-button border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <p className="font-semibold">Nenhum destino informado</p>
          <p className="mt-1">
            Com o e-mail e o link do formulário vazios, a página pública informa que o canal está
            indisponível. Preencha ao menos um destino e salve para disponibilizar o atendimento.
          </p>
        </div>
      )}

      <fieldset disabled={pending} className="min-w-0 space-y-6">
        <section className={sectionCls}>
          <h2 className={headingCls}>Apresentação da página</h2>
          <Field label="Chamada acima do título">
            <input {...field("eyebrow")} maxLength={200} className={inputCls} />
          </Field>
          <Field label="Título principal">
            <input {...field("title")} maxLength={200} className={inputCls} />
          </Field>
          <Field label="Subtítulo">
            <input {...field("subtitle")} maxLength={200} className={inputCls} />
          </Field>
          <Field label="Texto de apresentação">
            <textarea {...field("introduction")} maxLength={5000} rows={5} className={textareaCls} />
          </Field>
        </section>

        <section className={sectionCls}>
          <h2 className={headingCls}>Situações que podem ser denunciadas</h2>
          <Field label="Título da seção">
            <input {...field("situationsTitle")} maxLength={200} className={inputCls} />
          </Field>
          <Field label="Situações" hint="Escreva uma situação por linha, na ordem em que aparecerá no site.">
            <textarea {...field("situations")} rows={6} className={textareaCls} />
          </Field>
        </section>

        <section className={sectionCls}>
          <h2 className={headingCls}>Canais para denúncias</h2>
          <Field label="Título da seção">
            <input {...field("channelsTitle")} maxLength={200} className={inputCls} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Título do contato por e-mail">
              <input {...field("emailLabel")} maxLength={200} className={inputCls} />
            </Field>
            <Field label="E-mail para denúncias (opcional)" hint="Deixe vazio para ocultar o contato por e-mail.">
              <input {...field("email")} type="email" maxLength={254} className={inputCls} />
            </Field>
          </div>
          <Field label="Título do formulário">
            <input {...field("formLabel")} maxLength={200} className={inputCls} />
          </Field>
          <Field label="Texto do botão do formulário">
            <input {...field("formButtonLabel")} maxLength={200} className={inputCls} />
          </Field>
          <Field label="Link do formulário (opcional)" hint="Use um endereço completo começando com https://. Deixe vazio para ocultar o formulário.">
            <input {...field("formUrl")} type="url" maxLength={2048} className={inputCls} />
          </Field>
        </section>

        <section className={sectionCls}>
          <h2 className={headingCls}>Sigilo e proteção</h2>
          <Field label="Título da seção">
            <input {...field("protectionTitle")} maxLength={200} className={inputCls} />
          </Field>
          <Field label="Texto sobre a proteção do relato">
            <textarea {...field("protectionText")} maxLength={5000} rows={5} className={textareaCls} />
          </Field>
        </section>

        <section className={sectionCls}>
          <h2 className={headingCls}>Compromisso com a conformidade</h2>
          <Field label="Título da seção">
            <input {...field("complianceTitle")} maxLength={200} className={inputCls} />
          </Field>
          <Field label="Texto sobre conformidade">
            <textarea {...field("complianceText")} maxLength={5000} rows={4} className={textareaCls} />
          </Field>
        </section>

        <section className={sectionCls}>
          <h2 className={headingCls}>Descrição nos buscadores</h2>
          <Field label="Descrição da página" hint="Resumo usado por buscadores e ao compartilhar o link da página.">
            <textarea {...field("metaDescription")} maxLength={500} rows={3} className={textareaCls} />
          </Field>
        </section>
      </fieldset>

      {!pending && state.status !== "idle" && (
        <p
          role={state.status === "error" ? "alert" : "status"}
          className={`rounded-button px-4 py-3 text-sm ${state.status === "error" ? "bg-brand-coral/10 text-brand-coral" : "bg-emerald-50 text-emerald-700"}`}
        >
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border-default pt-5">
        <a href="/denuncia" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-navy underline underline-offset-4 hover:text-brand-coral">
          Ver página no site
          <span className="sr-only"> (abre em uma nova aba)</span>
        </a>
        <button
          type="submit"
          disabled={pending}
          className="rounded-button bg-brand-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy/90 disabled:opacity-60"
        >
          {pending ? "Salvando…" : "Salvar alterações"}
        </button>
      </div>
    </form>
  );
}
