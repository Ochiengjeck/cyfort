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
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-white/15 bg-brand-paper px-8 py-20 text-center">
      <DotGrid className="absolute inset-0" />
      <Image
        src="/images/brand/cyfort-emblem.png"
        alt=""
        width={80}
        height={80}
        className="relative mx-auto h-9 w-9 opacity-40"
      />
      <h3 className="relative mt-5 text-xl font-semibold text-on-paper">{heading}</h3>
      <p className="relative mx-auto mt-2 max-w-md text-sm text-brand-muted">{message}</p>
      {cta ? (
        <Button href={cta.href} variant="primary" size="sm" className="relative mt-6">
          {cta.label}
        </Button>
      ) : null}
    </div>
  );
}
