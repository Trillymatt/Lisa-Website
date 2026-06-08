"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sage-100 bg-sand-50/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="flex flex-col leading-tight"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-xl font-semibold tracking-tight text-ocean-700 sm:text-2xl">
            Above All Else
          </span>
          <span className="text-[0.7rem] uppercase tracking-[0.18em] text-sage-500">
            Counseling &amp; Wellness Center
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
                className={`text-sm font-medium transition-colors hover:text-ocean-600 ${
                  active ? "text-ocean-700" : "text-sage-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/schedule"
            className="rounded-full bg-ocean-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-ocean-700"
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
            className={`h-0.5 w-6 bg-sage-700 transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-sage-700 transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-sage-700 transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
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
