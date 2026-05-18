import type { MetadataRoute } from "next";
import { services } from "#site/content";
import { site } from "@/lib/site";

const STATIC_PAGES = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/pricing", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/offers", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/security", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/legal/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  // Service entries link to /contact?package=<slug> for Phase 2 because
  // /services/[slug] detail pages ship in Phase 3. Once those exist, swap
  // the URL builder below to `${site.url}${s.url}` and Phase 3 will index
  // automatically.
  const serviceEntries: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/contact?package=${s.slug}&vertical=${s.vertical}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...serviceEntries];
}
