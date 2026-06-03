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
  tagline:
    "Counseling that cares for your heart, mind, and faith, at a pace that feels right for you.",
  // TODO: replace with the practice's real contact details.
  email: "hello@aboveallelse.example", // TODO
  phone: "(555) 123-4567", // TODO
  phoneHref: "tel:+15551234567", // TODO
  address: "123 Wellness Way, Suite 100, Your City, ST 00000", // TODO — in-person sessions
  // TODO: paste the practice's Calendly/Acuity scheduling link here.
  // e.g. "https://calendly.com/your-practice/intro-call"
  schedulingUrl: "https://calendly.com/your-account/intro-call", // TODO
  social: {
    facebook: "", // TODO (optional)
    instagram: "", // TODO (optional)
  },
  // This is a solo practice — one counselor. Used in the about-page signature
  // and anywhere the site speaks in a personal voice.
  practitioner: {
    name: "Lisa Jefferson Norman",
    // M.A. in Marriage & Family Therapy (per bio). TODO: add a state license
    // (e.g. LMFT) here if/when one should be shown publicly.
    credentials: "M.A., Marriage & Family Therapy",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services & Pricing", href: "/services" },
  { label: "New Client Intake", href: "/intake" },
  { label: "Contact", href: "/contact" },
] as const;

/** A short, human list of what visitors can do here (drawn from the goals doc). */
export const goals = [
  "Find the kind of counseling that fits where you are right now",
  "See exactly what everything costs, with no surprises",
  "Hear from people who've sat in the same chair you're in",
  "Book a time online whenever you're ready",
  "Get a feel for who I am before you ever pick up the phone",
] as const;

export type Service = {
  name: string;
  description: string;
  /** e.g. "$120 / 50-min session" — keep pricing clear and upfront. */
  price: string;
  duration?: string;
};

// TODO: replace with the real service list + pricing from the requirements doc.
export const services: Service[] = [
  {
    name: "Individual Counseling",
    description:
      "A space that's just yours. We'll work through anxiety, depression, grief, big life changes, or whatever's weighing on you, one honest conversation at a time.",
    price: "$120",
    duration: "50-minute session",
  },
  {
    name: "Couples Counseling",
    description:
      "When talking has gotten hard, I'll help you find your way back to each other. Better communication, more trust, and a little more grace for one another.",
    price: "$150",
    duration: "60-minute session",
  },
  {
    name: "Family Counseling",
    description:
      "Families are complicated, and that's okay. I'll help everyone feel heard and work through the hard stuff together, without anyone being the problem.",
    price: "$150",
    duration: "60-minute session",
  },
  {
    name: "Faith-Inspired Wellness Coaching",
    description:
      "For when you want your faith to be part of the work. I weave in spiritual practice and whole-person wellness, only as much as you'd like.",
    price: "$100",
    duration: "50-minute session",
  },
  {
    name: "Free Introductory Call",
    description:
      "Not sure where to start? Let's talk for 15 minutes, no pressure. You can ask questions and see if we're the right fit before booking anything.",
    price: "Free",
    duration: "15 minutes",
  },
];

export type Testimonial = {
  quote: string;
  attribution: string;
};

// TODO: replace with real (permission-given) client testimonials.
export const testimonials: Testimonial[] = [
  {
    quote:
      "I almost canceled my first appointment. I'm so glad I didn't. I've never felt so listened to.",
    attribution: "Individual counseling client",
  },
  {
    quote:
      "My husband and I were barely speaking. Six months later we actually laugh together again. That's not nothing.",
    attribution: "Couples counseling client",
  },
  {
    quote:
      "They made room for my faith without ever pushing it. Booking was easy and I always knew what I'd be paying.",
    attribution: "Wellness coaching client",
  },
];

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
