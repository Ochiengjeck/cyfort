import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import type { TeamMember } from "@prisma/client";
import { buildMetadata } from "@/lib/metadata";
import { resolveMediaUrl } from "@/lib/media";
import { Section } from "@/components/site/section";
import { TeamCard } from "@/components/site/team-card";
import { EmptyState } from "@/components/site/empty-state";
import { PageBanner } from "@/components/site/page-banner";
import { Reveal } from "@/components/site/motion/reveal";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata() {
  return buildMetadata({ title: "Our Team" });
}

function collectDescendants(rootId: string, byParent: Map<string, TeamMember[]>): TeamMember[] {
  const direct = byParent.get(rootId) ?? [];
  return direct.flatMap((child) => [child, ...collectDescendants(child.id, byParent)]);
}

export default async function TeamPage() {
  await connection();
  const team = await prisma.teamMember.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  const teamIds = new Set(team.map((member) => member.id));
  const byParent = new Map<string, TeamMember[]>();
  for (const member of team) {
    if (!member.reportsToId || !teamIds.has(member.reportsToId)) continue;
    const siblings = byParent.get(member.reportsToId) ?? [];
    siblings.push(member);
    byParent.set(member.reportsToId, siblings);
  }
  // A "root" is anyone with no reportsToId, or whose manager isn't in the
  // published list (e.g. the manager is unpublished) — treated as the top
  // of its own branch rather than silently dropped from the chart.
  const roots = team.filter((member) => !member.reportsToId || !teamIds.has(member.reportsToId));

  return (
    <>
      <PageBanner
        lead="The people behind"
        emphasis="CYFORT"
        description="A multidisciplinary team of advisors, engineers, and risk specialists working across Africa's most regulated industries."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Team" }]}
        image={{ src: "/images/generated/banners/team.jpg", objectPosition: "center 40%" }}
      />

      <Section variant="paperAlt" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          {team.length > 0 ? (
            <div className="flex flex-col gap-24">
              {await Promise.all(
                roots.map(async (root) => {
                  const reports = collectDescendants(root.id, byParent);

                  return (
                    <div key={root.id} className="flex flex-col items-center">
                      <Reveal className="flex flex-col items-center">
                        <TeamCard
                          name={root.name}
                          role={root.role}
                          bio={root.bio}
                          photoUrl={await resolveMediaUrl(root.photoMediaId)}
                          linkedinUrl={root.linkedinUrl}
                          email={root.email}
                          featured
                        />
                      </Reveal>

                      {reports.length > 0 ? (
                        <>
                          {/* Org-chart connectors — a clean tree reads well
                              in one row at lg:, but wraps awkwardly across
                              rows below it, so the lines only appear at
                              lg: and a plain labeled list takes over on
                              smaller screens. */}
                          <div className="hidden lg:block">
                            <div className="mx-auto h-10 w-px bg-white/15" aria-hidden="true" />
                            <div className="relative">
                              <div className="absolute inset-x-[8%] top-0 border-t border-white/15" aria-hidden="true" />
                            </div>
                          </div>

                          <p className="mt-10 text-xs font-semibold uppercase tracking-wider text-brand-gold lg:hidden">
                            Reports to {root.name}
                          </p>

                          <StaggerGrid className="mt-6 grid w-full grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:mt-0 lg:grid-cols-5">
                            {await Promise.all(
                              reports.map(async (member) => (
                                <StaggerItem key={member.id} className="flex flex-col items-center">
                                  <div className="hidden h-10 w-px bg-white/15 lg:block" aria-hidden="true" />
                                  <TeamCard
                                    name={member.name}
                                    role={member.role}
                                    bio={member.bio}
                                    photoUrl={await resolveMediaUrl(member.photoMediaId)}
                                    linkedinUrl={member.linkedinUrl}
                                    email={member.email}
                                  />
                                </StaggerItem>
                              )),
                            )}
                          </StaggerGrid>
                        </>
                      ) : null}
                    </div>
                  );
                }),
              )}
            </div>
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
