import Link from "next/link";
import type { ReactNode } from "react";

/** A simple, calming page header used at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sage-50 to-sand-50">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-4rem] h-64 w-64 rounded-full bg-sage-100/60 blur-3xl animate-float"
      />
      <div className="relative mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
        {eyebrow && (
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-sage-500 animate-rise"
            style={{ animationDelay: "0.05s" }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="font-display text-4xl font-semibold tracking-tight text-ocean-800 animate-rise sm:text-5xl"
          style={{ animationDelay: "0.15s" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-sage-700 animate-rise"
            style={{ animationDelay: "0.28s" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

/** Primary call-to-action button (internal link or external href). */
export function CtaButton({
  href,
  children,
  external,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0";
  const styles =
    variant === "primary"
      ? "bg-ocean-600 text-white hover:bg-ocean-700"
      : "border border-sage-300 bg-white text-sage-800 hover:bg-sage-50";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${styles}`}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
