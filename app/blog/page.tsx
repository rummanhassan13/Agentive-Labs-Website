import type { Metadata } from "next";
import { blog } from "#site/content";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Hero } from "@/components/hero/Hero";
import { CtaButton } from "@/components/cta/CtaButton";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";
import { ChevronRight, Calendar, Clock, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Agentive Labs Hub — AI Automation Resources & Guides",
  description: "Tactical blueprints, architecture design tips, and operations strategies for SME owners and operators.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const sortedPosts = blog
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const featuredPost = sortedPosts.find((p) => p.featured) || sortedPosts[0];
  const secondaryPosts = sortedPosts.filter((p) => p.slug !== featuredPost?.slug);

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <SiteShell>
      <Hero
        eyebrow="Resources"
        title="Tactical automation insights. Written for operators."
        sub="No high-level buzzwords. Straightforward blueprints, architectural strategies, and guides to help you eliminate operational drag and scale systems."
        primaryCta={<BookSprintCta size="lg" label="Scoping fit check call" />}
      />

      <Section pad="sm">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </Section>

      {/* Featured Post Card */}
      {featuredPost && (
        <Section pad="md">
          <Container>
            <div className="rounded-3xl border border-border-subtle bg-surface-1 p-6 md:p-8 card-glass card-glass-hover">
              <div className="grid gap-6 md:grid-cols-12 items-center">
                <div className="md:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-fg-subtle font-mono">
                    <span className="bg-accent-muted text-accent border border-accent/20 px-2 py-0.5 rounded uppercase tracking-wider text-[10px]">
                      Featured Article
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{new Date(featuredPost.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{featuredPost.readTime}</span>
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-fg font-semibold leading-tight">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-base leading-relaxed text-fg-muted">
                    {featuredPost.excerpt}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-surface-3 flex items-center justify-center border border-border-subtle text-fg-subtle">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="text-xs text-fg-muted font-semibold">
                        {featuredPost.author.name} · {featuredPost.author.role}
                      </span>
                    </div>

                    <CtaButton 
                      variant="link" 
                      size="sm" 
                      href={`/blog/${featuredPost.slug}`}
                      className="group/btn text-accent font-semibold p-0 flex items-center gap-1"
                    >
                      <span>Read article</span>
                      <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </CtaButton>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Blog Grid */}
      <Section pad="lg">
        <Container>
          <div className="text-left mb-8 border-b border-border-subtle pb-4">
            <h3 className="font-serif text-2xl tracking-tight text-fg">
              All editorial guides
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {secondaryPosts.map((post) => (
              <div 
                key={post.slug}
                className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-surface-1 p-5 card-glass card-glass-hover"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4 text-[10px] text-fg-subtle font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-semibold tracking-tight leading-snug text-fg">
                    {post.title}
                  </h4>
                  
                  <p className="text-xs leading-relaxed text-fg-muted line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-subtle mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 1).map((t) => (
                      <span key={t} className="font-mono text-[9px] bg-surface-2 px-1.5 py-0.5 rounded border border-border-subtle text-fg-subtle uppercase">
                        {t}
                      </span>
                    ))}
                  </div>

                  <CtaButton 
                    variant="link" 
                    size="sm" 
                    href={`/blog/${post.slug}`}
                    className="group/btn text-accent font-semibold p-0 flex items-center gap-1 text-xs"
                  >
                    <span>Read guide</span>
                    <ChevronRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
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
