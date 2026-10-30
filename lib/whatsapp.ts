/**
 * Builds a wa.me chat link from an admin-entered phone number in any human
 * format (e.g. "+254 712 345 678") — wa.me requires digits only, no spaces,
 * dashes, or leading "+".
 */
export function buildWhatsAppLink(rawNumber: string, message?: string): string {
  const digits = rawNumber.replace(/\D/g, "");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${query}`;
}
