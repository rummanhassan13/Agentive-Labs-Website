import { defineConfig, defineCollection, s } from "velite";

const seo = s.object({
  metaTitle: s.string().max(70).optional(),
  metaDescription: s.string().max(160).optional(),
  ogImage: s.string().optional(),
  canonical: s.string().url().optional(),
  noindex: s.boolean().default(false),
});

const services = defineCollection({
  name: "Service",
  pattern: "services/**/*.mdx",
  schema: s
    .object({
      slug: s.slug("services"),
      title: s.string(),
      shortName: s.string(),
      eyebrow: s.string().optional(),
      summary: s.string().max(220),
      icon: s.string(),
      bullets: s.array(s.string()).min(3).max(8),
      deliverables: s.array(s.string()),
      timelineDays: s.string(),
      startingPriceUsd: s.number().optional(),
      productSku: s.string().optional(),
      vertical: s
        .enum([
          "shopify-d2c",
          "agency",
          "logistics",
          "education",
          "b2b-saas",
          "all",
        ])
        .default("all"),
      primaryCta: s.string().default("Book the Discovery Sprint"),
      ctaHref: s.string().default("/contact"),
      faqs: s
        .array(
          s.object({
            q: s.string(),
            a: s.string().min(40).max(400),
          })
        )
        .optional(),
      relatedServices: s.array(s.string()).optional(),
      featured: s.boolean().default(false),
      order: s.number().default(99),
      seo: seo.optional(),
      metadata: s.metadata(),
      body: s.mdx(),
    })
    .transform((d) => ({ ...d, url: `/services/${d.slug}` })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    clean: true,
  },
  collections: { services },
});
