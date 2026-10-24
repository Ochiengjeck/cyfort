import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/site/section";
import { ServiceCard } from "@/components/site/service-card";
import { PageBanner } from "@/components/site/page-banner";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata() {
  return buildMetadata({ title: "Services" });
}

export default async function ServicesPage() {
  await connection();
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <PageBanner
        lead="Services built for"
        emphasis="business outcomes"
        description="Helping organizations make informed technology decisions aligned with business strategy, from advisory through hands-on delivery."
        image={{ src: "/images/generated/banner-advisory-tech.jpg", alt: "" }}
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <StaggerGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <ServiceCard slug={service.slug} name={service.name} summary={service.summary} icon={service.icon} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </Section>
    </>
  );
}
