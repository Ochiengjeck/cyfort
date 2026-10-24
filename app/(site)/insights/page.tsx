import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { resolveMediaUrl } from "@/lib/media";
import { Section } from "@/components/site/section";
import { InsightCard } from "@/components/site/insight-card";
import { EmptyState } from "@/components/site/empty-state";
import { PageBanner } from "@/components/site/page-banner";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata() {
  return buildMetadata({ title: "Insights" });
}

export default async function InsightsPage() {
  await connection();
  const posts = await prisma.insightPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <PageBanner
        lead="Perspectives on"
        emphasis="technology & risk"
        image={{ src: "/images/generated/banner-advisory-tech.jpg", alt: "" }}
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          {posts.length > 0 ? (
            <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {await Promise.all(
                posts.map(async (post) => (
                  <StaggerItem key={post.id}>
                    <InsightCard
                      slug={post.slug}
                      title={post.title}
                      excerpt={post.excerpt}
                      category={post.category}
                      publishedAt={post.publishedAt}
                      coverUrl={await resolveMediaUrl(post.coverMediaId)}
                    />
                  </StaggerItem>
                )),
              )}
            </StaggerGrid>
          ) : (
            <EmptyState
              heading="Insights are on the way"
              message="We're preparing articles on technology strategy, cybersecurity, and governance — check back soon."
            />
          )}
        </div>
      </Section>
    </>
  );
}
