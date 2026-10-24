type RadarChartProps = {
  className?: string;
};

const RINGS = [34, 52, 70, 88];
const AXES = 8;

/**
 * Stylized radar/scan visualization for the "Cyber Resilience" hero card —
 * purely decorative (concentric rings, axis lines, a rotating sweep wedge),
 * not a rendering of real telemetry. The sweep rotation is a slow CSS
 * animation, frozen by the global prefers-reduced-motion override.
 */
export function RadarChart({ className }: RadarChartProps) {
  const center = 100;

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      {RINGS.map((r) => (
        <circle
          key={r}
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke="var(--color-brand-gold)"
          strokeOpacity={0.18}
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: AXES }).map((_, index) => {
        const angle = (index / AXES) * Math.PI * 2;
        const x = center + Math.cos(angle) * RINGS[RINGS.length - 1];
        const y = center + Math.sin(angle) * RINGS[RINGS.length - 1];
        return (
          <line
            key={index}
            x1={center}
            y1={center}
            x2={x}
            y2={y}
            stroke="var(--color-brand-gold)"
            strokeOpacity={0.14}
            strokeWidth="1"
          />
        );
      })}
      <g style={{ transformOrigin: "100px 100px", animation: "radar-sweep 6s linear infinite" }}>
        <path
          d={`M ${center} ${center} L ${center} ${center - RINGS[RINGS.length - 1]} A ${RINGS[RINGS.length - 1]} ${RINGS[RINGS.length - 1]} 0 0 1 ${center + RINGS[RINGS.length - 1] * Math.sin((Math.PI * 2) / 6)} ${center - RINGS[RINGS.length - 1] * Math.cos((Math.PI * 2) / 6)} Z`}
          fill="url(#radar-sweep-gradient)"
        />
      </g>
      <defs>
        <linearGradient id="radar-sweep-gradient" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-gold)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--color-brand-gold)" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <circle cx={center} cy={center} r="3" fill="var(--color-brand-gold)" />
    </svg>
  );
}
