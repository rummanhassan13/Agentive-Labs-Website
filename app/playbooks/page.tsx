import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Hero } from "@/components/hero/Hero";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";

export const metadata: Metadata = {
  title: "Automation Playbooks — Agentive Labs",
  description: "Step-by-step guides for automating operations in specific industries.",
  alternates: { canonical: "/playbooks" },
};

export default function PlaybooksPage() {
  return (
    <SiteShell>
      <Hero
        eyebrow="Playbooks"
        title="Operations, codified."
        sub="A library of step-by-step workflows for customer support, lead routing, and reconciliation. (Coming in Phase 3)"
      />

      <Section pad="sm">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resources", href: "/resources" },
              { name: "Playbooks", href: "/playbooks" },
            ]}
          />
        </Container>
      </Section>

      <Section pad="lg">
        <Container size="prose">
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border-emphasis bg-surface-1 py-32 text-center">
            <div className="font-mono text-xs uppercase tracking-widest text-fg-subtle">
              Access Restricted
            </div>
            <h2 className="mt-4 font-serif text-2xl text-fg">
              Playbooks are currently being documented.
            </h2>
            <p className="mt-2 text-sm text-fg-muted">
              Check back soon or book a Discovery Sprint to get custom documentation for your stack.
            </p>
          </div>
        </Container>
      </Section>

      <FinalCtaBand />
    </SiteShell>
  );
}
