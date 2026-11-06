import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";
import { eventSchema } from "../src/lib/validators";

type State = { status: "idle" } | { status: "error"; fieldErrors?: Record<string, string[]> };
type Actions = {
  createEventAction: (state: State, data: FormData) => Promise<State>;
  updateEventAction: (id: number, state: State, data: FormData) => Promise<State>;
};

function loadActions(authenticated = true) {
  const writes: Record<string, unknown>[] = [];
  const paths: string[] = [];
  const sequence: string[] = [];
  const redirectError = new Error("redirect");
  const modules: Record<string, unknown> = {
    "next/cache": { revalidatePath: (path: string) => paths.push(path) },
    "next/navigation": { redirect: (path: string) => { assert.equal(path, "/admin/agenda"); throw redirectError; } },
    "drizzle-orm": { eq: (_column: unknown, id: number) => id },
    "@/lib/auth": { requireSession: async () => {
      sequence.push("auth");
      if (!authenticated) throw new Error("Não autenticado");
    } },
    "@/lib/validators": { eventSchema },
    "@/db": {
      schema: { events: { id: "id" } },
      db: {
        insert: () => ({ values: async (data: Record<string, unknown>) => {
          sequence.push("write"); writes.push(data);
        } }),
        update: () => ({ set: (data: Record<string, unknown>) => ({ where: async (id: number) => {
          assert.equal(id, 7); sequence.push("write"); writes.push(data);
        } }) }),
      },
    },
  };
  const context = { exports: {}, require: (name: string) => {
    assert.ok(name in modules, `Unexpected import: ${name}`);
    return modules[name];
  } };
  runInNewContext(ts.transpileModule(readFileSync("src/lib/server/actions/events.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, context);
  return { actions: context.exports as Actions, writes, paths, sequence, redirectError };
}

function eventForm(patch: Record<string, string> = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({
    title: "Presença do Grinch", description: "Encontro no shopping", image: "/arte.jpg",
    dateLabel: "20 de dezembro", startDate: "2026-12-20", endDate: "",
    startTime: "14:00", endTime: "18:00", ...patch,
  })) data.set(key, value);
  return data;
}

for (const mode of ["create", "update"] as const) {
  test(`${mode} authenticates, persists times and refreshes both event views`, async () => {
    const fixture = loadActions();
    const call = mode === "create"
      ? fixture.actions.createEventAction({ status: "idle" }, eventForm())
      : fixture.actions.updateEventAction(7, { status: "idle" }, eventForm());
    await assert.rejects(call, (error) => error === fixture.redirectError);
    assert.deepEqual(fixture.sequence, ["auth", "write"]);
    assert.equal(fixture.writes[0].startTime, "14:00");
    assert.equal(fixture.writes[0].endTime, "18:00");
    assert.deepEqual(fixture.paths, ["/admin/agenda", "/"]);
  });

  test(`${mode} rejects invalid times before writing`, async () => {
    const fixture = loadActions();
    const data = eventForm({ endTime: "13:00" });
    const result = await (mode === "create"
      ? fixture.actions.createEventAction({ status: "idle" }, data)
      : fixture.actions.updateEventAction(7, { status: "idle" }, data));
    assert.equal(result.status, "error");
    if (result.status === "error") assert.ok(result.fieldErrors?.endTime);
    assert.equal(fixture.writes.length, 0);
    assert.equal(fixture.paths.length, 0);
  });

  test(`${mode} requires authentication before any write`, async () => {
    const fixture = loadActions(false);
    const call = mode === "create"
      ? fixture.actions.createEventAction({ status: "idle" }, eventForm())
      : fixture.actions.updateEventAction(7, { status: "idle" }, eventForm());
    await assert.rejects(call, /Não autenticado/);
    assert.equal(fixture.writes.length, 0);
    assert.equal(fixture.paths.length, 0);
  });
}

test("updating an event can clear both times without losing its date", async () => {
  const fixture = loadActions();
  await assert.rejects(
    fixture.actions.updateEventAction(7, { status: "idle" }, eventForm({ startTime: "", endTime: "" })),
    (error) => error === fixture.redirectError,
  );
  assert.equal(fixture.writes[0].startDate, "2026-12-20");
  assert.equal(fixture.writes[0].startTime, null);
  assert.equal(fixture.writes[0].endTime, null);
});
