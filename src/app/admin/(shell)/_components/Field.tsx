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
      <span className="text-sm font-medium text-text-primary">{label}</span>
      {children}
      {hint && !error && <span className="text-xs text-text-muted">{hint}</span>}
      {error && <span className="text-xs text-brand-coral">{error}</span>}
    </label>
  );
}

export const inputCls =
  "block w-full rounded-button border border-border-default bg-white px-3 py-2 text-sm text-text-primary outline-none focus:border-brand-coral focus:ring-2 focus:ring-brand-coral/30";

export const textareaCls = `${inputCls} min-h-[120px]`;
