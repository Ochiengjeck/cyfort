import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "./section";
import { Heading } from "./heading";
import { Reveal } from "./motion/reveal";
import { StaggerGrid, StaggerItem } from "./motion/stagger-grid";

type KeyService = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  items: Array<{ id: string; label: string }>;
};

type KeyServicesSectionProps = {
  services: KeyService[];
};

/**
 * "Where most clients start" — the four packaged, featured services shown
 * numbered 01-04, matching the design template's home + services page
 * treatment.
 */
export function KeyServicesSection({ services }: KeyServicesSectionProps) {
  return (
    <Section variant="dark" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold">Key services</p>
            <Heading lead="Where most clients" emphasis="start" tone="dark" className="mt-3" />
            <p className="mt-4 max-w-xl text-base text-on-dark/60">
              Four focused services where we make the biggest difference.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-on-dark/80 transition-colors hover:border-brand-gold hover:text-brand-gold"
          >
            All services
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </Reveal>

        <StaggerGrid className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <StaggerItem key={service.id}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/40"
              >
                <span className="font-display text-3xl font-semibold text-brand-gold/40 transition-colors group-hover:text-brand-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-on-dark">{service.name}</h3>
                <p className="mt-2 text-sm text-on-dark/60">{service.summary}</p>
                {service.items.length > 0 ? (
                  <ul className="mt-4 flex flex-col gap-1.5 border-t border-white/10 pt-4">
                    {service.items.slice(0, 4).map((item) => (
                      <li key={item.id} className="flex items-start gap-2 text-xs text-on-dark/50">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
                        {item.label}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </Section>
  );
}
