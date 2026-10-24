import Link from "next/link";
import Image from "next/image";
import { connection } from "next/server";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { DotGrid } from "./decorative/dot-grid";

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

export async function Footer() {
  // The copyright year is a non-deterministic value (`new Date()`), which
  // Cache Components disallows during prerendering unless rendering is
  // explicitly tied to a real request first.
  await connection();

  const [settings, navLinks] = await Promise.all([
    prisma.siteSettings.findFirst(),
    prisma.navLink.findMany({ orderBy: { order: "asc" } }),
  ]);

  const year = new Date().getFullYear();

  const socials = [
    settings?.linkedinUrl ? { href: settings.linkedinUrl, label: "LinkedIn" } : null,
    settings?.twitterUrl ? { href: settings.twitterUrl, label: "X / Twitter" } : null,
    settings?.facebookUrl ? { href: settings.facebookUrl, label: "Facebook" } : null,
  ].filter((item): item is { href: string; label: string } => item !== null);

  return (
    <footer className="relative border-t border-white/5 bg-brand-dark text-on-dark before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-gold/60 before:to-transparent">
      <DotGrid className="pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <Image
              src="/images/brand/cyfort-logo-full.png"
              alt={settings?.siteName ?? "CyFort Technologies Limited"}
              width={2035}
              height={779}
              className="h-16 w-auto"
            />
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

          <div>
            <p className="text-xs font-semibold tracking-wide text-on-dark/40">Navigate</p>
            <ul className="mt-3 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.href} className="text-sm text-on-dark/70 transition-colors hover:text-brand-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wide text-on-dark/40">Contact</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-on-dark/70">
              {settings?.contactEmail ? (
                <li>
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-brand-gold">
                    {settings.contactEmail}
                  </a>
                </li>
              ) : null}
              {settings?.contactPhone ? <li>{settings.contactPhone}</li> : null}
              {settings?.contactAddress ? <li>{settings.contactAddress}</li> : null}
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-gold transition-colors hover:text-brand-gold-light"
            >
              Talk to us
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/5 pt-6 text-xs text-on-dark/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings?.siteName ?? "CyFort Technologies Limited"}. All rights reserved.
          </p>
          {settings?.footerText ? <p>{settings.footerText}</p> : null}
        </div>
      </div>
    </footer>
  );
}
