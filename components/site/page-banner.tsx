import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Section } from "./section";
import { Heading } from "./heading";
import { Button } from "./button";
import { Reveal } from "./motion/reveal";

type Crumb = { label: string; href?: string };

type PageBannerImage = { src: string; objectPosition?: string };

type PageBannerProps = {
  lead: string;
  emphasis: string;
  description?: string;
  meta?: React.ReactNode;
  breadcrumb: Crumb[];
  cta?: { label: string; href: string };
  image?: PageBannerImage;
};

const DEFAULT_IMAGE: PageBannerImage = {
  src: "/images/generated/banner-shield.jpg",
  objectPosition: "75% center",
};

/**
 * Shared banner for every inner route (never the home page). Each page
 * passes its own background photo via `image`; pages that don't (currently
 * just Terms/Privacy) fall back to the original shared illustration.
 */
export function PageBanner({ lead, emphasis, description, meta, breadcrumb, cta, image = DEFAULT_IMAGE }: PageBannerProps) {
  return (
    <Section
      variant="dark"
      className="relative flex min-h-[48vh] flex-col justify-center overflow-hidden px-6 pb-16 pt-32 sm:min-h-[54vh] sm:pb-20 sm:pt-36"
    >
      <Image
        src={image.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: image.objectPosition ?? "center" }}
      />
      {/* A uniform wash plus a left-to-right gradient — unlike the original
          single curated photo, per-page photography isn't guaranteed to be
          dark on the left, so the wash carries the legibility guarantee on
          its own rather than leaning on the source image. */}
      <div className="absolute inset-0 bg-brand-dark/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/75 to-brand-dark/25" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-dark to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal>
          <nav aria-label="Breadcrumb">
            <ol className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-on-dark/60 backdrop-blur-sm">
              {breadcrumb.map((crumb, index) => (
                <li key={crumb.label} className="inline-flex items-center gap-1.5">
                  {index > 0 ? <ChevronRight className="h-3 w-3 text-on-dark/30" aria-hidden="true" /> : null}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-brand-gold">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-on-dark/80">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {meta ? <div className="mt-5 flex flex-wrap items-center gap-2">{meta}</div> : null}

          <Heading as="h1" tier="banner" tone="dark" lead={lead} emphasis={emphasis} className="mt-5" />
          {description ? <p className="mt-5 max-w-xl text-base text-on-dark/70">{description}</p> : null}

          {cta ? (
            <div className="mt-8">
              <Button href={cta.href}>{cta.label}</Button>
            </div>
          ) : null}
        </Reveal>
      </div>
    </Section>
  );
}
