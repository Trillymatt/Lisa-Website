import Link from "next/link";
import { nav, site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-sage-100 bg-sage-800 text-sage-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold text-white">
            {site.shortName}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-sage-200">
            {site.tagline}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-sage-300">
            Explore
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sage-100 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-sage-300">
            Get in Touch
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-sage-100 transition-colors hover:text-white"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="text-sage-100 transition-colors hover:text-white"
              >
                {site.phone}
              </a>
            </li>
            <li className="text-sage-200">{site.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-sage-700">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-sage-300 sm:px-8">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="mt-1">
            This website is for informational purposes and is not a substitute
            for professional medical advice or crisis care. If you are in
            crisis, call or text 988 (Suicide &amp; Crisis Lifeline).
          </p>
        </div>
      </div>
    </footer>
  );
}
