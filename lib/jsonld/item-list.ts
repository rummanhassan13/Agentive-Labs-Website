import { site } from "@/lib/site";

export interface ItemListEntry {
  name: string;
  url: string;
  description?: string;
}

export function itemList(name: string, items: ItemListEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url.startsWith("http") ? it.url : `${site.url}${it.url}`,
      ...(it.description && { description: it.description }),
    })),
  };
}
