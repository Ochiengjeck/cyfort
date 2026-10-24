"use client";

import { useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { submitContactAction, type ContactFormState } from "./actions";

const initialState: ContactFormState = { error: null, success: false };

const inputClass =
  "rounded-md border border-black/10 bg-brand-paper-alt px-3.5 py-2.5 text-sm text-on-paper outline-none transition-colors focus:border-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold/40";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactAction, initialState);

  return (
    <AnimatePresence mode="wait">
      {state.success ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-black/10 bg-brand-paper p-8 text-center"
        >
          <CheckCircle2 className="mx-auto h-10 w-10 text-brand-gold" aria-hidden="true" />
          <p className="mt-4 text-lg font-semibold text-on-paper">Thank you — we&apos;ve received your message.</p>
          <p className="mt-2 text-sm text-brand-muted">Our team will get back to you shortly.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          action={formAction}
          className="flex flex-col gap-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-medium uppercase tracking-wider text-brand-muted">
                Name *
              </label>
              <input id="name" name="name" required className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-brand-muted">
                Email *
              </label>
              <input id="email" name="email" type="email" required className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="company" className="text-xs font-medium uppercase tracking-wider text-brand-muted">
                Company
              </label>
              <input id="company" name="company" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-xs font-medium uppercase tracking-wider text-brand-muted">
                Phone
              </label>
              <input id="phone" name="phone" className={inputClass} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className="text-xs font-medium uppercase tracking-wider text-brand-muted">
              Subject
            </label>
            <input id="subject" name="subject" className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-xs font-medium uppercase tracking-wider text-brand-muted">
              Message *
            </label>
            <textarea id="message" name="message" rows={5} required className={inputClass} />
          </div>

          {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}

          <button
            type="submit"
            disabled={isPending}
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-medium text-on-dark transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {isPending ? "Sending…" : "Send Message"}
            {!isPending ? <Send className="h-4 w-4" aria-hidden="true" /> : null}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
