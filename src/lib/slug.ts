/**
 * Converte um texto livre em slug de URL: "Éfata Plus" -> "efata-plus".
 * Remove acentos, troca "&" por "e" e qualquer outro caractere por hífen.
 */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " e ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Usa o slug informado ou, se vazio, o gerado a partir do nome/título. */
export function slugFromForm(slug: FormDataEntryValue | null, fallback: FormDataEntryValue | null): string {
  const raw = typeof slug === "string" && slug.trim() ? slug : typeof fallback === "string" ? fallback : "";
  return slugify(raw);
}
