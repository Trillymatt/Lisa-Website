import Link from "next/link";
import { CtaButton } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { Hero } from "@/components/hero";
import { goals, services, testimonials, values } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* Hero (full-bleed photo background — see Hero) */}
      <Hero />

      {/* Goals / promise — a single calm checklist instead of scattered boxes. */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold text-ocean-800 sm:text-4xl">
            Your next step, made simple
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sage-700">
            Everyone deserves a place to share what matters and be truly heard.
            Here&rsquo;s what you can do right from this site, whenever
            you&rsquo;re ready.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mx-auto mt-10 max-w-2xl divide-y divide-sage-100 rounded-3xl bg-white px-6 py-2 shadow-soft ring-1 ring-sage-900/5 sm:px-8">
            {goals.map((goal) => (
              <li key={goal} className="flex items-start gap-4 py-4">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-600"
                >
                  <CheckIcon />
                </span>
                <span className="text-sage-800">{goal}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Values — editorial numbered entries, not identical white cards. */}
      <section className="bg-ocean-50">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold text-ocean-800 sm:text-4xl">
              What you can expect from me
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 90}>
                <div className="group h-full rounded-3xl bg-white p-7 shadow-soft ring-1 ring-sage-900/5 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-3xl font-semibold text-gold-400 transition-colors group-hover:text-gold-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-sage-100" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-sage-700">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-sage-700">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-10 text-center">
              <CtaButton href="/about" variant="secondary">
                Learn About My Mission
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services preview */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-semibold text-ocean-800 sm:text-4xl">
                Ways I can help
              </h2>
              <p className="mt-3 max-w-xl text-sage-700">
                Real support for wherever you are right now.
              </p>
            </div>
            <Link
              href="/services"
              className="group text-sm font-semibold text-ocean-600 transition-colors hover:text-ocean-700"
            >
              See services &amp; the rate menu{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.slice(0, 3).map((service, i) => (
            <Reveal key={service.name} delay={i * 90}>
              <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-sage-900/5 transition-transform duration-300 hover:-translate-y-1">
                <span aria-hidden className="block h-1.5 bg-gradient-to-r from-sage-300 to-gold-400" />
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-xl font-semibold text-sage-700">
                    {service.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-sage-700">
                    {service.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-sage-800 text-sage-50">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-semibold text-white sm:text-4xl">
              In their words
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-sage-200">
              A few notes from people I&rsquo;ve had the privilege of working
              with.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.quote} delay={i * 90}>
                <figure className="relative flex h-full flex-col rounded-3xl bg-sage-700/50 p-7 ring-1 ring-white/5">
                  <span
                    aria-hidden
                    className="font-display text-6xl leading-none text-gold-400/60"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="-mt-4 flex-1 text-lg leading-relaxed text-sage-50">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 text-sm font-medium text-gold-400">
                    &mdash; {t.attribution}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-ocean-800 sm:text-4xl">
            Above all else, your well-being matters
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sage-700">
            Schedule your appointment today and begin your journey. No rush, and
            no pressure &mdash; I&rsquo;ll be here.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton href="/schedule">Schedule Your Appointment</CtaButton>
            <CtaButton href="/intake" variant="secondary">
              New Client Intake Form
            </CtaButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
