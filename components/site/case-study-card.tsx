import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card } from "./card";

type CaseStudyCardProps = {
  slug: string;
  title: string;
  clientName: string;
  industryTag?: string | null;
  summary: string;
  coverUrl?: string | null;
  featured?: boolean;
  reverse?: boolean;
};

export function CaseStudyCard({
  slug,
  title,
  clientName,
  industryTag,
  summary,
  coverUrl,
  featured = false,
  reverse = false,
}: CaseStudyCardProps) {
  // The featured tile spans two grid rows, so its cover image stacks above
  // the text (a tall card reads naturally top-to-bottom). Non-featured
  // cards sit in a single, short row — stacking would leave the text panel
  // starved for height, so the cover sits to the left instead, keeping the
  // card compact and (as a side effect) keeping the shared row height the
  // featured tile inherits from stretching too tall.
  if (featured) {
    return (
      <Card href={`/case-studies/${slug}`} padded={false}>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-brand-dark via-brand-ink to-brand-dark">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={title}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-3xl font-semibold italic text-brand-gold/30">{clientName}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
        <div className="flex flex-1 flex-col p-8">
          {industryTag ? (
            <span className="inline-flex w-fit items-center rounded-full bg-brand-gold/10 px-3 py-1.5 text-xs font-medium text-brand-gold">
              {industryTag}
            </span>
          ) : null}
          <h3 className="mt-2 text-2xl font-semibold text-on-paper">{title}</h3>
          <p className="mt-1 text-xs text-brand-muted">{clientName}</p>
          <p className="mt-3 text-base text-brand-muted">{summary}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-gold">
            Read case study
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </Card>
    );
  }

  return (
    <Card href={`/case-studies/${slug}`} padded={false}>
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
              <span className="font-display text-xl font-semibold italic text-brand-gold/30">{clientName}</span>
            </div>
          )}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent ${reverse ? "sm:bg-gradient-to-l sm:from-transparent sm:to-brand-dark/15" : "sm:bg-gradient-to-r sm:from-transparent sm:to-brand-dark/15"}`}
          />
        </div>
        <div className="flex flex-1 flex-col justify-center p-6">
          {industryTag ? (
            <span className="inline-flex w-fit items-center rounded-full bg-brand-gold/10 px-2.5 py-1 text-[11px] font-medium text-brand-gold">
              {industryTag}
            </span>
          ) : null}
          <h3 className="mt-2 text-lg font-semibold text-on-paper">{title}</h3>
          <p className="mt-1 text-xs text-brand-muted">{clientName}</p>
          <p className="mt-3 text-sm text-brand-muted">{summary}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-gold">
            Read case study
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Card>
  );
}
