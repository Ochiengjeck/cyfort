import Link from "next/link";
import type { ServicePillar } from "@prisma/client";
import { Section } from "./section";
import { Heading } from "./heading";
import { Reveal } from "./motion/reveal";
import { StaggerGrid, StaggerItem } from "./motion/stagger-grid";

type CapabilityService = {
  id: string;
  slug: string;
  name: string;
  pillar: ServicePillar;
};

type CapabilitiesGridProps = {
  services: CapabilityService[];
};

const PILLAR_META: Record<ServicePillar, { label: string; highlight: boolean }> = {
  ADVISE: { label: "Advise", highlight: false },
  SECURE_ASSURE: { label: "Secure & Assure", highlight: true },
  BUILD_RUN: { label: "Build & Run", highlight: false },
};

const PILLAR_ORDER: ServicePillar[] = ["ADVISE", "SECURE_ASSURE", "BUILD_RUN"];

/**
 * "Our full capabilities" — all 9 service lines grouped into the three
 * pillars (Advise / Secure & Assure / Build & Run), matching the design
 * template's home + services page treatment. The Secure & Assure pillar is
 * CyFort's core, so it renders as a highlighted dark card even on this
 * light section.
 */
export function CapabilitiesGrid({ services }: CapabilitiesGridProps) {
  const grouped = PILLAR_ORDER.map((pillar) => ({
    pillar,
    meta: PILLAR_META[pillar],
    services: services.filter((service) => service.pillar === pillar),
  })).filter((group) => group.services.length > 0);

  if (grouped.length === 0) return null;

  return (
    <Section variant="paper" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Heading lead="Our full" emphasis="capabilities" tone="dark" />
          <p className="mt-4 max-w-xl text-base text-brand-muted">
            Nine service lines, organised around what you need from us.
          </p>
        </Reveal>

        <StaggerGrid className="mt-12 grid gap-5 lg:grid-cols-3">
          {grouped.map((group) => (
            <StaggerItem key={group.pillar}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-6 ${
                  group.meta.highlight
                    ? "border-brand-dark/0 bg-brand-dark text-on-dark"
                    : "border-black/10 bg-white text-on-paper"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wide ${
                    group.meta.highlight ? "text-brand-gold" : "text-brand-gold-dark"
                  }`}
                >
                  {group.meta.label}
                </p>
                <ul className="mt-4 flex flex-1 flex-col gap-3">
                  {group.services.map((service) => (
                    <li key={service.id}>
                      <Link
                        href={`/services/${service.slug}`}
                        className={`text-sm font-medium transition-colors ${
                          group.meta.highlight
                            ? "text-on-dark/90 hover:text-brand-gold"
                            : "text-on-paper hover:text-brand-gold-dark"
                        }`}
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </Section>
  );
}
