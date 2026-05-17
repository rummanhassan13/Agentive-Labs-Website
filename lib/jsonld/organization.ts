import { site } from "@/lib/site";

export const ORGANIZATION_ID = `${site.url}/#organization`;

export function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: site.name,
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/logo.png`,
      width: 512,
      height: 512,
    },
    description: site.description,
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.hq.city,
      addressRegion: site.hq.region,
      addressCountry: site.hq.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.contact.sales,
        contactType: "sales",
        areaServed: [...site.areaServed],
        availableLanguage: ["English", "Urdu", "Arabic"],
      },
    ],
    sameAs: [
      site.social.linkedin,
      site.social.github,
      site.social.youtube,
      site.social.crunchbase,
    ],
    knowsAbout: [
      "AI automation",
      "n8n",
      "WhatsApp Cloud API",
      "RAG agents",
      "HubSpot",
      "Shopify",
      "Supabase",
    ],
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Saudi Arabia" },
    ],
  };
}

export function website() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-US",
  };
}
