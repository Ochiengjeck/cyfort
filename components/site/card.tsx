import Link from "next/link";

type CardTone = "paper" | "dark";

const BASE = "group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.25)]";

const TONE_CLASSES: Record<CardTone, string> = {
  paper: "border-black/8 bg-brand-paper-alt hover:border-brand-gold/40",
  dark: "border-white/10 bg-white/[0.03] hover:border-brand-gold/40",
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
 * by service/team/case-study/insight/job cards instead of each
 * re-declaring the same class string. Renders a `Link` when `href` is
 * given, otherwise a `div`. `tone` picks the border/background pairing —
 * `paper` (default) for paper/paperAlt sections, `dark` for dark sections.
 */
export function Card({ children, className = "", padded = true, href, tone = "paper" }: CardProps) {
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
