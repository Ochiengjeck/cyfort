import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { resolveMediaUrl } from "@/lib/media";
import { Section } from "@/components/site/section";
import { TeamCard } from "@/components/site/team-card";
import { EmptyState } from "@/components/site/empty-state";
import { PageBanner } from "@/components/site/page-banner";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata() {
  return buildMetadata({ title: "Our Team" });
}

export default async function TeamPage() {
  await connection();
  const team = await prisma.teamMember.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <PageBanner
        lead="The people behind"
        emphasis="CYFORT"
        image={{ src: "/images/generated/banner-people-careers.jpg", alt: "" }}
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          {team.length > 0 ? (
            <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {await Promise.all(
                team.map(async (member) => (
                  <StaggerItem key={member.id}>
                    <TeamCard
                      name={member.name}
                      role={member.role}
                      bio={member.bio}
                      photoUrl={await resolveMediaUrl(member.photoMediaId)}
                      linkedinUrl={member.linkedinUrl}
                    />
                  </StaggerItem>
                )),
              )}
            </StaggerGrid>
          ) : (
            <EmptyState
              heading="Our leadership profiles are being finalized"
              message="Check back soon to meet the team behind CyFort's engagements."
            />
          )}
        </div>
      </Section>
    </>
  );
}
