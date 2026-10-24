import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

export const instant = false;

async function getCounts() {
  const [services, industries, team, caseStudies, insights, jobs, unreadMessages] = await Promise.all([
    prisma.service.count(),
    prisma.industry.count(),
    prisma.teamMember.count(),
    prisma.caseStudy.count(),
    prisma.insightPost.count(),
    prisma.jobPosting.count(),
    prisma.contactSubmission.count({ where: { status: "new" } }),
  ]);
  return { services, industries, team, caseStudies, insights, jobs, unreadMessages };
}

export default async function AdminDashboardPage() {
  await connection();
  const counts = await getCounts();

  const cards: Array<{ label: string; value: number; href: string }> = [
    { label: "Services", value: counts.services, href: "/admin/services" },
    { label: "Industries", value: counts.industries, href: "/admin/industries" },
    { label: "Team members", value: counts.team, href: "/admin/team" },
    { label: "Case studies", value: counts.caseStudies, href: "/admin/case-studies" },
    { label: "Insights posts", value: counts.insights, href: "/admin/insights" },
    { label: "Open roles", value: counts.jobs, href: "/admin/careers" },
    { label: "New messages", value: counts.unreadMessages, href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-white/50">
        A quick overview of what&apos;s currently in the CMS.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-brand-gold/40"
          >
            <p className="text-3xl font-semibold text-brand-gold">{card.value}</p>
            <p className="mt-1 text-sm text-white/60">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
