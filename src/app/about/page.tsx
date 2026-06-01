import type { Metadata } from "next";
import { PageHero, CtaButton } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { values, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About & My Mission",
  description:
    "Learn about the mission, values, and faith-inspired approach behind Above All Else Counseling and Wellness Center.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="My Story"
        title="Why I do this work"
        subtitle="Everyone deserves a place to set things down for a while and just be heard. That's what I'm here to offer."
      />

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        {/* TODO: replace this with the counselor's own story, in their words. */}
        <Reveal>
          <div className="space-y-6 text-lg leading-relaxed text-sage-800">
            <p>
              I started {site.shortName} because I kept meeting people who felt
              like they had to have it all together before they could ask for
              help. You don&rsquo;t. You can come in tired, unsure, or skeptical.
              That&rsquo;s a perfectly good place to start.
            </p>
            <p>
              My approach is faith-inspired and non-denominational, which is a
              long way of saying this: if your faith matters to you, it&rsquo;s
              welcome in the room. If it doesn&rsquo;t, you&rsquo;ll get the same
              care and respect. I won&rsquo;t push anything on you. Your
              well-being comes first, above all else.
            </p>
            <p>
              I pay attention to the whole picture, your relationships, your
              stress, your body, your sense of meaning, because life doesn&rsquo;t
              happen in neat little boxes. Wherever you&rsquo;re starting from,
              I&rsquo;d be honored to walk part of the road with you.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <figure className="relative mt-10 overflow-hidden rounded-3xl bg-sage-50 p-8 shadow-soft ring-1 ring-sage-900/5">
            <span
              aria-hidden
              className="absolute left-5 top-2 font-display text-7xl leading-none text-gold-400/50"
            >
              &ldquo;
            </span>
            <blockquote className="relative font-display text-xl italic leading-relaxed text-ocean-800">
              You are loved, you are capable, and you do not have to do this
              alone.
            </blockquote>
            <figcaption className="mt-5 border-t border-sage-200 pt-4 text-sm text-sage-600">
              <span className="font-display text-base font-semibold not-italic text-sage-800">
                {site.practitioner.name}
              </span>
              {site.practitioner.credentials && (
                <span className="block text-sage-500">
                  {site.practitioner.credentials}, {site.shortName}
                </span>
              )}
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="bg-sage-50">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
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
        </div>
      </section>

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
            <CtaButton href="/schedule">Book a Session</CtaButton>
            <CtaButton href="/contact" variant="secondary">
              Contact Me
            </CtaButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
