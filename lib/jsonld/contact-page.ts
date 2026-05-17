import { site } from "@/lib/site";
import { ORGANIZATION_ID } from "@/lib/jsonld/organization";

export function contactPage() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${site.url}/contact#page`,
    name: `Contact ${site.name}`,
    url: `${site.url}/contact`,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": ORGANIZATION_ID },
  };
}
