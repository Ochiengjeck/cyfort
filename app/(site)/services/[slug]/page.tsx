import { notFound } from "next/navigation";
import { connection } from "next/server";
import { CheckCircle2, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { renderMarkdown } from "@/lib/markdown";
import { Section } from "@/components/site/section";
import { Heading } from "@/components/site/heading";
import { PageBanner } from "@/components/site/page-banner";
import { Button } from "@/components/site/button";
import { Reveal } from "@/components/site/motion/reveal";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";
import { MeshBlob } from "@/components/site/decorative/mesh-blob";
import { ArcSweep } from "@/components/site/decorative/arc-sweep";

export const instant = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  return buildMetadata({
    title: service?.name ?? "Service",
    description: service?.summary,
    image: "/images/generated/banners/services.jpg",
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug },
    include: { items: { orderBy: { order: "asc" } } },
  });

  if (!service) notFound();

  const [lead, ...rest] = service.name.split(" ");
  const emphasis = rest.join(" ") || lead;

  return (
    <>
      <PageBanner
        lead={rest.length > 0 ? lead : ""}
        emphasis={emphasis}
        description={service.summary}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.name }]}
        cta={{ label: "Talk to Us", href: "/contact" }}
        image={{ src: "/images/generated/banners/services.jpg", objectPosition: "center" }}
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-sm font-semibold text-brand-gold">What we offer</h2>
          </Reveal>
          <StaggerGrid className="mt-6 grid gap-3 sm:grid-cols-2">
            {service.items.map((item) => (
              <StaggerItem key={item.id}>
                <div className="flex h-full items-start gap-3 rounded-xl border border-white/10 bg-brand-paper-alt p-4 transition-colors duration-300 hover:border-brand-gold/40">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" aria-hidden="true" />
                  <span className="text-sm text-on-paper">{item.label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <Reveal className="mt-14">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-brand-paper to-brand-paper-alt p-10 text-center">
              <p className="text-base text-on-paper">
                Want to talk through how this applies to your organization?
              </p>
              <Button href="/contact" variant="primary" className="mt-5">
                Talk to Us
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {service.approach ? (
        <Section variant="dark" className="relative overflow-hidden px-6 py-20">
          <MeshBlob tone="gold" className="absolute inset-0" />
          <ArcSweep className="absolute inset-0 h-full w-full opacity-30" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <Heading lead="Our" emphasis="Approach" tone="dark" />
              <div
                className="prose-cyfort mt-6"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(service.approach) }}
              />
            </Reveal>
          </div>
        </Section>
      ) : null}

      {service.outcomes ? (
        <Section variant="paperAlt" className="px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <Heading lead="What You Can" emphasis="Expect" tone="dark" />
            </Reveal>
            <StaggerGrid className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.outcomes
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => (
                  <StaggerItem key={line}>
                    <div className="flex h-full items-start gap-3 rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-4">
                      <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" aria-hidden="true" />
                      <span className="text-sm text-on-paper">{line}</span>
                    </div>
                  </StaggerItem>
                ))}
            </StaggerGrid>
          </div>
        </Section>
      ) : null}
    </>
  );
}
