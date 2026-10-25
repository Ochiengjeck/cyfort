import { z } from "zod";

export const industrySchema = z.object({
  name: z.string().min(1),
  blurb: z.string().optional(),
  icon: z.string().optional(),
  imageMediaId: z.string().optional(),
});
