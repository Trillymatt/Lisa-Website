import { crisis } from "@/lib/content";

/**
 * Crisis resources, as tappable links. On a counseling site someone may well be
 * reading this on a phone in a bad moment, so the numbers are real `tel:` and
 * `sms:` links rather than plain text they'd have to retype.
 */
export function CrisisNote({ className = "" }: { className?: string }) {
  return (
    <aside
      aria-label="Crisis resources"
      className={`rounded-3xl border-l-4 border-gold-400 bg-sage-50 px-6 py-5 text-sm leading-relaxed text-sage-700 ${className}`.trim()}
    >
      <p>
        <strong className="font-semibold text-sage-800">{crisis.note}</strong>{" "}
        If you need to talk to someone right now:
      </p>
      <ul className="mt-3 space-y-1.5">
        {crisis.resources.map((resource) => (
          <li key={resource.name}>
            <span className="font-medium text-sage-800">{resource.name}</span>
            {" — "}
            <a
              href={resource.href}
              className="font-semibold text-ocean-600 underline decoration-ocean-300 underline-offset-2 transition-colors hover:text-ocean-700"
            >
              {resource.detail}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
