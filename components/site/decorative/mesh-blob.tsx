type MeshBlobProps = {
  className?: string;
  tone?: "gold" | "dark";
};

/**
 * Soft, slowly drifting gradient blob built from layered radial gradients —
 * adds depth/color behind a section without needing a photographic asset.
 * Pure CSS (`mesh-blob-drift` keyframe in globals.css), no image or SVG.
 */
export function MeshBlob({ className = "", tone = "gold" }: MeshBlobProps) {
  const background =
    tone === "gold"
      ? "radial-gradient(40% 40% at 20% 25%, color-mix(in srgb, var(--color-brand-gold) 35%, transparent) 0%, transparent 70%), " +
        "radial-gradient(35% 35% at 80% 70%, color-mix(in srgb, var(--color-brand-gold-light) 30%, transparent) 0%, transparent 70%)"
      : "radial-gradient(40% 40% at 25% 30%, color-mix(in srgb, var(--color-brand-gold) 20%, transparent) 0%, transparent 70%), " +
        "radial-gradient(35% 35% at 75% 75%, color-mix(in srgb, var(--color-brand-gold-dark) 18%, transparent) 0%, transparent 70%)";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{
        background,
        animation: "mesh-blob-drift 18s ease-in-out infinite",
      }}
    />
  );
}
