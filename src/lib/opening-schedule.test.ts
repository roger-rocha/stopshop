import assert from "node:assert/strict";
import { test } from "node:test";
import { openingScheduleSchema, scheduleMonths, shoppingMonth, dateLabel, calendarWeeks, adjacentMonth } from "./opening-schedule";

const open = { date: "2026-10-12", label: "Feriado", closed: false, opens: "10:00", closes: "18:00" };

test("agenda rejects impossible and repeated dates, invalid times and reversed hours", () => {
  for (const entry of [{ ...open, date: "2026-02-30" }, { ...open, opens: "25:00" }, { ...open, closes: "09:00" }, { ...open, closes: "10:00" }]) {
    assert.equal(openingScheduleSchema.safeParse({ entries: [entry] }).success, false);
  }
  assert.equal(openingScheduleSchema.safeParse({ entries: [open, open] }).success, false);
  assert.equal(openingScheduleSchema.safeParse({ entries: [open] }).success, true);
  assert.deepEqual(openingScheduleSchema.parse({ entries: [{ date: "2026-10-12", label: "Feriado", closed: true }] }).entries[0], { date: "2026-10-12", label: "Feriado", closed: true });
  assert.deepEqual(openingScheduleSchema.parse({ entries: [] }), { entries: [] });
});

test("month selection follows Brazil timezone and excludes past months", () => {
  assert.equal(shoppingMonth(new Date("2026-10-01T01:00:00Z")), "2026-09");
  assert.equal(shoppingMonth(new Date("2026-10-01T03:00:00Z")), "2026-10");
  const entries = openingScheduleSchema.parse({ entries: [open, { ...open, date: "2026-09-07" }, { ...open, date: "2027-01-01" }] }).entries;
  assert.deepEqual(scheduleMonths(entries, "2026-10"), ["2026-10", "2027-01"]);
  assert.deepEqual(scheduleMonths([], "2026-10"), ["2026-10"]);
  assert.match(dateLabel("2026-10-12"), /segunda-feira.*12\/10/);
});


test("calendar aligns weekdays, leap February and year boundaries", () => {
  const october = calendarWeeks("2026-10");
  assert.deepEqual(october[0], [null, null, null, null, "2026-10-01", "2026-10-02", "2026-10-03"]);
  assert.equal(october.flat().filter(Boolean).length, 31);
  assert.equal(october[2][1], "2026-10-12");
  assert.equal(october[3][0], "2026-10-18");
  assert.equal(calendarWeeks("2028-02").flat().filter(Boolean).length, 29);
  assert.equal(calendarWeeks("2027-02").flat().filter(Boolean).length, 28);
  assert.equal(adjacentMonth("2026-12", 1), "2027-01");
  assert.equal(adjacentMonth("2026-01", -1), "2025-12");
});
