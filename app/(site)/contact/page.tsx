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

export default async function ContactPage() {
  await connection();
  const settings = await prisma.siteSettings.findFirst();

  const details = [
    settings?.contactEmail ? { icon: Mail, label: "Email", value: settings.contactEmail, href: `mailto:${settings.contactEmail}` } : null,
    settings?.contactPhone ? { icon: Phone, label: "Phone", value: settings.contactPhone, href: undefined } : null,
    settings?.contactAddress ? { icon: MapPin, label: "Address", value: settings.contactAddress, href: undefined } : null,
  ].filter((item): item is { icon: typeof Mail; label: string; value: string; href?: string } => item !== null);

  return (
    <>
      <PageBanner
        lead="Let's talk about"
        emphasis="your next move"
        description="Tell us about your technology or cybersecurity challenge — we'll help you figure out the right next step."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image={{ src: "/images/generated/banners/contact.jpg", objectPosition: "center 20%" }}
      />

      <Section variant="paperAlt" className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-12 sm:grid-cols-[1fr_1.4fr]">
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
                    <p className="text-xs font-medium uppercase tracking-wider text-brand-muted">{detail.label}</p>
                    <p className="text-sm text-on-paper">{detail.value}</p>
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
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
