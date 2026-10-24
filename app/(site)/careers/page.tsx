import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/site/section";
import { JobCard } from "@/components/site/job-card";
import { EmptyState } from "@/components/site/empty-state";
import { PageBanner } from "@/components/site/page-banner";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata() {
  return buildMetadata({ title: "Careers" });
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
        image={{ src: "/images/generated/banner-people-careers.jpg", alt: "" }}
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          {jobs.length > 0 ? (
            <StaggerGrid className="grid gap-5 sm:grid-cols-2">
              {jobs.map((job) => (
                <StaggerItem key={job.id}>
                  <JobCard
                    slug={job.slug}
                    title={job.title}
                    department={job.department}
                    location={job.location}
                    employmentType={job.employmentType}
                    summary={job.summary}
                  />
                </StaggerItem>
              ))}
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
