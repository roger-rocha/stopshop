"use client";

export function ContactFormCard() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="rounded-[32px] border border-border-default bg-white p-8 shadow-card sm:p-10"
    >
      <h2 className="font-display text-4xl font-bold text-text-primary">
        Envie sua mensagem
      </h2>
      <p className="mt-4 text-base leading-relaxed text-text-secondary">
        Esta versão organiza o canal de contato com uma apresentação mais clara e
        profissional. O formulário está preparado para a próxima etapa de integração.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Seu nome"
          className="rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-primary outline-none placeholder:text-text-muted focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
        />
        <input
          type="email"
          placeholder="Seu e-mail"
          className="rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-primary outline-none placeholder:text-text-muted focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
        />
        <input
          type="text"
          placeholder="Telefone"
          className="rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-primary outline-none placeholder:text-text-muted focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
        />
        <select className="rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-secondary outline-none focus:border-brand-coral focus:ring-1 focus:ring-brand-coral">
          <option value="">Departamento</option>
          <option value="marketing">Marketing</option>
          <option value="atendimento">Atendimento</option>
          <option value="atacado">Atacado</option>
        </select>
      </div>

      <textarea
        rows={6}
        placeholder="Escreva sua mensagem"
        className="mt-4 w-full rounded-button border border-border-subtle bg-surface-soft px-4 py-3 text-text-primary outline-none placeholder:text-text-muted focus:border-brand-coral focus:ring-1 focus:ring-brand-coral"
      />

      <button
        type="submit"
        className="mt-4 rounded-button bg-brand-coral px-6 py-3 font-semibold text-white hover:bg-brand-coral-dark"
      >
        Enviar mensagem
      </button>
    </form>
  );
}
