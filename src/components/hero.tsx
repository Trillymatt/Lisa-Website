"use client";

import { useState, useSyncExternalStore } from "react";
import { CtaButton } from "@/components/ui";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/** Whether the visitor has asked for reduced motion (client-only; false on the server). */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/**
 * Homepage hero with a looping background video.
 *
 * How it degrades, nicest → safest:
 *  1. Motion allowed AND the video plays → footage with a soft scrim and light
 *     text on top, with a slow Mind • Body • Spirit band at the foot.
 *  2. No video file yet, it fails to load, or it hasn't started → the calm
 *     gradient + drifting accents with dark text. (This is what shows until a
 *     real clip is added.)
 *  3. The visitor prefers reduced motion → the video is never requested; they
 *     get the still gradient and a single, centered value band.
 *
 * To use a real clip, drop a file at `public/hero.mp4` (with a matching
 * first-frame still at `public/hero-poster.jpg`). Keep it short (~10–20s),
 * slow, muted-friendly, and compressed to a few MB.
 * TODO: the bundled `public/hero.webm` is a low-res placeholder — replace it.
 */
export function Hero() {
  // Don't even request the footage when the visitor prefers reduced motion.
  const showVideo = !usePrefersReducedMotion();
  // Flips true once the footage is actually painting frames. Everything that
  // depends on the video (scrim, light text) keys off this, so a missing or
  // slow file never leaves us with unreadable text.
  const [videoActive, setVideoActive] = useState(false);

  // Light text once the video is visibly playing; otherwise the dark palette
  // over the calm gradient fallback.
  const eyebrow = videoActive ? "text-sage-100" : "text-sage-500";
  const heading = videoActive ? "text-white" : "text-ocean-800";
  const body = videoActive ? "text-sage-50" : "text-sage-700";

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-gradient-to-b from-sage-100 via-sage-50 to-sand-50">
      {/* Soft, slowly drifting accents — the calm fallback behind the words. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sage-200/40 blur-3xl animate-float"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-[-6rem] h-80 w-80 rounded-full bg-ocean-100/50 blur-3xl animate-float"
        style={{ animationDelay: "-7s" }}
      />

      {showVideo && (
        <>
          <video
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              videoActive ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero-poster.jpg"
            aria-hidden
            onPlaying={() => setVideoActive(true)}
          >
            {/* mp4 is listed first so a future real clip is preferred; the webm
                is the current placeholder. The browser plays the first it can. */}
            <source src="/hero.mp4" type="video/mp4" />
            <source src="/hero.webm" type="video/webm" />
          </video>
          {/* Scrim: darkens the footage so light text stays readable on any
              frame, a touch heavier top and bottom where the words sit. */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-sage-900/65 via-sage-900/40 to-sage-900/70 transition-opacity duration-1000 ${
              videoActive ? "opacity-100" : "opacity-0"
            }`}
          />
        </>
      )}

      <div className="relative mx-auto w-full max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <p
          className={`mb-4 text-sm font-semibold uppercase tracking-[0.22em] animate-rise ${eyebrow}`}
          style={{ animationDelay: "0.05s" }}
        >
          Counseling &amp; Wellness Center &middot; Lewisville, TX
        </p>

        <h1
          className={`font-display text-5xl font-semibold leading-tight tracking-tight animate-rise sm:text-6xl ${heading}`}
          style={{ animationDelay: "0.15s" }}
        >
          Healing Blooms where Hope is Planted
        </h1>

        <p
          className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed animate-rise sm:text-xl ${body}`}
          style={{ animationDelay: "0.28s" }}
        >
          Compassionate counseling for individuals, couples, and families &mdash;
          a calm, judgment-free space to find your footing and grow whole again.
        </p>

        <div
          className="mt-10 flex flex-col items-center justify-center gap-4 animate-rise"
          style={{ animationDelay: "0.4s" }}
        >
          <CtaButton href="/schedule">Request a Consultation</CtaButton>
          <a
            href="/intake"
            className={`text-sm font-semibold underline-offset-4 transition-colors hover:underline focus-visible:underline ${
              videoActive
                ? "text-sage-100 hover:text-white"
                : "text-ocean-600 hover:text-ocean-700"
            }`}
          >
            New here? Start with a free 15-minute call &rarr;
          </a>
        </div>
      </div>

      {/* Subtle value band — the Planting Seeds nod. Easy to remove: delete
          <ValueBand /> and the component below. */}
      <ValueBand light={videoActive} />
    </section>
  );
}

/**
 * A thin, slowly scrolling band of the practice's three pillars. Decorative
 * (the words also appear in the headline), so it's hidden from assistive tech.
 * Under `prefers-reduced-motion` the marquee stops and a single centered copy
 * is shown (see `.value-band` rules in globals.css).
 */
function ValueBand({ light }: { light: boolean }) {
  const pillars = ["Mind", "Body", "Spirit"];
  const group = (
    <span className="value-band__group flex shrink-0 items-center">
      {pillars.map((word) => (
        <span key={word} className="value-band__word flex items-center">
          {word}
          <span aria-hidden className="value-band__dot">
            &bull;
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div
      aria-hidden
      className={`value-band absolute inset-x-0 bottom-0 overflow-hidden py-3 ${
        light ? "border-t border-white/10" : "value-band--dark border-t border-sage-900/10"
      }`}
    >
      <div className="value-band__track flex w-max">
        {group}
        <span className="value-band__dup flex">{group}</span>
      </div>
    </div>
  );
}
