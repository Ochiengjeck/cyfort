import { z } from "zod";

export const jobPostingSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  department: z.string().optional(),
  location: z.string().optional(),
  employmentType: z.string().optional(),
  summary: z.string().min(1),
  description: z.string().min(1),
  coverMediaId: z.string().optional(),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  salaryRange: z.string().optional(),
  applyEmail: z.string().optional(),
  published: z.boolean().default(false),
});
