import { ArrowRight } from "lucide-react";
import { Card, CardTopGlow } from "./card";
import { AppIcon } from "./icons";

type ServiceCardProps = {
  slug: string;
  name: string;
  summary: string;
  icon?: string | null;
};

export function ServiceCard({ slug, name, summary, icon }: ServiceCardProps) {
  return (
    <Card href={`/services/${slug}`} className="justify-between shadow-sm">
      <CardTopGlow />
      <div>
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold-dark transition-colors duration-300 group-hover:bg-brand-gold/15">
          <AppIcon name={icon} className="h-5 w-5" />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-on-paper">{name}</h3>
        <p className="mt-2 text-sm text-brand-muted">{summary}</p>
      </div>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-gold">
        View services
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Card>
  );
}
