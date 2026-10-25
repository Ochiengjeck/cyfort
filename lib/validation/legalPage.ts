import { z } from "zod";

export const legalPageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1),
});
