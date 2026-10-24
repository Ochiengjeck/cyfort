import { z } from "zod";

export const promiseItemSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});
