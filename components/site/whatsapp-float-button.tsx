"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "./whatsapp-icon";

const WHATSAPP_GREEN = "#25D366";

type WhatsAppFloatButtonProps = {
  href: string;
};

/**
 * Persistent, site-wide floating action button — mounted once in
 * app/(site)/layout.tsx so it's present on every page. Expands from a
 * circle into a pill on hover/focus to reveal a text label, with a slow
 * attention-pulse ring (app/globals.css `whatsapp-pulse` keyframe) that
 * radiates outward from behind it, and a delayed fade/scale entrance so it
 * doesn't compete with the hero's own entrance animation.
 */
export function WhatsAppFloatButton({ href }: WhatsAppFloatButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 right-5 z-30 sm:bottom-8 sm:right-8"
    >
      {/* Pulse ring sits behind the button and is allowed to expand past its
          bounds — kept out of the button's own overflow-hidden wrapper
          below, which exists only to clip the hover text reveal. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: WHATSAPP_GREEN, animation: "whatsapp-pulse 2.6s ease-out infinite" }}
      />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex h-14 items-center overflow-hidden rounded-full pl-[14px] pr-[14px] text-white shadow-[0_8px_24px_-6px_rgba(37,211,102,0.55)] transition-[padding] duration-300 ease-out hover:pr-5"
        style={{ backgroundColor: WHATSAPP_GREEN }}
      >
        <WhatsAppIcon className="h-6 w-6 shrink-0" />
        <span className="ml-0 max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 ease-out group-hover:ml-2.5 group-hover:max-w-[12rem] group-focus-visible:ml-2.5 group-focus-visible:max-w-[12rem]">
          Chat on WhatsApp
        </span>
      </a>
    </motion.div>
  );
}
