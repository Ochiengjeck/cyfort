type SelectFieldOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  name: string;
  options: SelectFieldOption[];
  defaultValue?: string | null;
  placeholder?: string;
  hint?: string;
};

export function SelectField({ label, name, options, defaultValue, placeholder = "— None —", hint }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs font-medium uppercase tracking-wider text-white/50">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue ?? ""}
        className="rounded-md border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-brand-gold"
      >
        <option value="" className="bg-brand-dark">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-brand-dark">
            {option.label}
          </option>
        ))}
      </select>
      {hint ? <p className="text-xs text-white/40">{hint}</p> : null}
    </div>
  );
}
