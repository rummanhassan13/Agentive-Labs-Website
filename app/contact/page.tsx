import type { Metadata } from "next";
import { Suspense } from "react";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { JsonLd } from "@/components/utility/JsonLd";
import { localBusiness } from "@/lib/jsonld/local-business";
import { contactPage } from "@/lib/jsonld/contact-page";
import { LocationStrip } from "@/components/trust/LocationStrip";
import { GuaranteeBand } from "@/components/trust/GuaranteeBand";
import { SecurityBadgeRow } from "@/components/trust/SecurityBadgeRow";
import { ContactFlow } from "./contact-flow";

export const metadata: Metadata = {
  title: "Contact Agentive Labs — Book a Discovery Sprint",
  description:
    "Send a 4-question brief and we reply in 24h, or book a 25-min Discovery Sprint call now.",
  alternates: { canonical: "/contact" },
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export default function ContactPage() {
  return (
    <SiteShell>
      <Section pad="md">
        <Container size="prose">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
              Contact
            </div>
            <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.02em] md:text-5xl">
              Tell us about the workflow you&rsquo;d remove first.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-fg-muted">
              Send a 4-question brief. We reply with a fit summary in 24h, or
              grab a slot now.
            </p>
          </div>
        </Container>
      </Section>

      <Section pad="lg">
        <Container size="prose">
          <Suspense fallback={<FormSkeleton />}>
            <ContactFlow />
          </Suspense>
        </Container>
      </Section>

      <Section pad="lg" tone="contrast">
        <Container size="prose" className="space-y-8">
          <GuaranteeBand />
          <div className="space-y-4">
            <LocationStrip />
            <SecurityBadgeRow />
          </div>
        </Container>
      </Section>

      <JsonLd data={[contactPage(), localBusiness()]} />
    </SiteShell>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-full animate-pulse rounded-md bg-surface-2" />
      <div className="h-10 w-full animate-pulse rounded-md bg-surface-2" />
      <div className="h-32 w-full animate-pulse rounded-md bg-surface-2" />
      <div className="h-12 w-full animate-pulse rounded-md bg-surface-2" />
    </div>
  );
}
