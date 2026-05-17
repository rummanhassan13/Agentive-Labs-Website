import type { Metadata } from "next";
import { services } from "#site/content";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Hero } from "@/components/hero/Hero";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { CtaButton } from "@/components/cta/CtaButton";
import { FeatureBento, type FeatureItem } from "@/components/sections/FeatureBento";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { GuaranteeBand } from "@/components/trust/GuaranteeBand";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";
import { JsonLd } from "@/components/utility/JsonLd";
import { itemList } from "@/lib/jsonld/item-list";

export const metadata: Metadata = {
  title: "AI Automation Services for SMEs",
  description:
    "WhatsApp, Sales, Support, Voice, Lead-Gen, Content and FAQ automations. Fixed scope, documented, owner-ready.",
  alternates: { canonical: "/services" },
};

const SERVICES_FAQS = [
  {
    q: "Which service should I start with?",
    a: "Most teams start with the AI Lead-Gen Kit or WhatsApp Automation Starter — they hit the hottest workflow first (lead routing, first-response time) and ship in 14 days. Book the Discovery Sprint if you want a fit check; we'll tell you which of the seven packages will pay back fastest for your specific stack.",
  },
  {
    q: "Can you combine multiple services?",
    a: "Yes — Lead-Gen + WhatsApp + AI Support Triage is a common bundle for D2C and agencies. We scope combinations during the Discovery Sprint and quote a single fixed price. Each layer ships independently with its own documentation, so you can pause or extend without orphaning prior work.",
  },
  {
    q: "Do you build white-label automation for agencies?",
    a: "Yes. Marketing and ops agencies use Agentive Labs as a build partner: we ship the n8n flows, dashboards and runbooks under your brand, your client never sees us. Pricing matches the seven productized packages with a partner discount. Ask about agency terms when you book.",
  },
  {
    q: "What's not included?",
    a: "We do not ship custom CRM implementations from scratch, build mobile apps, or run paid media. Each package has an explicit 'not included' list so you know exactly what we ship. If a workflow you need isn't on the seven packages, the custom-quote tier covers it after a Discovery Sprint.",
  },
];

export default function ServicesIndex() {
  const sorted = services.slice().sort((a, b) => a.order - b.order);

  const bentoItems: FeatureItem[] = sorted.map((s, i) => ({
    title: s.shortName,
    body: s.summary,
    eyebrow: s.startingPriceUsd
      ? `${s.eyebrow ?? s.shortName} · $${s.startingPriceUsd.toLocaleString()}`
      : s.eyebrow,
    href: `/contact?package=${s.slug}&vertical=${s.vertical}`,
    iconName: s.icon,
    // Bento layout: 7-col + 5-col, 5-col + 4-col + 4-col, 4-col + 6-col + 6-col
    span: (
      [
        7, // 0
        5, // 1
        5, // 2
        4, // 3
        4, // 4
        4, // 5
        12, // 6 (last, full width)
      ] as const
    )[i],
  }));

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
  ];

  return (
    <SiteShell>
      <Hero
        eyebrow="Services"
        title="Seven productized automations. One way of working."
        sub="WhatsApp, Sales, Support, Voice, Lead-Gen, Content and FAQ. Each one fixed scope, documented, with a dashboard and a 90-day review before we hand over the keys."
        primaryCta={<BookSprintCta size="lg" />}
        secondaryCta={
          <CtaButton variant="ghost" size="lg" href="/pricing">
            See pricing
          </CtaButton>
        }
      />

      <Section pad="sm">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </Section>

      <Section pad="lg">
        <FeatureBento items={bentoItems} heading="All seven packages" />
      </Section>

      <Section pad="lg" tone="contrast">
        <Container>
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
              How we compare
            </div>
            <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
              Services vs typical agency vs DIY Zapier
            </h2>
          </div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-border-subtle">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-surface-2 text-fg-muted">
                <tr className="text-left">
                  <th className="px-5 py-4 font-medium">&nbsp;</th>
                  <th className="px-5 py-4 font-medium text-fg">
                    Agentive Labs
                  </th>
                  <th className="px-5 py-4 font-medium">Typical agency</th>
                  <th className="px-5 py-4 font-medium">DIY Zapier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle bg-surface-1">
                {[
                  [
                    "Pricing",
                    "Fixed scope, $1,290–$2,390",
                    "Hourly or retainer",
                    "$0–$300/mo per workflow",
                  ],
                  [
                    "Timeline",
                    "14–28 days",
                    "8–16 weeks",
                    "Hours, but breaks at scale",
                  ],
                  [
                    "Documentation",
                    "Runbook + KPI dashboard ships day 1",
                    "Optional, often skipped",
                    "Whatever you write yourself",
                  ],
                  [
                    "Exception handling",
                    "Daily queue with review workflow",
                    "Ad hoc",
                    "Silent failure until you notice",
                  ],
                  [
                    "Lock-in",
                    "n8n self-host portable; full handover",
                    "Agency-coded, agency-owned",
                    "Zapier-only",
                  ],
                ].map(([label, a, b, c]) => (
                  <tr key={label}>
                    <td className="px-5 py-4 font-medium text-fg">{label}</td>
                    <td className="px-5 py-4 text-fg">{a}</td>
                    <td className="px-5 py-4 text-fg-muted">{b}</td>
                    <td className="px-5 py-4 text-fg-muted">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section pad="lg">
        <Container size="prose">
          <GuaranteeBand />
        </Container>
      </Section>

      <Section pad="lg" tone="contrast">
        <Container size="prose">
          <FaqAccordion items={SERVICES_FAQS} />
        </Container>
      </Section>

      <FinalCtaBand />

      <JsonLd
        data={itemList(
          "AI automation services",
          sorted.map((s) => ({
            name: s.title,
            url: s.url,
            description: s.summary,
          }))
        )}
      />
    </SiteShell>
  );
}
