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
};

export function CaseStudyCard({ slug, title, clientName, industryTag, summary, coverUrl }: CaseStudyCardProps) {
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
            <span className="text-3xl font-semibold italic text-brand-gold/30">{clientName}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
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
    </Card>
  );
}
