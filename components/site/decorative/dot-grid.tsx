type DotGridProps = {
  className?: string;
};

/**
 * Subtle dot-grid texture built from a pure-CSS radial gradient — no SVG or
 * image asset needed.
 */
export function DotGrid({ className }: DotGridProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        backgroundImage: "radial-gradient(var(--color-brand-gold) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        opacity: 0.12,
      }}
    />
  );
}
