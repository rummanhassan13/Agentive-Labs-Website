import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Hero } from "@/components/hero/Hero";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";

export const metadata: Metadata = {
  title: "Agency Partner Program — Agentive Labs",
  description: "White-label AI automation builds for marketing and operations agencies.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <SiteShell>
      <Hero
        eyebrow="Partners"
        title="White-label automation for agencies."
        sub="You own the client relationship. We build the n8n workflows, dashboards, and runbooks under your brand."
        primaryCta={<BookSprintCta size="lg" label="Book a Partner Fit Check" />}
      />

      <Section pad="sm">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Partners", href: "/partners" },
            ]}
          />
        </Container>
      </Section>

      <Section pad="lg">
        <Container size="prose">
          <div className="grid gap-12">
            <div>
              <h2 className="font-serif text-3xl tracking-tight text-fg">
                Expand your agency capabilities without hiring engineers.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-fg-muted">
                Marketing and ops agencies use Agentive Labs as a specialized build partner. Whether your clients need Shopify reconciliation pipelines, intelligent lead routing, or WhatsApp support triaging, we deliver fully documented systems that you can mark up and present as your own.
              </p>
            </div>

            <div className="rounded-3xl border border-border-subtle bg-surface-1 p-8">
              <h3 className="font-mono text-xs uppercase tracking-widest text-fg-subtle">
                How it works
              </h3>
              <ul className="mt-6 flex flex-col gap-6">
                <li className="flex gap-4">
                  <span className="font-mono text-accent">01</span>
                  <div>
                    <strong className="block font-medium text-fg">Joint Scoping</strong>
                    <span className="mt-1 block text-sm text-fg-muted">We map the workflow on a white-labeled Miro board. We quote you the partner price; you quote the client your retail price.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-mono text-accent">02</span>
                  <div>
                    <strong className="block font-medium text-fg">Invisible Build</strong>
                    <span className="mt-1 block text-sm text-fg-muted">We build on self-hosted n8n instances or your preferred infrastructure. All dashboards and code are unbranded.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="font-mono text-accent">03</span>
                  <div>
                    <strong className="block font-medium text-fg">White-Label Handover</strong>
                    <span className="mt-1 block text-sm text-fg-muted">We provide you with the runbooks and training materials. You hand over the keys to the client.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <FinalCtaBand />
    </SiteShell>
  );
}
