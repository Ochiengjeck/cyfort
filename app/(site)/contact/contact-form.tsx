"use client";

import { useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/site/button";
import { submitContactAction, type ContactFormState } from "./actions";

const initialState: ContactFormState = { error: null, success: false };

const inputClass =
  "rounded-md border border-black/15 bg-black/[0.03] px-3.5 py-2.5 text-sm text-brand-dark outline-none transition-colors focus:border-brand-gold-dark focus-visible:ring-2 focus-visible:ring-brand-gold/30";

const labelClass = "text-xs font-medium uppercase tracking-wider text-brand-dark/50";

type ContactFormProps = {
  serviceOptions: Array<{ value: string; label: string }>;
  sectorOptions: Array<{ value: string; label: string }>;
};

export function ContactForm({ serviceOptions, sectorOptions }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState(submitContactAction, initialState);

  return (
    <AnimatePresence mode="wait">
      {state.success ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl bg-white p-8 text-center shadow-[0_24px_60px_-32px_rgba(0,0,0,0.4)]"
        >
          <CheckCircle2 className="mx-auto h-10 w-10 text-brand-gold-dark" aria-hidden="true" />
          <p className="mt-4 text-lg font-semibold text-brand-dark">We&apos;ve received your request.</p>
          <p className="mt-2 text-sm text-brand-dark/60">A partner will respond within one working day.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          action={formAction}
          className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.35)] sm:p-8"
        >
          <h2 className="font-display text-xl font-semibold text-brand-dark">Request a call</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className={labelClass}>
                Full name *
              </label>
              <input id="name" name="name" required className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="company" className={labelClass}>
                Organisation
              </label>
              <input id="company" name="company" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className={labelClass}>
                Work email *
              </label>
              <input id="email" name="email" type="email" required className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>
              <input id="phone" name="phone" className={inputClass} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="serviceInterest" className={labelClass}>
              What do you need help with?
            </label>
            <select id="serviceInterest" name="serviceInterest" defaultValue={serviceOptions[0]?.value ?? ""} className={inputClass}>
              {serviceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="sector" className={labelClass}>
              Sector
            </label>
            <select id="sector" name="sector" defaultValue="" className={inputClass}>
              <option value="">— Select —</option>
              {sectorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className={labelClass}>
              Message
            </label>
            <textarea id="message" name="message" rows={4} required className={inputClass} />
          </div>

          <label htmlFor="consent" className="flex items-start gap-2.5 pt-1">
            <input
              id="consent"
              name="consent"
              type="checkbox"
              value="true"
              required
              className="mt-0.5 h-4 w-4 rounded border-black/25 accent-[color:var(--color-brand-gold-dark)]"
            />
            <span className="text-xs leading-relaxed text-brand-dark/60">
              I agree that CyFort may use these details to respond to my enquiry, as set out in the{" "}
              <a href="/privacy" className="underline hover:text-brand-gold-dark">
                Privacy Policy
              </a>
              .
            </span>
          </label>

          {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}

          <Button type="submit" disabled={isPending} variant="primary" className="mt-2 w-fit disabled:opacity-60">
            {isPending ? "Sending…" : "Request a call"}
            {!isPending ? <Send className="h-4 w-4" aria-hidden="true" /> : null}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
