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
  mega: "hero-headline text-6xl sm:text-7xl lg:text-8xl xl:text-[6.5rem] leading-[0.95] tracking-tight uppercase",
  hero: "hero-headline text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight",
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

/**
 * Light-weight lead word + bold emphasis word pattern lifted from the
 * brand profile's "Who **We Are**" heading style.
 */
export function Heading({
  lead,
  emphasis,
  as = "h2",
  tier = "section",
  tone = "paper",
  className = "",
}: HeadingProps) {
  const Tag = as;
  return (
    <Tag className={`${TIER_CLASSES[tier]} ${className}`}>
      <span className="font-light">{lead} </span>
      <span className={`font-semibold ${tier === "mega" ? "" : "italic"} ${EMPHASIS_CLASSES[tone]}`}>{emphasis}</span>
    </Tag>
  );
}
