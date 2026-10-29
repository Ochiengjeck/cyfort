import Image from "next/image";
import { Card } from "./card";
import { AppIcon } from "./icons";

type IndustryCardTone = "dark" | "paper";

type IndustryCardProps = {
  name: string;
  blurb?: string | null;
  icon?: string | null;
  imageUrl?: string | null;
  featured?: boolean;
  tone?: IndustryCardTone;
};

export function IndustryCard({ name, blurb, icon, imageUrl, featured = false, tone = "dark" }: IndustryCardProps) {
  // The featured tile spans two grid rows, so its photo stacks above the
  // text (a tall card reads naturally top-to-bottom). Non-featured image
  // cards sit in a single, short row — stacking would leave the text panel
  // starved for height, so the photo sits to the left instead, keeping the
  // card compact and (as a side effect) keeping the shared row height the
  // featured tile inherits from stretching too tall.
  if (imageUrl && featured) {
    return (
      <Card padded={false} className="items-stretch" tone={tone}>
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/10 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col items-start p-8">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold transition-colors duration-300 group-hover:bg-brand-gold/15">
            <AppIcon name={icon} className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-xl font-semibold text-on-paper">{name}</h3>
          {blurb ? <p className="mt-2 text-base text-brand-muted">{blurb}</p> : null}
        </div>
      </Card>
    );
  }

  if (imageUrl) {
    return (
      <Card padded={false} tone={tone}>
        <div className="flex h-full w-full flex-col sm:flex-row">
          <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-auto sm:h-auto sm:w-2/5">
            <Image
              src={imageUrl}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 40vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-brand-dark/15" />
          </div>
          <div className="flex flex-1 flex-col items-start justify-center p-6">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold transition-colors duration-300 group-hover:bg-brand-gold/15">
              <AppIcon name={icon} className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold text-on-paper">{name}</h3>
            {blurb ? <p className="mt-2 text-sm text-brand-muted">{blurb}</p> : null}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="items-start" tone={tone}>
      <span
        className={`inline-flex items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold transition-colors duration-300 group-hover:bg-brand-gold/15 ${featured ? "h-14 w-14" : "h-11 w-11"}`}
      >
        <AppIcon name={icon} className={featured ? "h-6 w-6" : "h-5 w-5"} />
      </span>
      <h3 className={`mt-4 font-semibold text-on-paper ${featured ? "text-xl" : "text-base"}`}>{name}</h3>
      {blurb ? <p className={`mt-2 text-brand-muted ${featured ? "text-base" : "text-sm"}`}>{blurb}</p> : null}
    </Card>
  );
}
