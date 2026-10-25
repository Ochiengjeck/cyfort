import { z } from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  summary: z.string().min(1),
  icon: z.string().optional(),
  approach: z.string().optional(),
  outcomes: z.string().optional(),
  items: z.array(z.string().min(1)).min(1, "Add at least one sub-service."),
});
