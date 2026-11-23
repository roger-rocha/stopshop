/**
 * O Drizzle embrulha o erro do libSQL em um DrizzleQueryError ("Failed query: ...");
 * o "UNIQUE constraint failed" fica no `cause`. Percorre a cadeia inteira.
 */
export function isUniqueViolation(error: unknown): boolean {
  let current: unknown = error;
  for (let depth = 0; current && depth < 5; depth++) {
    if (current instanceof Error) {
      if (current.message.includes("UNIQUE")) return true;
      const code = (current as { code?: unknown }).code;
      if (typeof code === "string" && code.includes("CONSTRAINT_UNIQUE")) return true;
      current = current.cause;
    } else {
      return false;
    }
  }
  return false;
}
