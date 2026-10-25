import Image from "next/image";
import { ArrowRight, Briefcase } from "lucide-react";
import { Card } from "./card";

type JobCardProps = {
  slug: string;
  title: string;
  department?: string | null;
  location?: string | null;
  employmentType?: string | null;
  summary: string;
  coverUrl?: string | null;
  featured?: boolean;
  reverse?: boolean;
};

function JobMeta({ department, location, employmentType }: Pick<JobCardProps, "department" | "location" | "employmentType">) {
  const secondaryMeta = [location, employmentType].filter(Boolean);
  if (!department && secondaryMeta.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {department ? (
        <span className="inline-flex items-center rounded-full bg-brand-gold/10 px-2.5 py-1 text-[11px] font-medium text-brand-gold">
          {department}
        </span>
      ) : null}
      {secondaryMeta.length > 0 ? (
        <span className="text-xs text-brand-muted">
          {secondaryMeta.map((item, index) => (
            <span key={item}>
              {index > 0 ? <span className="mx-1.5 text-white/20">•</span> : null}
              {item}
            </span>
          ))}
        </span>
      ) : null}
    </div>
  );
}

export function JobCard({
  slug,
  title,
  department,
  location,
  employmentType,
  summary,
  coverUrl,
  featured = false,
  reverse = false,
}: JobCardProps) {
  // The featured tile spans two grid rows, so its cover image stacks above
  // the text (a tall card reads naturally top-to-bottom). Non-featured
  // cards sit in a single, short row — stacking would leave the text panel
  // starved for height, so the cover sits to the side instead, keeping the
  // card compact and (as a side effect) keeping the shared row height the
  // featured tile inherits from stretching too tall.
  if (coverUrl && featured) {
    return (
      <Card href={`/careers/${slug}`} padded={false}>
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={coverUrl}
            alt=""
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/10 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col p-8">
          <JobMeta department={department} location={location} employmentType={employmentType} />
          <h3 className="mt-3 text-2xl font-semibold text-on-paper">{title}</h3>
          <p className="mt-2 text-base text-brand-muted">{summary}</p>
          <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-brand-gold/30 px-4 py-2 text-sm font-medium text-brand-gold transition-colors group-hover:bg-brand-gold/10">
            View role
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </Card>
    );
  }

  if (coverUrl) {
    return (
      <Card href={`/careers/${slug}`} padded={false}>
        <div className={`flex h-full w-full flex-col sm:flex-row ${reverse ? "sm:flex-row-reverse" : ""}`}>
          <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden sm:aspect-auto sm:h-auto sm:w-2/5">
            <Image
              src={coverUrl}
              alt=""
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 35vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent ${reverse ? "sm:bg-gradient-to-l sm:from-transparent sm:to-brand-dark/15" : "sm:bg-gradient-to-r sm:from-transparent sm:to-brand-dark/15"}`}
            />
          </div>
          <div className="flex flex-1 flex-col justify-center p-6">
            <JobMeta department={department} location={location} employmentType={employmentType} />
            <h3 className="mt-3 text-lg font-semibold text-on-paper">{title}</h3>
            <p className="mt-2 text-sm text-brand-muted">{summary}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-gold">
              View role
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card href={`/careers/${slug}`} className="justify-between">
      <div>
        <span
          className={`inline-flex items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold transition-colors duration-300 group-hover:bg-brand-gold/15 ${featured ? "h-16 w-16" : "h-11 w-11"}`}
        >
          <Briefcase className={featured ? "h-7 w-7" : "h-5 w-5"} aria-hidden="true" />
        </span>
        <div className="mt-4">
          <JobMeta department={department} location={location} employmentType={employmentType} />
        </div>
        <h3 className={`mt-3 font-semibold text-on-paper ${featured ? "text-2xl" : "text-lg"}`}>{title}</h3>
        <p className={`mt-2 text-brand-muted ${featured ? "text-base" : "text-sm"}`}>{summary}</p>
      </div>
      {featured ? (
        <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-brand-gold/30 px-4 py-2 text-sm font-medium text-brand-gold transition-colors group-hover:bg-brand-gold/10">
          View role
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      ) : (
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-gold">
          View role
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      )}
    </Card>
  );
}
