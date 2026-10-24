type ScrollCueProps = {
  className?: string;
};

/**
 * Small bouncing chevron pinned to the bottom of the hero, hinting that
 * there's more below the fold. Pure CSS animation, no JS.
 */
export function ScrollCue({ className = "" }: ScrollCueProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-x-0 bottom-6 flex justify-center sm:bottom-8 ${className}`}
      style={{ animation: "scroll-cue-bounce 2s ease-in-out infinite" }}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-on-dark/50">
        <path
          d="M5 9l7 7 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
