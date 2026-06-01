import type { Metadata } from "next";
import { PageHero, CtaButton } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Above All Else Counseling and Wellness Center by phone or email, or schedule an appointment online.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let&rsquo;s talk"
        subtitle="Call, email, or stop by. However you'd rather reach me, I'd love to hear from you."
      />

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          <Reveal>
            <a
              href={`mailto:${site.email}`}
              className="group flex h-full flex-col items-center rounded-3xl bg-white p-7 text-center shadow-soft ring-1 ring-sage-900/5 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-100 text-sage-600 transition-colors group-hover:bg-sage-200">
                <MailIcon />
              </span>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-sage-500">
                Email
              </p>
              <p className="mt-1 break-words font-medium text-ocean-700">
                {site.email}
              </p>
            </a>
          </Reveal>
          <Reveal delay={90}>
            <a
              href={site.phoneHref}
              className="group flex h-full flex-col items-center rounded-3xl bg-white p-7 text-center shadow-soft ring-1 ring-sage-900/5 transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-100 text-sage-600 transition-colors group-hover:bg-sage-200">
                <PhoneIcon />
              </span>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-sage-500">
                Phone
              </p>
              <p className="mt-1 font-medium text-ocean-700">{site.phone}</p>
            </a>
          </Reveal>
          <Reveal delay={180}>
            <div className="flex h-full flex-col items-center rounded-3xl bg-white p-7 text-center shadow-soft ring-1 ring-sage-900/5">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-100 text-sage-600">
                <PinIcon />
              </span>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-sage-500">
                In-Person Sessions
              </p>
              <p className="mt-1 text-sage-700">{site.address}</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-12 rounded-3xl bg-ocean-50 p-8 text-center shadow-soft ring-1 ring-ocean-900/5">
            <h2 className="font-display text-2xl font-semibold text-ocean-800">
              Prefer to get started right away?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sage-700">
              Book a session online, or fill out my new client intake form and
              I&rsquo;ll reach out to you.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CtaButton href="/schedule">Book a Session</CtaButton>
              <CtaButton href="/intake" variant="secondary">
                New Client Intake Form
              </CtaButton>
            </div>
          </div>
        </Reveal>

        <p className="mt-10 text-center text-sm text-sage-600">
          If you are experiencing a mental health emergency, please call 911 or
          call/text the 988 Suicide &amp; Crisis Lifeline.
        </p>
      </section>
    </>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
