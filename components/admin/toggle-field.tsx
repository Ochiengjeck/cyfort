type ToggleFieldProps = {
  label: string;
  name: string;
  defaultChecked?: boolean;
  hint?: string;
};

export function ToggleField({ label, name, defaultChecked, hint }: ToggleFieldProps) {
  return (
    <label htmlFor={name} className="flex cursor-pointer items-start gap-3 py-1">
      <input
        id={name}
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-0.5 h-4 w-4 rounded border-white/25 bg-white/5 accent-[color:var(--color-brand-gold)]"
      />
      <span>
        <span className="block text-sm text-white">{label}</span>
        {hint ? <span className="block text-xs text-white/40">{hint}</span> : null}
      </span>
    </label>
  );
}
