import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { resolveMediaUrl } from "@/lib/media";
import { Section } from "@/components/site/section";
import { CaseStudyCard } from "@/components/site/case-study-card";
import { EmptyState } from "@/components/site/empty-state";
import { PageBanner } from "@/components/site/page-banner";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata() {
  return buildMetadata({ title: "Case Studies" });
}

export default async function CaseStudiesPage() {
  await connection();
  const caseStudies = await prisma.caseStudy.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <PageBanner
        lead="Engagements,"
        emphasis="outcomes"
        image={{ src: "/images/generated/banner-advisory-tech.jpg", alt: "" }}
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          {caseStudies.length > 0 ? (
            <StaggerGrid className="grid gap-6 sm:grid-cols-2">
              {await Promise.all(
                caseStudies.map(async (item) => (
                  <StaggerItem key={item.id}>
                    <CaseStudyCard
                      slug={item.slug}
                      title={item.title}
                      clientName={item.clientName}
                      industryTag={item.industryTag}
                      summary={item.summary}
                      coverUrl={await resolveMediaUrl(item.coverMediaId)}
                    />
                  </StaggerItem>
                )),
              )}
            </StaggerGrid>
          ) : (
            <EmptyState
              heading="Client stories are on the way"
              message="We're putting together case studies from our engagements — check back soon."
            />
          )}
        </div>
      </Section>
    </>
  );
}
