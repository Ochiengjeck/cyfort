import { Mail, Phone, MapPin } from "lucide-react";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/metadata";
import { Section } from "@/components/site/section";
import { PageBanner } from "@/components/site/page-banner";
import { Reveal } from "@/components/site/motion/reveal";
import { ContactForm } from "./contact-form";

export const instant = false;

export async function generateMetadata() {
  return buildMetadata({
    title: "Contact Us",
    image: "/images/generated/banners/contact.jpg",
    path: "/contact",
  });
}

const NEXT_STEPS = [
  "We reply within one working day to book a 30-minute call.",
  "We understand your objectives, regulators and risks.",
  "You receive a short proposal tailored to your needs.",
];

export default async function ContactPage() {
  await connection();
  const [settings, services, industries] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.service.findMany({ where: { featured: true }, orderBy: { order: "asc" }, select: { name: true } }),
    prisma.industry.findMany({ orderBy: { order: "asc" }, select: { name: true } }),
  ]);

  const details = [
    settings?.contactEmail ? { icon: Mail, label: "Email", value: settings.contactEmail, href: `mailto:${settings.contactEmail}` } : null,
    settings?.contactPhone ? { icon: Phone, label: "Phone", value: settings.contactPhone, href: undefined } : null,
    settings?.contactAddress ? { icon: MapPin, label: "Address", value: settings.contactAddress, href: undefined } : null,
  ].filter((item): item is { icon: typeof Mail; label: string; value: string; href?: string } => item !== null);

  const serviceOptions = services.map((service) => ({ value: service.name, label: service.name }));
  const sectorOptions = industries.map((industry) => ({ value: industry.name, label: industry.name }));

  return (
    <>
      <PageBanner
        lead="Get in"
        emphasis="touch"
        description="Tell us what's on your agenda. A partner, not a sales team, will respond within one working day."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image={{ src: "/images/generated/banners/contact.jpg", objectPosition: "center 20%" }}
      />

      <Section variant="dark" className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-[1fr_1.2fr]">
          <Reveal className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-brand-gold">Contact details</h2>
            {details.map((detail) => {
              const Icon = detail.icon;
              const content = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-on-dark/50">{detail.label}</p>
                    <p className="text-sm text-on-dark">{detail.value}</p>
                  </div>
                </>
              );
              return detail.href ? (
                <a
                  key={detail.label}
                  href={detail.href}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-brand-gold/40"
                >
                  {content}
                </a>
              ) : (
                <div key={detail.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  {content}
                </div>
              );
            })}

            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold">What happens next</p>
              <ol className="mt-4 flex flex-col gap-3">
                {NEXT_STEPS.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-brand-gold/30 text-xs font-semibold text-brand-gold">
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-on-dark/70">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm serviceOptions={serviceOptions} sectorOptions={sectorOptions} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
