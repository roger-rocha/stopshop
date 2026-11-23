import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, htmlFor, hint, error, children, className }: FieldProps) {
  return (
    <label htmlFor={htmlFor} className={cn("block space-y-1", className)}>
      <span className="block text-sm font-medium text-text-primary">{label}</span>
      {children}
      {hint && !error && <span className="block text-xs text-text-muted">{hint}</span>}
      {error && <span className="block text-xs text-brand-coral">{error}</span>}
    </label>
  );
}

// min-h-10 alinha <select> (que ignora o padding) com os inputs de texto.
// text-base no celular evita o zoom automático do iOS ao focar o campo.
export const inputCls =
  "block min-h-10 w-full rounded-button border border-border-default bg-white px-3 py-2 text-base text-text-primary outline-none focus:border-brand-coral focus:ring-2 focus:ring-brand-coral/30 sm:text-sm";

// A altura vem do atributo rows de cada textarea.
export const textareaCls = inputCls;
