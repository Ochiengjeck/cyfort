import { ArrowRight } from "lucide-react";
import { Card, CardTopGlow } from "./card";
import { AppIcon } from "./icons";

type ServiceCardTone = "dark" | "paper";

type ServiceCardProps = {
  slug: string;
  name: string;
  summary: string;
  icon?: string | null;
  featured?: boolean;
  tone?: ServiceCardTone;
};

export function ServiceCard({ slug, name, summary, icon, featured = false, tone = "dark" }: ServiceCardProps) {
  return (
    <Card href={`/services/${slug}`} className="justify-between" tone={tone}>
      <CardTopGlow />
      <div>
        <span
          className={`inline-flex items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold transition-colors duration-300 group-hover:bg-brand-gold/15 ${featured ? "h-16 w-16" : "h-11 w-11"}`}
        >
          <AppIcon name={icon} className={featured ? "h-7 w-7" : "h-5 w-5"} />
        </span>
        <h3 className={`mt-4 font-semibold text-on-paper ${featured ? "text-2xl" : "text-lg"}`}>{name}</h3>
        <p className={`mt-2 text-brand-muted ${featured ? "text-base" : "text-sm"}`}>{summary}</p>
      </div>
      {featured ? (
        <span className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-brand-gold/30 px-4 py-2 text-sm font-medium text-brand-gold transition-colors group-hover:bg-brand-gold/10">
          View services
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      ) : (
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-gold">
          View services
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      )}
    </Card>
  );
}
