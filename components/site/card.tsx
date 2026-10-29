import Link from "next/link";

type CardTone = "paper" | "dark";

const BASE = "group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1";

const TONE_CLASSES: Record<CardTone, string> = {
  // "paper" is for cards rendered inside paper/paperAlt Sections, which
  // flip between light and dark with the theme toggle — border/shadow use
  // the theme-reactive tokens (app/globals.css) rather than literal
  // black/white opacity utilities, which would look wrong in dark mode.
  paper: "border-border-on-paper bg-brand-paper-alt hover:border-brand-gold/40 hover:shadow-[0_16px_40px_-20px_rgba(201,162,39,0.15)]",
  dark: "border-white/10 bg-white/[0.03] hover:border-brand-gold/40 hover:shadow-[0_16px_40px_-20px_rgba(201,162,39,0.15)]",
};

type CardProps = {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
  href?: string;
  tone?: CardTone;
};

/**
 * Shared card shell (radius, border, elevation, hover lift/glow) composed
 * by service/industry/insight cards instead of each re-declaring the same
 * class string. Renders a `Link` when `href` is given, otherwise a `div`.
 * `tone` picks the border/background pairing — `dark` (default) for the
 * site's permanently-dark Sections (navbar, hero, footer, CTA bands),
 * `paper` for cards inside paper/paperAlt Sections (which the theme toggle
 * flips between light and dark). Both tones share the same gold-tinted
 * hover glow, which reads cleanly on any surface.
 */
export function Card({ children, className = "", padded = true, href, tone = "dark" }: CardProps) {
  const classes = `${BASE} ${TONE_CLASSES[tone]} ${padded ? "p-6" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}

/** Gold gradient hairline that sweeps in on hover, used atop icon/text cards. */
export function CardTopGlow() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light transition-transform duration-300 group-hover:scale-x-100"
    />
  );
}
