import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/page-metadata";
import {
  contactFormIsConfigured,
  phoneIsConfigured,
  site,
} from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Above All Else Counseling and Wellness Center handles information collected through this website.",
  path: "/privacy",
});

/**
 * Website privacy policy.
 *
 * Scope note: this covers the *website* only. It is deliberately NOT a HIPAA
 * Notice of Privacy Practices — that is a separate clinical document Lisa
 * provides in intake paperwork, and it should not be conflated with this page.
 *
 * TODO: have this reviewed alongside the practice's intake paperwork so the two
 * documents agree, and confirm the analytics paragraph once analytics is added.
 */
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy Policy"
        subtitle="What this website collects, what it doesn't, and what happens to anything you send me."
      />

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <div className="space-y-10 rounded-3xl bg-white p-8 shadow-soft ring-1 ring-sage-900/5 sm:p-10">
          <Section title="The short version">
            <p>
              This website does not sell your information, does not run
              advertising trackers, and does not ask you to create an account.
              The only information it receives is what you choose to send me.
            </p>
          </Section>

          <Section title="What this page does and does not cover">
            <p>
              This policy covers <strong>this website</strong>. It is not the
              same as the Notice of Privacy Practices that governs your
              protected health information as a client &mdash; you receive that
              separately as part of your intake paperwork, and it is the
              document that describes how your clinical records are handled.
            </p>
          </Section>

          <Section title="Information you send me">
            <p>
              If you email me, call, or{" "}
              {contactFormIsConfigured
                ? "use the contact form"
                : "reach out through the contact page"}
              , I receive what you write &mdash; typically your name, your
              contact details, and a short description of what you&rsquo;re
              looking for help with. I use it only to reply to you and to
              arrange care.
            </p>
            <p>
              Please keep first messages general. Ordinary email and web forms
              are not secure or confidential channels, so don&rsquo;t include
              medical history or other sensitive details before we have a
              private way to talk. Nothing you send through this website is
              treated as a clinical record until you become a client.
            </p>
          </Section>

          {contactFormIsConfigured && (
            <Section title="The contact form">
              <p>
                Form submissions are delivered to me through a third-party form
                service, which processes the message on my behalf in order to
                pass it along. It is not used to build a marketing list.
              </p>
            </Section>
          )}

          <Section title="Scheduling">
            <p>
              Appointment booking happens on a Google Calendar appointment page.
              When you book, the information you enter there is handled by
              Google under its own privacy policy, and I receive the booking
              details so I can prepare for your session.
            </p>
          </Section>

          <Section title="Analytics and cookies">
            <p>
              This site sets no advertising or tracking cookies and does not
              build a profile of you. The server keeps ordinary technical logs,
              as effectively every website does, for security and reliability.
            </p>
          </Section>

          <Section title="How long anything is kept">
            <p>
              Enquiries that don&rsquo;t become client relationships are kept
              only as long as needed to respond, then deleted. Records for
              actual clients are retained under the requirements described in
              your intake paperwork, which are set by Texas law and
              professional standards.
            </p>
          </Section>

          <Section title="Children">
            <p>
              This website is written for adults. Counseling for a minor is
              arranged by a parent or legal guardian, and this site is not
              designed to collect information directly from children.
            </p>
          </Section>

          <Section title="Questions, or asking me to delete something">
            <p>
              You can ask me what I hold about you, or ask me to delete an
              enquiry, at any time &mdash; just ask.
            </p>
            <p className="mt-3">
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-ocean-600 underline decoration-ocean-300 underline-offset-2 hover:text-ocean-700"
              >
                {site.email}
              </a>
              {phoneIsConfigured && (
                <>
                  {" · "}
                  <a
                    href={site.phoneHref}
                    className="font-semibold text-ocean-600 underline decoration-ocean-300 underline-offset-2 hover:text-ocean-700"
                  >
                    {site.phone}
                  </a>
                </>
              )}
            </p>
          </Section>
        </div>

        <p className="mt-8 text-center text-sm text-sage-600">
          If you are in crisis, this website is not monitored &mdash; call or
          text{" "}
          <a
            href="tel:988"
            className="font-semibold text-ocean-600 underline underline-offset-2"
          >
            988
          </a>
          , or call 911 in an emergency.
        </p>
      </section>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ocean-800">
        {title}
      </h2>
      <div className="mt-3 space-y-3 leading-relaxed text-sage-700">
        {children}
      </div>
    </div>
  );
}
