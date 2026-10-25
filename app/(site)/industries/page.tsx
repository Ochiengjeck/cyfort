import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { resolveMediaUrl } from "@/lib/media";
import { Section } from "@/components/site/section";
import { IndustryCard } from "@/components/site/industry-card";
import { PageBanner } from "@/components/site/page-banner";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

// Bento span per item index — literal class strings only, indexed by
// position via modulo so an admin adding more industries never breaks it.
// Tiles a clean 6-wide block for the usual 10 industries: featured hero
// (3x2) + two 3-wide tiles complete rows 1-2; two rows of three 2-wide
// tiles complete rows 3-4; a full-width closer completes row 5 — zero
// leftover cells at sm: or lg:, unlike a flat col-span-2 repeat which
// leaves a trailing gap when 7 tiles don't divide evenly into 6 columns.
const INDUSTRY_SPANS = [
  "sm:col-span-2 lg:col-span-3 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "sm:col-span-2 lg:col-span-6",
];

export async function generateMetadata() {
  return buildMetadata({
    title: "Industries",
    image: "/images/generated/banners/industries.jpg",
    path: "/industries",
  });
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
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        image={{ src: "/images/generated/banners/industries.jpg", objectPosition: "70% 30%" }}
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <StaggerGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:auto-rows-[minmax(11rem,auto)] lg:grid-cols-6 grid-flow-dense">
            {await Promise.all(
              industries.map(async (industry, index) => (
                <StaggerItem key={industry.id} className={INDUSTRY_SPANS[index % INDUSTRY_SPANS.length]}>
                  <IndustryCard
                    name={industry.name}
                    blurb={industry.blurb}
                    icon={industry.icon}
                    imageUrl={await resolveMediaUrl(industry.imageMediaId)}
                    featured={index === 0}
                  />
                </StaggerItem>
              )),
            )}
          </StaggerGrid>
        </div>
      </Section>
    </>
  );
}
