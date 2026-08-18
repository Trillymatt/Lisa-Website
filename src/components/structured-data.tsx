import {
  about,
  addressIsComplete,
  publishedFaqs,
  rates,
  services,
  site,
  telehealth,
} from "@/lib/content";
import { absoluteUrl, siteUrl } from "@/lib/site-url";

/**
 * JSON-LD structured data. This is what lets Google show the practice as a
 * local business — name, location, hours, services, price range — instead of a
 * plain blue link, and it is the single highest-leverage SEO addition for a
 * practice that competes on local searches.
 *
 * Everything here is derived from content.ts, so the markup can never claim
 * something the visible site does not. Unconfirmed facts (a street address, an
 * unanswered FAQ) are omitted rather than guessed: invalid or contradicted
 * structured data is worse than none.
 */

/** Cheapest published session rate, used for `priceRange`. */
function priceRange(): string | undefined {
  const numeric = rates
    .map((rate) => Number(rate.price.replace(/[^0-9.]/g, "")))
    .filter((value) => Number.isFinite(value) && value > 0);
  if (numeric.length === 0) return undefined;
  return `$${Math.min(...numeric)}–$${Math.max(...numeric)}`;
}

function postalAddress() {
  return {
    "@type": "PostalAddress",
    // Only emit streetAddress / postalCode once they're actually filled in.
    ...(addressIsComplete
      ? {
          streetAddress: site.location.street,
          postalCode: site.location.postalCode,
        }
      : {}),
    addressLocality: site.location.city,
    addressRegion: site.location.state,
    addressCountry: site.location.country,
  };
}

function practiceNode() {
  return {
    "@type": ["ProfessionalService", "HealthAndBeautyBusiness"],
    "@id": `${siteUrl}/#practice`,
    name: site.name,
    alternateName: site.shortName,
    url: siteUrl,
    email: site.email,
    telephone: site.phone,
    slogan: site.tagline,
    description: about.mission,
    image: absoluteUrl("/lisa.jpg"),
    address: postalAddress(),
    priceRange: priceRange(),
    // Telehealth means she serves the whole state, not just her city — this is
    // what tells Google to surface her beyond Lewisville.
    areaServed: telehealth.offered
      ? telehealth.statesServed.map((state) => ({
          "@type": "State",
          name: state,
        }))
      : [{ "@type": "City", name: site.location.city }],
    ...(telehealth.offered
      ? { availableLanguage: "en", serviceType: "Telehealth counseling" }
      : {}),
    founder: { "@id": `${siteUrl}/#practitioner` },
    provider: { "@id": `${siteUrl}/#practitioner` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Counseling services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })),
    },
    sameAs: [site.social.facebook, site.social.instagram].filter(Boolean),
  };
}

function practitionerNode() {
  return {
    "@type": "Person",
    "@id": `${siteUrl}/#practitioner`,
    name: site.practitioner.name,
    // `jobTitle` intentionally mirrors the visible site. If a state license is
    // added to content.ts, it shows up here automatically.
    jobTitle: site.practitioner.credentials,
    description: about.bio[0],
    image: absoluteUrl("/lisa.jpg"),
    worksFor: { "@id": `${siteUrl}/#practice` },
    url: absoluteUrl("/about"),
    hasCredential: about.credentials.map((credential) => ({
      "@type": "EducationalOccupationalCredential",
      name: credential,
    })),
    knowsAbout: services.map((service) => service.name),
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: site.name,
    publisher: { "@id": `${siteUrl}/#practice` },
    inLanguage: "en-US",
  };
}

/** Sitewide graph — rendered once, in the root layout. */
export function SiteStructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [websiteNode(), practiceNode(), practitionerNode()],
  };

  return <JsonLd data={graph} />;
}

/**
 * FAQPage markup, rendered only on /faq. Google can surface these as expandable
 * questions directly in results. Unpublished entries are excluded, so the markup
 * always matches what a visitor can actually read on the page.
 */
export function FaqStructuredData() {
  if (publishedFaqs.length === 0) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/faq")}#faq`,
    mainEntity: publishedFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return <JsonLd data={data} />;
}

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Content is authored in content.ts, not user input. JSON.stringify plus
      // escaping `<` keeps a stray sequence from closing the script element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
