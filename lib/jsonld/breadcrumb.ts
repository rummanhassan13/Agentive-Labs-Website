import { site } from "@/lib/site";

export interface BreadcrumbSegment {
  name: string;
  url: string;
}

export function breadcrumbList(segments: BreadcrumbSegment[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: segments.map((seg, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: seg.name,
      item: seg.url.startsWith("http") ? seg.url : `${site.url}${seg.url}`,
    })),
  };
}
