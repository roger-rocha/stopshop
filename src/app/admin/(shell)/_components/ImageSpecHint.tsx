import { ACCEPTED_FORMATS_LABEL, type ImageSpec } from "@/lib/image-specs";

/** Medida ideal, cuidados de corte e formatos aceitos — exibido sob cada campo de imagem do admin. */
export function ImageSpecHint({ spec }: { spec: ImageSpec }) {
  return (
    <span className="block space-y-0.5 text-xs leading-relaxed text-text-muted">
      <span className="block">
        <span className="font-medium text-text-secondary">Medida ideal: {spec.size}</span>
        {spec.note && <> · {spec.note}</>}
      </span>
      <span className="block">{spec.formats ?? ACCEPTED_FORMATS_LABEL}</span>
    </span>
  );
}
