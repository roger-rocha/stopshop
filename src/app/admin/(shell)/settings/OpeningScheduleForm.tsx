"use client";

import { useActionState, useState } from "react";
import { saveOpeningScheduleAction, type SettingsState } from "@/lib/server/actions/settings";
import type { OpeningSchedule } from "@/lib/opening-schedule";
import { Field, inputCls } from "../_components/Field";
import { StatusMessage } from "./StatusMessage";

type Row = { id: string; date: string; label: string; closed: boolean; opens: string; closes: string };
const initial: SettingsState = { status: "idle" };

export function OpeningScheduleForm({ schedule }: { schedule: OpeningSchedule }) {
  const [state, action, pending] = useActionState(saveOpeningScheduleAction, initial);
  const [rows, setRows] = useState<Row[]>(() => schedule.entries.map((entry) => ({ ...entry, id: entry.date, opens: entry.closed ? "09:00" : entry.opens, closes: entry.closed ? "19:00" : entry.closes })));
  function update(id: string, patch: Partial<Row>) {
    setRows((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item));
  }

  return (
    <form action={action} className="space-y-5">
      <StatusMessage state={state} />
      <input type="hidden" name="schedule" value={JSON.stringify({ entries: rows.map(({ date, label, closed, opens, closes }) => ({ date, label, closed, opens, closes })) })} />
      <fieldset disabled={pending} className="space-y-4 disabled:opacity-60">
        {rows.length === 0 && <p className="text-sm text-text-secondary">Nenhuma data especial cadastrada. A home orientará o visitante a consultar o atendimento.</p>}
        {rows.map((row, index) => (
          <div key={row.id} className="space-y-3 rounded-xl border border-border-default bg-surface-soft p-4">
            <div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold">Data {index + 1}</p><button type="button" onClick={() => setRows((items) => items.filter((item) => item.id !== row.id))} className="text-sm text-brand-coral hover:underline" aria-label={`Remover data ${index + 1}`}>Remover</button></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Data"><input type="date" required value={row.date} onChange={(event) => update(row.id, { date: event.target.value })} className={inputCls} /></Field>
              <Field label="Descrição (opcional)"><input maxLength={80} value={row.label} onChange={(event) => update(row.id, { label: event.target.value })} placeholder="Ex.: feriado ou domingo de compras" className={inputCls} /></Field>
            </div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={row.closed} onChange={(event) => update(row.id, { closed: event.target.checked })} />Fechado nesta data</label>
            {!row.closed && <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Abertura"><input type="time" required value={row.opens} onChange={(event) => update(row.id, { opens: event.target.value })} className={inputCls} /></Field>
              <Field label="Fechamento"><input type="time" required value={row.closes} onChange={(event) => update(row.id, { closes: event.target.value })} className={inputCls} /></Field>
            </div>}
          </div>
        ))}
        <button type="button" onClick={() => setRows((items) => [...items, { id: crypto.randomUUID(), date: "", label: "", closed: false, opens: "09:00", closes: "19:00" }])} className="rounded-button border border-border-default px-4 py-2 text-sm font-medium hover:bg-surface-soft">Adicionar data</button>
      </fieldset>
      <div className="flex justify-end"><button type="submit" disabled={pending} className="rounded-button bg-brand-navy px-5 py-2 text-sm font-medium text-white hover:bg-brand-navy/90 disabled:opacity-60">{pending ? "Salvando…" : "Salvar agenda"}</button></div>
    </form>
  );
}
