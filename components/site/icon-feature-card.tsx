import { Card } from "./card";
import { AppIcon } from "./icons";

type IconFeatureCardTone = "dark" | "paper";

type IconFeatureCardProps = {
  icon: string;
  title: string;
  body: string;
  tone?: IconFeatureCardTone;
};

// Differentiators have no admin-editable icon field yet — mapped by the
// fixed seed order here (Business-Led Advisory, Cybersecurity Beyond
// Compliance, Governance Driven, Long-Term Partnerships).
export const DIFFERENTIATOR_ICONS = ["compass", "shield-check", "scale", "handshake"];

const TEXT_TONE: Record<IconFeatureCardTone, { title: string; body: string; icon: string }> = {
  // gold-on-white only reaches ~2.4:1 contrast (fails WCAG's 3:1 non-text
  // minimum) — gold-dark clears it (~4:1) on paper tone. On dark tone, full
  // gold already reaches ~8:1, so gold-dark there would be a pointless
  // downgrade.
  paper: { title: "text-on-paper", body: "text-brand-muted", icon: "text-brand-gold-dark" },
  dark: { title: "text-on-dark", body: "text-on-dark/60", icon: "text-brand-gold" },
};

/**
 * Icon-led feature card used for the Differentiators grid (Home + About).
 * Replaces the old numbered-text-only `PillBadge` pattern.
 */
export function IconFeatureCard({ icon, title, body, tone = "paper" }: IconFeatureCardProps) {
  return (
    <Card tone={tone}>
      <span
        className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/10 transition-colors duration-300 group-hover:bg-brand-gold/15 ${TEXT_TONE[tone].icon}`}
      >
        <AppIcon name={icon} className="h-5 w-5" />
      </span>
      <h3 className={`mt-4 text-base font-semibold ${TEXT_TONE[tone].title}`}>{title}</h3>
      <p className={`mt-1 text-sm ${TEXT_TONE[tone].body}`}>{body}</p>
    </Card>
  );
}
