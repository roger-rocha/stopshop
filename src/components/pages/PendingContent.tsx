import Link from "next/link";

/**
 * Placeholder das páginas criadas na reunião de 20/08 cujo conteúdo ainda será
 * definido pelo cliente. Existe para que os links do menu e do rodapé não caiam
 * em 404 enquanto o texto não chega.
 */
export function PendingContent({ note }: { note: string }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="rounded-[28px] border border-dashed border-border-subtle bg-surface-soft px-6 py-12 text-center sm:px-10">
        <p className="font-display text-2xl font-bold text-text-primary">
          Conteúdo em preparação
        </p>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-text-secondary">
          {note}
        </p>
        <Link
          href="/contato"
          className="mt-8 inline-flex items-center justify-center rounded-pill bg-brand-coral px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-coral-dark"
        >
          Falar com a equipe
        </Link>
      </div>
    </section>
  );
}
