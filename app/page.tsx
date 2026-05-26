import type { Metadata } from "next";
import { services, portfolio } from "#site/content";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/hero/Hero";
import { WorkflowDiagram } from "@/components/hero/WorkflowDiagram";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { CtaButton } from "@/components/cta/CtaButton";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { KpiStrip } from "@/components/sections/KpiStrip";
import { FeatureBento, type FeatureItem } from "@/components/sections/FeatureBento";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { TestimonialTrio } from "@/components/sections/TestimonialTrio";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";
import { LocationStrip } from "@/components/trust/LocationStrip";
import { AutomationSandbox } from "@/components/sections/AutomationSandbox";
import { DynamicGrain } from "@/components/utility/DynamicGrain";

export const metadata: Metadata = {
  title: "Agentive Labs — Documented AI Automation for SMEs",
  description:
    "Owner-ready AI automations on n8n, WhatsApp Cloud API and HubSpot. Productized packages from $1,290. 90-day ROI promise.",
  alternates: { canonical: "/" },
};

const HOME_FAQS = [
  {
    q: "What does an AI automation agency do?",
    a: "An AI automation agency designs, builds and documents AI-powered workflows that remove repeatable operational work — lead capture, customer support triage, order reconciliation, content drafting, and similar. Agentive Labs ships fixed-scope packages from $1,290 with a 90-day ROI promise so the cost of switching is small and the upside is measurable.",
  },
  {
    q: "Do I need this if I already use Zapier?",
    a: "Zapier handles simple two-step automations well but breaks down on logic-heavy flows, exception handling and audit trails. We build on n8n (self-hostable, fork-safe) when you need conditional routing, retries, redactable logs and a dashboard. If your needs really are two steps and one trigger, Zapier is fine — we will tell you.",
  },
  {
    q: "How is this different from hiring a developer?",
    a: "A developer codes; an automation agency ships a documented system with KPIs and a hand-off. Every Agentive Labs build includes the workflow, a dashboard, an exceptions queue, a runbook, and a 90-day review. When we leave, your team owns the system — not a freelancer's laptop. Most engagements pay back in 60 days.",
  },
  {
    q: "Which industries do you work best with?",
    a: "We have deep patterns for Shopify D2C, marketing agencies, B2B SaaS, logistics, and education. Cross-cutting building blocks (WhatsApp, RAG, n8n, HubSpot, Supabase) apply broadly, so we also take on regulated SMEs with the right scoping conversation. Book the Discovery Sprint if you want a fit check.",
  },
  {
    q: "How long until something is live?",
    a: "Our productized packages ship in 14 to 28 days from contract signing. The Discovery Sprint runs 14 days and produces a documented build plan with a fixed quote. We do not run discovery indefinitely — every Agentive Labs engagement has a fixed scope, fixed price, and a documented end state.",
  },
  {
    q: "What if the build doesn't pay back?",
    a: "Every engagement ships with an agreed KPI and a 90-day review. If the metric is not hit by the review date, we extend the build at no cost until it is. This is the 90-Day ROI Promise and it is in writing in every contract. We can afford it because we scope around outcomes, not effort.",
  },
];

const KPIS = [
  { value: "<10 min", label: "First response time" },
  { value: "30–60%", label: "FAQ deflection" },
  { value: "−3 to −10 days", label: "DSO improvement" },
  { value: "90%+", label: "SLA compliance" },
];

const HOW_STEPS = [
  {
    number: "01",
    title: "Audit",
    body:
      "We map the workflow you want to remove, score the upside, and decide what to NOT automate. Written audit ships day 4.",
  },
  {
    number: "02",
    title: "Build",
    body:
      "Fixed scope, fixed price. We build on n8n + your existing stack, with daily progress visible in a shared board.",
  },
  {
    number: "03",
    title: "Document",
    body:
      "Every workflow ships with a runbook, an architecture diagram and a KPI dashboard. No tribal knowledge, no lock-in.",
  },
  {
    number: "04",
    title: "Hand-off",
    body:
      "Your team takes the keys with a 90-day support window and a documented exceptions queue. Review at day 90.",
  },
];

const PLACEHOLDER_LOGOS = [
  { name: "ACME D2C" },
  { name: "Northwind" },
  { name: "Initech" },
  { name: "Globex" },
  { name: "Hooli" },
  { name: "Soylent" },
];

export default function Home() {
  // Top 5 services for home bento (by order field)
  const bentoItems: FeatureItem[] = services
    .slice()
    .sort((a, b) => a.order - b.order)
    .slice(0, 5)
    .map((s, i) => ({
      title: s.shortName,
      body: s.summary,
      eyebrow: s.startingPriceUsd
        ? `${s.eyebrow ?? s.shortName} · $${s.startingPriceUsd.toLocaleString()}`
        : s.eyebrow,
      href: s.url,
      iconName: s.icon,
      span: i === 0 ? 7 : i === 1 || i === 2 ? 5 : 4,
    }));

  return (
    <SiteShell>
      <DynamicGrain />
      <Hero
        eyebrow="AI automation for SMEs · Lahore → Dubai · London · NYC · Toronto · Riyadh"
        title={
          <>
            Automate the busy. Amplify the{" "}
            <em className="font-serif italic">human</em>.
          </>
        }
        sub="Documented, secure automations on n8n, WhatsApp Cloud API, HubSpot and Shopify. Productized packages from $1,290. Backed by a 90-Day ROI Promise."
        primaryCta={
          <BookSprintCta size="lg" label="Book the Discovery Sprint" />
        }
        secondaryCta={
          <CtaButton variant="ghost" size="lg" href="/services">
            See how we work
          </CtaButton>
        }
        microcopy={
          <LocationStrip className="justify-center" />
        }
        visual={<WorkflowDiagram className="w-full h-auto" />}
      />

      <LogoMarquee logos={PLACEHOLDER_LOGOS} />

      <KpiStrip items={KPIS} eyebrow="What clients measure after we ship" />

      {/* Playable sandbox simulator */}
      <Section pad="lg">
        <Container>
          <AutomationSandbox />
        </Container>
      </Section>

      <Section pad="lg">
        <FeatureBento
          heading="What we build"
          intro="Seven productized packages that map to the work most SMEs spend 30+ hours a week on. Pick one to start, or book the Discovery Sprint and we'll tell you which to begin with."
          items={bentoItems}
        />
      </Section>

      <Section pad="lg" tone="contrast">
        <HowItWorks
          intro="Every engagement is fixed scope, fixed price, documented before hand-off. No hourly billing. No retainer creep."
          steps={HOW_STEPS}
        />
      </Section>

      {/* Dynamic Case Studies grid */}
      <Section pad="lg">
        <Container>
          <div className="max-w-2xl mb-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
              Case Studies
            </div>
            <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
              Audited Operational Reclaims
            </h2>
            <p className="mt-3 text-base leading-relaxed text-fg-muted">
              Real results. Documented infrastructure stacks. Click to read the full system design post-mortems.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {portfolio.slice(0, 2).map((p) => (
              <CaseStudyCard
                key={p.slug}
                metric={p.results.value}
                metricLabel={p.results.label}
                vertical={p.industry}
                client={p.client}
                summary={p.summary}
                href={`/portfolio/${p.slug}`}
                ctaLabel="See Case Study & Stack →"
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section pad="lg" tone="contrast">
        <TestimonialTrio />
      </Section>

      <Section pad="lg">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
                Pricing
              </div>
              <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
                Seven fixed-scope packages. $1,290 to $2,390.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-fg-muted">
                No hourly billing. No retainer creep. Each package ships with
                documentation, a dashboard and a 90-day review before we hand
                over the keys.
              </p>
            </div>
            <div className="md:col-span-5 md:text-right">
              <CtaButton variant="outline" size="lg" href="/pricing">
                See all packages →
              </CtaButton>
            </div>
          </div>
        </Container>
      </Section>

      <Section pad="lg" tone="contrast">
        <Container size="prose">
          <FaqAccordion items={HOME_FAQS} />
        </Container>
      </Section>

      <FinalCtaBand />
    </SiteShell>
  );
}
