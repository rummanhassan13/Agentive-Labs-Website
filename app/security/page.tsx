import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Hero } from "@/components/hero/Hero";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security & compliance posture",
  description:
    "How Agentive Labs handles data, which sub-processors and model providers we use, retention policy, and our honest compliance posture.",
  alternates: { canonical: "/security" },
};

const SUB_PROCESSORS = [
  { name: "Vercel", purpose: "Web hosting + CDN", region: "Global edge" },
  { name: "Cal.com", purpose: "Scheduling embed", region: "EU + US" },
  { name: "OpenAI", purpose: "LLM provider (where used)", region: "US" },
  { name: "Anthropic", purpose: "LLM provider (where used)", region: "US" },
  { name: "Supabase", purpose: "Database + pgvector (where used)", region: "Per-client" },
  { name: "HubSpot", purpose: "CRM integration (where used)", region: "US / EU" },
  { name: "Plausible", purpose: "Analytics (cookieless)", region: "EU" },
];

export default function SecurityPage() {
  return (
    <SiteShell>
      <Hero
        eyebrow="Security & compliance"
        title="Honest about what we do and what we don't."
        sub="We are not SOC 2 certified. This page is the truth about how we handle your data, which sub-processors we use, and what we will and won't ship in a build."
        primaryCta={<BookSprintCta size="lg" label="Talk to security" />}
      />

      <Section pad="sm">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Security", href: "/security" },
            ]}
          />
        </Container>
      </Section>

      <Section pad="lg">
        <Container size="prose">
          <div className="rounded-2xl border border-accent/40 bg-accent-muted p-6">
            <h2 className="font-serif text-2xl tracking-tight">
              The honest compliance statement
            </h2>
            <p className="mt-3 text-base leading-relaxed text-fg-muted">
              [Placeholder ~80 words] Agentive Labs does not currently hold
              SOC 2 Type II, ISO 27001 or HIPAA attestations. We follow the
              principles those frameworks codify — least-privilege access,
              encryption in transit and at rest, audit logging, breach
              notification — but we do not advertise badges we have not
              earned. If your procurement team requires formal attestation,
              we can introduce sub-processors that do.
            </p>
          </div>
        </Container>
      </Section>

      <Section pad="lg" tone="contrast">
        <Container size="prose" id="data">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
            Data flow
          </div>
          <h2 className="mt-3 font-serif text-3xl tracking-tight">
            Where your data lives during an engagement
          </h2>
          <ol className="mt-6 space-y-4 text-base leading-relaxed text-fg-muted">
            <li>
              <strong className="text-fg">1. Discovery.</strong> [Placeholder]
              We collect only what is needed to scope the build — workflow
              descriptions, screenshots with PII redacted, sample data on
              request. Everything sits in a per-client encrypted folder on
              Google Workspace until the engagement closes.
            </li>
            <li>
              <strong className="text-fg">2. Build.</strong> [Placeholder]
              Workflows are developed in your n8n instance (cloud or
              self-hosted) and your accounts on third-party tools. We do
              not host your production data on Agentive Labs infrastructure.
            </li>
            <li>
              <strong className="text-fg">3. Hand-off.</strong> [Placeholder]
              Documentation, dashboards and credentials all transfer to your
              team. We retain only the architecture diagrams (anonymized) for
              internal reference, plus opt-in case-study metrics.
            </li>
          </ol>
        </Container>
      </Section>

      <Section pad="lg">
        <Container id="sub-processors">
          <div className="max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
              Sub-processors
            </div>
            <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
              Who touches your data and why
            </h2>
            <p className="mt-3 text-base leading-relaxed text-fg-muted">
              The list below is the full set of third-party services
              Agentive Labs uses internally and may introduce into your
              build with your approval. We publish this list because hidden
              sub-processors are a procurement red flag.
            </p>
          </div>
          <div className="mt-8 overflow-x-auto rounded-2xl border border-border-subtle">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-surface-2 text-fg-muted">
                <tr className="text-left">
                  <th className="px-5 py-4 font-medium">Service</th>
                  <th className="px-5 py-4 font-medium">Purpose</th>
                  <th className="px-5 py-4 font-medium">Region</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle bg-surface-1">
                {SUB_PROCESSORS.map((sp) => (
                  <tr key={sp.name}>
                    <td className="px-5 py-4 font-medium text-fg">
                      {sp.name}
                    </td>
                    <td className="px-5 py-4 text-fg-muted">{sp.purpose}</td>
                    <td className="px-5 py-4 text-fg-muted">{sp.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-fg-subtle">
            [Placeholder] Each engagement includes a written sub-processor
            addendum listing only the providers you approve. Any change
            during the engagement triggers a 14-day notification to the
            client&rsquo;s designated security contact.
          </p>
        </Container>
      </Section>

      <Section pad="lg" tone="contrast">
        <Container size="prose">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
            Model providers
          </div>
          <h2 className="mt-3 font-serif text-3xl tracking-tight">
            LLMs we use, and the data-retention defaults
          </h2>
          <ul className="mt-6 space-y-3 text-base leading-relaxed text-fg-muted">
            <li>
              <strong className="text-fg">OpenAI API.</strong> [Placeholder]
              We use the no-training-default endpoints; data is retained for
              30 days for abuse monitoring then deleted unless your build is
              under a Zero Retention Agreement (we will set this up on
              request for Enterprise tier clients).
            </li>
            <li>
              <strong className="text-fg">Anthropic API.</strong>
              [Placeholder] No training on customer data by default.
              Retention windows are configured per engagement.
            </li>
            <li>
              <strong className="text-fg">Self-hosted (where required).</strong>{" "}
              [Placeholder] For regulated industries we ship to a self-hosted
              model on your infrastructure. This costs more but the data
              never leaves your network.
            </li>
          </ul>
        </Container>
      </Section>

      <Section pad="lg">
        <Container size="prose">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
            Retention
          </div>
          <h2 className="mt-3 font-serif text-3xl tracking-tight">
            How long we keep what
          </h2>
          <ul className="mt-6 space-y-3 text-base leading-relaxed text-fg-muted">
            <li>
              <strong className="text-fg">Discovery materials</strong>{" "}
              (interview notes, sample data) — [Placeholder] deleted within
              30 days of engagement close unless contractually required to
              retain.
            </li>
            <li>
              <strong className="text-fg">Architecture + runbooks</strong> —
              [Placeholder] anonymized copies retained indefinitely for
              internal pattern library. Client logos and identifiers
              scrubbed.
            </li>
            <li>
              <strong className="text-fg">Production data</strong> —
              [Placeholder] never copied to Agentive Labs infrastructure.
              Stays on your stack.
            </li>
          </ul>
        </Container>
      </Section>

      <Section pad="lg" tone="contrast">
        <Container size="prose">
          <h2 className="font-serif text-3xl tracking-tight">
            Questions, or a security review?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-fg-muted">
            Write to{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {site.contact.email}
            </a>{" "}
            and we will route you to the right person. For procurement
            questionnaires, expect a turnaround of 5 business days.
          </p>
        </Container>
      </Section>
    </SiteShell>
  );
}
