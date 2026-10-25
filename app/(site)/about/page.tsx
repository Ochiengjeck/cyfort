import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/site/section";
import { Eyebrow } from "@/components/site/eyebrow";
import { Heading } from "@/components/site/heading";
import { IconFeatureCard, DIFFERENTIATOR_ICONS } from "@/components/site/icon-feature-card";
import { PageBanner } from "@/components/site/page-banner";
import { Card } from "@/components/site/card";
import { AppIcon } from "@/components/site/icons";
import { Reveal } from "@/components/site/motion/reveal";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";
import { MeshBlob } from "@/components/site/decorative/mesh-blob";

export const instant = false;

export async function generateMetadata() {
  return buildMetadata({ title: "About Us" });
}

export default async function AboutPage() {
  await connection();

  const [about, differentiators] = await Promise.all([
    prisma.aboutContent.findFirst(),
    prisma.differentiator.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!about) return null;

  const paragraphs = about.whoWeAreBody.split("\n\n").filter(Boolean);
  const closingParagraphs = about.closingBody.split("\n\n").filter(Boolean);

  return (
    <>
      <PageBanner
        lead="Who"
        emphasis="We Are"
        description="A technology advisory and cybersecurity consulting firm partnering with organizations to build secure, resilient, and future-ready digital environments."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        cta={{ label: "Talk to Us", href: "/contact" }}
        image={{ src: "/images/generated/banners/about.jpg", objectPosition: "center 35%" }}
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <Reveal className="mx-auto max-w-3xl">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-5 text-base leading-relaxed text-brand-muted">
              {paragraph}
            </p>
          ))}

          <blockquote className="mt-10 border-l-2 border-brand-gold pl-5 font-display text-lg font-medium italic text-on-paper">
            “{about.pullQuote}”
          </blockquote>
        </Reveal>
      </Section>

      <Section variant="paper" className="px-6 py-20">
        <StaggerGrid className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          <StaggerItem>
            <Card className="h-full">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
                <AppIcon name="compass" className="h-5 w-5" />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-gold">Our Vision</p>
              <p className="mt-2 text-base leading-relaxed text-on-paper">{about.vision}</p>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card className="h-full">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
                <AppIcon name="target" className="h-5 w-5" />
              </span>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-gold">Our Mission</p>
              <p className="mt-2 text-base leading-relaxed text-on-paper">{about.mission}</p>
            </Card>
          </StaggerItem>
        </StaggerGrid>
      </Section>

      <Section variant="paperAlt" className="relative px-6 py-20">
        <MeshBlob tone="gold" className="absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <Heading lead="What We" emphasis="Believe" tone="dark" />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-muted">{about.approachIntro}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 flex flex-col overflow-hidden rounded-2xl border border-white/10 sm:flex-row sm:items-stretch">
            <div className="flex flex-1 flex-col justify-center bg-brand-dark px-8 py-6">
              <p className="text-sm font-semibold text-on-dark">{about.comparisonLeftLabel}</p>
              <p className="mt-1 text-sm text-on-dark/60">{about.comparisonLeftText}</p>
            </div>
            <div className="flex items-center justify-center bg-brand-ink px-4 py-3 sm:py-0">
              <span className="font-display text-sm font-semibold italic text-brand-gold">vs</span>
            </div>
            <div
              className="flex flex-1 flex-col justify-center px-8 py-6"
              style={{
                background: "linear-gradient(135deg, var(--color-brand-gold-dark), var(--color-brand-gold))",
              }}
            >
              <p className="text-sm font-semibold text-on-gold">{about.comparisonRightLabel}</p>
              <p className="mt-1 text-sm text-on-gold/80">{about.comparisonRightText}</p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-brand-muted">{about.approachBody}</p>
          </Reveal>
        </div>
      </Section>

      {differentiators.length > 0 ? (
        <Section variant="paper" className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <Heading lead="What Makes" emphasis="CYFORT Different" tone="dark" />
            </Reveal>
            <StaggerGrid className="mt-12 grid gap-5 sm:grid-cols-2">
              {differentiators.map((item, index) => (
                <StaggerItem key={item.id}>
                  <IconFeatureCard
                    icon={DIFFERENTIATOR_ICONS[index % DIFFERENTIATOR_ICONS.length]}
                    title={item.title}
                    body={item.body}
                    tone="dark"
                  />
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </Section>
      ) : null}

      <Section variant="dark" className="px-6 py-24">
        <MeshBlob tone="dark" className="absolute inset-0" />
        <Reveal className="relative mx-auto max-w-3xl text-center">
          {about.closingEyebrow ? <Eyebrow className="justify-center">{about.closingEyebrow}</Eyebrow> : null}
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{about.closingHeading}</h2>
          <div className="mt-6">
            {closingParagraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 text-base leading-relaxed text-on-dark/70">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
