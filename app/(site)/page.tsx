import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/site/section";
import { Heading } from "@/components/site/heading";
import { BadgePill } from "@/components/site/badge-pill";
import { QuoteCard } from "@/components/site/quote-card";
import { ServiceCard } from "@/components/site/service-card";
import { IndustryCard } from "@/components/site/industry-card";
import { IconFeatureCard, DIFFERENTIATOR_ICONS } from "@/components/site/icon-feature-card";
import { PromiseTimeline, PROMISE_ICONS } from "@/components/site/promise-timeline";
import { Eyebrow } from "@/components/site/eyebrow";
import { Button } from "@/components/site/button";
import { AppIcon } from "@/components/site/icons";
import { DotGrid } from "@/components/site/decorative/dot-grid";
import { Marquee } from "@/components/site/decorative/marquee";
import { RadarChart } from "@/components/site/decorative/radar-chart";
import { Reveal } from "@/components/site/motion/reveal";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata() {
  return buildMetadata({ title: "Home" });
}

export default async function HomePage() {
  await connection();

  const [hero, about, differentiators, services, industries, promises] = await Promise.all([
    prisma.homeHero.findFirst(),
    prisma.aboutContent.findFirst(),
    prisma.differentiator.findMany({ orderBy: { order: "asc" } }),
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.industry.findMany({ orderBy: { order: "asc" } }),
    prisma.promiseItem.findMany({ orderBy: { order: "asc" } }),
  ]);

  const whoWeAreTeaser = about?.whoWeAreBody.split("\n\n")[0];

  const marqueeItems = [...services.map((service) => service.name), ...industries.map((industry) => industry.name)];

  const heroStats = [
    {
      icon: "atom",
      value: `${services.length}+ Service Lines`,
      body: "Pioneering digital advisory & cybersecurity",
    },
    {
      icon: "globe",
      value: `${industries.length}+ Industries Served`,
      body: "Trusted across finance, government, and healthcare",
    },
    {
      icon: "compass",
      value: "Africa-Wide Focus",
      body: "Powering resilience across multiple nations",
    },
  ];

  return (
    <>
      {/* Hero */}
      <Section variant="dark" className="relative flex h-dvh min-h-dvh flex-col overflow-hidden">
        {/* Reserves space for the fixed navbar so the flex-centered content
            below is centered within the visible viewport, not the full
            dvh box (which would otherwise bias content upward). Matches the
            navbar's taller unscrolled height on desktop (md:h-24) so hero
            content isn't covered before the user scrolls. */}
        <div className="h-16 shrink-0 md:h-24" aria-hidden="true" />

        <Image
          src="/images/generated/hero-africa-network.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "70% center" }}
        />
        {/* The source image already fades dark on its left edge — this
            gradient just guarantees legible text at any crop/viewport. */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/75 to-brand-dark/10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-dark to-transparent" />

        <div className="relative flex flex-1 items-center px-6 lg:px-12">
          <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
            <Reveal y={28}>
              <BadgePill>{hero?.eyebrow ?? "Technology · Advisory · Cybersecurity"}</BadgePill>
              <Heading
                as="h1"
                tier="hero"
                tone="dark"
                lead={hero?.headlineLead ?? "Securing"}
                emphasis={hero?.headlineEmphasis ?? "Africa's Digital Future"}
                className="mt-6"
              />
              <p className="hero-paragraph mt-6 max-w-xl text-lg leading-relaxed text-on-dark/80">
                We empower organizations to navigate the cyber landscape, build resilient digital
                ecosystems, and drive sustainable growth across the continent.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={hero?.primaryCtaHref ?? "/services"}>
                  {hero?.primaryCtaLabel ?? "Explore Our Services"}
                </Button>
                <Button href={hero?.secondaryCtaHref ?? "/case-studies"} variant="outline">
                  {hero?.secondaryCtaLabel ?? "Discover Our Impact"}
                </Button>
              </div>
              <div className="mt-12 flex items-center gap-1.5 text-sm text-on-dark/50">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
                Scroll to explore
              </div>
            </Reveal>

            <Reveal delay={0.15} y={28} className="hidden lg:block">
              <div className="relative mx-auto w-full max-w-xs">
                <div className="relative overflow-hidden rounded-2xl border border-brand-gold/20 bg-brand-dark/70 p-5 shadow-2xl backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Cyber Resilience</p>
                  <RadarChart className="mx-auto mt-3 h-36 w-36" />
                  <p className="mt-2 text-xl font-semibold text-on-dark">
                    24/7 <span className="text-sm font-normal text-on-dark/50">/ Threat Monitoring</span>
                  </p>
                </div>

                <div
                  aria-hidden="true"
                  className="absolute -left-6 top-1/2 h-16 w-6 -translate-y-1/2 rounded-bl-2xl border-b-2 border-l-2 border-brand-gold/40"
                />

                <div className="relative mt-6 ml-6 overflow-hidden rounded-2xl border border-white/10 bg-brand-dark/80 p-5 shadow-2xl backdrop-blur-md">
                  <div className="flex flex-col gap-5">
                    {heroStats.map((stat) => (
                      <div key={stat.value} className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
                          <AppIcon name={stat.icon} className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-on-dark">{stat.value}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-on-dark/50">{stat.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {marqueeItems.length > 0 ? (
          <div className="relative border-t border-white/10 py-5">
            <Marquee items={marqueeItems} />
          </div>
        ) : null}
      </Section>

      {/* Who We Are teaser */}
      {whoWeAreTeaser ? (
        <Section variant="paperAlt" className="px-6 py-24">
          <div className="mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-[1fr_1.4fr]">
            <Reveal className="relative aspect-square overflow-hidden rounded-2xl bg-black">
              <Image
                src="/images/brand/cyfort-logo-plate.png"
                alt="CyFort Technologies Limited"
                fill
                sizes="(min-width: 640px) 40vw, 90vw"
                className="object-contain p-10"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Heading as="h2" tier="section" tone="dark" lead="Who" emphasis="We Are" />
              <p className="mt-5 text-lg leading-relaxed text-on-paper">{whoWeAreTeaser}</p>
              <Link href="/about" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-gold">
                Read more about CyFort →
              </Link>
            </Reveal>
          </div>
        </Section>
      ) : null}

      {/* Differentiators */}
      {differentiators.length > 0 ? (
        <Section variant="paper" className="px-6 py-24">
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

      {/* Services */}
      {services.length > 0 ? (
        <Section variant="paperAlt" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Heading lead="Our Service" emphasis="Portfolio" tone="dark" />
            </Reveal>
            <StaggerGrid className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <StaggerItem key={service.id}>
                  <ServiceCard slug={service.slug} name={service.name} summary={service.summary} icon={service.icon} />
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </Section>
      ) : null}

      {/* Industries */}
      {industries.length > 0 ? (
        <Section variant="paper" className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal className="text-center">
              <Heading lead="Industries" emphasis="We Serve" tone="dark" />
            </Reveal>
            <StaggerGrid className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry) => (
                <StaggerItem key={industry.id}>
                  <IndustryCard name={industry.name} blurb={industry.blurb} />
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </Section>
      ) : null}

      {/* Our Promise */}
      {promises.length > 0 ? (
        <Section variant="dark" className="relative px-6 py-24">
          <DotGrid className="absolute inset-0 opacity-[0.08]" />
          <div className="relative mx-auto max-w-5xl">
            <Reveal>
              <Heading lead="Our" emphasis="Promise" tone="dark" />
            </Reveal>
            <Reveal delay={0.1} className="mt-14">
              <PromiseTimeline
                items={promises.map((item, index) => ({
                  icon: PROMISE_ICONS[index % PROMISE_ICONS.length],
                  title: item.title,
                  body: item.body,
                }))}
              />
            </Reveal>
          </div>
        </Section>
      ) : null}

      {/* Closing CTA */}
      {about?.closingQuote ? (
        <Section variant="paperAlt" className="px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              {about.closingEyebrow ? <Eyebrow className="text-center">{about.closingEyebrow}</Eyebrow> : null}
              {about.closingHeading ? (
                <h2 className="mt-3 text-center font-display text-3xl font-semibold text-on-paper sm:text-4xl">
                  {about.closingHeading}
                </h2>
              ) : null}
              <div className="mt-10">
                <QuoteCard quote={about.closingQuote} />
              </div>
            </Reveal>
          </div>
        </Section>
      ) : null}
    </>
  );
}
