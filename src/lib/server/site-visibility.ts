import "server-only";

import { eq } from "drizzle-orm";
import { db, schema } from "@/db";

export const SITE_VISIBILITY_KEY = "sitePublished";

// Read on every request so publishing or closing the site takes effect immediately.
export async function getSitePublished(): Promise<boolean> {
  try {
    const [setting] = await db
      .select({ value: schema.settings.value })
      .from(schema.settings)
      .where(eq(schema.settings.key, SITE_VISIBILITY_KEY))
      .limit(1);

    return setting?.value === "true";
  } catch {
    // A missing or unavailable setting must never expose the unfinished site.
    console.error("Não foi possível consultar a disponibilidade do site.");
    return false;
  }
}
