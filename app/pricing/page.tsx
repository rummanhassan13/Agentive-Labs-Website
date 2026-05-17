import type { Metadata } from "next";
import { services } from "#site/content";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Hero } from "@/components/hero/Hero";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { CtaButton } from "@/components/cta/CtaButton";
import {
  PricingTabs,
  type PricingPackage,
  type Vertical,
} from "@/components/sections/PricingTabs";
import { GuaranteeBand } from "@/components/trust/GuaranteeBand";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";
import { JsonLd } from "@/components/utility/JsonLd";
import { product } from "@/lib/jsonld/product";

export const metadata: Metadata = {
  title: "AI Automation Pricing — 7 Packages from $1,290",
  description:
    "WhatsApp Starter $1,290 · Social $1,390 · FAQ Bot $1,550 · Sales Chatbot $1,890 · Voice Agent Lite $2,390 · Lead-Gen $1,490 · Content Asst $1,290. USD, PKR available.",
  alternates: { canonical: "/pricing" },
};

const PRICING_FAQS = [
  {
    q: "How much does an AI automation agency cost?",
    a: "Agentive Labs scopes by outcome with fixed-price productized packages from $1,290 to $2,390 USD. Larger custom builds start around $5,000. We do not bill hourly — every engagement ships with documentation, a dashboard and KPI tracking before hand-off, and is covered by the 90-Day ROI Promise.",
  },
  {
    q: "What happens if scope grows mid-engagement?",
    a: "We don't run open scope. If a workflow turns out to be larger than the audit suggested, we pause at a documented checkpoint and quote the additional work. You can approve it, defer it, or walk away with what's already built. Most engagements ship in original scope; about 1 in 5 expands.",
  },
  {
    q: "Do you sign NDAs and MSAs?",
    a: "Yes. Standard mutual NDA on request before discovery. MSA + SOW per engagement covering IP ownership (you own everything we ship), data handling, and the 90-Day ROI Promise. We work under your paper if you have a preferred template — adds about 5 business days to kickoff.",
  },
  {
    q: "Who owns the code and the data?",
    a: "You do, end-to-end. Workflows live in your n8n instance (self-hosted or cloud), data stays in your stack, dashboards run on your accounts. We retain the right to anonymized case-study metrics only with your written approval. Nothing is hosted by Agentive Labs after hand-off.",
  },
];

export default function PricingPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
  ];

  // Map Velite services to PricingTabs packages. The home features service slugs;
  // pricing card "best for" derives from the eyebrow/title.
  const packages: PricingPackage[] = services
    .filter((s) => s.startingPriceUsd != null)
    .sort((a, b) => a.order - b.order)
    .map((s) => ({
      name: s.shortName,
      slug: s.slug,
      price: s.startingPriceUsd as number,
      bestFor: s.summary.split(/[.]/)[0],
      bullets: s.bullets.slice(0, 6),
      excludes: [
        "Custom CRM rebuilds beyond mapped fields",
        "Paid media buying and creative work",
      ],
      timelineDays: s.timelineDays,
      featured: s.featured,
      vertical: s.vertical as Vertical,
    }));

  const customCard = {
    name: "Custom build",
    price: "Quote",
    bestFor: "Workflows beyond the seven productized scopes",
    bullets: [
      "Scoped after a Discovery Sprint",
      "Custom RAG agents, voice flows, integrations",
      "Same documentation + 90-day promise",
      "Typically $5,000–$25,000 fixed",
    ],
    timelineDays: "Scoped per engagement",
  };

  return (
    <SiteShell>
      <Hero
        eyebrow="Pricing"
        title="Fixed-scope pricing. No hourly. No surprises."
        sub="From $1,290. Delivered in 14–28 days. Documented before we hand over the keys."
        primaryCta={<BookSprintCta size="lg" />}
        secondaryCta={
          <CtaButton variant="ghost" size="lg" href="/services">
            Compare services
          </CtaButton>
        }
      />

      <Section pad="sm">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </Section>

      <Section pad="lg">
        <Container size="wide">
          <PricingTabs packages={packages} customCard={customCard} />
        </Container>
      </Section>

      <Section pad="md" tone="contrast">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border-emphasis bg-surface-1 p-6 md:flex-row md:p-8">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
                Not sure which?
              </div>
              <p className="mt-1 font-serif text-xl tracking-tight">
                Book a 15-minute fit call — we&rsquo;ll point you at the right
                package.
              </p>
            </div>
            <BookSprintCta size="lg" />
          </div>
        </Container>
      </Section>

      <Section pad="lg">
        <Container>
          <details className="group rounded-2xl border border-border-subtle bg-surface-1 p-6 md:p-8">
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-serif text-2xl tracking-tight md:text-3xl">
                  Compare all 7 packages
                </h2>
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle group-open:rotate-180 transition-transform">
                  Expand ↓
                </span>
              </div>
            </summary>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead className="text-fg-muted">
                  <tr className="text-left">
                    <th className="sticky left-0 bg-surface-1 px-4 py-3 font-medium">
                      Package
                    </th>
                    <th className="px-4 py-3 font-medium">Price (USD)</th>
                    <th className="px-4 py-3 font-medium">Timeline</th>
                    <th className="px-4 py-3 font-medium">Best for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {services
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((s) => (
                      <tr key={s.slug}>
                        <td className="sticky left-0 bg-surface-1 px-4 py-3 font-medium text-fg">
                          {s.shortName}
                        </td>
                        <td className="px-4 py-3 font-mono text-fg">
                          {s.startingPriceUsd
                            ? `$${s.startingPriceUsd.toLocaleString()}`
                            : "Quote"}
                        </td>
                        <td className="px-4 py-3 text-fg-muted">
                          {s.timelineDays} days
                        </td>
                        <td className="px-4 py-3 text-fg-muted">
                          {s.summary.split(/[.]/)[0]}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </details>
        </Container>
      </Section>

      <Section pad="lg" tone="contrast">
        <Container size="prose">
          <GuaranteeBand />
        </Container>
      </Section>

      <Section pad="lg">
        <Container size="prose">
          <FaqAccordion items={PRICING_FAQS} />
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
            USD primary. PKR available. AED · GBP · SAR on request.
          </p>
        </Container>
      </Section>

      <FinalCtaBand />

      <JsonLd
        data={services
          .filter((s) => s.startingPriceUsd != null && s.productSku)
          .map((s) =>
            product({
              name: s.title,
              sku: s.productSku as string,
              description: s.summary,
              price: s.startingPriceUsd as number,
            })
          )}
      />
    </SiteShell>
  );
}
