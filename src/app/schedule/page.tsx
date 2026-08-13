import type { Metadata } from "next";
import { PageHero, CtaButton } from "@/components/ui";
import { schedulingIsConfigured, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Schedule an Appointment",
  description: schedulingIsConfigured
    ? "Book your counseling appointment online with Above All Else Counseling and Wellness Center. Choose a time that works for you."
    : "Request a counseling appointment with Above All Else Counseling and Wellness Center in Lewisville, TX.",
};

export default function SchedulePage() {
  return (
    <>
      <PageHero
        eyebrow="Online Scheduling"
        title="Find a time that works"
        subtitle={
          schedulingIsConfigured
            ? "Choose from Lisa’s current 60-minute appointment times and reserve the one that fits your week."
            : "Online booking is being finalized. You can still reach out now, and I’ll help you find a time."
        }
      />

      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        {schedulingIsConfigured ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-sage-900/5 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage-500">
              Google Calendar
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ocean-800">
              Choose your appointment time
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-sage-700">
              View Lisa&rsquo;s current availability and reserve a time through
              the secure Google Calendar booking page.
            </p>
            <div className="mt-8">
              <CtaButton href={site.schedulingUrl} external>
                View Available Times
              </CtaButton>
            </div>
            <p className="mt-6 text-sm text-sage-600">
              If the booking page does not open, you can{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-ocean-600 underline hover:text-ocean-700"
              >
                email me
              </a>{" "}
              and we&rsquo;ll find a time together.
            </p>
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-sage-900/5 sm:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage-500">
              Booking calendar coming soon
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ocean-800">
              Let&rsquo;s find your time together
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-sage-700">
              The Google Calendar booking page is not connected yet. Email me
              directly or send a contact request, and I&rsquo;ll follow up to
              arrange a time.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center rounded-full bg-ocean-600 px-7 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-ocean-700 hover:shadow-md active:translate-y-0"
              >
                Email Lisa
              </a>
              <CtaButton href="/intake" variant="secondary">
                Send a Contact Request
              </CtaButton>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
