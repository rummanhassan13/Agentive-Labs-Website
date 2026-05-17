import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Hero } from "@/components/hero/Hero";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { CtaButton } from "@/components/cta/CtaButton";
import { GuaranteeBand } from "@/components/trust/GuaranteeBand";
import { TrustQuote } from "@/components/trust/TrustQuote";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";
import { JsonLd } from "@/components/utility/JsonLd";
import { service } from "@/lib/jsonld/service";

export const metadata: Metadata = {
  title: "Discovery Sprint & AI Support Agent",
  description:
    "Two gateway engagements: a 14-day Discovery Sprint and a 21–28 day AI Support Agent build. Fixed price, documented, KPI-driven.",
  alternates: { canonical: "/offers" },
};

const SPRINT_DAYS = [
  { day: "Day 1–2", title: "Kickoff + audit", body: "[Placeholder] Workflow inventory, stakeholder interviews, current-state mapping." },
  { day: "Day 3–7", title: "Architecture", body: "[Placeholder] Reference architecture for the highest-ROI workflow, including data flow + exception handling." },
  { day: "Day 8–11", title: "Prototype", body: "[Placeholder] Working proof of concept on a single workflow with sample data and KPI baseline." },
  { day: "Day 12–14", title: "Build plan + quote", body: "[Placeholder] Fixed-scope build plan, KPI targets and a quote for the next phase." },
];

const SUPPORT_AGENT_PILLARS = [
  { title: "RAG over your docs", body: "[Placeholder] Knowledge base ingestion, chunking strategy, eval framework on a 50-question test set." },
  { title: "Exception queue", body: "[Placeholder] Every low-confidence answer is routed to a human reviewer with full conversation context." },
  { title: "Operator dashboard", body: "[Placeholder] FRT, deflection rate, accuracy and leak rate reported weekly with trend lines." },
];

const OFFERS_FAQS = [
  { q: "Do I have to commit to the full build after the Sprint?", a: "[Placeholder — 40–60 word answer.] No commitment beyond the Discovery Sprint itself. At the end of 14 days you have a documented build plan and a fixed quote; you can take it elsewhere, defer, or proceed with us. Most teams proceed because the quote is firm and the scope is theirs to keep." },
  { q: "What if our workflow doesn't fit one of the seven packages?", a: "[Placeholder — 40–60 word answer.] The Discovery Sprint produces a custom-build quote in addition to mapping to existing packages. Roughly half of our engagements end up bundling two packages; the rest are either a single package or a one-off custom build. Either way the price and timeline come out of the Sprint." },
  { q: "Who owns the prototype built during the Sprint?", a: "[Placeholder — 40–60 word answer.] You do. The prototype, architecture and build plan all transfer to you at the end of Day 14 regardless of whether you continue with Agentive Labs. We license nothing; the IP is yours. Documented in the MSA before kickoff." },
  { q: "Can we run the Sprint in parallel with our own discovery?", a: "[Placeholder — 40–60 word answer.] Yes — many clients run our Sprint alongside an internal sponsor's analysis. We work asynchronously with daily standups and a Friday review, so it should take 1–2 hours per week of your team's time. Total client effort across 14 days is under 10 hours." },
];

export default function OffersPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Offers", href: "/offers" },
  ];

  return (
    <SiteShell>
      <Hero
        eyebrow="Signature offers"
        title="Start with a Discovery Sprint. Ship the AI Support Agent."
        sub="Two gateway engagements designed to remove the busy first. Fixed price, documented, KPI-driven — and either one transfers in full to your team."
        primaryCta={<BookSprintCta size="lg" />}
        secondaryCta={
          <CtaButton variant="ghost" size="lg" href="/pricing">
            See all packages
          </CtaButton>
        }
      />

      <Section pad="sm">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </Section>

      {/* Two-column offer comparison */}
      <Section pad="lg">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-2xl border border-accent bg-surface-1 p-8 ring-1 ring-accent/30">
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
                Discovery Sprint · 14 days · $2,490
              </div>
              <h2 className="font-serif text-3xl tracking-tight">
                Discovery Sprint
              </h2>
              <p className="text-base leading-relaxed text-fg-muted">
                [Placeholder] A 14-day engagement that turns &lsquo;we should
                automate something&rsquo; into a fixed-scope, fixed-price build
                plan. You walk away with a working prototype, a reference
                architecture, and a quote you can take to any agency.
              </p>
              <ul className="space-y-2 text-sm text-fg-muted">
                <li>· Workflow audit + opportunity scoring</li>
                <li>· Working prototype of the top-ROI flow</li>
                <li>· Documented build plan + fixed quote</li>
                <li>· KPI baseline + measurement plan</li>
              </ul>
              <div className="mt-2">
                <BookSprintCta size="lg" className="w-full" />
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-border-subtle bg-surface-1 p-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
                AI Support Agent · 21–28 days · $1,550–$4,200
              </div>
              <h2 className="font-serif text-3xl tracking-tight">
                AI Support Agent
              </h2>
              <p className="text-base leading-relaxed text-fg-muted">
                [Placeholder] Production RAG agent that answers customer
                questions in under 10 minutes, hands off to humans on exceptions,
                and reports weekly on accuracy and deflection. Built on
                Supabase pgvector with eval framework included.
              </p>
              <ul className="space-y-2 text-sm text-fg-muted">
                <li>· RAG over your knowledge base</li>
                <li>· Exception queue with reviewer dashboard</li>
                <li>· Weekly accuracy + deflection report</li>
                <li>· Documented runbook for ops team</li>
              </ul>
              <div className="mt-2">
                <CtaButton
                  variant="outline"
                  size="lg"
                  href="/contact?package=ai-faq-chatbot-web"
                  className="w-full"
                >
                  Scope this build
                </CtaButton>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Discovery Sprint anatomy */}
      <Section pad="lg" tone="contrast">
        <Container>
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
              Discovery Sprint anatomy
            </div>
            <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
              Day-by-day timeline
            </h2>
            <p className="mt-3 text-base leading-relaxed text-fg-muted">
              [Placeholder] Each Sprint runs to a fixed 14-day calendar with
              daily checkpoints. We do this synchronously enough to stay aligned
              and asynchronously enough that your team only spends about 8–10
              hours total across the two weeks.
            </p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-4">
            {SPRINT_DAYS.map((d) => (
              <li
                key={d.day}
                className="flex flex-col gap-2 rounded-2xl border border-border-subtle bg-surface-1 p-6"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
                  {d.day}
                </div>
                <h3 className="font-serif text-lg tracking-tight">{d.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{d.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* AI Support Agent anatomy */}
      <Section pad="lg">
        <Container>
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
              AI Support Agent anatomy
            </div>
            <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
              Three things every Support Agent ships with
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {SUPPORT_AGENT_PILLARS.map((p) => (
              <div
                key={p.title}
                className="flex flex-col gap-3 rounded-2xl border border-border-subtle bg-surface-1 p-6"
              >
                <h3 className="font-serif text-xl tracking-tight">{p.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Who this is for / not for */}
      <Section pad="lg" tone="contrast">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border-subtle bg-surface-1 p-8">
              <h3 className="font-serif text-2xl tracking-tight">
                Who this is for
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-fg-muted">
                <li>· [Placeholder] SMEs with 10–250 employees and a defined ops pain</li>
                <li>· [Placeholder] Teams already using HubSpot, Shopify, n8n or Zapier</li>
                <li>· [Placeholder] Owners or COOs who can sign off on a fixed-scope build</li>
                <li>· [Placeholder] Teams ready to take ownership after hand-off</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-border-subtle bg-surface-1 p-8">
              <h3 className="font-serif text-2xl tracking-tight">
                Who this is <em className="italic">not</em> for
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-fg-muted">
                <li>· [Placeholder] Teams looking to outsource ongoing operations</li>
                <li>· [Placeholder] Engineering-heavy companies who prefer in-house builds</li>
                <li>· [Placeholder] Pre-product startups without a workflow to remove yet</li>
                <li>· [Placeholder] Compliance-heavy regulated industries (we scope these separately)</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section pad="lg">
        <Container size="prose">
          <TrustQuote
            quote="[Placeholder testimonial — real quote pending before launch.]"
            attribution="[Placeholder, Role, Company]"
          />
        </Container>
      </Section>

      <Section pad="lg" tone="contrast">
        <Container size="prose">
          <GuaranteeBand />
        </Container>
      </Section>

      <Section pad="lg">
        <Container size="prose">
          <FaqAccordion items={OFFERS_FAQS} />
        </Container>
      </Section>

      <FinalCtaBand
        heading="Ready to scope the first sprint?"
        ctaLabel="Book the Discovery Sprint"
      />

      <JsonLd
        data={[
          service({
            slug: "discovery-sprint",
            serviceType: "Discovery Sprint",
            name: "Discovery Sprint",
            description:
              "14-day engagement producing a fixed-scope build plan, working prototype and quote.",
            price: 2490,
          }),
          service({
            slug: "ai-faq-chatbot-web",
            serviceType: "AI Support Agent",
            name: "AI Support Agent",
            description:
              "Production RAG agent on Supabase pgvector with exception queue and operator dashboard.",
            price: 1550,
          }),
        ]}
      />
    </SiteShell>
  );
}
