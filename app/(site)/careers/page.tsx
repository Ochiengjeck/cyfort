import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { resolveMediaUrl } from "@/lib/media";
import { Section } from "@/components/site/section";
import { JobCard } from "@/components/site/job-card";
import { EmptyState } from "@/components/site/empty-state";
import { PageBanner } from "@/components/site/page-banner";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

// Bento span per item index — tiles a clean 4x2 block for the usual 4 open
// roles, zero remainder; literal class strings only.
const JOB_SPANS = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  "sm:col-span-2 lg:col-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
];

export async function generateMetadata() {
  return buildMetadata({
    title: "Careers",
    image: "/images/generated/banners/careers.jpg",
    path: "/careers",
  });
}

export default async function CareersPage() {
  await connection();

  const [jobs, settings] = await Promise.all([
    prisma.jobPosting.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }),
    prisma.siteSettings.findFirst(),
  ]);

  return (
    <>
      <PageBanner
        lead="Build the future of"
        emphasis="digital Africa with us"
        description="Join a team of advisors and engineers helping organizations across Africa build secure, resilient technology foundations."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        image={{ src: "/images/generated/banners/careers.jpg", objectPosition: "center 35%" }}
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          {jobs.length > 0 ? (
            <StaggerGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:auto-rows-[minmax(13rem,auto)] lg:grid-cols-4 grid-flow-dense">
              {await Promise.all(
                jobs.map(async (job, index) => (
                  <StaggerItem key={job.id} className={JOB_SPANS[index % JOB_SPANS.length]}>
                    <JobCard
                      slug={job.slug}
                      title={job.title}
                      department={job.department}
                      location={job.location}
                      employmentType={job.employmentType}
                      summary={job.summary}
                      coverUrl={await resolveMediaUrl(job.coverMediaId)}
                      featured={index === 0}
                      reverse={index % 2 === 1}
                    />
                  </StaggerItem>
                )),
              )}
            </StaggerGrid>
          ) : (
            <EmptyState
              heading="We don't have any open roles right now"
              message={`Check back soon, or send your CV to ${settings?.contactEmail ?? "info@cyfort.africa"}.`}
            />
          )}
        </div>
      </Section>
    </>
  );
}
