import { z } from "zod";

export const caseStudySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  clientName: z.string().min(1),
  industryTag: z.string().optional(),
  summary: z.string().min(1),
  body: z.string().min(1),
  coverMediaId: z.string().optional(),
  published: z.boolean().default(false),
});
