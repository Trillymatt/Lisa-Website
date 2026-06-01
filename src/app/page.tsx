import Link from "next/link";
import { CtaButton } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { goals, services, testimonials, values } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sage-100 via-sage-50 to-sand-50">
        {/* Soft, slowly drifting accents for a little life behind the words. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-sage-200/40 blur-3xl animate-float"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 right-[-6rem] h-80 w-80 rounded-full bg-ocean-100/50 blur-3xl animate-float"
          style={{ animationDelay: "-7s" }}
        />

        <div className="relative mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <p
            className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-sage-500 animate-rise"
            style={{ animationDelay: "0.05s" }}
          >
            Faith-Inspired Counseling &amp; Wellness
          </p>
          <h1
            className="font-display text-5xl font-semibold leading-tight tracking-tight text-ocean-800 animate-rise sm:text-6xl"
            style={{ animationDelay: "0.15s" }}
          >
            You don&rsquo;t have to carry it all alone
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sage-700 animate-rise sm:text-xl"
            style={{ animationDelay: "0.28s" }}
          >
            Whatever you&rsquo;re going through, there&rsquo;s a seat here for
            you. I listen without judgment, take your faith as seriously as you
            do, and help you find your footing again, one session at a time.
          </p>
          <div
            className="mt-10 flex flex-col items-center justify-center gap-4 animate-rise sm:flex-row"
            style={{ animationDelay: "0.4s" }}
          >
            <CtaButton href="/schedule">Book a Session</CtaButton>
            <CtaButton href="/services" variant="secondary">
              View Services &amp; Pricing
            </CtaButton>
          </div>
        </div>
      </section>

      {/* Goals / promise — a single calm checklist instead of scattered boxes. */}
      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold text-ocean-800 sm:text-4xl">
            No matter what brought you here
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sage-700">
            A few of the things you can do on this site.
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
                Real support, with pricing you can see right up front.
              </p>
            </div>
            <Link
              href="/services"
              className="group text-sm font-semibold text-ocean-600 transition-colors hover:text-ocean-700"
            >
              See all services &amp; pricing{" "}
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
                  <p className="mt-5 border-t border-sage-100 pt-4 text-ocean-700">
                    <span className="text-lg font-semibold">{service.price}</span>
                    {service.duration && (
                      <span className="text-sm text-sage-500">
                        {" "}
                        &middot; {service.duration}
                      </span>
                    )}
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
            Whenever you&rsquo;re ready
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sage-700">
            Maybe today, maybe next month. Start with a free 15-minute call, or
            send me a little about yourself through the intake form. No rush, and
            no pressure. I&rsquo;ll be here.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton href="/schedule">Book a Session</CtaButton>
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
