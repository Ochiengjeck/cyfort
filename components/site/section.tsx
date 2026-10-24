type SectionVariant = "dark" | "paper" | "paperAlt";

type SectionProps = {
  variant: SectionVariant;
  className?: string;
  children: React.ReactNode;
  id?: string;
};

const VARIANT_CLASSES: Record<SectionVariant, string> = {
  dark: "bg-brand-dark text-on-dark",
  paper: "bg-brand-paper text-on-paper",
  paperAlt: "bg-brand-paper-alt text-on-paper",
};

/**
 * Enforces CyFort's closed set of background/foreground pairings so an
 * admin retinting the brand palette can never produce illegible text —
 * there is no API for picking an arbitrary background + foreground combo.
 */
export function Section({ variant, className = "", children, id }: SectionProps) {
  return (
    <section id={id} className={`relative overflow-hidden ${VARIANT_CLASSES[variant]} ${className}`}>
      {children}
    </section>
  );
}
