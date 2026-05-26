import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blog } from "#site/content";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { CtaButton } from "@/components/cta/CtaButton";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";
import { MDXContent } from "@/components/utility/MDXContent";
import { Calendar, Clock, ChevronLeft, User, Share2 } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blog.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blog.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blog.find((p) => p.slug === slug);
  if (!post) notFound();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title.split(":")[0], href: `/blog/${slug}` },
  ];

  return (
    <SiteShell>
      {/* Editorial Header */}
      <Section pad="lg" className="border-b border-border-subtle bg-surface-1/40">
        <Container size="prose">
          <div className="space-y-6">
            <CtaButton 
              variant="ghost" 
              size="sm" 
              href="/blog" 
              className="flex items-center gap-1 text-xs text-fg-subtle p-0"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back to all resources</span>
            </CtaButton>

            {/* Tags and Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-fg-subtle border-b border-border-subtle/50 pb-4">
              <span className="bg-accent-muted text-accent px-2 py-0.5 rounded uppercase tracking-wider text-[9px] border border-accent/20">
                {post.tags[0] ?? "Resource"}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{post.readTime}</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-fg">
              {post.title}
            </h1>
            
            <p className="text-lg leading-relaxed text-fg-muted font-sans font-light italic">
              {post.excerpt}
            </p>

            {/* Author details */}
            <div className="flex items-center justify-between pt-4 border-t border-border-subtle/50">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-surface-3 flex items-center justify-center border border-border-subtle text-fg-subtle">
                  <User className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-fg font-semibold leading-none">
                    {post.author.name}
                  </span>
                  <span className="text-[10px] text-fg-subtle font-mono">
                    {post.author.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-fg-subtle font-mono">
                <Share2 className="h-4 w-4 text-fg-subtle" />
                <span>Editorial Desk</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section pad="sm">
        <Container size="prose">
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </Section>

      {/* Narrative Reading Panel */}
      <Section pad="lg">
        <Container size="prose">
          <article className="prose prose-invert max-w-none font-sans text-base leading-relaxed text-fg-muted space-y-6">
            <MDXContent code={post.body} />
          </article>
        </Container>
      </Section>

      {/* Scoping Action Card */}
      <Section pad="md" className="bg-surface-2/30 border-y border-border-subtle">
        <Container size="prose">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl border border-border-subtle bg-surface-1 shadow-sm card-glass">
            <div>
              <h4 className="font-serif text-lg font-semibold text-fg">
                Own your automation infrastructure
              </h4>
              <p className="text-xs text-fg-muted mt-1 leading-normal max-w-sm">
                No proprietary lock-in. We build on your accounts and hand over complete runbook blueprint documentation.
              </p>
            </div>
            <BookSprintCta size="lg" label="Book a scoping call" />
          </div>
        </Container>
      </Section>

      <FinalCtaBand />
    </SiteShell>
  );
}
