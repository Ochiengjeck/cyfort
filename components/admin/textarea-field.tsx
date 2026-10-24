type TextareaFieldProps = {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  rows?: number;
  hint?: string;
};

export function TextareaField({
  label,
  name,
  defaultValue,
  required,
  rows = 5,
  hint,
}: TextareaFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs font-medium uppercase tracking-wider text-white/50">
        {label}
        {required ? <span className="text-brand-gold"> *</span> : null}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        className="resize-y rounded-md border border-white/15 bg-white/5 px-3.5 py-2.5 font-mono text-sm text-white outline-none transition-colors focus:border-brand-gold"
      />
      {hint ? <p className="text-xs text-white/40">{hint}</p> : null}
    </div>
  );
}
