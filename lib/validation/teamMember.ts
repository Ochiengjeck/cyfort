import { z } from "zod";

export const teamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().optional(),
  photoMediaId: z.string().optional(),
  linkedinUrl: z.string().optional(),
  email: z.string().optional(),
  published: z.boolean().default(true),
});
