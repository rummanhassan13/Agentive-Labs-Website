import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Hero } from "@/components/hero/Hero";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { LocationStrip } from "@/components/trust/LocationStrip";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";
import { JsonLd } from "@/components/utility/JsonLd";
import { ORGANIZATION_ID } from "@/lib/jsonld/organization";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Agentive Labs",
  description:
    "AI automation agency founded in Lahore, serving SMEs across Pakistan, UAE, UK, USA, Canada and Saudi Arabia.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    title: "Document before you ship",
    body:
      "[Placeholder ~30 words] Every workflow ships with a runbook, an architecture diagram and a KPI dashboard. If we cannot describe it, we cannot run it — and neither can you after we leave.",
  },
  {
    title: "Outcome before effort",
    body:
      "[Placeholder ~30 words] We bill against agreed metrics, not hours logged. The 90-Day ROI Promise is in writing in every contract because it has to be — it is how we structure scope.",
  },
  {
    title: "Human in the loop",
    body:
      "[Placeholder ~30 words] No fully-autonomous black boxes. Every agent has an exception queue with a human reviewer and a documented escalation path. Automation amplifies people; it does not replace judgement.",
  },
  {
    title: "Self-host friendly",
    body:
      "[Placeholder ~30 words] We default to portable, fork-safe tools (n8n, Supabase, your CRM) so when we leave you take the keys, not a subscription. Lock-in is a planning failure, not a feature.",
  },
  {
    title: "Honest scope",
    body:
      "[Placeholder ~30 words] If a workflow is not a good automation candidate, we tell you and walk. The Discovery Sprint exists because we would rather quote nothing than scope wrong.",
  },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <Hero
        eyebrow="About"
        title="Documented AI automation, built for SMEs."
        sub="Agentive Labs is an AI automation agency founded in Lahore in 2024. We design, build and document AI workflows for small and mid-market businesses across PK, UAE, UK, USA, Canada and KSA."
        primaryCta={<BookSprintCta size="lg" />}
        microcopy={<LocationStrip />}
      />

      <Section pad="sm">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
            ]}
          />
        </Container>
      </Section>

      <Section pad="lg">
        <Container size="prose">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
            The story
          </div>
          <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
            Why we started this
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-fg-muted">
            <p>
              [Placeholder ~80 words] Founder story — what the founder saw in
              SME ops work, why generic AI tooling left teams stranded, and the
              wedge that became Agentive Labs.
            </p>
            <p>
              [Placeholder ~80 words] What we have learned shipping
              productized AI engagements: the patterns that repeat, the
              integrations we keep encountering, why documentation is the
              actual deliverable.
            </p>
          </div>
        </Container>
      </Section>

      <Section pad="lg" tone="contrast">
        <Container>
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
              How we work
            </div>
            <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
              Five principles, in writing
            </h2>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <li
                key={p.title}
                className="flex flex-col gap-3 rounded-2xl border border-border-subtle bg-surface-1 p-6"
              >
                <div className="font-mono text-3xl tracking-tight text-accent">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-serif text-xl tracking-tight">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-fg-muted">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section pad="lg">
        <Container size="prose">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
            Where we are
          </div>
          <h2 className="mt-3 font-serif text-3xl tracking-tight">
            Lahore HQ, serving six regions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            [Placeholder ~50 words] Our headquarters is in Lahore, Pakistan,
            with timezone overlap covering Gulf, UK, and East Coast US
            business hours. We work asynchronously with clients across UAE,
            UK, USA, Canada and Saudi Arabia and have shipped engagements
            entirely remote since day one.
          </p>
          <div className="mt-6">
            <LocationStrip className="justify-start" />
          </div>
        </Container>
      </Section>

      <Section pad="lg" tone="contrast">
        <Container size="prose">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
            Hiring
          </div>
          <h2 className="mt-3 font-serif text-3xl tracking-tight">
            We are hiring engineers and ops leads
          </h2>
          <p className="mt-4 text-base leading-relaxed text-fg-muted">
            [Placeholder ~50 words] We hire engineers who can ship, document
            and explain. If you have built production AI workflows on n8n,
            HubSpot, Shopify or Supabase, write to{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {site.contact.email}
            </a>
            . Roles open in Lahore, with remote considered for senior leads.
          </p>
        </Container>
      </Section>

      <FinalCtaBand />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "@id": `${site.url}/about#page`,
            url: `${site.url}/about`,
            name: `About ${site.name}`,
            mainEntity: { "@id": ORGANIZATION_ID },
          },
        ]}
      />
    </SiteShell>
  );
}
