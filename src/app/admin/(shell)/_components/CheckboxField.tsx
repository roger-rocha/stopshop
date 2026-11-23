interface CheckboxFieldProps {
  name: string;
  /** Título do campo, ex.: "Destaque". */
  label: string;
  /** Texto ao lado da caixa, ex.: "Em destaque". */
  option: string;
  hint?: string;
  defaultChecked?: boolean;
}

/** Checkbox em cartão: título, opção clicável e dica empilhados, como nos toggles de SEO. */
export function CheckboxField({ name, label, option, hint, defaultChecked }: CheckboxFieldProps) {
  return (
    <div className="space-y-1">
      <span className="block text-sm font-medium text-text-primary">{label}</span>
      <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-button border border-border-default bg-white px-3 py-2.5 transition-colors hover:bg-surface-muted">
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="mt-0.5 h-4 w-4 shrink-0 accent-brand-navy"
        />
        <span className="min-w-0">
          <span className="block text-sm text-text-primary">{option}</span>
          {hint && <span className="mt-0.5 block text-xs text-text-muted">{hint}</span>}
        </span>
      </label>
    </div>
  );
}
