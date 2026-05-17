export const site = {
  name: "Agentive Labs",
  tagline: "Automate the busy. Amplify the human.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://agentivelabs.com",
  description:
    "AI automation agency for SMEs. Documented n8n, WhatsApp Cloud API, HubSpot, Shopify and RAG agent builds.",
  locale: "en_US",
  twitterHandle: "@agentivelabs",
  hq: {
    city: "Lahore",
    region: "Punjab",
    country: "PK",
    lat: 31.5204,
    lng: 74.3587,
  },
  contact: {
    sales: "+92-XXX-XXXXXXX",
    email: "hello@agentivelabs.com",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/agentive-labs",
    github: "https://github.com/agentive-labs",
    youtube: "https://www.youtube.com/@agentivelabs",
    crunchbase:
      "https://www.crunchbase.com/organization/agentive-labs",
  },
  areaServed: ["PK", "AE", "GB", "US", "CA", "SA"] as const,
  locations: [
    { code: "PK", label: "Lahore" },
    { code: "AE", label: "Dubai" },
    { code: "GB", label: "London" },
    { code: "US", label: "NYC" },
    { code: "CA", label: "Toronto" },
    { code: "SA", label: "Riyadh" },
  ],
  cal: {
    link: process.env.NEXT_PUBLIC_CAL_LINK ?? "agentivelabs/discovery",
  },
  plausible: {
    domain:
      process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "agentivelabs.com",
  },
  brand: {
    accentHex: "#34d4d9",
  },
} as const;

export type AreaCode = (typeof site.areaServed)[number];
