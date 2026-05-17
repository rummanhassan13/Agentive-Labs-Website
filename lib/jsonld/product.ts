import { ORGANIZATION_ID } from "@/lib/jsonld/organization";

export interface ProductJsonLdInput {
  name: string;
  sku: string;
  description: string;
  price: number;
  priceCurrency?: string;
}

export function product(input: ProductJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    brand: { "@type": "Brand", name: "Agentive Labs" },
    sku: input.sku,
    offers: {
      "@type": "Offer",
      price: String(input.price),
      priceCurrency: input.priceCurrency ?? "USD",
      availability: "https://schema.org/InStock",
      seller: { "@id": ORGANIZATION_ID },
    },
  };
}
