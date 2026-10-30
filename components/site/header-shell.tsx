"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { Button } from "./button";
import { ThemeToggle } from "./theme-toggle";
import { WhatsAppIcon } from "./whatsapp-icon";
import { isActiveLink } from "@/lib/nav";
import type { Theme } from "@/lib/theme/constants";

type NavLinkItem = { id: string; label: string; href: string; openInNewTab: boolean };
type ServiceMenuItem = { id: string; slug: string; name: string };

type HeaderShellProps = {
  siteName: string;
  navLinks: NavLinkItem[];
  servicesMenu: ServiceMenuItem[];
  theme: Theme;
  whatsappHref?: string;
};

const SCROLL_THRESHOLD = 24;

/**
 * Desktop header shrinks from a tall, transparent bar at the top of the
 * page into a compact, solid one once scrolled — classic premium-site
 * pattern. Mobile stays at a fixed compact height throughout (keeps
 * MobileNav's dropdown position simple, and mobile viewports are already
 * space-constrained) — only the `md:` classes below respond to `scrolled`.
 */
export function HeaderShell({ siteName, navLinks, servicesMenu, theme, whatsappHref }: HeaderShellProps) {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setServicesOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [servicesOpen]);

  function openServices() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  }

  function closeServicesSoon() {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 120);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-16 text-on-dark transition-all duration-300 ${
        scrolled
          ? "md:h-16 md:border-b md:border-white/10 md:bg-brand-dark/80 md:shadow-lg md:shadow-black/20 md:backdrop-blur-lg md:backdrop-saturate-150"
          : "md:h-24 md:border-b md:border-transparent md:bg-transparent md:shadow-none md:backdrop-blur-none"
      } border-b border-white/10 bg-brand-dark/70 backdrop-blur-lg backdrop-saturate-150`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center transition-opacity duration-300 hover:opacity-80">
          <Image
            src="/images/brand/cyfort-logo-full.png"
            alt={siteName}
            width={2035}
            height={779}
            priority
            className={`h-12 w-auto transition-all duration-300 ${scrolled ? "md:h-9" : "md:h-14"}`}
          />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActiveLink(pathname, link.href);
              const isServices = link.href === "/services" && servicesMenu.length > 0;

              if (isServices) {
                return (
                  <li
                    key={link.id}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={closeServicesSoon}
                  >
                    <Link
                      href={link.href}
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                      onFocus={openServices}
                      onClick={() => setServicesOpen(false)}
                      className={`relative inline-flex items-center gap-1 py-1 text-sm transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-brand-gold after:transition-transform after:duration-300 hover:text-on-dark hover:after:scale-x-100 ${
                        active || servicesOpen ? "text-on-dark after:scale-x-100" : "text-on-dark/70 after:scale-x-0"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </Link>

                    {servicesOpen ? (
                      <div
                        role="menu"
                        className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3"
                        onFocus={openServices}
                        onBlur={closeServicesSoon}
                      >
                        <div className="overflow-hidden rounded-xl border border-white/10 bg-brand-dark/95 p-2 shadow-xl shadow-black/30 backdrop-blur-lg">
                          {servicesMenu.map((service) => (
                            <Link
                              key={service.id}
                              href={`/services/${service.slug}`}
                              role="menuitem"
                              onClick={() => setServicesOpen(false)}
                              className="block rounded-lg px-3 py-2 text-sm text-on-dark/80 transition-colors hover:bg-white/5 hover:text-brand-gold"
                            >
                              {service.name}
                            </Link>
                          ))}
                          <div className="my-1 border-t border-white/10" />
                          <Link
                            href="/services"
                            role="menuitem"
                            onClick={() => setServicesOpen(false)}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-gold transition-colors hover:bg-white/5"
                          >
                            All Services
                          </Link>
                        </div>
                      </div>
                    ) : null}
                  </li>
                );
              }

              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-block py-1 text-sm transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-brand-gold after:transition-transform after:duration-300 hover:text-on-dark hover:after:scale-x-100 ${
                      active ? "text-on-dark after:scale-x-100" : "text-on-dark/70 after:scale-x-0"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle theme={theme} />
          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-on-dark/80 transition-colors hover:border-[#25D366] hover:text-[#25D366]"
            >
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          ) : null}
          <Button href="/contact" size="sm">
            Talk to Us
          </Button>
        </div>

        <MobileNav links={navLinks} servicesMenu={servicesMenu} theme={theme} whatsappHref={whatsappHref} />
      </div>
    </header>
  );
}
