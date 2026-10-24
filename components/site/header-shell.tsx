"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "./mobile-nav";
import { Button } from "./button";

type NavLinkItem = { id: string; label: string; href: string; openInNewTab: boolean };

type HeaderShellProps = {
  siteName: string;
  navLinks: NavLinkItem[];
};

const SCROLL_THRESHOLD = 24;

/**
 * Desktop header shrinks from a tall, transparent bar at the top of the
 * page into a compact, solid one once scrolled — classic premium-site
 * pattern. Mobile stays at a fixed compact height throughout (keeps
 * MobileNav's dropdown position simple, and mobile viewports are already
 * space-constrained) — only the `md:` classes below respond to `scrolled`.
 */
export function HeaderShell({ siteName, navLinks }: HeaderShellProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  target={link.openInNewTab ? "_blank" : undefined}
                  rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                  className="relative inline-block py-1 text-sm text-on-dark/70 transition-colors duration-300 hover:text-on-dark after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-brand-gold after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button href="/contact" size="sm" className="hidden md:inline-flex">
          Talk to Us
        </Button>

        <MobileNav links={navLinks} />
      </div>
    </header>
  );
}
