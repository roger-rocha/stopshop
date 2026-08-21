"use client";

import { useState } from "react";
import Link from "next/link";

export function ContactFormCard() {
  const [submitted, setSubmitted] = useState(false);
  // O form usa noValidate, então o aceite dos termos é conferido aqui.
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!acceptedTerms) return;
        setSubmitted(true);
      }}
      className="rounded-[32px] border border-border-default bg-white p-8 shadow-card sm:p-10"
      noValidate
    >
      <h2 className="font-display text-4xl font-bold text-text-primary">
        Envie sua mensagem
      </h2>
      <p className="mt-4 text-base leading-relaxed text-text-secondary">
        Preencha o formulário abaixo e nossa equipe responderá o mais breve possível.
      </p>

      {submitted ? (
        <div className="mt-8 rounded-card border border-success/30 bg-success/5 px-6 py-8 text-center" role="status">
          <p className="font-medium text-text-primary">Mensagem enviada!</p>
          <p className="mt-2 text-sm text-text-secondary">
            Em breve entraremos em contato com você.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="sr-only">Nome</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Seu nome"
                className="w-full rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-primary outline-none placeholder:text-text-muted focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">E-mail</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="Seu e-mail"
                className="w-full rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-primary outline-none placeholder:text-text-muted focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
              />
            </div>
            <div>
              <label htmlFor="contact-phone" className="sr-only">Telefone</label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                placeholder="Telefone"
                className="w-full rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-primary outline-none placeholder:text-text-muted focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
              />
            </div>
            <div>
              <label htmlFor="contact-department" className="sr-only">Departamento</label>
              <select
                id="contact-department"
                name="department"
                className="w-full rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-secondary outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
              >
                <option value="">Departamento</option>
                <option value="marketing">Marketing</option>
                <option value="atendimento">Atendimento</option>
                <option value="atacado">Atacado</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="contact-message" className="sr-only">Mensagem</label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              placeholder="Escreva sua mensagem"
              className="w-full rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-primary outline-none placeholder:text-text-muted focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="contact-terms"
              className="flex items-start gap-3 text-sm text-text-secondary"
            >
              <input
                id="contact-terms"
                name="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-default text-brand-coral focus:ring-brand-coral/30"
              />
              <span>
                Li e aceito os{" "}
                <Link
                  href="/politica-de-privacidade"
                  className="font-medium text-brand-coral underline underline-offset-2"
                >
                  termos e condições
                </Link>{" "}
                e a política de privacidade.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!acceptedTerms}
            className="mt-4 rounded-button bg-brand-coral px-6 py-3 font-semibold text-white transition-opacity hover:bg-brand-coral-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            Enviar mensagem
          </button>
        </>
      )}
    </form>
  );
}
