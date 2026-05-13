import type { SettingsState } from "@/lib/server/actions/settings";

export function StatusMessage({ state }: { state: SettingsState }) {
  if (state.status === "idle") return null;
  if (state.status === "success") {
    return (
      <div className="rounded-button bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
        {state.message}
      </div>
    );
  }
  return (
    <div className="rounded-button bg-brand-coral/10 px-3 py-2 text-sm text-brand-coral">
      {state.message}
    </div>
  );
}
