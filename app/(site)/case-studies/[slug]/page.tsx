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
import { QuoteCard } from "@/components/site/quote-card";
import { Heading } from "@/components/site/heading";
import { Reveal } from "@/components/site/motion/reveal";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await prisma.caseStudy.findUnique({ where: { slug } });
  const coverUrl = await resolveMediaUrl(item?.coverMediaId);
  return buildMetadata({
    title: item?.title ?? "Case Study",
    description: item?.summary,
    image: coverUrl ?? "/images/generated/banners/case-studies.jpg",
    path: `/case-studies/${slug}`,
  });
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
  const results = (item.resultsSummary ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <>
      <PageBanner
        lead={rest.length > 0 ? lead : ""}
        emphasis={emphasis}
        description={item.clientName}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Case Studies", href: "/case-studies" }, { label: item.title }]}
        image={{ src: "/images/generated/banners/case-studies.jpg", objectPosition: "center 30%" }}
        meta={
          item.industryTag ? (
            <span className="inline-flex items-center rounded-full bg-brand-gold/10 px-2.5 py-1 text-[11px] font-medium text-brand-gold">
              {item.industryTag}
            </span>
          ) : undefined
        }
      />

      <Section variant="paperAlt" className="px-6 py-24">
        <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-[1fr_280px] lg:items-start">
          <Reveal>
            {coverUrl ? (
              <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-xl">
                <Image src={coverUrl} alt={item.title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
              </div>
            ) : null}

            {results.length > 0 ? (
              <div className="mb-12">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">The Results</p>
                <div className="mt-5 flex flex-col gap-4 border-l-2 border-brand-gold/30 pl-6">
                  {results.map((line) => (
                    <p key={line} className="text-base leading-relaxed text-on-paper">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="prose-cyfort" dangerouslySetInnerHTML={{ __html: renderMarkdown(item.body) }} />

            {item.testimonialQuote ? (
              <div className="mt-16">
                <QuoteCard quote={item.testimonialQuote} />
                {item.testimonialAuthor ? (
                  <p className="mt-4 text-center text-sm text-brand-muted">— {item.testimonialAuthor}</p>
                ) : null}
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <div className="border-l-2 border-brand-gold/30 pl-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">At a Glance</p>
              <dl className="mt-5 flex flex-col gap-5">
                <div>
                  <dt className="text-xs text-brand-muted">Client</dt>
                  <dd className="mt-1 text-sm text-on-paper">{item.clientName}</dd>
                </div>
                {item.industryTag ? (
                  <div>
                    <dt className="text-xs text-brand-muted">Industry</dt>
                    <dd className="mt-1 text-sm text-on-paper">{item.industryTag}</dd>
                  </div>
                ) : null}
                {item.duration ? (
                  <div>
                    <dt className="text-xs text-brand-muted">Duration</dt>
                    <dd className="mt-1 text-sm text-on-paper">{item.duration}</dd>
                  </div>
                ) : null}
                {item.teamSize ? (
                  <div>
                    <dt className="text-xs text-brand-muted">Team Size</dt>
                    <dd className="mt-1 text-sm text-on-paper">{item.teamSize}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section variant="paper" className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <Heading lead="More" emphasis="Case Studies" tone="dark" />
            </Reveal>
            <StaggerGrid className="mt-12 grid gap-8 sm:grid-cols-2">
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
