import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/site/section";
import { IndustryCard } from "@/components/site/industry-card";
import { PageBanner } from "@/components/site/page-banner";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata() {
  return buildMetadata({ title: "Industries" });
}

export default async function IndustriesPage() {
  await connection();
  const industries = await prisma.industry.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <PageBanner
        lead="Advisory shaped by"
        emphasis="your sector"
        description="From regulated financial institutions to donor-funded humanitarian programs, our engagements are grounded in the realities of each sector we serve."
        image={{ src: "/images/generated/banner-advisory-tech.jpg", alt: "" }}
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <StaggerGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <StaggerItem key={industry.id}>
                <IndustryCard name={industry.name} blurb={industry.blurb} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </Section>
    </>
  );
}
