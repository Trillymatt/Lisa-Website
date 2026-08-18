/**
 * Central content + configuration for the Above All Else Counseling site.
 *
 * This is the ONE file to edit for most copy changes. Everything marked
 * `TODO` is placeholder content from the requirements doc and should be
 * replaced with the practice's real information before launch.
 */

export const site = {
  name: "Above All Else Counseling and Wellness Center",
  shortName: "Above All Else",
  tagline: "Healing Blooms where Hope is Planted.",
  email: "Aboveallelsetherapy@lisanormantherapy.com",
  phone: "(940) 784-3884",
  phoneHref: "tel:+19407843884",
  address: "Lewisville, Texas",
  /**
   * Structured location, used for local-SEO JSON-LD. Google rewards a full
   * street address that exactly matches the Google Business Profile.
   *
   * TODO: add `street` and `postalCode` if the practice lists a public office
   * address. Leave `street` empty for a private/by-appointment address — the
   * JSON-LD then publishes city/state only rather than an incomplete address.
   */
  location: {
    street: "",
    city: "Lewisville",
    state: "TX",
    postalCode: "",
    country: "US",
  },
  schedulingUrl: "https://calendar.app.google/jMk3Qmp17f9vZ1ns7",
  social: {
    facebook: "", // TODO (optional)
    instagram: "", // TODO (optional)
  },
  // This is a solo practice — one counselor. Used in the about-page signature
  // and anywhere the site speaks in a personal voice.
  practitioner: {
    name: "Lisa J Norman",
    // Title shown publicly. TODO: add a state license (e.g. LMFT) here if/when
    // one should be shown alongside the title.
    credentials: "Counselor",
    // Personal sign-off used on the About page.
    signature: "I'm here to help.",
  },
} as const;

/** Only enable scheduling for a real Google Calendar booking-page URL. */
export const schedulingIsConfigured =
  (site.schedulingUrl.startsWith("https://calendar.app.google/") ||
    site.schedulingUrl.startsWith(
      "https://calendar.google.com/calendar/appointments/",
    )) &&
  !site.schedulingUrl.includes("/your-booking-page");

/** Keep the example phone number from becoming a live call button. */
export const phoneIsConfigured = isConfiguredPhone(site.phoneHref);

function isConfiguredPhone(phoneHref: string) {
  return phoneHref.startsWith("tel:+") && phoneHref !== "tel:+15551234567";
}

/** True once a public street address is filled in above. */
export const addressIsComplete =
  site.location.street.length > 0 && site.location.postalCode.length > 0;

/**
 * Telehealth. Lisa sees clients both online and in person, so the site says so
 * plainly — virtual sessions widen her reach from Lewisville to all of Texas,
 * which is also what the JSON-LD `areaServed` advertises.
 */
export const telehealth = {
  offered: true,
  /** Where she is licensed to practice; telehealth is limited to this. */
  statesServed: ["Texas"],
  short: "Available online across Texas or in person in Lewisville.",
  long: "Sessions happen wherever you are most comfortable — face to face in Lewisville, or by secure video anywhere in Texas. Many clients mix the two depending on the week, and that is completely fine.",
} as const;

/**
 * Contact form delivery. The form posts directly to a form-handling service
 * (Formspree or equivalent). Set `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` in Railway
 * to the endpoint URL, e.g. `https://formspree.io/f/xxxxxxxx`.
 *
 * When it is unset the form does not render at all and the page falls back to
 * the email / phone / booking options, so a broken form never reaches a
 * visitor and the deploy stays green either way.
 */
export const contactFormEndpoint =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() ?? "";

export const contactFormIsConfigured = contactFormEndpoint.startsWith("https://");

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services & Rates", href: "/services" },
  { label: "New Clients", href: "/intake" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

/** A short, human list of what visitors can do here (drawn from the goals doc). */
export const goals = [
  "Find the kind of counseling that fits where you are right now",
  "See exactly what everything costs, with no surprises",
  "Learn how faith and whole-person care can fit into the process",
  "Request a time whenever you're ready",
  "Get a feel for who I am before you ever pick up the phone",
] as const;

/** Ids for the rate-menu rows, so services can point at their own price. */
export type RateId =
  | "individual"
  | "couples"
  | "family"
  | "vision-casting"
  | "on-request";

export type Service = {
  name: string;
  description: string;
  /**
   * Which rate-menu row covers this service. `"on-request"` means the rate
   * menu does not publish a price for it yet — the site says so honestly and
   * points to contact rather than guessing a number.
   *
   * TODO: once pricing for the `"on-request"` services is confirmed, either
   * point them at an existing rate id or add new rows to `rates` below.
   */
  rate: RateId;
};

/**
 * Descriptive offerings — what each kind of work feels like. Each one carries
 * a `rate` so a visitor never has to guess what a session costs; that is the
 * "no surprises" promise the rest of the site makes.
 */
export const services: Service[] = [
  {
    name: "Biblical Counseling",
    description:
      "Find hope, healing, and direction through God's truth and wisdom.",
    rate: "on-request",
  },
  {
    name: "Individual Counseling",
    description:
      "Break free from anxiety, stress, grief, and emotional barriers holding you back.",
    rate: "individual",
  },
  {
    name: "Couples Counseling",
    description:
      "Reconnect, rebuild trust, and create the relationship you've been longing for.",
    rate: "couples",
  },
  {
    name: "Family Counseling",
    description:
      "Restore peace, strengthen bonds, and cultivate healthier family relationships.",
    rate: "family",
  },
  {
    name: "Conflict Resolution",
    description:
      "Transform tension into understanding with practical communication tools.",
    rate: "family",
  },
  {
    name: "Pre-Marital Counseling",
    description: "Build a marriage on a solid foundation before saying “I do.”",
    rate: "on-request",
  },
  {
    name: "Post-Marital Counseling",
    description:
      "Move beyond hurt, restore connection, and strengthen your marriage.",
    rate: "couples",
  },
  {
    name: "Co-Parenting Counseling",
    description:
      "Create stability, cooperation, and healthier outcomes for your children.",
    rate: "on-request",
  },
  {
    name: "Group Counseling",
    description:
      "Experience healing, support, and encouragement alongside others on a similar journey.",
    rate: "on-request",
  },
  {
    name: "Discipleship & Inner Healing",
    description:
      "Overcome spiritual wounds, deepen your faith, and walk in freedom and purpose.",
    rate: "on-request",
  },
];

export type Rate = {
  id: RateId;
  name: string;
  /** e.g. "$150" or "Consultation required". */
  price: string;
  /** e.g. "per 55-minute session". Omit when the price stands on its own. */
  detail?: string;
};

/** The service / rate menu — clear, upfront pricing in one place. */
export const rates: Rate[] = [
  {
    id: "individual",
    name: "Individual Counseling",
    price: "$150",
    detail: "per 55-minute session",
  },
  {
    id: "couples",
    name: "Couples & Post-Marital Counseling",
    price: "$175",
    detail: "per 55-minute session",
  },
  {
    id: "family",
    name: "Family Counseling & Conflict Resolution Coaching",
    price: "Consultation required",
  },
  {
    id: "vision-casting",
    name: "Family Vision Casting",
    price: "$500",
    detail: "three 55-minute sessions",
  },
];

/**
 * Short price label for a service, shown on its card so no one has to
 * cross-reference the rate menu. Returns `null` when nothing is published yet,
 * which the services page renders as an honest "ask" rather than a number.
 */
export function priceLabelFor(service: Service): string | null {
  const rate = rates.find((r) => r.id === service.rate);
  if (!rate) return null;
  return rate.detail ? `${rate.price} ${rate.detail}` : rate.price;
}

/**
 * "What happens in your first session" — this replaced a testimonials section.
 *
 * Client testimonials are deliberately not used anywhere on this site. The
 * AAMFT and ACA ethics codes both restrict soliciting endorsements from current
 * clients, and for a therapy practice the reputational and regulatory downside
 * outweighs the marketing upside. Telling an anxious visitor exactly what the
 * first hour feels like does the same reassurance job with none of that risk.
 */
export const firstSession = [
  {
    title: "Before we meet",
    description:
      "You pick a time online or we find one by phone. I'll send you what to expect, so nothing about that first day is a surprise.",
  },
  {
    title: "The first 10 minutes",
    description:
      "No forms to fill out in front of me, no clipboard. We just talk. You tell me as much or as little as you want about what brought you here.",
  },
  {
    title: "The rest of the hour",
    description:
      "I listen, ask questions, and start to understand the shape of things. You are never obligated to share more than you're ready to share.",
  },
  {
    title: "Before you leave",
    description:
      "We agree on what would actually help, and whether I'm the right person for it. If someone else would serve you better, I'll tell you and help you find them.",
  },
] as const;

/**
 * About-page content for Lisa, in her own (third-person) voice. Faith language
 * lives here intentionally — the homepage leads clinical, while the About page
 * is where Lisa's faith-inspired story is told in full.
 */
export const about = {
  /** Lisa's tagline. */
  heartline: "Because caring for your heart is most important.",
  /** The practice mission statement. */
  mission:
    "Above All Else Counseling and Wellness Center exists to empower individuals, families, and communities to advance in mind, body, and spirit. Through professional counseling rooted in faith and compassion, we create a safe space for each person to grow.",
  /** Bio paragraphs. */
  bio: [
    "Lisa Jefferson Norman is a compassionate counselor and wellness advocate with over 15 years of experience, walking alongside individuals, couples, and families and equipping them with the tools, insight, and support they need to rise above life's greatest challenges.",
    "Holding a Bachelor's degree in Biblical Studies and a Master's degree in Marriage and Family Therapy, Lisa brings a unique blend of clinical expertise and faith-inspired wisdom to every session. Drawn to this work through her own life, family, and relationship experiences, she has a deep calling to serve her community and a passion for bridging faith and mental health.",
    "Lisa founded Above All Else Counseling and Wellness Center with one purpose — to help every person advance in mind, body, and spirit, and to care for the heart, which is most important. She believes that wholeness is not just possible; it is purposed — and she is honored to walk that road with you.",
  ],
  /** Short credentials list, shown beside the bio. */
  credentials: [
    "Master of Arts, Marriage & Family Therapy",
    "Bachelor of Arts, Biblical Studies",
    "15+ years with individuals, couples & families",
  ],
  /** A warm personal note. */
  personal:
    "Lisa lives in Lewisville, Texas, with Marcus Norman, her husband of 34 years. Together they raised three sons, and they are grandparents to two adventurous grandsons and one remarkable granddaughter.",
} as const;

export const values = [
  {
    title: "You won't be judged here",
    description:
      "Whatever you bring through the door, you'll be met with warmth and zero judgment. I've heard a lot, and I'm still in your corner.",
  },
  {
    title: "Faith is invited, never forced",
    description:
      "I'm faith-inspired and welcome people of every background. Your beliefs come into the work as much as you want them to, and no more.",
  },
  {
    title: "The whole you matters",
    description:
      "Heart, mind, body, and spirit are tangled up together. I pay attention to all of it, because that's where real healing happens.",
  },
  {
    title: "No surprises, ever",
    description:
      "Clear pricing and an open process. You'll always know what to expect and what things cost before you commit to anything.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Payment, insurance, and the Good Faith Estimate notice                     */
/* -------------------------------------------------------------------------- */

/**
 * Whether the practice accepts insurance. This is deliberately unset: publishing
 * the wrong answer costs real trust, and "we'll figure it out" is what makes
 * visitors leave.
 *
 * TODO: set `accepted` to true or false once confirmed. While it stays null the
 * insurance FAQ entry is hidden rather than answered incorrectly.
 *
 * If insurance IS accepted, list the panels in `panels`. If it is not, decide
 * whether a superbill is offered for out-of-network reimbursement.
 */
export const insurance: {
  accepted: boolean | null;
  panels: string[];
  superbillOffered: boolean | null;
} = {
  accepted: null,
  panels: [],
  superbillOffered: null,
};

export const insuranceIsConfigured = insurance.accepted !== null;

/**
 * Good Faith Estimate notice, required by the federal No Surprises Act for
 * uninsured and self-pay clients. Because this site publishes rates openly, the
 * notice belongs alongside them.
 *
 * This is the standard CMS-derived consumer language. TODO: have Lisa confirm
 * the wording against her intake paperwork so the site and the forms agree.
 */
export const goodFaithEstimate = {
  heading: "Your right to a Good Faith Estimate",
  body: [
    "You have the right to receive a Good Faith Estimate explaining how much your care will cost. Under the No Surprises Act, health care providers must give people who are uninsured or who are not using insurance an estimate of the expected charges for their care.",
    "You have the right to receive a Good Faith Estimate for the total expected cost of any non-emergency services, including counseling. Ask for one in writing at least one business day before your session, and keep a copy of the estimate you receive.",
    "If you receive a bill that is at least $400 more than your Good Faith Estimate, you can dispute the bill.",
  ],
  moreInfoLabel: "Learn more at cms.gov/nosurprises",
  moreInfoUrl: "https://www.cms.gov/nosurprises",
} as const;

/* -------------------------------------------------------------------------- */
/* Crisis resources                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Shown sitewide in the footer and on the pages where someone in distress is
 * most likely to land. Kept as data so the numbers are defined once.
 */
export const crisis = {
  note: "This website is not monitored for emergencies.",
  resources: [
    {
      name: "988 Suicide & Crisis Lifeline",
      detail: "Call or text 988",
      href: "tel:988",
    },
    {
      name: "Crisis Text Line",
      detail: "Text HOME to 741741",
      href: "sms:741741?&body=HOME",
    },
    {
      name: "Emergency services",
      detail: "Call 911",
      href: "tel:911",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Frequently asked questions                                                 */
/* -------------------------------------------------------------------------- */

export type Faq = {
  question: string;
  /** Plain-text answer. Rendered as-is and reused in FAQPage JSON-LD. */
  answer: string;
  /**
   * When false the entry is hidden from the page and from the structured data.
   * Used for questions whose real answer has not been confirmed yet — better a
   * shorter FAQ than a wrong one.
   */
  published?: boolean;
};

/**
 * The questions people actually search for before booking a therapist. Answers
 * are drawn only from what the rest of this file already asserts, so the FAQ
 * cannot drift out of sync with the rates or the booking setup.
 */
export const faqs: Faq[] = [
  {
    question: "Do you offer online or virtual sessions?",
    answer:
      "Yes. Sessions are available by secure video anywhere in Texas, or in person in Lewisville. Many clients mix the two depending on the week, and that is completely fine.",
    published: telehealth.offered,
  },
  {
    question: "How long is a session, and how much does it cost?",
    answer:
      "Sessions run 55 minutes. Individual counseling is $150 per session and couples or post-marital counseling is $175 per session. Family counseling and conflict resolution coaching are quoted after a short consultation, and Family Vision Casting is $500 for three sessions. The full rate menu is on the Services & Rates page.",
  },
  {
    question: "Do you accept insurance?",
    // Filled in from `insurance` above once confirmed; hidden until then.
    answer:
      "Please ask about insurance and payment options when you reach out and we will walk through what works for your situation.",
    published: insuranceIsConfigured,
  },
  {
    question: "What happens in the first session?",
    answer:
      "Mostly we talk. There is no clipboard and no forms to fill out in front of me. You share as much as you want about what brought you here, I ask questions, and by the end we agree on what would actually help — including whether I am the right person for it. If someone else would serve you better, I will say so and help you find them.",
  },
  {
    question: "Is this Christian counseling? Do I have to share your faith?",
    answer:
      "No, you do not. The practice is faith-inspired and people of every background are genuinely welcome. Biblical counseling is available if you want it, and your beliefs come into the work as much as you choose and no more. Faith is invited here, never forced.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "Choose a time on the online booking page, or call or email and we will find one together. There is no intake call to get through first.",
    published: schedulingIsConfigured,
  },
  {
    question: "What is your cancellation policy?",
    // TODO: confirm the notice window and any late-cancellation fee, then publish.
    answer: "",
    published: false,
  },
  {
    question: "Is what I say confidential?",
    answer:
      "Yes. What you share in session stays between us, with the narrow exceptions every counselor is legally required to observe — an imminent risk of serious harm to you or someone else, suspected abuse or neglect of a child or vulnerable adult, or a court order. I will walk you through these in your first session so there are no surprises.",
  },
  {
    question: "What if I am in crisis right now?",
    answer:
      "This website is not monitored for emergencies. If you are in immediate danger call 911. To reach a trained counselor right away, call or text 988 for the Suicide & Crisis Lifeline, or text HOME to 741741 for the Crisis Text Line.",
  },
];

/** Only the FAQ entries cleared for publication. */
export const publishedFaqs = faqs.filter(
  (faq) => faq.published !== false && faq.answer.length > 0,
);
