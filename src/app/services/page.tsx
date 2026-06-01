import type { Metadata } from "next";
import { PageHero, CtaButton } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Counseling and wellness services with clear, upfront pricing — individual, couples, family counseling, and faith-inspired wellness coaching.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services & Pricing"
        title="What I offer, and what it costs"
        subtitle="No hidden fees, no fine print. Here's what each kind of session looks like and exactly what you'll pay."
      />

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <div className="space-y-5">
          {services.map((service, i) => (
            <Reveal key={service.name} delay={i * 70}>
              <div className="group flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-sage-900/5 transition-transform duration-300 hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div className="sm:pr-6">
                  <h2 className="font-display text-2xl font-semibold text-ocean-800">
                    {service.name}
                  </h2>
                  <p className="mt-2 leading-relaxed text-sage-700">
                    {service.description}
                  </p>
                </div>
                <div className="shrink-0 text-left sm:border-l sm:border-sage-100 sm:pl-6 sm:text-right">
                  <p className="font-display text-2xl font-semibold text-sage-700">
                    {service.price}
                  </p>
                  {service.duration && (
                    <p className="text-sm text-sage-500">{service.duration}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

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
