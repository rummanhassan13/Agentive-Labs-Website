import type { Metadata } from "next";
import { team } from "#site/content";
import { User } from "lucide-react";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Hero } from "@/components/hero/Hero";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";

export const metadata: Metadata = {
  title: "Team — Agentive Labs",
  description: "Meet the Systems Architects behind our AI automations.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <SiteShell>
      <Hero
        eyebrow="The Builders"
        title="Meet the Systems Architects."
        sub="We are specialized integration engineers, data pipeline builders, and automation architects who build secure, documented systems."
        primaryCta={<BookSprintCta size="lg" label="Book a Fit Check Call" />}
      />

      <Section pad="sm">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Team", href: "/team" },
            ]}
          />
        </Container>
      </Section>

      <Section pad="lg">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {team.slice().sort((a, b) => a.order - b.order).map((member) => (
              <div 
                key={member.slug} 
                className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-surface-1 p-6 card-glass card-glass-hover"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent-muted text-accent">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold leading-none text-fg">
                        {member.name}
                      </h3>
                      <span className="mt-1 block font-mono text-xs text-fg-subtle">
                        {member.role}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-fg-muted">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-6 border-t border-border-subtle pt-4">
                  <div className="mb-2 font-mono text-[9px] uppercase tracking-wider text-fg-subtle">
                    Core Expertise
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {member.expertise.map((exp) => (
                      <span 
                        key={exp} 
                        className="rounded border border-border-subtle bg-surface-3 px-1.5 py-0.5 font-mono text-[9px] text-fg-muted"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCtaBand />
    </SiteShell>
  );
}
