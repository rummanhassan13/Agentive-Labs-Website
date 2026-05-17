import { site } from "@/lib/site";
import { ORGANIZATION_ID } from "@/lib/jsonld/organization";

export interface ServiceJsonLdInput {
  slug: string;
  serviceType: string;
  name: string;
  description: string;
  price?: number;
  priceCurrency?: string;
}

export function service(input: ServiceJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/services/${input.slug}#service`,
    serviceType: input.serviceType,
    name: input.name,
    description: input.description,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Saudi Arabia" },
    ],
    audience: {
      "@type": "BusinessAudience",
      audienceType: "SME / D2C / Agency",
    },
    ...(input.price != null && {
      offers: {
        "@type": "Offer",
        price: String(input.price),
        priceCurrency: input.priceCurrency ?? "USD",
        availability: "https://schema.org/InStock",
      },
    }),
  };
}
