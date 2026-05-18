import Link from "next/link";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { CtaButton } from "@/components/cta/CtaButton";

export default function NotFound() {
  return (
    <SiteShell>
      <Section pad="lg">
        <Container size="prose" className="text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
            404 — page not found
          </div>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-[-0.02em] md:text-6xl">
            That workflow doesn&rsquo;t live here.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-fg-muted">
            The page you tried to reach has moved, doesn&rsquo;t exist yet, or
            never existed at all. Try one of the routes below — or tell us
            what you were looking for.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CtaButton href="/">Back to home</CtaButton>
            <CtaButton variant="ghost" href="/services">
              See services
            </CtaButton>
            <CtaButton variant="ghost" href="/contact">
              Contact us
            </CtaButton>
          </div>
          <p className="mt-8 text-xs text-fg-subtle">
            Looking for something specific?{" "}
            <Link
              href="/sitemap.xml"
              className="text-accent underline-offset-4 hover:underline"
            >
              See the sitemap
            </Link>
            .
          </p>
        </Container>
      </Section>
    </SiteShell>
  );
}
