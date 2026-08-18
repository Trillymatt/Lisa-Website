import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SiteStructuredData } from "@/components/structured-data";

// Elegant, calming serif for headings.
const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// Warm, friendly, highly readable sans for body text.
const body = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Faith-inspired counseling for individuals, couples, and families — online across Texas or in person in Lewisville. Clear, upfront pricing and easy online scheduling.";

export const metadata: Metadata = {
  // Makes every relative URL below (and the generated OG image) absolute.
  // Set NEXT_PUBLIC_SITE_URL in Railway once the real domain is attached.
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Healing Blooms where Hope is Planted`,
    template: `%s | ${site.shortName}`,
  },
  description,
  alternates: { canonical: "/" },
  keywords: [
    "counseling Lewisville TX",
    "Christian counseling Texas",
    "online therapy Texas",
    "marriage counseling Lewisville",
    "couples counseling",
    "family counseling",
    "biblical counseling",
    "pre-marital counseling",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
    title: `${site.name} | ${site.tagline}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.shortName} | ${site.tagline}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // Reassures visitors on a health topic; also what Google looks for on YMYL sites.
  authors: [{ name: site.practitioner.name, url: "/about" }],
  creator: site.practitioner.name,
  publisher: site.name,
  category: "Health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <head>
        {/*
          Scroll-reveal sections start at opacity:0 and are un-hidden by
          IntersectionObserver. Without JavaScript that observer never runs, so
          most of the site's content would stay invisible. This makes everything
          visible immediately when scripting is unavailable.
        */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: ".reveal{opacity:1 !important;transform:none !important}",
            }}
          />
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-sand-50 font-sans text-sage-900">
        <SiteStructuredData />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ocean-600 focus:px-5 focus:py-2 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
