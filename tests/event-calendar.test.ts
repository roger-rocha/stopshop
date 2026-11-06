import assert from "node:assert/strict";
import { test } from "node:test";
import type { AgendaEvent } from "../src/db/schema";
import { eventMonths, eventsOnDate, eventTimeLabel, toCalendarEvents } from "../src/lib/event-calendar";
import { getEventStatus, toAgendaBanners } from "../src/lib/events";
import { shoppingDate, shoppingMonth } from "../src/lib/opening-schedule";

const event = (overrides: Partial<AgendaEvent> = {}): AgendaEvent => ({
  id: 1, title: "Presença do Grinch", description: "Anotação privada",
  image: "/images/grinch.jpg", dateLabel: "Natal no Stop Shop",
  startDate: "2026-12-20", endDate: null, startTime: "14:00", endTime: "16:30",
  position: 0, ctaLabel: null, ctaHref: null, createdAt: 0, updatedAt: 0,
  ...overrides,
});

test("calendar excludes permanent banners and internal notes", () => {
  const publicEvents = toCalendarEvents([event(), event({ id: 2, startDate: null })]);
  assert.equal(publicEvents.length, 1);
  assert.equal(publicEvents[0].title, "Presença do Grinch");
  assert.equal("description" in publicEvents[0], false);
  assert.equal("createdAt" in publicEvents[0], false);
});

test("single-day events appear only on their date", () => {
  const events = toCalendarEvents([event()]);
  assert.equal(eventsOnDate(events, "2026-12-19").length, 0);
  assert.equal(eventsOnDate(events, "2026-12-20").length, 1);
  assert.equal(eventsOnDate(events, "2026-12-21").length, 0);
});

test("ranges include both endpoints across a month and year boundary", () => {
  const events = toCalendarEvents([event({ startDate: "2026-12-30", endDate: "2027-01-02" })]);
  for (const date of ["2026-12-30", "2026-12-31", "2027-01-01", "2027-01-02"]) {
    assert.equal(eventsOnDate(events, date).length, 1, date);
  }
  for (const date of ["2026-12-29", "2027-01-03"]) assert.equal(eventsOnDate(events, date).length, 0, date);
});

test("month selector includes intermediate months across years without duplicates", () => {
  assert.deepEqual(eventMonths(toCalendarEvents([
    event({ startDate: "2026-12-20", endDate: "2027-02-02" }),
    event({ id: 2, startDate: "2027-01-15" }),
  ])), ["2026-12", "2027-01", "2027-02"]);
});

test("legacy banners with only an end date stay hidden after that date", () => {
  const legacy = event({ startDate: null, endDate: "2026-01-01" });
  assert.deepEqual(toAgendaBanners([legacy], "2026-11-06"), []);
  assert.equal(toAgendaBanners([legacy], "2026-01-01").length, 1);
});

test("same-day cards sort by time then position, with unconfirmed times last", () => {
  const events = toCalendarEvents([
    event({ id: 1, startTime: null, endTime: null }),
    event({ id: 2, startTime: "16:00", endTime: "18:00" }),
    event({ id: 3, startTime: "09:00", position: 2 }),
    event({ id: 4, startTime: "09:00", position: 1 }),
  ]);
  assert.deepEqual(eventsOnDate(events, "2026-12-20").map((item) => item.id), [4, 3, 2, 1]);
  assert.deepEqual(events.map((item) => item.id), [1, 2, 3, 4]);
  assert.equal(eventTimeLabel(events[0]), "Horário a confirmar");
  assert.equal(eventTimeLabel(event()), "14h às 16h30");
});

test("past events remain available in the calendar while leaving the banner carousel", () => {
  const past = event({ startDate: "2026-10-31" });
  assert.equal(getEventStatus(past, "2026-11-01"), "ended");
  assert.equal(eventsOnDate(toCalendarEvents([past]), "2026-10-31").length, 1);
  const banners = toAgendaBanners([past, event(), event({ id: 3, startDate: null })], "2026-11-01");
  assert.deepEqual(banners.map((item) => item.id), [1, 3]);
  assert.equal(JSON.stringify(banners).includes("Anotação privada"), false);
});

test("shopping date follows Brazil when UTC has already changed day and month", () => {
  const now = new Date("2027-01-01T02:59:59Z");
  assert.equal(shoppingDate(now), "2026-12-31");
  assert.equal(shoppingMonth(now), "2026-12");
  assert.equal(getEventStatus(event({ startDate: "2026-12-31" }), shoppingDate(now)), "active");
  assert.equal(shoppingDate(new Date("2027-01-01T03:00:00Z")), "2027-01-01");
});
