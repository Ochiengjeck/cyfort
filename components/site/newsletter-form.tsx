"use client";

import { useActionState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "./button";
import { subscribeNewsletterAction, type NewsletterFormState } from "@/app/(site)/newsletter-actions";

const initialState: NewsletterFormState = { error: null, success: false, message: null };

export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(subscribeNewsletterAction, initialState);

  if (state.success) {
    return (
      <div className="flex items-center gap-2 text-sm text-on-dark">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-gold" aria-hidden="true" />
        <span>{state.message}</span>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-on-dark outline-none transition-colors placeholder:text-on-dark/40 focus:border-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold/40"
        />
        {state.error ? <p className="mt-2 text-xs text-red-400">{state.error}</p> : null}
      </div>
      <Button
        type="submit"
        disabled={isPending}
        variant="primary"
        size="sm"
        className="shrink-0 disabled:opacity-60"
      >
        {isPending ? "Subscribing…" : "Subscribe"}
        {!isPending ? <Send className="h-3.5 w-3.5" aria-hidden="true" /> : null}
      </Button>
    </form>
  );
}
