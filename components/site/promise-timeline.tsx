import { AppIcon } from "./icons";

// Promise items have no admin-editable icon field yet — mapped by the
// fixed seed order here (Understand the Business, Deliver Practical
// Solutions, Build Lasting Capability, Create Long-Term Value).
export const PROMISE_ICONS = ["target", "clipboard-check", "users", "trending-up"];

type PromiseStep = {
  icon: string;
  title: string;
  body: string;
};

type PromiseTimelineProps = {
  items: PromiseStep[];
};

/**
 * Horizontal (desktop) / vertical (mobile) connected-node timeline for the
 * "Our Promise" section — deliberately distinct from the Differentiators
 * icon-card grid so the two numbered-list sections stop looking identical.
 */
export function PromiseTimeline({ items }: PromiseTimelineProps) {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <div key={item.title} className="relative flex flex-col items-start">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold">
              <AppIcon name={item.icon} className="h-5 w-5" />
            </span>
            {index < items.length - 1 ? (
              <span
                aria-hidden="true"
                className="hidden h-px flex-1 bg-gradient-to-r from-brand-gold/40 to-transparent lg:block"
              />
            ) : null}
          </div>
          <h3 className="mt-4 text-base font-semibold text-on-dark">{item.title}</h3>
          <p className="mt-1 text-sm text-on-dark/60">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
