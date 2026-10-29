import { z } from "zod";

export const SERVICE_PILLARS = ["ADVISE", "SECURE_ASSURE", "BUILD_RUN"] as const;

export const serviceSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().min(1),
  icon: z.string().optional(),
  approach: z.string().optional(),
  outcomes: z.string().optional(),
  items: z.array(z.string().min(1)).min(1, "Add at least one sub-service."),
  pillar: z.enum(SERVICE_PILLARS).default("SECURE_ASSURE"),
  featured: z.boolean().default(false),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  builtForTags: z.string().optional(),
  triggerText: z.string().optional(),
});
