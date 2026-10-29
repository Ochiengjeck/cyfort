import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/site/section";
import { Heading } from "@/components/site/heading";
import { IndustryCard } from "@/components/site/industry-card";
import { IndustryFocusCard } from "@/components/site/industry-focus-card";
import { PageBanner } from "@/components/site/page-banner";
import { Reveal } from "@/components/site/motion/reveal";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata() {
  return buildMetadata({
    title: "Industries",
    image: "/images/generated/banners/industries.jpg",
    path: "/industries",
  });
}

export default async function IndustriesPage() {
  await connection();
  const industries = await prisma.industry.findMany({
    orderBy: { order: "asc" },
    include: { startService: { select: { slug: true, name: true } } },
  });

  const focusIndustries = industries.filter((industry) => industry.featured);
  const otherIndustries = industries.filter((industry) => !industry.featured);

  return (
    <>
      <PageBanner
        lead="Where regulation, sensitive"
        emphasis="data and scrutiny meet"
        description="We go deepest in four sectors, and bring the same discipline to every organisation we serve."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        image={{ src: "/images/generated/banners/industries.jpg", objectPosition: "70% 30%" }}
      />

      {focusIndustries.length > 0 ? (
        <Section variant="dark" className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold">Focus sectors</p>
            </Reveal>
            <StaggerGrid className="mt-6 grid gap-5 sm:grid-cols-2">
              {focusIndustries.map((industry, index) => (
                <StaggerItem key={industry.id}>
                  <IndustryFocusCard
                    index={index + 1}
                    name={industry.name}
                    drivingText={industry.drivingText}
                    startText={industry.startText}
                    startServiceSlug={industry.startService?.slug}
                    startServiceName={industry.startService?.name}
                  />
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </Section>
      ) : null}

      {otherIndustries.length > 0 ? (
        <Section variant="paperAlt" className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <Heading lead="We also" emphasis="serve" tone="dark" />
            </Reveal>
            <StaggerGrid className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherIndustries.map((industry) => (
                <StaggerItem key={industry.id}>
                  <IndustryCard name={industry.name} blurb={industry.blurb} tone="paper" />
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </Section>
      ) : null}
    </>
  );
}
