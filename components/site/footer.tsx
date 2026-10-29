import Link from "next/link";
import Image from "next/image";
import { connection } from "next/server";
import { ArrowRight, Mail, Phone, MapPin, Building2, Boxes, Compass } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { DotGrid } from "./decorative/dot-grid";
import { MeshBlob } from "./decorative/mesh-blob";
import { ArcSweep } from "./decorative/arc-sweep";
import { NewsletterForm } from "./newsletter-form";

// lucide-react dropped brand/social-logo icons entirely (trademark policy) —
// these stay as hand-coded inline SVGs, same as before the redesign.
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.84-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  ),
  "X / Twitter": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.1-9.3L1 2h7.2l5 6.6L18.9 2zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20z" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M13.5 21.9v-8.4h2.8l.4-3.3h-3.2V8.1c0-.96.27-1.6 1.65-1.6h1.76V3.55A23.6 23.6 0 0 0 14.3 3.4c-2.5 0-4.2 1.53-4.2 4.33v2.42H7.3v3.3h2.8v8.45h3.4z" />
    </svg>
  ),
};

// "Navigate" is split into two themed columns instead of one flat list —
// grouped by href against the shared NavLink set rather than a new schema
// field, since the full set of routes is fixed and well known.
const COMPANY_HREFS = ["/about", "/contact"];
const RESOURCE_HREFS = ["/industries", "/blog"];

function ColumnHeading({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-gold/10 text-brand-gold">
        {icon}
      </span>
      <p className="text-xs font-semibold uppercase tracking-wide text-on-dark/50">{children}</p>
    </div>
  );
}

export async function Footer() {
  // The copyright year is a non-deterministic value (`new Date()`), which
  // Cache Components disallows during prerendering unless rendering is
  // explicitly tied to a real request first.
  await connection();

  const [settings, navLinks, services] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.navLink.findMany({ orderBy: { order: "asc" } }),
    prisma.service.findMany({ where: { featured: true }, orderBy: { order: "asc" } }),
  ]);

  const year = new Date().getFullYear();

  const socials = [
    settings?.linkedinUrl ? { href: settings.linkedinUrl, label: "LinkedIn" } : null,
    settings?.twitterUrl ? { href: settings.twitterUrl, label: "X / Twitter" } : null,
    settings?.facebookUrl ? { href: settings.facebookUrl, label: "Facebook" } : null,
  ].filter((item): item is { href: string; label: string } => item !== null);

  const companyLinks = navLinks.filter((link) => COMPANY_HREFS.includes(link.href));
  const resourceLinks = navLinks.filter((link) => RESOURCE_HREFS.includes(link.href));

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-brand-dark text-on-dark before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-gold/60 before:to-transparent">
      <DotGrid className="pointer-events-none absolute inset-0 opacity-[0.08]" />
      <ArcSweep className="pointer-events-none absolute -left-32 -top-24 hidden h-[26rem] w-[26rem] rotate-180 opacity-20 lg:block" />

      <div className="relative mx-auto max-w-6xl px-6 pt-14">
        {/* Newsletter — a glass callout card, same recipe as the site's CTA
            boxes (Careers/Services detail), so the footer picks up the
            same visual language instead of a bare strip of text. */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.6)] sm:p-10">
          <MeshBlob tone="gold" className="absolute inset-0 opacity-70" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-gold/30 bg-brand-gold/10 text-brand-gold sm:flex">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="max-w-md">
                <p className="text-lg font-semibold text-on-dark">Stay ahead of the threat landscape</p>
                <p className="mt-1 text-sm text-on-dark/60">
                  Occasional insights on cybersecurity, governance, and technology strategy across Africa — no spam.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-auto lg:min-w-[22rem]">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/images/brand/cyfort-logo-full.png"
              alt={settings?.siteName ?? "CyFort Technologies Limited"}
              width={2035}
              height={779}
              className="h-14 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm text-on-dark/60">
              {settings?.tagline ?? "Securing Digital Growth Across Africa"}
            </p>
            <ul className="mt-5 flex flex-col gap-2 text-sm text-on-dark/70">
              {settings?.contactEmail ? (
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-on-dark/40" aria-hidden="true" />
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-brand-gold">
                    {settings.contactEmail}
                  </a>
                </li>
              ) : null}
              {settings?.contactPhone ? (
                <li className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-on-dark/40" aria-hidden="true" />
                  {settings.contactPhone}
                </li>
              ) : null}
              {settings?.contactAddress ? (
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-on-dark/40" aria-hidden="true" />
                  {settings.contactAddress}
                </li>
              ) : null}
            </ul>
            {socials.length > 0 ? (
              <div className="mt-5 flex items-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-on-dark/60 transition-colors hover:border-brand-gold/40 hover:text-brand-gold"
                  >
                    {SOCIAL_ICONS[social.label]}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {companyLinks.length > 0 ? (
            <div>
              <ColumnHeading icon={<Building2 className="h-3.5 w-3.5" aria-hidden="true" />}>
                Company
              </ColumnHeading>
              <ul className="mt-4 flex flex-col gap-2">
                {companyLinks.map((link) => (
                  <li key={link.id}>
                    <Link href={link.href} className="text-sm text-on-dark/70 transition-colors hover:text-brand-gold">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {services.length > 0 ? (
            <div>
              <ColumnHeading icon={<Boxes className="h-3.5 w-3.5" aria-hidden="true" />}>Key Services</ColumnHeading>
              <ul className="mt-4 flex flex-col gap-2">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-sm text-on-dark/70 transition-colors hover:text-brand-gold"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/services" className="text-sm text-on-dark/70 transition-colors hover:text-brand-gold">
                    All services
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}

          {resourceLinks.length > 0 ? (
            <div>
              <ColumnHeading icon={<Compass className="h-3.5 w-3.5" aria-hidden="true" />}>
                Resources
              </ColumnHeading>
              <ul className="mt-4 flex flex-col gap-2">
                {resourceLinks.map((link) => (
                  <li key={link.id}>
                    <Link href={link.href} className="text-sm text-on-dark/70 transition-colors hover:text-brand-gold">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-gold transition-colors hover:text-brand-gold-light"
              >
                Talk to us
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          ) : null}
        </div>

        <div className="relative mt-12 flex flex-col gap-3 border-t border-white/5 py-6 text-xs text-on-dark/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings?.siteName ?? "CyFort Technologies Limited"}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {settings?.footerText ? <p>{settings.footerText}</p> : null}
            <Link href="/terms" className="transition-colors hover:text-brand-gold">
              Terms of Service
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-brand-gold">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
