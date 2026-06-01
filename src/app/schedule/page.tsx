import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Schedule an Appointment",
  description:
    "Book your counseling appointment online with Above All Else Counseling and Wellness Center. Choose a time that works for you.",
};

export default function SchedulePage() {
  return (
    <>
      <PageHero
        eyebrow="Online Scheduling"
        title="Find a time that works"
        subtitle="Pick whatever slot fits your week. Not ready for a full session yet? Go ahead and grab the free 15-minute call instead."
      />

      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <CalendlyEmbed url={site.schedulingUrl} />

        <p className="mt-6 text-center text-sm text-sage-600">
          Having trouble with the scheduler?{" "}
          <a
            href={site.schedulingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ocean-600 underline hover:text-ocean-700"
          >
            Open the booking page in a new tab
          </a>{" "}
          or{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-semibold text-ocean-600 underline hover:text-ocean-700"
          >
            email me
          </a>{" "}
          and we&rsquo;ll find a time together.
        </p>
      </section>
    </>
  );
}
