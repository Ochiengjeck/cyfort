import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { resolveMediaUrl } from "@/lib/media";
import { Section } from "@/components/site/section";
import { InsightCard } from "@/components/site/insight-card";
import { EmptyState } from "@/components/site/empty-state";
import { PageBanner } from "@/components/site/page-banner";
import { Reveal } from "@/components/site/motion/reveal";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata() {
  return buildMetadata({
    title: "Blog",
    image: "/images/generated/banners/insights.jpg",
    path: "/blog",
  });
}

export default async function BlogPage() {
  await connection();
  const posts = await prisma.insightPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  const [lead, ...rest] = posts;

  return (
    <>
      <PageBanner
        lead="Practical guidance"
        emphasis="for leaders"
        description="Plain-language briefings on data protection, cyber governance and technology risk in Kenya and East Africa."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        image={{ src: "/images/generated/banners/insights.jpg", objectPosition: "center" }}
      />

      <Section variant="paperAlt" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          {lead ? (
            <>
              {/* Lead story — the most recent article, read as a single
                  editorial feature rather than one tile among many. */}
              <Reveal>
                <InsightCard
                  slug={lead.slug}
                  title={lead.title}
                  excerpt={lead.excerpt}
                  category={lead.category}
                  publishedAt={lead.publishedAt}
                  coverUrl={await resolveMediaUrl(lead.coverMediaId)}
                  featured
                  tone="paper"
                />
              </Reveal>

              {rest.length > 0 ? (
                <StaggerGrid className="mt-14 flex flex-col gap-6">
                  {await Promise.all(
                    rest.map(async (post, index) => (
                      <StaggerItem key={post.id}>
                        <InsightCard
                          slug={post.slug}
                          title={post.title}
                          excerpt={post.excerpt}
                          category={post.category}
                          publishedAt={post.publishedAt}
                          coverUrl={await resolveMediaUrl(post.coverMediaId)}
                          reverse={index % 2 === 1}
                          tone="paper"
                        />
                      </StaggerItem>
                    )),
                  )}
                </StaggerGrid>
              ) : null}
            </>
          ) : (
            <EmptyState
              heading="Blog posts are on the way"
              message="We're preparing articles on technology strategy, cybersecurity, and governance — check back soon."
            />
          )}
        </div>
      </Section>
    </>
  );
}
