import Image from "next/image";
import { Section } from "./section";
import { Heading } from "./heading";
import { DotGrid } from "./decorative/dot-grid";
import { MeshBlob } from "./decorative/mesh-blob";
import { Reveal } from "./motion/reveal";

type PageBannerProps = {
  lead: string;
  emphasis: string;
  description?: string;
  meta?: React.ReactNode;
  image?: { src: string; alt: string };
};

/**
 * Shared banner block for every inner route — a gold accent rule and a
 * big heading, optionally backed by a generated photo, always layered
 * with a drifting mesh-gradient blob + dot texture for depth even when
 * there's no photo (e.g. Contact).
 */
export function PageBanner({ lead, emphasis, description, meta, image }: PageBannerProps) {
  return (
    <Section
      variant="dark"
      className="relative flex min-h-[48vh] flex-col items-center justify-center px-6 pb-20 pt-32 sm:pb-24 sm:pt-36"
    >
      {image ? (
        <>
          <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover opacity-35" priority={false} />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/80 to-brand-dark" />
        </>
      ) : (
        <DotGrid className="absolute inset-0 opacity-[0.08]" />
      )}
      <MeshBlob tone="gold" className="absolute inset-0" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          {meta}
          <span
            aria-hidden="true"
            className="mb-5 block h-[3px] w-12 rounded-full bg-gradient-to-r from-brand-gold-dark via-brand-gold to-brand-gold-light"
          />
          <Heading as="h1" tier="banner" tone="dark" lead={lead} emphasis={emphasis} />
          {description ? (
            <p className="mx-auto mt-5 max-w-xl text-base text-on-dark/70">{description}</p>
          ) : null}
        </Reveal>
      </div>
    </Section>
  );
}
