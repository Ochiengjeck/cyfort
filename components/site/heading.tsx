type HeadingTier = "mega" | "hero" | "banner" | "section";
type HeadingTone = "dark" | "paper";

type HeadingProps = {
  lead: string;
  emphasis: string;
  as?: "h1" | "h2" | "h3";
  tier?: HeadingTier;
  tone?: HeadingTone;
  className?: string;
};

const TIER_CLASSES: Record<HeadingTier, string> = {
  // Oversized, uppercase, non-italic — a deliberately blunter brutalist
  // treatment for the bold-marquee home hero, distinct from the italic
  // gradient-emphasis pattern used everywhere else.
  mega: "hero-headline text-6xl sm:text-7xl lg:text-8xl xl:text-[6.5rem] leading-[1.08] tracking-tight uppercase",
  hero: "hero-headline text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.18] tracking-tight",
  banner: "text-4xl sm:text-5xl lg:text-6xl leading-tight",
  section: "text-3xl sm:text-4xl leading-tight",
};

// Gradient-clip only reads reliably on a dark background — on paper
// backgrounds the pale gold-light gradient stop fails contrast, so paper
// tone falls back to a solid, darker gold.
const EMPHASIS_CLASSES: Record<HeadingTone, string> = {
  dark: "bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light bg-clip-text text-transparent",
  paper: "text-brand-gold-dark",
};

// Hero/banner tiers stack lead and emphasis on separate lines — guarantees
// at least 2 lines regardless of content length, and (not incidentally)
// stops the lead word and the italic gold emphasis word from ever sharing
// a line and crowding the container's clipped edge, which is what was
// slicing the last letter of the emphasis word off at narrower viewports.
// Lead is clamped to 1 line and emphasis to 2, so a stacked heading is
// always 2-3 lines total regardless of how much copy an admin enters
// (important now that hero copy comes from an editable slide carousel).
const STACKED_TIERS: HeadingTier[] = ["hero", "banner"];

/**
 * Light-weight lead word + bold emphasis word pattern lifted from the
 * brand profile's "Who **We Are**" heading style.
 */
export function Heading({
  lead,
  emphasis,
  as = "h2",
  tier = "section",
  tone = "dark",
  className = "",
}: HeadingProps) {
  const Tag = as;
  const stacked = STACKED_TIERS.includes(tier);

  if (stacked) {
    // `line-clamp-N` sets `display: -webkit-box` itself — combining it with
    // a separate `block` utility on the same element lets `block` win the
    // display-property conflict and silently disable the clamp (text just
    // wraps normally, uncapped). Each clamped span gets its own `block`
    // wrapper instead, so the stacking and the clamp never fight.
    return (
      <Tag className={`font-display ${TIER_CLASSES[tier]} ${className}`}>
        {lead ? (
          <span className="block">
            <span className="line-clamp-1 font-light">{lead}</span>
          </span>
        ) : null}
        <span className="block">
          <span className={`line-clamp-2 pr-1 font-semibold italic ${EMPHASIS_CLASSES[tone]}`}>{emphasis}</span>
        </span>
      </Tag>
    );
  }

  return (
    <Tag className={`font-display ${TIER_CLASSES[tier]} ${className}`}>
      {lead ? <span className="font-light">{lead} </span> : null}
      <span className={`font-semibold ${tier === "mega" ? "" : "italic"} ${EMPHASIS_CLASSES[tone]}`}>{emphasis}</span>
    </Tag>
  );
}
