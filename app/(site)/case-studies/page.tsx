import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { resolveMediaUrl } from "@/lib/media";
import { Section } from "@/components/site/section";
import { CaseStudyCard } from "@/components/site/case-study-card";
import { EmptyState } from "@/components/site/empty-state";
import { PageBanner } from "@/components/site/page-banner";
import { Reveal } from "@/components/site/motion/reveal";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata() {
  return buildMetadata({
    title: "Case Studies",
    image: "/images/generated/banners/case-studies.jpg",
    path: "/case-studies",
  });
}

export default async function CaseStudiesPage() {
  await connection();
  const caseStudies = await prisma.caseStudy.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  const [lead, ...rest] = caseStudies;

  return (
    <>
      <PageBanner
        lead="Engagements,"
        emphasis="outcomes"
        description="Real engagements, real results — a look at how we've helped organizations strengthen their technology and security posture."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Case Studies" }]}
        image={{ src: "/images/generated/banners/case-studies.jpg", objectPosition: "center 30%" }}
      />

      <Section variant="paperAlt" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          {lead ? (
            <>
              {/* Lead story — the most recent engagement, read as a single
                  editorial feature rather than one tile among many. */}
              <Reveal>
                <CaseStudyCard
                  slug={lead.slug}
                  title={lead.title}
                  clientName={lead.clientName}
                  industryTag={lead.industryTag}
                  summary={lead.summary}
                  coverUrl={await resolveMediaUrl(lead.coverMediaId)}
                  featured
                />
              </Reveal>

              {rest.length > 0 ? (
                <StaggerGrid className="mt-14 flex flex-col gap-6">
                  {await Promise.all(
                    rest.map(async (item, index) => (
                      <StaggerItem key={item.id}>
                        <CaseStudyCard
                          slug={item.slug}
                          title={item.title}
                          clientName={item.clientName}
                          industryTag={item.industryTag}
                          summary={item.summary}
                          coverUrl={await resolveMediaUrl(item.coverMediaId)}
                          reverse={index % 2 === 1}
                        />
                      </StaggerItem>
                    )),
                  )}
                </StaggerGrid>
              ) : null}
            </>
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
