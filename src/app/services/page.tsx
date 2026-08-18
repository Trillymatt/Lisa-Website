import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaButton } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { pageMetadata } from "@/lib/page-metadata";
import {
  goodFaithEstimate,
  insurance,
  insuranceIsConfigured,
  priceLabelFor,
  rates,
  services,
  telehealth,
} from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Services & Rates",
  description:
    "Counseling and wellness services with a clear, upfront rate menu — individual, couples, family counseling, and family vision casting. Online across Texas or in person in Lewisville.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services & Rates"
        title="What I offer"
        subtitle="Here's what each kind of session looks like, with a clear rate menu so you always know what to expect."
      />

      {/*
        Each service shows its own price. Previously pricing lived only in the
        rate menu below, which meant a visitor couldn't tell what six of the ten
        services cost — exactly the "no surprises" gap this page promises to
        close. Services with no published rate say so, rather than showing a
        number nobody has confirmed.
      */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        {telehealth.offered && (
          <Reveal>
            <p className="mb-8 rounded-3xl bg-ocean-50 px-6 py-5 text-center leading-relaxed text-sage-700 ring-1 ring-ocean-900/5">
              {telehealth.long}
            </p>
          </Reveal>
        )}
        <div className="space-y-5">
          {services.map((service, i) => {
            const price = priceLabelFor(service);
            return (
              <Reveal key={service.name} delay={i * 70}>
                <div className="group rounded-3xl bg-white p-6 shadow-soft ring-1 ring-sage-900/5 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h2 className="font-display text-2xl font-semibold text-ocean-800">
                      {service.name}
                    </h2>
                    {price ? (
                      <p className="shrink-0 font-semibold text-ocean-700 sm:text-right">
                        {price}
                      </p>
                    ) : (
                      <p className="shrink-0 text-sm text-sage-500 sm:text-right">
                        Rate on request
                      </p>
                    )}
                  </div>
                  <p className="mt-2 leading-relaxed text-sage-700">
                    {service.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Rate menu — pricing kept in one clear place. */}
      <section className="bg-ocean-50">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold text-ocean-800 sm:text-4xl">
              Service / Rate Menu
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sage-700">
              No hidden fees, no fine print &mdash; just clear, upfront rates.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <dl className="mt-10 divide-y divide-sage-100 overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-sage-900/5">
              {rates.map((rate) => (
                <div
                  key={rate.name}
                  className="flex flex-col gap-1 p-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:p-7"
                >
                  <dt className="font-display text-lg font-semibold text-sage-800">
                    {rate.name}
                  </dt>
                  <dd className="shrink-0 text-left sm:text-right">
                    <span className="font-display text-xl font-semibold text-ocean-700">
                      {rate.price}
                    </span>
                    {rate.detail && (
                      <span className="block text-sm text-sage-500">
                        {rate.detail}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <Reveal>
          <p className="rounded-3xl border-l-4 border-gold-400 bg-sage-50 p-6 text-sm leading-relaxed text-sage-700">
            <strong className="text-sage-800">About payment:</strong>{" "}
            {insuranceIsConfigured ? (
              insurance.accepted ? (
                <>
                  I&rsquo;m in network with{" "}
                  {insurance.panels.join(", ") || "select plans"}. If your plan
                  isn&rsquo;t listed, the self-pay rates above apply.
                </>
              ) : (
                <>
                  This is a self-pay practice, so the rates above are what you
                  pay &mdash; no claims, no surprise balance months later.
                  {insurance.superbillOffered
                    ? " I can provide a superbill you may submit to your insurer for possible out-of-network reimbursement."
                    : ""}
                </>
              )
            ) : (
              <>
                Have questions about insurance or payment options? Just ask.
                Money should never be the reason someone doesn&rsquo;t get help,
                so let&rsquo;s talk it through and figure something out
                together.
              </>
            )}
          </p>
        </Reveal>

        {/*
          Good Faith Estimate notice, required by the federal No Surprises Act
          for uninsured and self-pay clients. Belongs next to the rates.
        */}
        <Reveal delay={80}>
          <div className="mt-8 rounded-3xl bg-white p-7 shadow-soft ring-1 ring-sage-900/5 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-ocean-800">
              {goodFaithEstimate.heading}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-sage-700">
              {goodFaithEstimate.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-4 text-sm">
              <a
                href={goodFaithEstimate.moreInfoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ocean-600 underline decoration-ocean-300 underline-offset-2 hover:text-ocean-700"
              >
                {goodFaithEstimate.moreInfoLabel}
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-8 text-center text-sm text-sage-600">
            More questions about rates, sessions, or how any of this works?{" "}
            <Link
              href="/faq"
              className="font-semibold text-ocean-600 underline decoration-ocean-300 underline-offset-2 hover:text-ocean-700"
            >
              Read the FAQ
            </Link>
            .
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton href="/schedule">Book a Session</CtaButton>
            <CtaButton href="/intake" variant="secondary">
              New Client Options
            </CtaButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
