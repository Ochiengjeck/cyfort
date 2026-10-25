import Image from "next/image";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Briefcase, CheckCircle2, ClipboardCheck, Handshake } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { resolveMediaUrl } from "@/lib/media";
import { renderMarkdown } from "@/lib/markdown";
import { Section } from "@/components/site/section";
import { PageBanner } from "@/components/site/page-banner";
import { Button } from "@/components/site/button";
import { Reveal } from "@/components/site/motion/reveal";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";
import { MeshBlob } from "@/components/site/decorative/mesh-blob";
import { ArcSweep } from "@/components/site/decorative/arc-sweep";

function BulletSection({
  heading,
  icon: Icon,
  content,
}: {
  heading: string;
  icon: typeof CheckCircle2;
  content: string;
}) {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return null;

  return (
    <Reveal className="mt-12">
      <h2 className="text-sm font-semibold text-brand-gold">{heading}</h2>
      <StaggerGrid className="mt-5 grid gap-3 sm:grid-cols-2">
        {lines.map((line) => (
          <StaggerItem key={line}>
            <div className="flex h-full items-start gap-3 rounded-xl border border-white/10 bg-brand-paper-alt p-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" aria-hidden="true" />
              <span className="text-sm text-on-paper">{line}</span>
            </div>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </Reveal>
  );
}

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

  const coverUrl = await resolveMediaUrl(job.coverMediaId);
  const applyEmail = job.applyEmail || settings?.contactEmail || "info@cyfort.africa";
  const [lead, ...rest] = job.title.split(" ");
  const emphasis = rest.join(" ") || lead;
  const metaItems = [job.department, job.location, job.employmentType, job.salaryRange].filter(Boolean);

  return (
    <>
      <PageBanner
        lead={rest.length > 0 ? lead : ""}
        emphasis={emphasis}
        description={job.summary}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers" }, { label: job.title }]}
        image={{ src: "/images/generated/banners/careers.jpg", objectPosition: "center 35%" }}
        meta={
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">
            <Briefcase className="h-5 w-5" aria-hidden="true" />
          </span>
        }
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          {coverUrl ? (
            <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-xl">
              <Image src={coverUrl} alt="" fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
            </div>
          ) : null}

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
            <h2 className="text-sm font-semibold text-brand-gold">About the Role</h2>
            <div
              className="prose-cyfort mt-4"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(job.description) }}
            />
          </Reveal>

          {job.responsibilities ? (
            <BulletSection heading="Responsibilities" icon={CheckCircle2} content={job.responsibilities} />
          ) : null}
          {job.requirements ? (
            <BulletSection heading="Requirements" icon={ClipboardCheck} content={job.requirements} />
          ) : null}
          {job.benefits ? <BulletSection heading="Benefits" icon={Handshake} content={job.benefits} /> : null}

          <Reveal className="mt-14">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-brand-dark p-10 text-center text-on-dark">
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
