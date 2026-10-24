import Link from "next/link";

type ButtonVariant = "primary" | "outline" | "ghost" | "dark";
type ButtonSize = "sm" | "md";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-gold text-on-gold hover:-translate-y-0.5 hover:shadow-[0_0_24px_0_var(--color-brand-gold)]",
  outline:
    "border border-white/20 text-on-dark hover:border-brand-gold hover:text-brand-gold",
  dark: "bg-brand-dark text-on-dark hover:-translate-y-0.5 hover:opacity-90",
  ghost: "text-brand-gold hover:text-brand-gold-light",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
};

const BASE = "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps =
  | (BaseProps & { href: string; target?: string; rel?: string; onClick?: () => void })
  | (BaseProps & {
      href?: undefined;
      type?: "button" | "submit";
      disabled?: boolean;
      onClick?: () => void;
    });

/**
 * Canonical CTA primitive — replaces hand-rolled pill-button markup
 * previously duplicated across the header, hero, empty-state, footer, and
 * every detail-page CTA box. Renders a `Link` when `href` is given,
 * otherwise a `<button>`.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = `${BASE} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if (props.href) {
    return (
      <Link href={props.href} target={props.target} rel={props.rel} onClick={props.onClick} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as BaseProps & { type?: "button" | "submit"; disabled?: boolean; onClick?: () => void };
  return (
    <button
      type={buttonProps.type ?? "button"}
      disabled={buttonProps.disabled}
      onClick={buttonProps.onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
