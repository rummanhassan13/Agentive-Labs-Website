import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Hero } from "@/components/hero/Hero";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";

export const metadata: Metadata = {
  title: "n8n Templates — Agentive Labs",
  description: "Exported blueprints and architectures for your own automation stack.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  return (
    <SiteShell>
      <Hero
        eyebrow="Templates"
        title="Pre-built workflows."
        sub="Exportable n8n workflows and Supabase schemas that you can drop into your own self-hosted environments. (Coming in Phase 3)"
      />

      <Section pad="sm">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resources", href: "/resources" },
              { name: "Templates", href: "/templates" },
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
              Templates are currently under review.
            </h2>
            <p className="mt-2 text-sm text-fg-muted">
              We ensure all open-source templates are security-audited before release. Check back soon.
            </p>
          </div>
        </Container>
      </Section>

      <FinalCtaBand />
    </SiteShell>
  );
}
