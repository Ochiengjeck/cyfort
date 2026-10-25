import {
  ShieldCheck,
  Compass,
  ShieldAlert,
  ClipboardCheck,
  Scale,
  Cloud,
  Code2,
  Boxes,
  Headset,
  Globe2,
  Landmark,
  HeartHandshake,
  Briefcase,
  Building2,
  Truck,
  HeartPulse,
  Factory,
  GraduationCap,
  Store,
  Hotel,
  Users,
  Target,
  Handshake,
  TrendingUp,
  Lightbulb,
  Lock,
  BookOpenCheck,
  Sparkles,
  Atom,
  Mail,
  type LucideIcon,
} from "lucide-react";

/**
 * Name → lucide-react component lookup, keyed by the string values stored
 * in `Service.icon` (admin-editable) and by fixed keys used for content
 * that has no admin-editable icon field yet (industries, differentiators,
 * promise items — matched by slug/name/order in the calling code).
 */
export const ICONS: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  compass: Compass,
  "shield-alert": ShieldAlert,
  "clipboard-check": ClipboardCheck,
  scale: Scale,
  cloud: Cloud,
  code: Code2,
  boxes: Boxes,
  headset: Headset,
  globe: Globe2,
  landmark: Landmark,
  "heart-handshake": HeartHandshake,
  briefcase: Briefcase,
  building: Building2,
  truck: Truck,
  "heart-pulse": HeartPulse,
  factory: Factory,
  "graduation-cap": GraduationCap,
  store: Store,
  hotel: Hotel,
  users: Users,
  target: Target,
  handshake: Handshake,
  "trending-up": TrendingUp,
  lightbulb: Lightbulb,
  lock: Lock,
  "book-open-check": BookOpenCheck,
  sparkles: Sparkles,
  atom: Atom,
  mail: Mail,
};

export function resolveIcon(name: string | null | undefined, fallback: LucideIcon = Sparkles): LucideIcon {
  if (!name) return fallback;
  return ICONS[name] ?? fallback;
}

type AppIconProps = {
  name: string | null | undefined;
  fallback?: LucideIcon;
  className?: string;
};

export function AppIcon({ name, fallback, className }: AppIconProps) {
  const Icon = resolveIcon(name, fallback);
  // The icon-registry lookup always returns a stable, module-level lucide
  // component reference (never one created during render) — safe despite
  // the static-components heuristic not being able to prove it.
  // eslint-disable-next-line react-hooks/static-components
  return <Icon className={className} aria-hidden="true" />;
}
