import { z } from "zod";

export const insightPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  body: z.string().min(1),
  coverMediaId: z.string().optional(),
  authorName: z.string().optional(),
  category: z.string().optional(),
  published: z.boolean().default(false),
});
