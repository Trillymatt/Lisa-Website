import type { Metadata } from "next";
import { PageHero, CtaButton } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { services, rates } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services & Rates",
  description:
    "Counseling and wellness services with a clear, upfront rate menu — individual, couples, family counseling, and family vision casting.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services & Rates"
        title="What I offer"
        subtitle="Here's what each kind of session looks like, with a clear rate menu so you always know what to expect."
      />

      {/* Services — what each kind of work feels like (no pricing here). */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <div className="space-y-5">
          {services.map((service, i) => (
            <Reveal key={service.name} delay={i * 70}>
              <div className="group rounded-3xl bg-white p-6 shadow-soft ring-1 ring-sage-900/5 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
                <h2 className="font-display text-2xl font-semibold text-ocean-800">
                  {service.name}
                </h2>
                <p className="mt-2 leading-relaxed text-sage-700">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
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

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        {/* TODO: confirm insurance / payment details with the practice. */}
        <Reveal>
          <p className="mt-8 rounded-3xl border-l-4 border-gold-400 bg-sage-50 p-6 text-sm leading-relaxed text-sage-700">
            <strong className="text-sage-800">About payment:</strong> Have
            questions about insurance or payment options? Just ask. Money should
            never be the reason someone doesn&rsquo;t get help, so let&rsquo;s
            talk it through and figure something out together.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton href="/schedule">Book a Session</CtaButton>
            <CtaButton href="/intake" variant="secondary">
              Start with the Intake Form
            </CtaButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
