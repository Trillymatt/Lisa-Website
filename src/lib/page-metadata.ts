import type { Metadata } from "next";
import { site } from "@/lib/content";

/**
 * Builds a page's metadata so the canonical URL, the OpenGraph URL, and the
 * social title can never drift apart.
 *
 * Without this, page-level `title`/`description` override the document title but
 * leave `og:title` and `og:url` pointing at the site root, so every page shares
 * one social preview. Sharing a specific page is a common way people pass a
 * therapist's details along, so those previews are worth getting right.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** Site-relative, e.g. "/faq". */
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.shortName}`,
      description,
      url: path,
    },
    twitter: {
      title: `${title} | ${site.shortName}`,
      description,
    },
  };
}
