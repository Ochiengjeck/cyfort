import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/site/section";
import { Heading } from "@/components/site/heading";
import { BadgePill } from "@/components/site/badge-pill";
import { KeyServicesSection } from "@/components/site/key-services-section";
import { CapabilitiesGrid } from "@/components/site/capabilities-grid";
import { IconFeatureCard, DIFFERENTIATOR_ICONS } from "@/components/site/icon-feature-card";
import { PromiseTimeline, PROMISE_ICONS } from "@/components/site/promise-timeline";
import { Button } from "@/components/site/button";
import { AppIcon } from "@/components/site/icons";
import { DotGrid } from "@/components/site/decorative/dot-grid";
import { Marquee } from "@/components/site/decorative/marquee";
import { RadarChart } from "@/components/site/decorative/radar-chart";
import { Reveal } from "@/components/site/motion/reveal";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata() {
  return buildMetadata({
    title: "Home",
    image: "/images/generated/hero-africa-network.jpg",
    path: "/",
  });
}

export default async function HomePage() {
  await connection();

  const [hero, about, differentiators, services, industries, promises] = await Promise.all([
    prisma.homeHero.findFirst(),
    prisma.aboutContent.findFirst(),
    prisma.differentiator.findMany({ orderBy: { order: "asc" } }),
    prisma.service.findMany({ orderBy: { order: "asc" }, include: { items: true } }),
    prisma.industry.findMany({ orderBy: { order: "asc" } }),
    prisma.promiseItem.findMany({ orderBy: { order: "asc" } }),
  ]);

  const featuredServices = services.filter((service) => service.featured);

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
                <Button href={hero?.primaryCtaHref ?? "/contact"}>
                  {hero?.primaryCtaLabel ?? "Book a Data Protection Health Check"}
                </Button>
                <Button href={hero?.secondaryCtaHref ?? "/services"} variant="outline">
                  {hero?.secondaryCtaLabel ?? "Explore our services"}
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
                    tone="paper"
                  />
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </Section>
      ) : null}

      {/* Key services — the four packaged entry points */}
      {featuredServices.length > 0 ? <KeyServicesSection services={featuredServices} /> : null}

      {/* Full capabilities — all 9 service lines grouped by pillar */}
      {services.length > 0 ? <CapabilitiesGrid services={services} /> : null}

      {/* Industries — simple pill list */}
      {industries.length > 0 ? (
        <Section variant="paper" className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal className="grid items-center gap-10 sm:grid-cols-[1fr_1.1fr]">
              <div>
                <Heading lead="Industries" emphasis="We Serve" tone="dark" />
                <p className="mt-5 text-base leading-relaxed text-brand-muted">
                  Deepest experience where regulation, sensitive data and donor scrutiny meet.
                </p>
                <Link
                  href="/industries"
                  className="mt-5 inline-flex items-center gap-1 rounded-full border border-border-on-paper px-4 py-2 text-sm font-medium text-on-paper transition-colors hover:border-brand-gold hover:text-brand-gold"
                >
                  See how we help your sector
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {industries.map((industry) => (
                  <span
                    key={industry.id}
                    className="inline-flex items-center gap-2 rounded-full border border-border-on-paper bg-brand-paper-alt px-4 py-2 text-sm text-on-paper"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
                    {industry.name}
                  </span>
                ))}
              </div>
            </Reveal>
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
      {about?.closingHeading ? (
        <Section variant="paperAlt" className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal
              className="relative overflow-hidden rounded-2xl px-8 py-10 sm:px-12 sm:py-12"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-brand-gold-dark), var(--color-brand-gold), var(--color-brand-gold-light))",
              }}
            >
              <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                  {about.closingEyebrow ? (
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-dark/60">
                      {about.closingEyebrow}
                    </p>
                  ) : null}
                  <h2 className="mt-3 font-display text-3xl font-semibold text-brand-dark sm:text-4xl">
                    {about.closingHeading}
                  </h2>
                  {about.closingBody ? (
                    <p className="mt-4 text-base leading-relaxed text-brand-dark/80">
                      {about.closingBody.split("\n\n")[0]}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button href={about.closingPrimaryCtaHref} variant="dark">
                    {about.closingPrimaryCtaLabel}
                  </Button>
                  <Link
                    href={about.closingSecondaryCtaHref}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-dark/30 px-6 py-3 text-sm font-semibold text-brand-dark transition-all duration-300 hover:border-brand-dark hover:-translate-y-0.5"
                  >
                    {about.closingSecondaryCtaLabel}
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      ) : null}
    </>
  );
}
