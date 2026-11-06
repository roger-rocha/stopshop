import assert from "node:assert/strict";
import { test } from "node:test";
import { eventSchema } from "../src/lib/validators";

const banner = {
  title: "Presença do Grinch",
  image: "/images/grinch.jpg",
  dateLabel: "Especial de Natal",
};

test("permanent banners and dated legacy events do not require times", () => {
  const permanent = eventSchema.parse(banner);
  assert.equal(permanent.startDate, null);
  assert.equal(permanent.endDate, null);
  assert.equal(permanent.startTime, null);
  assert.equal(permanent.endTime, null);
  const dated = eventSchema.parse({ ...banner, startDate: "2026-12-20" });
  assert.equal(dated.startDate, "2026-12-20");
  assert.equal(dated.endDate, null);
  assert.equal(dated.startTime, null);
  assert.equal(dated.endTime, null);
});

test("one-day and inclusive multi-day events accept a daily time interval", () => {
  for (const endDate of ["", "2026-12-20", "2026-12-24"]) {
    const event = eventSchema.parse({
      ...banner, startDate: "2026-12-20", endDate, startTime: " 14:30 ", endTime: "18:00",
    });
    assert.equal(event.startTime, "14:30");
    assert.equal(event.endTime, "18:00");
  }
  const cleared = eventSchema.parse({ ...banner, startDate: "2026-12-20", startTime: "  ", endTime: "" });
  assert.equal(cleared.startTime, null);
  assert.equal(cleared.endTime, null);
});

test("dates must be real ISO dates in chronological order", () => {
  for (const invalid of ["2026-02-29", "2026-02-30", "2026-04-31", "2026-13-01", "20/12/2026", "2026-2-01"]) {
    for (const field of ["startDate", "endDate"]) {
      const parsed = eventSchema.safeParse({ ...banner, startDate: "2026-01-01", [field]: invalid });
      assert.equal(parsed.success, false, `${field}: ${invalid}`);
      if (!parsed.success) assert.ok(parsed.error.flatten().fieldErrors[field as "startDate" | "endDate"]);
    }
  }
  assert.equal(eventSchema.safeParse({ ...banner, startDate: "2028-02-29" }).success, true);
  for (const dates of [{ endDate: "2026-12-20" }, { startDate: "2026-12-20", endDate: "2026-12-19" }]) {
    const parsed = eventSchema.safeParse({ ...banner, ...dates });
    assert.equal(parsed.success, false);
    if (!parsed.success) assert.ok(parsed.error.flatten().fieldErrors.endDate);
  }
});

test("times require a date, both endpoints and an increasing same-day interval", () => {
  for (const [input, errorField] of [
    [{ startTime: "14:00", endTime: "18:00" }, "startDate"],
    [{ startDate: "2026-12-20", startTime: "14:00" }, "endTime"],
    [{ startDate: "2026-12-20", endTime: "18:00" }, "startTime"],
    [{ startDate: "2026-12-20", startTime: "18:00", endTime: "18:00" }, "endTime"],
    [{ startDate: "2026-12-20", startTime: "23:00", endTime: "01:00" }, "endTime"],
  ] as const) {
    const parsed = eventSchema.safeParse({ ...banner, ...input });
    assert.equal(parsed.success, false);
    if (!parsed.success) assert.ok(parsed.error.flatten().fieldErrors[errorField]);
  }
  for (const time of ["24:00", "12:60", "9:00", "12:00:00", "noon"]) {
    for (const field of ["startTime", "endTime"]) {
      assert.equal(eventSchema.safeParse({
        ...banner, startDate: "2026-12-20", startTime: "09:00", endTime: "18:00", [field]: time,
      }).success, false, `${field}: ${time}`);
    }
  }
});
