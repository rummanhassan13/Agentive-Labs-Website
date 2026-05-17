import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { CtaButton } from "@/components/cta/CtaButton";

export default function Home() {
  return (
    <SiteShell>
      <Section pad="lg">
        <Container size="default">
          <div className="mx-auto max-w-3xl text-center">
            <div className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle">
              Phase 1 scaffold · Foundation ready
            </div>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-[-0.02em] sm:text-6xl">
              Automate the busy. Amplify the{" "}
              <em className="font-serif italic">human</em>.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
              Documented, secure automations on n8n, WhatsApp Cloud API,
              HubSpot and Shopify. Productized packages from $1,290. Backed
              by a 90-Day ROI Promise.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookSprintCta size="lg" label="Book the Discovery Sprint" />
              <CtaButton variant="ghost" size="lg" href="/services">
                See how we work
              </CtaButton>
            </div>
          </div>
        </Container>
      </Section>
    </SiteShell>
  );
}
