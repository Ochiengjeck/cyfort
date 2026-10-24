"use client";

import { useId, useState } from "react";

type ColorFieldProps = {
  label: string;
  name: string;
  defaultValue: string;
};

export function ColorField({ label, name, defaultValue }: ColorFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const id = useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-wider text-white/50">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000"}
          onChange={(event) => setValue(event.target.value)}
          className="h-10 w-12 cursor-pointer rounded-md border border-white/15 bg-transparent"
          aria-label={`${label} color picker`}
        />
        <input
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          pattern="^#[0-9a-fA-F]{6}$"
          required
          className="w-28 rounded-md border border-white/15 bg-white/5 px-3 py-2.5 font-mono text-sm text-white outline-none transition-colors focus:border-brand-gold"
        />
      </div>
    </div>
  );
}
