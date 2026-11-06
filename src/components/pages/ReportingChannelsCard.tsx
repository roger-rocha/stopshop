import { ExternalLink, Mail, ShieldCheck } from "lucide-react";
import type { ReportingChannelConfig } from "@/lib/reporting-channel";

export function ReportingChannelsCard({ config }: { config: ReportingChannelConfig }) {
  const hasChannel = Boolean(config.email || config.formUrl);

  return (
    <article className="min-w-0 rounded-[32px] border border-border-default bg-white p-8 shadow-card sm:p-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-coral/10 text-brand-coral">
        <ShieldCheck className="h-5 w-5" aria-hidden="true" />
      </div>
      <h2 className="mt-5 break-words font-display text-3xl font-bold text-text-primary sm:text-4xl">
        {config.channelsTitle}
      </h2>

      {hasChannel ? (
        <div className="mt-8 space-y-8">
          {config.email && (
            <div>
              <h3 className="break-words font-semibold text-text-primary">{config.emailLabel}</h3>
              <a
                href={`mailto:${config.email}`}
                className="mt-2 inline-flex min-h-11 max-w-full items-center gap-2 rounded-sm text-brand-coral underline underline-offset-4 hover:text-brand-coral-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:ring-offset-2"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="min-w-0 break-all">{config.email}</span>
              </a>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                O envio por e-mail identifica o remetente.
              </p>
            </div>
          )}
          {config.formUrl && (
            <div>
              <h3 className="break-words font-semibold text-text-primary">{config.formLabel}</h3>
              <a
                href={config.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-button bg-brand-coral px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-brand-coral-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral focus-visible:ring-offset-2 sm:w-auto"
              >
                <span className="min-w-0 break-words">{config.formButtonLabel}</span>
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="sr-only">(abre em uma nova aba)</span>
              </a>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                Confira as opções de identificação no formulário antes de enviar seu relato.
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="mt-6 rounded-2xl bg-surface-soft p-5 leading-relaxed text-text-secondary">
          Os canais para envio de denúncias ainda não estão disponíveis nesta página.
          Os meios de contato serão divulgados aqui assim que estiverem disponíveis.
        </p>
      )}
    </article>
  );
}
