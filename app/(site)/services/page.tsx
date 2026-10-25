import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/site/section";
import { ServiceCard } from "@/components/site/service-card";
import { PageBanner } from "@/components/site/page-banner";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

// Bento span per item index (index 0 is the featured/order-first service) —
// literal class strings only, indexed by position via modulo so an admin
// adding more services later never breaks the layout.
const SERVICE_SPANS = [
  "sm:col-span-2 lg:col-span-3 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
];

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
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
        cta={{ label: "Talk to Us", href: "/contact" }}
        image={{ src: "/images/generated/banners/services.jpg", objectPosition: "center" }}
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <StaggerGrid className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:auto-rows-[minmax(13rem,auto)] lg:grid-cols-6 grid-flow-dense">
            {services.map((service, index) => (
              <StaggerItem key={service.id} className={SERVICE_SPANS[index % SERVICE_SPANS.length]}>
                <ServiceCard
                  slug={service.slug}
                  name={service.name}
                  summary={service.summary}
                  icon={service.icon}
                  featured={index === 0}
                />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </Section>
    </>
  );
}
