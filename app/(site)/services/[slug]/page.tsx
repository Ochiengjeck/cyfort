import { notFound } from "next/navigation";
import { connection } from "next/server";
import { CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/site/section";
import { PageBanner } from "@/components/site/page-banner";
import { AppIcon } from "@/components/site/icons";
import { Button } from "@/components/site/button";
import { Reveal } from "@/components/site/motion/reveal";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  return buildMetadata({ title: service?.name ?? "Service", description: service?.summary });
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
        image={{ src: "/images/generated/banner-advisory-tech.jpg", alt: "" }}
        meta={
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">
            <AppIcon name={service.icon} className="h-6 w-6" />
          </span>
        }
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-sm font-semibold text-brand-gold-dark">What we offer</h2>
          </Reveal>
          <StaggerGrid className="mt-6 grid gap-3 sm:grid-cols-2">
            {service.items.map((item) => (
              <StaggerItem key={item.id}>
                <div className="flex h-full items-start gap-3 rounded-xl border border-black/8 bg-brand-paper-alt p-4 transition-colors duration-300 hover:border-brand-gold/40">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" aria-hidden="true" />
                  <span className="text-sm text-on-paper">{item.label}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <Reveal className="mt-14">
            <div className="rounded-2xl border border-black/10 bg-gradient-to-br from-brand-paper to-brand-paper-alt p-10 text-center">
              <p className="text-base text-on-paper">
                Want to talk through how this applies to your organization?
              </p>
              <Button href="/contact" variant="dark" className="mt-5">
                Talk to Us
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
