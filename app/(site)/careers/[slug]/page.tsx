import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Briefcase } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { renderMarkdown } from "@/lib/markdown";
import { Section } from "@/components/site/section";
import { PageBanner } from "@/components/site/page-banner";
import { Button } from "@/components/site/button";
import { Reveal } from "@/components/site/motion/reveal";
import { MeshBlob } from "@/components/site/decorative/mesh-blob";
import { ArcSweep } from "@/components/site/decorative/arc-sweep";

export const instant = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await prisma.jobPosting.findUnique({ where: { slug } });
  return buildMetadata({ title: job?.title ?? "Open Role", description: job?.summary });
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const [job, settings] = await Promise.all([
    prisma.jobPosting.findUnique({ where: { slug } }),
    prisma.siteSettings.findFirst(),
  ]);

  if (!job || !job.published) notFound();

  const applyEmail = job.applyEmail || settings?.contactEmail || "info@cyfort.africa";
  const [lead, ...rest] = job.title.split(" ");
  const emphasis = rest.join(" ") || lead;
  const metaItems = [job.department, job.location, job.employmentType].filter(Boolean);

  return (
    <>
      <PageBanner
        lead={rest.length > 0 ? lead : ""}
        emphasis={emphasis}
        description={job.summary}
        image={{ src: "/images/generated/banner-people-careers.jpg", alt: "" }}
        meta={
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">
            <Briefcase className="h-6 w-6" aria-hidden="true" />
          </span>
        }
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          {metaItems.length > 0 ? (
            <Reveal className="mb-10 flex flex-wrap items-center gap-2">
              {metaItems.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-brand-gold/10 px-3 py-1.5 text-xs font-medium text-brand-gold"
                >
                  {item}
                </span>
              ))}
            </Reveal>
          ) : null}

          <Reveal>
            <div
              className="prose-cyfort"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(job.description) }}
            />
          </Reveal>

          <Reveal className="mt-14">
            <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-brand-dark p-10 text-center text-on-dark">
              <MeshBlob tone="gold" className="absolute inset-0" />
              <ArcSweep className="absolute inset-0 h-full w-full opacity-40" />
              <div className="relative">
                <p className="text-base">Ready to apply?</p>
                <Button
                  href={`mailto:${applyEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                  className="mt-5"
                >
                  Apply via {applyEmail}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
