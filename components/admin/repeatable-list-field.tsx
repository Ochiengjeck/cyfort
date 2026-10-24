"use client";

import { useState } from "react";

type RepeatableListFieldProps = {
  label: string;
  fieldName: string;
  defaultValues?: string[];
};

export function RepeatableListField({
  label,
  fieldName,
  defaultValues = [],
}: RepeatableListFieldProps) {
  const [values, setValues] = useState<string[]>(defaultValues.length ? defaultValues : [""]);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium uppercase tracking-wider text-white/50">{label}</label>
      <div className="flex flex-col gap-2">
        {values.map((value, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              name={fieldName}
              defaultValue={value}
              className="flex-1 rounded-md border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white outline-none transition-colors focus:border-brand-gold"
            />
            <button
              type="button"
              onClick={() => setValues((current) => current.filter((_, i) => i !== index))}
              className="rounded-md border border-white/15 px-2.5 py-2 text-xs text-white/50 hover:border-red-400/50 hover:text-red-400"
              aria-label="Remove item"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setValues((current) => [...current, ""])}
        className="mt-1 w-fit rounded-md border border-white/15 px-3 py-1.5 text-xs text-white/70 hover:border-brand-gold/50 hover:text-brand-gold"
      >
        + Add item
      </button>
    </div>
  );
}
