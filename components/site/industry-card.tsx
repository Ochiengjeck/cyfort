import { Card } from "./card";
import { AppIcon } from "./icons";

// Industries have no admin-editable icon field yet — mapped by name here,
// same spirit as the Differentiators/Promise order-based icon map.
const ICON_BY_NAME: Record<string, string> = {
  "Financial Services": "landmark",
  "NGOs & Development Partners": "heart-handshake",
  "Professional Services": "briefcase",
  Government: "building",
  "Logistics & Supply Chain": "truck",
  Healthcare: "heart-pulse",
  Manufacturing: "factory",
  Education: "graduation-cap",
  "Retail & Distribution": "store",
  Hospitality: "hotel",
};

type IndustryCardProps = {
  name: string;
  blurb?: string | null;
};

export function IndustryCard({ name, blurb }: IndustryCardProps) {
  return (
    <Card className="items-start">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold-dark transition-colors duration-300 group-hover:bg-brand-gold/15">
        <AppIcon name={ICON_BY_NAME[name]} className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-on-paper">{name}</h3>
      {blurb ? <p className="mt-2 text-sm text-brand-muted">{blurb}</p> : null}
    </Card>
  );
}
