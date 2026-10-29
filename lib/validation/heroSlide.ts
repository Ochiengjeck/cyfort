import { z } from "zod";

export const heroSlideSchema = z.object({
  eyebrow: z.string().min(1),
  headlineLead: z.string().min(1),
  headlineEmphasis: z.string().min(1),
  description: z.string().min(1),
  primaryCtaLabel: z.string().min(1),
  primaryCtaHref: z.string().min(1),
  secondaryCtaLabel: z.string().min(1),
  secondaryCtaHref: z.string().min(1),
});
