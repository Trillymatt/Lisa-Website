import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { IntakeForm } from "@/components/intake-form";

export const metadata: Metadata = {
  title: "New Client Intake",
  description:
    "Tell me a little about yourself and what you're looking for. My new client intake form is the first step toward getting support.",
};

export default function IntakePage() {
  return (
    <>
      <PageHero
        eyebrow="New Clients"
        title="Tell me a little about you"
        subtitle="There's no right way to fill this out. Share as much or as little as you'd like, and it helps me be ready for you."
      />

      <section className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
        <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-sage-900/5 sm:p-8">
          <IntakeForm />
        </div>
      </section>
    </>
  );
}
