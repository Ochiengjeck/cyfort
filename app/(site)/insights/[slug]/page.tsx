import Image from "next/image";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { resolveMediaUrl } from "@/lib/media";
import { renderMarkdown } from "@/lib/markdown";
import { Section } from "@/components/site/section";
import { PageBanner } from "@/components/site/page-banner";
import { InsightCard } from "@/components/site/insight-card";
import { Heading } from "@/components/site/heading";
import { Reveal } from "@/components/site/motion/reveal";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.insightPost.findUnique({ where: { slug } });
  return buildMetadata({ title: post?.title ?? "Insight", description: post?.excerpt });
}

function estimateReadingMinutes(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const post = await prisma.insightPost.findUnique({ where: { slug } });

  if (!post || !post.published) notFound();

  const [coverUrl, related] = await Promise.all([
    resolveMediaUrl(post.coverMediaId),
    prisma.insightPost.findMany({
      where: { published: true, slug: { not: post.slug } },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);
  const readingMinutes = estimateReadingMinutes(post.body);
  const [lead, ...rest] = post.title.split(" ");
  const emphasis = rest.join(" ") || lead;

  return (
    <>
      <PageBanner
        lead={rest.length > 0 ? lead : ""}
        emphasis={emphasis}
        description={post.authorName ? `By ${post.authorName}` : undefined}
        image={{ src: "/images/generated/banner-advisory-tech.jpg", alt: "" }}
        meta={
          post.category || post.publishedAt ? (
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              {post.category ? (
                <span className="rounded-full bg-brand-gold/10 px-2.5 py-1 text-[11px] font-medium text-brand-gold">
                  {post.category}
                </span>
              ) : null}
              {post.publishedAt ? (
                <span className="text-xs text-on-dark/50">
                  {new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(
                    post.publishedAt,
                  )}
                </span>
              ) : null}
              <span className="text-xs text-on-dark/50">{readingMinutes} min read</span>
            </div>
          ) : undefined
        }
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <Reveal className="mx-auto max-w-3xl">
          {coverUrl ? (
            <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-xl">
              <Image src={coverUrl} alt={post.title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
            </div>
          ) : null}
          <div className="prose-cyfort" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }} />
        </Reveal>
      </Section>

      {related.length > 0 ? (
        <Section variant="paper" className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <Heading lead="More" emphasis="Insights" tone="paper" />
            </Reveal>
            <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {await Promise.all(
                related.map(async (relatedPost) => (
                  <StaggerItem key={relatedPost.id}>
                    <InsightCard
                      slug={relatedPost.slug}
                      title={relatedPost.title}
                      excerpt={relatedPost.excerpt}
                      category={relatedPost.category}
                      publishedAt={relatedPost.publishedAt}
                      coverUrl={await resolveMediaUrl(relatedPost.coverMediaId)}
                    />
                  </StaggerItem>
                )),
              )}
            </StaggerGrid>
          </div>
        </Section>
      ) : null}
    </>
  );
}
