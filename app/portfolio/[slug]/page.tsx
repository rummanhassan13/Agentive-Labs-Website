import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolio } from "#site/content";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Hero } from "@/components/hero/Hero";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { CtaButton } from "@/components/cta/CtaButton";
import { GuaranteeBand } from "@/components/trust/GuaranteeBand";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";
import { MDXContent } from "@/components/utility/MDXContent";
import { Clock, CheckCircle2, ChevronLeft, ArrowRightLeft } from "lucide-react";

interface PortfolioItemPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolio.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PortfolioItemPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} — AI Case Study`,
    description: project.summary,
    alternates: { canonical: `/portfolio/${slug}` },
  };
}

export default async function PortfolioDetailPage({ params }: PortfolioItemPageProps) {
  const { slug } = await params;
  const project = portfolio.find((p) => p.slug === slug);
  if (!project) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: project.client.replace(/\[|\]/g, ""), href: `/portfolio/${slug}` },
  ];

  return (
    <SiteShell>
      <Hero
        eyebrow={`${project.industry} Case Study`}
        title={project.title}
        sub={project.summary}
        primaryCta={<BookSprintCta size="lg" label="Book a similar build check" />}
        secondaryCta={
          <div className="flex items-center gap-4 rounded-2xl bg-surface-2 p-4 border border-border-subtle">
            <div className="text-right">
              <span className="font-mono text-[9px] uppercase tracking-wider text-fg-subtle block">
                {project.results.label}
              </span>
              <span className="font-mono text-2xl font-bold text-accent">
                {project.results.value}
              </span>
            </div>
          </div>
        }
        visual={
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-surface-2 border border-border-subtle text-accent shadow-sm">
            <ArrowRightLeft className="h-10 w-10 animate-pulse" />
          </div>
        }
      />

      <Section pad="sm">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </Section>

      {/* Narrative Section */}
      <Section pad="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Narrative Column */}
            <div className="lg:col-span-8">
              <div className="space-y-6">
                <CtaButton 
                  variant="ghost" 
                  size="sm" 
                  href="/portfolio" 
                  className="flex items-center gap-1 text-xs text-fg-subtle p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back to all case studies</span>
                </CtaButton>

                <div className="prose prose-invert max-w-none border-t border-border-subtle pt-6 font-sans text-base leading-relaxed text-fg-muted space-y-6">
                  <MDXContent code={project.body} />
                </div>
              </div>
            </div>

            {/* Right Infrastructure Specs */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6 rounded-2xl border border-border-subtle bg-surface-1 p-6 card-glass">
                <div className="space-y-1">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                    Operational Blueprint
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-fg">
                    Build metadata
                  </h3>
                </div>

                <div className="divide-y divide-border-subtle">
                  <div className="flex items-center justify-between py-2 text-xs">
                    <span className="text-fg-subtle font-mono">Client</span>
                    <span className="text-fg font-semibold">{project.client}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-xs">
                    <span className="text-fg-subtle font-mono">Industry</span>
                    <span className="text-fg font-semibold">{project.industry}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-xs">
                    <span className="text-fg-subtle font-mono">Timeline</span>
                    <span className="text-fg font-semibold flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-fg-subtle" />
                      <span>{project.timelineDays} Days</span>
                    </span>
                  </div>
                </div>

                {/* Tech Stack pills */}
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle mb-2">
                    Systems Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span 
                        key={tech} 
                        className="font-mono text-[10px] bg-surface-3 px-2 py-0.5 rounded border border-border-subtle text-fg-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverables details */}
                <div className="border-t border-border-subtle pt-4">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle mb-3">
                    Delivered Assets
                  </div>
                  <ul className="space-y-2">
                    {project.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-fg-muted">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust Guarantee Band */}
      <Section pad="lg" tone="contrast">
        <Container size="prose">
          <GuaranteeBand />
        </Container>
      </Section>

      <FinalCtaBand />
    </SiteShell>
  );
}
