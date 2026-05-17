import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "Terms of using the Agentive Labs website and engaging our services.",
  alternates: { canonical: "/legal/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <SiteShell>
      <Section pad="md">
        <Container size="prose">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Legal", href: "/legal/terms" },
              { name: "Terms", href: "/legal/terms" },
            ]}
          />
          <h1 className="mt-6 font-serif text-4xl tracking-tight md:text-5xl">
            Terms of service
          </h1>
          <p className="mt-3 text-sm text-fg-subtle">Last updated 2026-05-17</p>
        </Container>
      </Section>

      <Section pad="lg">
        <Container size="prose">
          <div className="space-y-6 text-base leading-relaxed text-fg-muted">
            <p>
              [Placeholder ~50 words] These terms govern your use of the
              Agentive Labs website at {site.url}. Specific engagement terms
              are governed by a separate MSA + SOW signed before any
              project work begins. Replace this preamble with a
              counsel-reviewed statement before publishing.
            </p>

            <h2 className="font-serif text-2xl tracking-tight text-fg">
              Use of this site
            </h2>
            <p>
              [Placeholder] You agree not to use this site to: violate
              applicable law, infringe intellectual property rights,
              attempt to circumvent security measures, or send spam.
            </p>

            <h2 className="font-serif text-2xl tracking-tight text-fg">
              Intellectual property
            </h2>
            <p>
              [Placeholder] All site content (text, design, code) is the
              property of Agentive Labs unless attributed otherwise.
              Engagement deliverables transfer to the client per the
              signed SOW.
            </p>

            <h2 className="font-serif text-2xl tracking-tight text-fg">
              Engagements
            </h2>
            <p>
              [Placeholder] Any consultancy or build engagement is governed
              by a separate MSA and Statement of Work. Pricing and timelines
              shown on this site are indicative; the SOW is authoritative.
              The 90-Day ROI Promise terms are documented per engagement.
            </p>

            <h2 className="font-serif text-2xl tracking-tight text-fg">
              No warranty
            </h2>
            <p>
              [Placeholder] The site is provided &ldquo;as is&rdquo; without
              warranties of any kind. We are not liable for indirect or
              consequential damages arising from use of the site.
            </p>

            <h2 className="font-serif text-2xl tracking-tight text-fg">
              Governing law
            </h2>
            <p>
              [Placeholder] These terms are governed by the laws of Punjab,
              Pakistan. Disputes arising from the website (not engagements,
              which are governed by the MSA) are resolved in Lahore courts.
            </p>

            <h2 className="font-serif text-2xl tracking-tight text-fg">
              Contact
            </h2>
            <p>
              Questions about these terms? Write to{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                {site.contact.email}
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}
