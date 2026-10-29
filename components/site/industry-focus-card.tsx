import Link from "next/link";
import { ArrowRight } from "lucide-react";

type IndustryFocusCardProps = {
  index: number;
  name: string;
  drivingText?: string | null;
  startText?: string | null;
  startServiceSlug?: string | null;
  startServiceName?: string | null;
};

/**
 * Numbered 01-04 focus-industry card used on the Industries page — pairs
 * "what's driving it" (the regulatory/scrutiny pressure for this sector)
 * with "where we start" (the service CyFort leads with), matching the
 * design template.
 */
export function IndustryFocusCard({
  index,
  name,
  drivingText,
  startText,
  startServiceSlug,
  startServiceName,
}: IndustryFocusCardProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7">
      <span className="font-display text-3xl font-semibold text-brand-gold/40">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="mt-3 text-xl font-semibold text-on-dark">{name}</h3>

      {drivingText ? (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold">What&apos;s driving it</p>
          <p className="mt-1.5 text-sm leading-relaxed text-on-dark/70">{drivingText}</p>
        </div>
      ) : null}

      {startText ? (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold">Where we start</p>
          <p className="mt-1.5 text-sm leading-relaxed text-on-dark/70">{startText}</p>
        </div>
      ) : null}

      {startServiceSlug ? (
        <Link
          href={`/services/${startServiceSlug}`}
          className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand-gold transition-colors hover:text-brand-gold-light"
        >
          {startServiceName ?? "See this service"}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
