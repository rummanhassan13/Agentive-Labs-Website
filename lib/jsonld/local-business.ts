import { site } from "@/lib/site";
import { ORGANIZATION_ID } from "@/lib/jsonld/organization";

export function localBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/contact/#localbusiness`,
    name: `${site.name} — Lahore HQ`,
    image: `${site.url}/office-lahore.jpg`,
    telephone: site.contact.sales,
    priceRange: "$$",
    currenciesAccepted: "USD, PKR, AED, GBP, SAR",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.hq.city,
      addressRegion: site.hq.region,
      addressCountry: site.hq.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.hq.lat,
      longitude: site.hq.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    parentOrganization: { "@id": ORGANIZATION_ID },
  };
}
