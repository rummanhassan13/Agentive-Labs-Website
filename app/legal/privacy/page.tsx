import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Agentive Labs collects, uses and protects personal data.",
  alternates: { canonical: "/legal/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <Section pad="md">
        <Container size="prose">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Legal", href: "/legal/privacy" },
              { name: "Privacy", href: "/legal/privacy" },
            ]}
          />
          <h1 className="mt-6 font-serif text-4xl tracking-tight md:text-5xl">
            Privacy policy
          </h1>
          <p className="mt-3 text-sm text-fg-subtle">
            Last updated 2026-05-17
          </p>
        </Container>
      </Section>

      <Section pad="lg">
        <Container size="prose">
          <div className="prose prose-neutral max-w-none space-y-6 text-base leading-relaxed text-fg-muted">
            <p>
              [Placeholder ~50 words] This policy explains how Agentive Labs
              (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses and
              protects personal information through our website at{" "}
              {site.url} and our client engagements. Replace this preamble
              with a counsel-reviewed statement before publishing.
            </p>

            <h2 className="font-serif text-2xl tracking-tight text-fg">
              What we collect
            </h2>
            <ul className="list-disc pl-5">
              <li>
                Contact form submissions: name, email, company, vertical,
                workflow description, team size, budget, optional site URL.
              </li>
              <li>
                Anonymous usage data via Vercel Analytics and Vercel Speed
                Insights (no cookies, no personal identifiers).
              </li>
              <li>
                Plausible Analytics (if enabled): cookieless, no IP storage,
                no cross-site tracking.
              </li>
            </ul>

            <h2 className="font-serif text-2xl tracking-tight text-fg">
              How we use it
            </h2>
            <p>
              [Placeholder] Contact submissions are used to reply to your
              brief and scope an engagement. We do not sell or share
              personal data with third parties for marketing.
            </p>

            <h2 className="font-serif text-2xl tracking-tight text-fg">
              Cookies
            </h2>
            <p>
              [Placeholder] This site sets only essential cookies (theme
              preference, session). Plausible and Vercel Analytics are
              cookieless. We do not set advertising or third-party
              tracking cookies.
            </p>

            <h2 className="font-serif text-2xl tracking-tight text-fg">
              Your rights
            </h2>
            <p>
              [Placeholder] You may request access to, correction of, or
              deletion of personal data we hold about you by emailing{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="text-accent underline-offset-4 hover:underline"
              >
                {site.contact.email}
              </a>
              . We will respond within 30 days.
            </p>

            <h2 className="font-serif text-2xl tracking-tight text-fg">
              Governing law
            </h2>
            <p>
              [Placeholder] This policy is governed by the laws of Punjab,
              Pakistan, with cross-border provisions consistent with GDPR
              for visitors from the EU and UK.
            </p>

            <h2 className="font-serif text-2xl tracking-tight text-fg">
              Contact
            </h2>
            <p>
              Questions? Write to{" "}
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
