import Image from "next/image";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { resolveMediaUrl } from "@/lib/media";
import { renderMarkdown } from "@/lib/markdown";
import { Section } from "@/components/site/section";
import { PageBanner } from "@/components/site/page-banner";
import { CaseStudyCard } from "@/components/site/case-study-card";
import { Heading } from "@/components/site/heading";
import { Reveal } from "@/components/site/motion/reveal";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await prisma.caseStudy.findUnique({ where: { slug } });
  return buildMetadata({ title: item?.title ?? "Case Study", description: item?.summary });
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const item = await prisma.caseStudy.findUnique({ where: { slug } });

  if (!item || !item.published) notFound();

  const [coverUrl, related] = await Promise.all([
    resolveMediaUrl(item.coverMediaId),
    prisma.caseStudy.findMany({
      where: { published: true, slug: { not: item.slug } },
      orderBy: { publishedAt: "desc" },
      take: 2,
    }),
  ]);
  const [lead, ...rest] = item.title.split(" ");
  const emphasis = rest.join(" ") || lead;

  return (
    <>
      <PageBanner
        lead={rest.length > 0 ? lead : ""}
        emphasis={emphasis}
        description={item.clientName}
        image={{ src: "/images/generated/banner-advisory-tech.jpg", alt: "" }}
        meta={
          item.industryTag ? (
            <span className="mb-4 inline-flex items-center rounded-full bg-brand-gold/10 px-2.5 py-1 text-[11px] font-medium text-brand-gold">
              {item.industryTag}
            </span>
          ) : undefined
        }
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <Reveal className="mx-auto max-w-3xl">
          {coverUrl ? (
            <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-xl">
              <Image src={coverUrl} alt={item.title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
            </div>
          ) : null}
          <div className="prose-cyfort" dangerouslySetInnerHTML={{ __html: renderMarkdown(item.body) }} />
        </Reveal>
      </Section>

      {related.length > 0 ? (
        <Section variant="paper" className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <Heading lead="More" emphasis="Case Studies" tone="paper" />
            </Reveal>
            <StaggerGrid className="mt-10 grid gap-6 sm:grid-cols-2">
              {await Promise.all(
                related.map(async (relatedItem) => (
                  <StaggerItem key={relatedItem.id}>
                    <CaseStudyCard
                      slug={relatedItem.slug}
                      title={relatedItem.title}
                      clientName={relatedItem.clientName}
                      industryTag={relatedItem.industryTag}
                      summary={relatedItem.summary}
                      coverUrl={await resolveMediaUrl(relatedItem.coverMediaId)}
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
