import Image from "next/image";
import { DotGrid } from "./decorative/dot-grid";
import { Button } from "./button";

type EmptyStateProps = {
  heading: string;
  message: string;
  cta?: { label: string; href: string };
};

export function EmptyState({ heading, message, cta }: EmptyStateProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-black/15 bg-brand-paper px-8 py-20 text-center">
      <DotGrid className="absolute inset-0" />
      {/* The emblem's white/gold artwork is designed for a dark backdrop —
          on this light paper section it needs its own dark chip behind it
          to stay legible, rather than blending into the page. */}
      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-dark opacity-40">
        <Image src="/images/brand/cyfort-emblem.png" alt="" width={80} height={80} className="h-9 w-9" />
      </div>
      <h3 className="relative mt-5 text-xl font-semibold text-on-paper">{heading}</h3>
      <p className="relative mx-auto mt-2 max-w-md text-sm text-brand-muted">{message}</p>
      {cta ? (
        <Button href={cta.href} variant="dark" size="sm" className="relative mt-6">
          {cta.label}
        </Button>
      ) : null}
    </div>
  );
}
