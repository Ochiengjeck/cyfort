"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { BadgePill } from "./badge-pill";
import { Heading } from "./heading";
import { Button } from "./button";

export type HeroSlideData = {
  id: string;
  eyebrow: string;
  headlineLead: string;
  headlineEmphasis: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

type HeroCarouselProps = {
  slides: HeroSlideData[];
};

const AUTO_ADVANCE_MS = 7000;
const SWIPE_DISTANCE_THRESHOLD = 60;
const SWIPE_VELOCITY_THRESHOLD = 400;

const SLIDE_VARIANTS: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -40 : 40, opacity: 0 }),
};

/**
 * Only the eyebrow/headline/description/CTA block rotates — the hero's
 * background image, "Cyber Resilience" stats card, and the services/
 * industries marquee (rendered by the parent, app/(site)/page.tsx) stay
 * fixed across slides. Advances on a timer (paused on hover/focus/drag, a
 * manual play/pause toggle, and OS-level prefers-reduced-motion — WCAG
 * 2.2.2 requires auto-updating content to be pausable), and scrolls
 * horizontally via swipe/drag, arrow buttons, or the dot indicators —
 * direction-aware so the slide always moves the way the triggering
 * interaction implies.
 */
export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  // Lazy initializer reads the current preference directly on first render
  // (SSR-safe — `window` is guarded), so the effect below only needs to
  // subscribe for later changes rather than also setting the initial value.
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    function onChange(event: MediaQueryListEvent) {
      setReducedMotion(event.matches);
    }
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  function go(step: number) {
    setSlide(([current]) => [(current + step + slides.length) % slides.length, step]);
  }

  function goTo(target: number) {
    setSlide(([current]) => [target, target > current ? 1 : -1]);
  }

  const autoAdvanceDisabled = slides.length <= 1 || reducedMotion || userPaused || hoverPaused;

  useEffect(() => {
    if (autoAdvanceDisabled) return;
    const timer = setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `go` closes over current state via the setSlide updater, so it doesn't need to be a dependency
  }, [autoAdvanceDisabled]);

  const slide = slides[index];
  if (!slide) return null;

  return (
    <div
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setHoverPaused(true)}
      onBlur={() => setHoverPaused(false)}
    >
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            drag={slides.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setHoverPaused(true)}
            onDragEnd={(_event, info) => {
              setHoverPaused(false);
              if (info.offset.x < -SWIPE_DISTANCE_THRESHOLD || info.velocity.x < -SWIPE_VELOCITY_THRESHOLD) {
                go(1);
              } else if (info.offset.x > SWIPE_DISTANCE_THRESHOLD || info.velocity.x > SWIPE_VELOCITY_THRESHOLD) {
                go(-1);
              }
            }}
            className={`hero-slide-content flex flex-col justify-center ${slides.length > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
          >
            <div>
              <BadgePill>{slide.eyebrow}</BadgePill>
              <Heading
                as="h1"
                tier="hero"
                tone="dark"
                lead={slide.headlineLead}
                emphasis={slide.headlineEmphasis}
                className="mt-6"
              />
              <p className="hero-paragraph mt-6 line-clamp-3 max-w-xl text-lg leading-relaxed text-on-dark/80">
                {slide.description}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={slide.primaryCtaHref}>{slide.primaryCtaLabel}</Button>
              <Button href={slide.secondaryCtaHref} variant="outline">
                {slide.secondaryCtaLabel}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 ? (
        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-on-dark/60 transition-colors hover:border-brand-gold hover:text-brand-gold"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
            {slides.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                onClick={() => goTo(i)}
                aria-label={`Show slide ${i + 1} of ${slides.length}`}
                aria-selected={i === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-brand-gold" : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-on-dark/60 transition-colors hover:border-brand-gold hover:text-brand-gold"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>

          {!reducedMotion ? (
            <button
              type="button"
              onClick={() => setUserPaused((value) => !value)}
              aria-label={userPaused ? "Resume auto-advancing slides" : "Pause auto-advancing slides"}
              aria-pressed={userPaused}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-on-dark/60 transition-colors hover:border-brand-gold hover:text-brand-gold"
            >
              {userPaused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
