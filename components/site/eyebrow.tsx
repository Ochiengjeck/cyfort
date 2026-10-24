type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p className={`text-xs font-semibold tracking-wide text-brand-gold ${className}`}>
      {children}
    </p>
  );
}
