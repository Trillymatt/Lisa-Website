"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { nav } from "@/lib/content";
import {
  getHeroVideoActive,
  getHeroVideoServerSnapshot,
  subscribeHeroVideo,
} from "@/lib/hero-video-store";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // True once the homepage hero footage is actually painting frames.
  const videoActive = useSyncExternalStore(
    subscribeHeroVideo,
    getHeroVideoActive,
    getHeroVideoServerSnapshot,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the homepage the header sits transparent on top of the hero until the
  // visitor scrolls (the hero pulls itself up underneath with -mt-20). It only
  // flips to light text once the video — with its dark scrim — is behind it,
  // so words stay readable on the gradient fallback too.
  const overlay = pathname === "/" && !scrolled && !open;
  const light = overlay && videoActive;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-500 ${
        overlay
          ? "border-transparent bg-transparent"
          : "border-sage-100 bg-sand-50/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex flex-col leading-tight"
          onClick={() => setOpen(false)}
        >
          <span
            className={`font-display text-[1.35rem] font-medium uppercase tracking-[0.16em] transition-colors duration-500 sm:text-[1.55rem] ${
              light ? "text-white" : "text-ocean-800"
            }`}
          >
            Above All Else
          </span>
          <span className="mt-0.5 flex items-center gap-2">
            <span
              aria-hidden
              className={`h-px w-5 transition-colors duration-500 ${
                light ? "bg-gold-400" : "bg-gold-500"
              }`}
            />
            <span
              className={`text-[0.58rem] font-semibold uppercase tracking-[0.32em] transition-colors duration-500 ${
                light ? "text-sage-100/90" : "text-sage-500"
              }`}
            >
              Counseling &amp; Wellness Center
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  light
                    ? active
                      ? "text-white"
                      : "text-sage-100/85 hover:text-white"
                    : active
                      ? "text-ocean-700"
                      : "text-sage-700 hover:text-ocean-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/schedule"
            className={`rounded-full px-5 py-2 text-sm font-semibold shadow-sm transition-colors ${
              light
                ? "bg-white/15 text-white ring-1 ring-white/50 backdrop-blur-sm hover:bg-white/25"
                : "bg-ocean-600 text-white hover:bg-ocean-700"
            }`}
          >
            Book a Session
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span
            className={`h-0.5 w-6 transition-all ${
              light ? "bg-white" : "bg-sage-700"
            } ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`h-0.5 w-6 transition-all ${
              light ? "bg-white" : "bg-sage-700"
            } ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-6 transition-all ${
              light ? "bg-white" : "bg-sage-700"
            } ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-sage-100 bg-sand-50 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-medium text-sage-800 hover:bg-sage-50"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/schedule"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-ocean-600 px-5 py-2.5 text-center text-base font-semibold text-white"
            >
              Book a Session
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
