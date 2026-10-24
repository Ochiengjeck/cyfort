type MarqueeProps = {
  items: string[];
  className?: string;
};

/**
 * Seamlessly looping horizontal ticker — the item list is rendered twice
 * back-to-back and the track animates exactly -50%, so the loop point is
 * invisible. `prefers-reduced-motion` freezes it on a still, legible frame
 * via the global animation override in globals.css (the duplicated list
 * means that frame reads the same as the resting start state).
 *
 * Decorative/supplementary: the same service and industry names are fully
 * navigable elsewhere (Services, Industries pages), so the track is
 * aria-hidden rather than read twice by assistive tech.
 */
export function Marquee({ items, className = "" }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        style={{ animation: "marquee-scroll 32s linear infinite" }}
      >
        {track.map((item, index) => (
          <span key={index} className="flex items-center gap-10">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-on-dark/50">{item}</span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-brand-gold/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
