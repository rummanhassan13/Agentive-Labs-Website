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

const portfolio = defineCollection({
  name: "PortfolioItem",
  pattern: "portfolio/**/*.mdx",
  schema: s
    .object({
      slug: s.slug("portfolio"),
      title: s.string(),
      client: s.string(),
      industry: s.string(),
      summary: s.string(),
      results: s.object({
        value: s.string(),
        label: s.string(),
      }),
      servicesRelated: s.array(s.string()),
      deliverables: s.array(s.string()),
      techStack: s.array(s.string()),
      timelineDays: s.string(),
      featured: s.boolean().default(false),
      order: s.number().default(99),
      seo: seo.optional(),
      metadata: s.metadata(),
      body: s.mdx(),
    })
    .transform((d) => ({ ...d, url: `/portfolio/${d.slug}` })),
});

const blog = defineCollection({
  name: "BlogPost",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      slug: s.slug("blog"),
      title: s.string(),
      excerpt: s.string(),
      date: s.isodate(),
      author: s.object({
        name: s.string(),
        role: s.string(),
        avatar: s.string().optional(),
      }),
      tags: s.array(s.string()).default([]),
      readTime: s.string(),
      featured: s.boolean().default(false),
      seo: seo.optional(),
      metadata: s.metadata(),
      body: s.mdx(),
    })
    .transform((d) => ({ ...d, url: `/blog/${d.slug}` })),
});

const team = defineCollection({
  name: "TeamMember",
  pattern: "team/**/*.mdx",
  schema: s
    .object({
      slug: s.slug("team"),
      name: s.string(),
      role: s.string(),
      bio: s.string(),
      expertise: s.array(s.string()).default([]),
      socialLinks: s
        .object({
          linkedin: s.string().optional(),
          github: s.string().optional(),
          twitter: s.string().optional(),
        })
        .optional(),
      order: s.number().default(99),
      metadata: s.metadata(),
      body: s.mdx(),
    })
    .transform((d) => ({ ...d, url: `/team/${d.slug}` })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    clean: true,
  },
  collections: { services, portfolio, blog, team },
});
