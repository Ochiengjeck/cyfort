type DotTrailProps = {
  className?: string;
};

// Fixed (non-random) scatter of points along a diagonal band, imitating the
// brand profile's gold particle-trail motif without risking a hydration
// mismatch from client-side randomness.
const DOTS: Array<[number, number, number, number]> = [
  [20, 260, 2, 0.9], [38, 255, 1.4, 0.6], [55, 268, 2.4, 0.8], [70, 240, 1.2, 0.45],
  [90, 250, 2, 0.75], [110, 225, 1.6, 0.55], [130, 235, 2.2, 0.85], [150, 205, 1.3, 0.4],
  [170, 215, 2, 0.7], [195, 190, 1.8, 0.6], [215, 198, 1.2, 0.35], [235, 170, 2.3, 0.8],
  [255, 178, 1.5, 0.5], [275, 150, 2, 0.65], [300, 158, 1.3, 0.4], [320, 130, 2.1, 0.75],
  [340, 138, 1.6, 0.5], [360, 110, 1.9, 0.6], [385, 118, 1.3, 0.35], [405, 92, 2.2, 0.7],
  [60, 290, 1.5, 0.5], [100, 280, 1.8, 0.55], [145, 260, 1.4, 0.4], [185, 245, 2, 0.6],
  [225, 220, 1.6, 0.45], [265, 205, 1.9, 0.55], [305, 185, 1.4, 0.35], [345, 165, 2, 0.6],
];

/**
 * Scattered gold dot-trail, recreating the brand profile cover's particle
 * sweep. Purely decorative.
 */
export function DotTrail({ className }: DotTrailProps) {
  return (
    <svg
      viewBox="0 0 420 300"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMax slice"
    >
      {DOTS.map(([x, y, r, opacity], index) => (
        <circle key={index} cx={x} cy={y} r={r} fill="var(--color-brand-gold)" fillOpacity={opacity} />
      ))}
    </svg>
  );
}
