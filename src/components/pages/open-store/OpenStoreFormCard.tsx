"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { inquiryOptions, type InquirySubject } from "@/lib/data/open-store";

const inputClass =
  "w-full rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-primary outline-none placeholder:text-text-muted focus:border-brand-coral focus:ring-1 focus:ring-brand-coral";

function Field({
  id,
  label,
  children,
  className,
}: {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text-primary">
        {label}
      </label>
      {children}
    </div>
  );
}

export function OpenStoreFormCard() {
  const [subject, setSubject] = useState<InquirySubject>("loja");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Os cards de "Formatos" apontam para o formulário com data-subject;
  // ao clicar, pré-selecionamos o assunto correspondente.
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-subject]"
      );
      const value = target?.dataset.subject as InquirySubject | undefined;
      if (value && inquiryOptions.some((o) => o.value === value)) {
        setSubject(value);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const current = inquiryOptions.find((o) => o.value === subject);

  return (
    <form
      id="formulario"
      onSubmit={(event) => {
        event.preventDefault();
        if (!acceptedTerms) return;
        setSubmitted(true);
      }}
      noValidate
      className="scroll-mt-28 rounded-[32px] border border-border-default bg-white p-7 shadow-card sm:p-10"
    >
      <h2 className="font-display text-4xl font-bold text-text-primary">
        Fale com o comercial
      </h2>
      <p className="mt-3 text-base leading-relaxed text-text-secondary">
        Conte um pouco sobre a sua marca. Retornamos em até dois dias úteis.
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="status"
            className="mt-8 rounded-[24px] border border-success/30 bg-success/5 px-6 py-10 text-center"
          >
            <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
            <p className="mt-4 font-display text-2xl font-bold text-text-primary">
              Recebemos o seu interesse!
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-text-secondary">
              O time comercial vai analisar as informações e entrar em contato
              pelo e-mail ou telefone informado.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {/* Assunto — segmented control */}
            <fieldset className="mt-8">
              <legend className="mb-2 text-sm font-medium text-text-primary">
                O que você procura?
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {inquiryOptions.map((option) => {
                  const active = option.value === subject;
                  return (
                    <label
                      key={option.value}
                      className={cn(
                        "relative flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition-colors",
                        active
                          ? "border-brand-coral bg-brand-coral/5 text-text-primary"
                          : "border-border-subtle bg-surface-soft text-text-secondary hover:border-text-muted"
                      )}
                    >
                      <input
                        type="radio"
                        name="subject"
                        value={option.value}
                        checked={active}
                        onChange={() => setSubject(option.value)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                          active ? "border-brand-coral" : "border-border-subtle"
                        )}
                      >
                        {active && <span className="h-2 w-2 rounded-full bg-brand-coral" />}
                      </span>
                      {option.label}
                    </label>
                  );
                })}
              </div>
              {current && (
                <p className="mt-2 text-xs text-text-muted">{current.hint}</p>
              )}
            </fieldset>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field id="os-name" label="Nome">
                <input id="os-name" name="name" type="text" required autoComplete="name" placeholder="Seu nome" className={inputClass} />
              </Field>
              <Field id="os-brand" label="Marca ou empresa">
                <input id="os-brand" name="brand" type="text" required autoComplete="organization" placeholder="Nome da marca" className={inputClass} />
              </Field>
              <Field id="os-email" label="E-mail">
                <input id="os-email" name="email" type="email" required autoComplete="email" placeholder="voce@empresa.com.br" className={inputClass} />
              </Field>
              <Field id="os-phone" label="Telefone / WhatsApp">
                <input id="os-phone" name="phone" type="tel" required autoComplete="tel" placeholder="(47) 99999-9999" className={inputClass} />
              </Field>
              <Field id="os-segment" label="Segmento">
                <select id="os-segment" name="segment" required defaultValue="" className={cn(inputClass, "text-text-primary")}>
                  <option value="" disabled>Selecione</option>
                  <option value="feminino">Moda feminina</option>
                  <option value="masculino">Moda masculina</option>
                  <option value="infantil">Moda infantil</option>
                  <option value="calcados">Calçados e acessórios</option>
                  <option value="cosmeticos">Cosméticos e beleza</option>
                  <option value="alimentacao">Alimentação</option>
                  <option value="servicos">Serviços</option>
                  <option value="outro">Outro</option>
                </select>
              </Field>
              <Field id="os-area" label="Metragem desejada">
                <select id="os-area" name="area" defaultValue="" className={cn(inputClass, "text-text-primary")}>
                  <option value="">Ainda não sei</option>
                  <option value="quiosque">Quiosque</option>
                  <option value="30-60">30 a 60 m²</option>
                  <option value="60-120">60 a 120 m²</option>
                  <option value="120-300">120 a 300 m²</option>
                  <option value="300+">Acima de 300 m²</option>
                </select>
              </Field>
            </div>

            <Field id="os-message" label="Conte sobre a sua marca" className="mt-4">
              <textarea
                id="os-message"
                name="message"
                rows={5}
                placeholder="Tempo de mercado, número de lojas, público, site ou Instagram..."
                className={inputClass}
              />
            </Field>

            <label htmlFor="os-terms" className="mt-5 flex items-start gap-3 text-sm text-text-secondary">
              <input
                id="os-terms"
                name="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-default text-brand-coral focus:ring-brand-coral/30"
              />
              <span>
                Li e aceito a{" "}
                <Link href="/politica-de-privacidade" className="font-medium text-brand-coral underline underline-offset-2">
                  política de privacidade
                </Link>{" "}
                e autorizo o contato do time comercial.
              </span>
            </label>

            <button
              type="submit"
              disabled={!acceptedTerms}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-coral px-6 py-3.5 font-semibold text-white shadow-glow-coral transition-[background-color,opacity] hover:bg-brand-coral-dark disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Enviar interesse
              <Send className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
