import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { BookSprintCta } from "@/components/cta/BookSprintCta";

interface FinalCtaBandProps {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  microcopy?: string;
}

export function FinalCtaBand({
  heading = "Ready to remove the busy?",
  body = "Tell us the workflow you'd remove first. We reply within 24h with a fit summary, or you can grab a slot now.",
  ctaLabel = "Book the Discovery Sprint",
  microcopy = "90-Day ROI Promise · Documented before hand-off · USD, PKR, AED, GBP, SAR",
}: FinalCtaBandProps) {
  return (
    <Section tone="bleed" pad="lg" className="border-t border-border-subtle">
      <Container className="text-center">
        <h2 className="mx-auto max-w-3xl font-serif text-4xl tracking-[-0.02em] md:text-5xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-fg-muted">
          {body}
        </p>
        <div className="mt-8 flex justify-center">
          <BookSprintCta size="lg" label={ctaLabel} />
        </div>
        {microcopy && (
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
            {microcopy}
          </p>
        )}
      </Container>
    </Section>
  );
}
