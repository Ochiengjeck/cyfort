import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card } from "./card";

type InsightCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  category?: string | null;
  publishedAt?: Date | null;
  coverUrl?: string | null;
  featured?: boolean;
  reverse?: boolean;
};

export function InsightCard({
  slug,
  title,
  excerpt,
  category,
  publishedAt,
  coverUrl,
  featured = false,
  reverse = false,
}: InsightCardProps) {
  // The featured tile spans two grid rows, so its cover image stacks above
  // the text (a tall card reads naturally top-to-bottom). Non-featured
  // cards sit in a single, short row — stacking would leave the text panel
  // starved for height, so the cover sits to the side instead, keeping the
  // card compact and (as a side effect) keeping the shared row height the
  // featured tile inherits from stretching too tall.
  if (featured) {
    return (
      <Card href={`/insights/${slug}`} padded={false}>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-brand-dark via-brand-ink to-brand-dark">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-3xl font-semibold italic text-brand-gold/30">
                {category ?? "Insight"}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <div className="flex flex-1 flex-col p-8">
          <div className="flex items-center gap-2">
            {category ? (
              <span className="inline-flex items-center rounded-full bg-brand-gold/10 px-3 py-1.5 text-xs font-medium text-brand-gold">
                {category}
              </span>
            ) : null}
            {publishedAt ? (
              <span className="text-xs text-brand-muted">
                {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(
                  publishedAt,
                )}
              </span>
            ) : null}
          </div>
          <h3 className="mt-2 text-2xl font-semibold text-on-paper">{title}</h3>
          <p className="mt-2 text-base text-brand-muted">{excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-gold">
            Read insight
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </Card>
    );
  }

  return (
    <Card href={`/insights/${slug}`} padded={false}>
      <div className={`flex h-full w-full flex-col sm:flex-row ${reverse ? "sm:flex-row-reverse" : ""}`}>
        <div
          className={`relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-gradient-to-br from-brand-dark via-brand-ink to-brand-dark sm:aspect-auto sm:h-auto sm:w-2/5 ${reverse ? "sm:bg-gradient-to-bl" : ""}`}
        >
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={title}
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 35vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-xl font-semibold italic text-brand-gold/30">
                {category ?? "Insight"}
              </span>
            </div>
          )}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent ${reverse ? "sm:bg-gradient-to-l sm:from-transparent sm:to-brand-dark/15" : "sm:bg-gradient-to-r sm:from-transparent sm:to-brand-dark/15"}`}
          />
        </div>
        <div className="flex flex-1 flex-col justify-center p-6">
          <div className="flex items-center gap-2">
            {category ? (
              <span className="inline-flex items-center rounded-full bg-brand-gold/10 px-2.5 py-1 text-[11px] font-medium text-brand-gold">
                {category}
              </span>
            ) : null}
            {publishedAt ? (
              <span className="text-xs text-brand-muted">
                {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(
                  publishedAt,
                )}
              </span>
            ) : null}
          </div>
          <h3 className="mt-2 text-lg font-semibold text-on-paper">{title}</h3>
          <p className="mt-2 text-sm text-brand-muted">{excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-gold">
            Read insight
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Card>
  );
}
