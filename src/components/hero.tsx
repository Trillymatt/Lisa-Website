"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { setHeroVideoActive } from "@/lib/hero-video-store";

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

/** The Network Information API, which not every browser ships. */
type NetworkInformation = EventTarget & {
  saveData?: boolean;
  effectiveType?: string;
};

function getConnection() {
  return (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
}

function subscribeConnection(callback: () => void) {
  const connection = getConnection();
  connection?.addEventListener("change", callback);
  return () => connection?.removeEventListener("change", callback);
}

function readPrefersLightMedia() {
  const connection = getConnection();
  if (!connection) return false;
  return (
    connection.saveData === true ||
    connection.effectiveType === "slow-2g" ||
    connection.effectiveType === "2g"
  );
}

/**
 * Whether the visitor is on a metered or very slow connection. They still get
 * the poster still — it's a fraction of the size — but never the clip.
 * Client-only, like the reduced-motion check above.
 */
function usePrefersLightMedia() {
  return useSyncExternalStore(
    subscribeConnection,
    readPrefersLightMedia,
    () => false,
  );
}

/**
 * Homepage hero with a looping background video.
 *
 * How it degrades, nicest → safest:
 *  1. The video plays → footage with a soft scrim and light text on top, with a
 *     slow Mind • Body • Spirit band at the foot.
 *  2. The clip hasn't arrived yet, failed, or was never asked for (reduced
 *     motion, or a metered connection) → the poster still, softened and behind
 *     the same scrim, so the hero looks finished within a few hundred
 *     milliseconds instead of after a megabyte. A still carries no motion, so
 *     reduced-motion visitors get it too — only the footage is held back.
 *  3. The still failed as well → the calm gradient + drifting accents with dark
 *     text.
 *
 * Loading order matters here: the still (~20KB) is preloaded from <head> and
 * the clip is only requested once that still has settled, so the two never
 * compete for the same bytes on a slow connection. The homepage used to sit on
 * the bare gradient until the whole clip had buffered, which is what made it
 * feel slow in production.
 *
 * To use a real clip, replace `public/hero.webm` (with a matching first-frame
 * still at `public/hero-poster.jpg`). Keep it short (~10–20s), slow,
 * muted-friendly, and compressed to a few MB.
 * TODO: the bundled `public/hero.webm` is a low-res placeholder — replace it,
 * along with the 500x333 `hero-poster.jpg` (a full-width still wants ~1600px),
 * and ship an H.264 `.mp4` next to the WebM (see the <source> note below).
 */
export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // The still and the clip are tracked separately: the hero switches to its
  // light palette as soon as the still (and therefore the dark scrim) is up,
  // rather than waiting for frames to paint.
  const [posterVisible, setPosterVisible] = useState(false);
  const [posterSettled, setPosterSettled] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const lightMedia = usePrefersLightMedia();

  // Safety net: if the still's load event never arrives (blocked image, cache
  // quirk) the clip must not be stranded waiting behind it.
  useEffect(() => {
    if (posterSettled) return;
    const timer = window.setTimeout(() => setPosterSettled(true), 2000);
    return () => window.clearTimeout(timer);
  }, [posterSettled]);

  const showVideo = !prefersReducedMotion && posterSettled && !lightMedia;
  // Anything that puts the dark scrim behind the words — the still counts.
  const mediaActive = posterVisible || videoPlaying;

  // Keep the transparent site header in sync (it flips to light text while
  // hero media is behind it), and reset when leaving the homepage.
  useEffect(() => {
    setHeroVideoActive(mediaActive);
    return () => setHeroVideoActive(false);
  }, [mediaActive]);

  // Light text once media + scrim are visible; otherwise the dark palette
  // over the calm gradient fallback.
  const eyebrow = mediaActive ? "text-sage-100" : "text-sage-500";
  const heading = mediaActive ? "text-white" : "text-ocean-800";
  const body = mediaActive ? "text-sage-50" : "text-sage-700";

  return (
    // -mt-20 pulls the hero up underneath the 80px transparent header so the
    // nav and the footage blend seamlessly.
    <section className="relative -mt-20 flex min-h-[92vh] items-center overflow-hidden bg-gradient-to-b from-sage-100 via-sage-50 to-sand-50">
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

      {/* The still is what actually makes the hero look loaded. Preloaded from
          <head>, and scaled up + softened because the placeholder is only 500px
          wide — it reads as depth of field rather than a low-res image, and the
          sharp clip crossfades over it. */}
      <Image
        src="/hero-poster.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className={`pointer-events-none scale-110 object-cover blur-[6px] transition-opacity duration-500 ${
          posterVisible ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => {
          setPosterVisible(true);
          setPosterSettled(true);
        }}
        onError={() => setPosterSettled(true)}
      />

      {showVideo && (
        <video
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 [backface-visibility:hidden] [transform:translateZ(0)] ${
            videoPlaying ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          onPlaying={() => setVideoPlaying(true)}
        >
          {/* WebM/VP9 only. Safari before 17.4 — a lot of iPhones — can't
              decode it and simply keeps the still. When the real clip is
              produced, export an H.264 .mp4 too and list it as a second
              <source> so every device gets the footage. */}
          <source src="/hero.webm" type="video/webm" />
        </video>
      )}

      {/* Scrim: darkens the media so light text stays readable on any frame, a
          touch heavier top and bottom where the words sit. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-sage-900/65 via-sage-900/40 to-sage-900/70 transition-opacity duration-500 ${
          mediaActive ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative mx-auto w-full max-w-5xl px-5 pb-24 pt-40 text-center sm:px-8 sm:pb-32 sm:pt-48">
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
          I&rsquo;m so glad you are here, because here is where healing begins
          &mdash; at Above All Else Counseling and Wellness Center.
        </p>

        <p
          className={`mx-auto mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-[0.14em] ring-1 animate-rise ${
            mediaActive
              ? "bg-white/10 text-sage-50 ring-white/30 backdrop-blur-sm"
              : "bg-white/70 text-sage-700 ring-sage-200"
          }`}
          style={{ animationDelay: "0.34s" }}
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-400" />
          Virtual and in-person sessions available
        </p>
      </div>

      {/* Subtle value band — the Planting Seeds nod. Easy to remove: delete
          <ValueBand /> and the component below. */}
      <ValueBand light={mediaActive} />
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
