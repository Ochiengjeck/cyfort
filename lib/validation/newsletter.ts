import { z } from "zod";

export const newsletterSubscriberSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});
