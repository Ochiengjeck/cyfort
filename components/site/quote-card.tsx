type QuoteCardProps = {
  quote: string;
  className?: string;
};

/**
 * Gold-gradient rounded pull-quote card, recreating the profile document's
 * closing CTA card.
 */
export function QuoteCard({ quote, className = "" }: QuoteCardProps) {
  return (
    <blockquote
      className={`relative overflow-hidden rounded-2xl px-8 py-10 text-center text-lg font-medium leading-relaxed text-brand-dark shadow-[0_24px_60px_-24px_var(--color-brand-gold)] sm:text-xl ${className}`}
      style={{
        background:
          "linear-gradient(135deg, var(--color-brand-gold-dark), var(--color-brand-gold), var(--color-brand-gold-light))",
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
        style={{ animation: "shine-sweep 4.5s ease-in-out infinite" }}
      />
      <span aria-hidden="true" className="absolute left-6 top-4 text-6xl text-brand-dark/10">
        “
      </span>
      <span className="relative italic">“{quote}”</span>
    </blockquote>
  );
}
