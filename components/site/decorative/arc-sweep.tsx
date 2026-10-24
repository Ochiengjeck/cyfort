type ArcSweepProps = {
  className?: string;
};

/**
 * Thin concentric arc-sweep lines, recreating the brand profile cover's
 * radiating line motif. Purely decorative.
 */
export function ArcSweep({ className }: ArcSweepProps) {
  const arcs = [120, 150, 180, 210, 240];

  return (
    <svg
      viewBox="0 0 600 300"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMax slice"
    >
      {arcs.map((radius, index) => (
        <path
          key={radius}
          d={`M ${300 - radius} 300 A ${radius} ${radius} 0 0 1 ${300 + radius} 300`}
          stroke="var(--color-brand-gold)"
          strokeOpacity={0.12 + index * 0.04}
          strokeWidth="1"
          fill="none"
        />
      ))}
    </svg>
  );
}
