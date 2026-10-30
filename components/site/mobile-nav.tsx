"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { isActiveLink } from "@/lib/nav";
import { ThemeToggle } from "./theme-toggle";
import { WhatsAppIcon } from "./whatsapp-icon";
import type { Theme } from "@/lib/theme/constants";

type MobileNavProps = {
  links: Array<{ id: string; label: string; href: string; openInNewTab: boolean }>;
  servicesMenu?: Array<{ id: string; slug: string; name: string }>;
  theme: Theme;
  whatsappHref?: string;
};

export function MobileNav({ links, servicesMenu = [], theme, whatsappHref }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("a")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
    setServicesExpanded(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => (open ? closeMenu() : setOpen(true))}
        aria-expanded={open}
        aria-label="Toggle navigation menu"
        className="relative z-50 flex h-9 w-9 items-center justify-center"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.18 }}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              transition={{ duration: 0.18 }}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 z-40 bg-brand-dark/60 backdrop-blur-sm"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.nav
              key="panel"
              ref={panelRef}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-16 z-40 border-t border-white/10 bg-brand-dark/95 px-6 py-6 backdrop-blur-lg"
            >
              <ul className="flex flex-col gap-1">
                {links.map((link, index) => {
                  const active = isActiveLink(pathname, link.href);
                  const isServices = link.href === "/services" && servicesMenu.length > 0;

                  if (isServices) {
                    return (
                      <motion.li
                        key={link.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: index * 0.04 }}
                      >
                        <div
                          className={`flex items-center rounded-lg border-l-2 ${
                            active ? "border-brand-gold bg-white/5 text-brand-gold" : "border-transparent text-on-dark/90"
                          }`}
                        >
                          <Link
                            href={link.href}
                            onClick={closeMenu}
                            aria-current={active ? "page" : undefined}
                            className="flex-1 px-2 py-2.5 text-base transition-colors hover:text-brand-gold"
                          >
                            {link.label}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setServicesExpanded((value) => !value)}
                            aria-expanded={servicesExpanded}
                            aria-label="Toggle services submenu"
                            className="px-3 py-2.5 text-on-dark/60 transition-colors hover:text-brand-gold"
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${servicesExpanded ? "rotate-180" : ""}`}
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                        <AnimatePresence initial={false}>
                          {servicesExpanded ? (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 overflow-hidden border-l border-white/10 pl-3"
                            >
                              {servicesMenu.map((service) => (
                                <li key={service.id}>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    onClick={closeMenu}
                                    className="block px-2 py-2 text-sm text-on-dark/70 transition-colors hover:text-brand-gold"
                                  >
                                    {service.name}
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link
                                  href="/services"
                                  onClick={closeMenu}
                                  className="block px-2 py-2 text-sm font-medium text-brand-gold"
                                >
                                  All Services
                                </Link>
                              </li>
                            </motion.ul>
                          ) : null}
                        </AnimatePresence>
                      </motion.li>
                    );
                  }

                  return (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        target={link.openInNewTab ? "_blank" : undefined}
                        rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                        onClick={closeMenu}
                        aria-current={active ? "page" : undefined}
                        className={`block rounded-lg border-l-2 px-2 py-2.5 text-base transition-colors hover:bg-white/5 hover:text-brand-gold ${
                          active
                            ? "border-brand-gold bg-white/5 text-brand-gold"
                            : "border-transparent text-on-dark/90"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 active:scale-[0.98]"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              ) : null}

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm text-on-dark/60">Theme</span>
                <ThemeToggle theme={theme} />
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
