interface SectionBackgroundProps {
  /** Caminho da imagem, ex.: "/images/sections/planeje.jpg".
   *  Se o arquivo não existir ainda, a seção apenas não recebe textura —
   *  nada quebra. Coloque os arquivos em public/images/sections/. */
  src: string;
}

// Camada de textura sutil atrás do conteúdo da seção. Fica bem discreta
// (8% de opacidade) só para complementar o fundo, sem atrapalhar a leitura.
// Exige que a <section> tenha `relative isolate`.
export function SectionBackground({ src }: SectionBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-[0.08]"
      style={{ backgroundImage: `url('${src}')` }}
    />
  );
}
