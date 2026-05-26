import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "#site/content";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Hero } from "@/components/hero/Hero";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { CtaButton } from "@/components/cta/CtaButton";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { GuaranteeBand } from "@/components/trust/GuaranteeBand";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";
import { MDXContent } from "@/components/utility/MDXContent";
import { JsonLd } from "@/components/utility/JsonLd";
import { product } from "@/lib/jsonld/product";
import { 
  Workflow, 
  Headphones, 
  Sparkles, 
  PhoneCall, 
  PenLine, 
  Share2, 
  MessageCircle,
  Calendar,
  Clock,
  CheckCircle 
} from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Workflow,
  Headphones,
  Sparkles,
  PhoneCall,
  PenLine,
  Share2,
  MessageCircle
};

export async function generateStaticParams() {
  return services.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: `${service.title} — AI Automation Package`,
    description: service.summary,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const ServiceIcon = ICON_MAP[service.icon] || Sparkles;

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.shortName, href: `/services/${slug}` },
  ];

  return (
    <SiteShell>
      <Hero
        eyebrow={service.eyebrow ?? "Service Detail"}
        title={service.title}
        sub={service.summary}
        primaryCta={<BookSprintCta size="lg" label="Book the Discovery Sprint" />}
        secondaryCta={
          service.startingPriceUsd ? (
            <div className="flex flex-col items-start gap-1 rounded-xl bg-surface-2 px-4 py-2 border border-border-subtle font-mono text-xs">
              <span className="text-fg-subtle">Starting Price</span>
              <span className="text-lg font-bold text-accent">${service.startingPriceUsd.toLocaleString()} USD</span>
            </div>
          ) : undefined
        }
        visual={
          <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-accent-muted text-accent border border-accent/20">
            <ServiceIcon className="h-16 w-16" />
          </div>
        }
      />

      <Section pad="sm">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
        </Container>
      </Section>

      {/* Main Service Specs */}
      <Section pad="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left spec lists */}
            <div className="space-y-8 lg:col-span-7">
              <div className="space-y-4">
                <h2 className="font-serif text-3xl tracking-tight text-fg">
                  What we build in this package
                </h2>
                <p className="text-base leading-relaxed text-fg-muted">
                  Every build we deliver is robust, fully integrated into your existing systems, and completely owned by your team. We do not use proprietary agency hosting.
                </p>
              </div>

              {/* MDX Narrative */}
              <div className="prose prose-invert max-w-none border-t border-border-subtle pt-6 font-sans text-base leading-relaxed text-fg-muted space-y-4">
                <MDXContent code={service.body} />
              </div>

              {/* Deliverables detail */}
              <div className="border-t border-border-subtle pt-6">
                <h3 className="font-serif text-xl tracking-tight text-fg mb-4">
                  Detailed Deliverables
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {service.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-fg-muted">
                      <CheckCircle className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right details column */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 space-y-6 rounded-2xl border border-border-emphasis bg-surface-1 p-6 card-glass">
                <div className="space-y-2">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-accent">
                    Package Timeline & Deliverables
                  </div>
                  <h3 className="font-serif text-2xl tracking-tight text-fg">
                    Fit check & scoping
                  </h3>
                </div>

                <div className="divide-y divide-border-subtle">
                  <div className="flex items-center justify-between py-3">
                    <span className="flex items-center gap-2 text-sm text-fg-muted">
                      <Clock className="h-4 w-4 text-fg-subtle" />
                      <span>Delivery Time</span>
                    </span>
                    <span className="font-mono text-sm text-fg font-semibold">
                      {service.timelineDays} Days
                    </span>
                  </div>

                  {service.startingPriceUsd && (
                    <div className="flex items-center justify-between py-3">
                      <span className="flex items-center gap-2 text-sm text-fg-muted">
                        <Calendar className="h-4 w-4 text-fg-subtle" />
                        <span>Fixed Scoped Price</span>
                      </span>
                      <span className="font-mono text-sm text-fg font-semibold">
                        ${service.startingPriceUsd.toLocaleString()} USD
                      </span>
                    </div>
                  )}

                  {service.productSku && (
                    <div className="flex items-center justify-between py-3">
                      <span className="flex items-center gap-2 text-sm text-fg-muted">
                        <span className="font-mono text-[10px] bg-surface-3 px-1.5 py-0.5 rounded border border-border-subtle">SKU</span>
                        <span>Product identifier</span>
                      </span>
                      <span className="font-mono text-xs text-fg-subtle">
                        {service.productSku}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-4">
                  <BookSprintCta size="lg" className="w-full justify-center" />
                  <CtaButton 
                    variant="outline" 
                    size="lg" 
                    href={`/contact?package=${service.slug}`} 
                    className="w-full justify-center"
                  >
                    Select this package
                  </CtaButton>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Guarantee Band section */}
      <Section pad="lg" tone="contrast">
        <Container size="prose">
          <GuaranteeBand />
        </Container>
      </Section>

      {/* FAQs list */}
      {service.faqs && service.faqs.length > 0 && (
        <Section pad="lg">
          <Container size="prose">
            <div className="text-center mb-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
                Questions
              </div>
              <h2 className="mt-2 font-serif text-3xl tracking-tight">
                Service FAQs
              </h2>
            </div>
            <FaqAccordion items={service.faqs} />
          </Container>
        </Section>
      )}

      <FinalCtaBand />

      {service.startingPriceUsd && service.productSku && (
        <JsonLd
          data={product({
            name: service.title,
            sku: service.productSku,
            description: service.summary,
            price: service.startingPriceUsd,
          })}
        />
      )}
    </SiteShell>
  );
}
