import type { Metadata } from "next";
import { CtaButton, PageHero } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { FaqStructuredData } from "@/components/structured-data";
import { CrisisNote } from "@/components/crisis-note";
import { publishedFaqs } from "@/lib/content";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about session length, rates, online sessions across Texas, confidentiality, faith, and what actually happens in a first counseling session.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <FaqStructuredData />
      <PageHero
        eyebrow="Questions"
        title="The things people ask first"
        subtitle="Reaching out is easier when you already know how it works. If your question isn't here, just ask me directly."
      />

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        {/*
          Rendered as native <details> so answers are keyboard accessible,
          searchable by the browser's find-in-page, and readable with no
          JavaScript at all.
        */}
        {/*
          Not wrapped in <Reveal>: this is dense reference text that people
          scan and search with ctrl-F, and scroll-triggered fade-ins would
          leave answers blank until each one happens to scroll into view.
        */}
        <div className="divide-y divide-sage-100 overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-sage-900/5">
          {publishedFaqs.map((faq) => (
            <details key={faq.question} className="group px-6 py-5 sm:px-8">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-lg font-semibold text-ocean-800 marker:content-none">
                <span>{faq.question}</span>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-sage-400 transition-transform duration-200 group-open:rotate-45"
                >
                  <PlusIcon />
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-sage-700">{faq.answer}</p>
            </details>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 rounded-3xl bg-ocean-50 p-8 text-center shadow-soft ring-1 ring-ocean-900/5">
            <h2 className="font-display text-2xl font-semibold text-ocean-800">
              Still wondering about something?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sage-700">
              There&rsquo;s no such thing as a question that&rsquo;s too small
              to ask before you book. Reach out and I&rsquo;ll answer it.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CtaButton href="/contact">Ask Me a Question</CtaButton>
              <CtaButton href="/schedule" variant="secondary">
                Book a Session
              </CtaButton>
            </div>
          </div>
        </Reveal>

        <CrisisNote className="mt-10" />
      </section>
    </>
  );
}

function PlusIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
