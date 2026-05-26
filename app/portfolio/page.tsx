import type { Metadata } from "next";
import { portfolio } from "#site/content";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Hero } from "@/components/hero/Hero";
import { CtaButton } from "@/components/cta/CtaButton";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Automation Case Studies — Agentive Labs Portfolio",
  description: "Audited ROI and operations architecture post-mortems for Shopify D2C, professional agencies, and logistics providers.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioIndexPage() {
  const sortedProjects = portfolio.slice().sort((a, b) => a.order - b.order);

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
  ];

  return (
    <SiteShell>
      <Hero
        eyebrow="Case Studies"
        title="Audited ROI. Documented architectural post-mortems."
        sub="We map, build, and hand over the keys to robust AI automations. Here are the exact time and cost reclaims we delivered and audited at day 90."
        primaryCta={<BookSprintCta size="lg" label="Book a Fit Check Call" />}
        secondaryCta={
          <CtaButton variant="ghost" size="lg" href="/services">
            Explore our packages
          </CtaButton>
        }
      />

      <Section pad="sm">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </Section>

      {/* Case studies list section */}
      <Section pad="lg">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {sortedProjects.map((p) => (
              <div 
                key={p.slug} 
                className="flex flex-col justify-between rounded-3xl border border-border-subtle bg-surface-1 p-6 md:p-8 card-glass card-glass-hover"
              >
                <div>
                  {/* Industry pill and result */}
                  <div className="flex items-center justify-between gap-4 border-b border-border-subtle pb-4 mb-5">
                    <span className="font-mono text-xs text-fg-subtle uppercase tracking-wider">
                      {p.industry}
                    </span>
                    <div className="flex flex-col items-end">
                      <span className="font-mono text-2xl font-bold text-accent">
                        {p.results.value}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-fg-subtle">
                        {p.results.label}
                      </span>
                    </div>
                  </div>

                  {/* Title and summary */}
                  <h3 className="font-serif text-2xl tracking-tight text-fg mb-3 font-semibold leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-fg-muted mb-6">
                    {p.summary}
                  </p>

                  {/* Tech stack */}
                  <div className="mb-6">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle mb-2">
                      Infrastructure Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className="font-mono text-[10px] bg-surface-3 px-2 py-0.5 rounded border border-border-subtle text-fg-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                  <span className="text-xs text-fg-subtle font-mono">
                    Timeline: {p.timelineDays} days
                  </span>
                  <CtaButton 
                    variant="link" 
                    size="sm" 
                    href={`/portfolio/${p.slug}`}
                    className="group/btn text-accent font-semibold p-0 flex items-center gap-1"
                  >
                    <span>Read post-mortem</span>
                    <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </CtaButton>
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
