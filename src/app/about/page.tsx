import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, CtaButton } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { about, values, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Lisa",
  description:
    "Meet Lisa Jefferson Norman, founder of Above All Else Counseling and Wellness Center in Lewisville, TX — a counselor with 15+ years walking alongside individuals, couples, and families.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet Lisa"
        title={about.heartline}
        subtitle="Everyone deserves a place to share what matters and be truly heard."
      />

      {/* Bio + portrait + credentials */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-14">
          {/* Portrait */}
          <Reveal>
            <figure className="mx-auto max-w-[15rem] lg:sticky lg:top-24 lg:max-w-none">
              <Image
                src="/lisa.jpg"
                alt="Lisa Jefferson Norman"
                width={522}
                height={823}
                priority
                className="aspect-square w-full overflow-hidden rounded-3xl object-cover object-top shadow-soft ring-1 ring-sage-900/5 lg:aspect-[4/5]"
              />
              <figcaption className="mt-3 text-center">
                <p className="font-display text-xl font-semibold text-sage-800">
                  {site.practitioner.name}
                </p>
                <p className="text-sm text-sage-500">
                  {site.practitioner.credentials} &middot; Founder
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <Reveal>
              <div className="space-y-6 text-lg leading-relaxed text-sage-800">
                {about.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <dl className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-sage-100 shadow-soft ring-1 ring-sage-900/5 sm:grid-cols-3">
                {about.credentials.map((credential) => (
                  <div key={credential} className="bg-white p-6 text-center">
                    <dd className="text-sm leading-relaxed text-sage-700">
                      {credential}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission statement */}
      <section className="bg-sage-800 text-sage-50">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
              Our Mission
            </p>
            <p className="mx-auto mt-6 max-w-3xl font-display text-2xl leading-relaxed text-white sm:text-3xl">
              {about.mission}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values — what I believe */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold text-ocean-800 sm:text-4xl">
            What I believe
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
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
                <p className="mt-3 leading-relaxed text-sage-700">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Personal / family note */}
      <section className="bg-sand-50">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
          <Reveal>
            <span
              aria-hidden
              className="font-display text-6xl leading-none text-gold-400/60"
            >
              &ldquo;
            </span>
            <blockquote className="-mt-4 font-display text-xl italic leading-relaxed text-ocean-800 sm:text-2xl">
              {about.heartline}
            </blockquote>
            <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-sage-700">
              {about.personal}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mx-auto mt-12 max-w-md border-t border-sage-200 pt-8">
              <p className="font-display text-xl text-ocean-800">
                {site.practitioner.signature}
              </p>
              <p className="mt-4 font-display text-lg font-semibold text-sage-800">
                {site.practitioner.name}
              </p>
              <p className="text-sm text-sage-500">
                {site.practitioner.credentials}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-block break-words text-sm font-medium text-ocean-700 transition-colors hover:text-ocean-800"
              >
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-ocean-800">
            Come as you are
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sage-700">
            Booking takes a couple of minutes, and there&rsquo;s a free call if
            you&rsquo;d rather just talk first.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton href="/schedule">Request a Consultation</CtaButton>
            <CtaButton href="/contact" variant="secondary">
              Contact Me
            </CtaButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
