/**
 * Whether a nav link should render as "active" for the current pathname —
 * exact match for "/", otherwise exact match or a parent of the current
 * route (e.g. "/services" stays active on "/services/some-slug").
 */
export function isActiveLink(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
