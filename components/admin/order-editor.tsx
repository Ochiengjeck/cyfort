"use client";

import { SubmitButton } from "./submit-button";

type OrderEditorProps = {
  items: Array<{ id: string; label: string; order: number }>;
  reorderAction: (formData: FormData) => void;
};

export function OrderEditor({ items, reorderAction }: OrderEditorProps) {
  if (items.length < 2) return null;

  return (
    <form action={reorderAction} className="mb-6 rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/50">
        Display order
      </p>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <input
              type="number"
              name={`order-${item.id}`}
              defaultValue={item.order}
              className="w-16 rounded-md border border-white/15 bg-white/5 px-2 py-1 text-sm text-white outline-none focus:border-brand-gold"
            />
            <span className="truncate text-sm text-white/70">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <SubmitButton label="Save order" pendingLabel="Saving order…" />
      </div>
    </form>
  );
}
