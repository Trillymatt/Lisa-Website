import type { Metadata } from "next";
import Link from "next/link";
import { CtaButton, PageHero } from "@/components/ui";
import { CrisisNote } from "@/components/crisis-note";
import { firstSession, site, telehealth } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "New Clients",
  description:
    "Start counseling with Above All Else Counseling and Wellness Center by booking online, calling, or emailing Lisa. Online sessions across Texas or in person in Lewisville.",
  path: "/intake",
});

export default function IntakePage() {
  return (
    <>
      <PageHero
        eyebrow="New Clients"
        title="Start in the way that feels easiest"
        subtitle="Choose an appointment online, call, or email. Whichever path you choose reaches a real place where you can take the next step."
      />

      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="rounded-3xl bg-white p-7 text-center shadow-soft ring-1 ring-sage-900/5 sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage-500">
            Your next step
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ocean-800">
            Ready when you are
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-sage-700">
            View Lisa&rsquo;s current 60-minute appointment times, or reach out
            directly if you have a question before booking.
            {telehealth.offered && ` ${telehealth.short}`}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton href={site.schedulingUrl} external>
              View Available Times
            </CtaButton>
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center rounded-full border border-sage-300 bg-white px-7 py-3 text-base font-semibold text-sage-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sage-50 hover:shadow-md active:translate-y-0"
            >
              Call {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center justify-center rounded-full border border-sage-300 bg-white px-7 py-3 text-base font-semibold text-sage-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sage-50 hover:shadow-md active:translate-y-0"
            >
              Email Lisa
            </a>
          </div>
        </div>

        {/* What the first hour is actually like — the most common reason people hesitate. */}
        <div className="mt-12">
          <h2 className="text-center font-display text-2xl font-semibold text-ocean-800">
            What happens after you book
          </h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2">
            {firstSession.map((step, i) => (
              <li
                key={step.title}
                className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-sage-900/5"
              >
                <span
                  aria-hidden
                  className="font-display text-2xl font-semibold text-gold-400"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-sage-700">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sage-700">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-center text-sm text-sage-600">
            Still have a question?{" "}
            <Link
              href="/faq"
              className="font-semibold text-ocean-600 underline decoration-ocean-300 underline-offset-2 hover:text-ocean-700"
            >
              Read the FAQ
            </Link>
            .
          </p>
        </div>

        <CrisisNote className="mt-12" />
      </section>
    </>
  );
}
