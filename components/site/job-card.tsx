import { ArrowRight, Briefcase } from "lucide-react";
import { Card } from "./card";

type JobCardProps = {
  slug: string;
  title: string;
  department?: string | null;
  location?: string | null;
  employmentType?: string | null;
  summary: string;
};

export function JobCard({ slug, title, department, location, employmentType, summary }: JobCardProps) {
  const secondaryMeta = [location, employmentType].filter(Boolean);

  return (
    <Card href={`/careers/${slug}`} className="justify-between">
      <div>
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold-dark transition-colors duration-300 group-hover:bg-brand-gold/15">
          <Briefcase className="h-5 w-5" aria-hidden="true" />
        </span>
        {department || secondaryMeta.length > 0 ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {department ? (
              <span className="inline-flex items-center rounded-full bg-brand-gold/10 px-2.5 py-1 text-[11px] font-medium text-brand-gold">
                {department}
              </span>
            ) : null}
            {secondaryMeta.length > 0 ? (
              <span className="text-xs text-brand-muted">
                {secondaryMeta.map((item, index) => (
                  <span key={item}>
                    {index > 0 ? <span className="mx-1.5 text-black/20">•</span> : null}
                    {item}
                  </span>
                ))}
              </span>
            ) : null}
          </div>
        ) : null}
        <h3 className="mt-3 text-lg font-semibold text-on-paper">{title}</h3>
        <p className="mt-2 text-sm text-brand-muted">{summary}</p>
      </div>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-gold">
        View role
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Card>
  );
}
