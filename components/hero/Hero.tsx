import * as React from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

interface HeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  primaryCta?: React.ReactNode;
  secondaryCta?: React.ReactNode;
  microcopy?: React.ReactNode;
  visual?: React.ReactNode;
  variant?: "centered" | "split";
  className?: string;
}

export function Hero({
  eyebrow,
  title,
  sub,
  primaryCta,
  secondaryCta,
  microcopy,
  visual,
  variant = "centered",
  className,
}: HeroProps) {
  if (variant === "split") {
    return (
      <Section pad="lg" className={className}>
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              {eyebrow && (
                <div className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle">
                  {eyebrow}
                </div>
              )}
              <h1 className="mt-5 font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em]">
                {title}
              </h1>
              {sub && (
                <p className="mt-5 max-w-xl text-lg leading-[1.55] text-fg-muted">
                  {sub}
                </p>
              )}
              {(primaryCta || secondaryCta) && (
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  {primaryCta}
                  {secondaryCta}
                </div>
              )}
              {microcopy && (
                <div className="mt-5 text-sm text-fg-subtle">{microcopy}</div>
              )}
            </div>
            {visual && (
              <div className="md:col-span-6">{visual}</div>
            )}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section pad="lg" className={className}>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <div className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle">
              {eyebrow}
            </div>
          )}
          <h1
            className={cn(
              "mt-6 font-serif leading-[1.05] tracking-[-0.02em]",
              "text-[clamp(2.5rem,5.5vw,4.5rem)]"
            )}
          >
            {title}
          </h1>
          {sub && (
            <p className="mx-auto mt-6 max-w-xl text-lg leading-[1.55] text-fg-muted">
              {sub}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {primaryCta}
              {secondaryCta}
            </div>
          )}
          {microcopy && (
            <div className="mt-6 text-sm text-fg-subtle">{microcopy}</div>
          )}
        </div>
        {visual && (
          <div className="mx-auto mt-16 max-w-4xl">{visual}</div>
        )}
      </Container>
    </Section>
  );
}
