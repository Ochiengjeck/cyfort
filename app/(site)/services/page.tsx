import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/site/section";
import { Heading } from "@/components/site/heading";
import { Button } from "@/components/site/button";
import { CapabilitiesGrid } from "@/components/site/capabilities-grid";
import { PageBanner } from "@/components/site/page-banner";
import { Reveal } from "@/components/site/motion/reveal";
import { StaggerGrid, StaggerItem } from "@/components/site/motion/stagger-grid";

export const instant = false;

export async function generateMetadata() {
  return buildMetadata({
    title: "Services",
    image: "/images/generated/banners/services.jpg",
    path: "/services",
  });
}

export default async function ServicesPage() {
  await connection();
  const services = await prisma.service.findMany({ orderBy: { order: "asc" }, include: { items: true } });
  const featuredServices = services.filter((service) => service.featured);

  return (
    <>
      <PageBanner
        lead="Services built around the risks"
        emphasis="your board is asking about"
        description="Four key services, from protecting your data to running your whole IT function. Everything else we do builds from there."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
        cta={{ label: "Talk to Us", href: "/contact" }}
        image={{ src: "/images/generated/banners/services.jpg", objectPosition: "center" }}
      />

      {featuredServices.length > 0 ? (
        <>
          {featuredServices.map((service, index) => {
            const builtFor = service.builtForTags?.split("\n").map((tag) => tag.trim()).filter(Boolean) ?? [];
            const flip = index % 2 === 1;
            return (
              <Section key={service.id} variant={index % 2 === 0 ? "paperAlt" : "paper"} className="px-6 py-16">
                <div className="mx-auto max-w-5xl">
                  <div className={`grid items-start gap-10 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    <Reveal>
                      <span className="font-display text-4xl font-semibold text-brand-gold-dark">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="mt-2 font-display text-2xl font-semibold text-on-paper sm:text-3xl">
                        {service.name}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-brand-muted">{service.summary}</p>
                      {builtFor.length > 0 ? (
                        <div className="mt-6">
                          <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold-dark">Built for</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {builtFor.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-on-paper"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </Reveal>

                    <Reveal delay={0.1} className="rounded-2xl border border-white/10 bg-brand-dark p-7 text-on-dark">
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold">What you get</p>
                      <ul className="mt-4 flex flex-col gap-2.5">
                        {service.items.map((item) => (
                          <li key={item.id} className="flex items-start gap-2.5 text-sm text-on-dark/80">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
                            {item.label}
                          </li>
                        ))}
                      </ul>
                      {service.ctaLabel ? (
                        <Button href={service.ctaHref ?? "/contact"} className="mt-6">
                          {service.ctaLabel}
                        </Button>
                      ) : null}
                    </Reveal>
                  </div>
                </div>
              </Section>
            );
          })}

          <Section variant="dark" className="px-6 py-16">
            <div className="mx-auto max-w-5xl">
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold">Find your starting point</p>
                <Heading lead="What's driving" emphasis="the conversation?" tone="dark" className="mt-3" />
              </Reveal>
              <StaggerGrid className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {featuredServices
                  .filter((service) => service.triggerText)
                  .map((service) => (
                    <StaggerItem key={service.id}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-brand-gold/40"
                      >
                        <p className="flex-1 text-sm font-medium text-on-dark">{service.triggerText}</p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-gold">
                          {service.name} →
                        </span>
                      </Link>
                    </StaggerItem>
                  ))}
              </StaggerGrid>
            </div>
          </Section>
        </>
      ) : null}

      <CapabilitiesGrid services={services} />

      <Section variant="paperAlt" className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Heading lead="Every" emphasis="service" tone="dark" />
          </Reveal>
          <StaggerGrid className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <Link
                  href={`/services/${service.slug}`}
                  className="block rounded-xl border border-black/10 bg-white p-5 transition-colors hover:border-brand-gold-dark/40"
                >
                  <h3 className="text-base font-semibold text-on-paper">{service.name}</h3>
                  <p className="mt-1.5 text-sm text-brand-muted">{service.summary}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </Section>
    </>
  );
}
