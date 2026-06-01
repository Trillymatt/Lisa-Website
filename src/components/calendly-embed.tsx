"use client";

import { useEffect } from "react";

/**
 * Inline Calendly scheduling widget.
 *
 * To switch the calendar shown, update `site.schedulingUrl` in
 * src/lib/content.ts to your Calendly event link.
 *
 * Using Acuity instead? Replace this component's contents with Acuity's
 * embed snippet (Acuity provides a similar <iframe>/script embed).
 */
export function CalendlyEmbed({ url }: { url: string }) {
  useEffect(() => {
    const scriptSrc = "https://assets.calendly.com/assets/external/widget.js";
    // Avoid loading the Calendly script more than once.
    if (document.querySelector(`script[src="${scriptSrc}"]`)) return;

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget mx-auto w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-sage-900/5"
      data-url={url}
      style={{ minWidth: 320, height: 720 }}
    />
  );
}
