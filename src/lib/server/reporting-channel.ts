import "server-only";

import { cache } from "react";
import { eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { parseReportingChannelConfig, REPORTING_CHANNEL_KEY } from "@/lib/reporting-channel";

export const getReportingChannelRecord = cache(async () => {
  const [row] = await db.select().from(schema.settings)
    .where(eq(schema.settings.key, REPORTING_CHANNEL_KEY)).limit(1);
  return { config: parseReportingChannelConfig(row?.value), updatedAt: row?.updatedAt };
});

export async function getReportingChannel() {
  return (await getReportingChannelRecord()).config;
}
