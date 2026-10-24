type BadgePillProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Compact pill badge — the one remaining vestige of the old eyebrow-label
 * pattern, used only above the homepage hero headline.
 */
export function BadgePill({ children, className = "" }: BadgePillProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-on-dark/80 backdrop-blur-sm ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-gold shadow-[0_0_6px_0_var(--color-brand-gold)]" />
      {children}
    </span>
  );
}
