type FormFieldProps = {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
};

export function FormField({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  placeholder,
  hint,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-xs font-medium uppercase tracking-wider text-white/50">
        {label}
        {required ? <span className="text-brand-gold"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ""}
        className="rounded-md border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-brand-gold"
      />
      {hint ? <p className="text-xs text-white/40">{hint}</p> : null}
    </div>
  );
}
