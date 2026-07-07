"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";

export function DenunciaFormCard() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-[32px] border border-border-default bg-white p-8 shadow-card sm:p-10"
      noValidate
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coral/10 text-brand-coral">
        <ShieldCheck className="h-5 w-5" />
      </div>
      <h2 className="mt-5 font-display text-4xl font-bold text-text-primary">
        Registrar denúncia
      </h2>
      <p className="mt-4 text-base leading-relaxed text-text-secondary">
        Este é um canal seguro e confidencial. Você pode se identificar ou
        registrar sua denúncia de forma anônima.
      </p>

      {submitted ? (
        <div className="mt-8 rounded-card border border-success/30 bg-success/5 px-6 py-8 text-center" role="status">
          <p className="font-medium text-text-primary">Denúncia registrada!</p>
          <p className="mt-2 text-sm text-text-secondary">
            Sua manifestação será tratada com sigilo pela nossa equipe.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="denuncia-name" className="sr-only">Nome (opcional)</label>
              <input
                id="denuncia-name"
                name="name"
                type="text"
                placeholder="Seu nome (opcional)"
                className="w-full rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-primary outline-none placeholder:text-text-muted focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
              />
            </div>
            <div>
              <label htmlFor="denuncia-category" className="sr-only">Categoria</label>
              <select
                id="denuncia-category"
                name="category"
                required
                className="w-full rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-secondary outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
              >
                <option value="">Tipo de denúncia</option>
                <option value="conduta">Conduta inadequada</option>
                <option value="assedio">Assédio ou discriminação</option>
                <option value="fraude">Fraude ou corrupção</option>
                <option value="seguranca">Segurança</option>
                <option value="outros">Outros</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="denuncia-message" className="sr-only">Descrição</label>
            <textarea
              id="denuncia-message"
              name="message"
              rows={7}
              required
              placeholder="Descreva o ocorrido com o máximo de detalhes possível (data, local, pessoas envolvidas)."
              className="w-full rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-primary outline-none placeholder:text-text-muted focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
            />
          </div>

          <button
            type="submit"
            className="mt-4 rounded-button bg-brand-coral px-6 py-3 font-semibold text-white hover:bg-brand-coral-dark"
          >
            Enviar denúncia
          </button>
        </>
      )}
    </form>
  );
}
