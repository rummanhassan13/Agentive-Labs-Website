"use client";

import { Check, X } from "lucide-react";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { CtaButton } from "@/components/cta/CtaButton";
import { cn } from "@/lib/utils";

export interface PricingCardProps {
  name: string;
  shortName?: string;
  price: number | string;
  currency?: string;
  bestFor: string;
  bullets: string[];
  excludes?: string[];
  timelineDays: string;
  featured?: boolean;
  slug?: string;
  variant?: "default" | "custom";
  className?: string;
}

export function PricingCard({
  name,
  price,
  currency = "USD",
  bestFor,
  bullets,
  excludes,
  timelineDays,
  featured,
  slug,
  variant = "default",
  className,
}: PricingCardProps) {
  const isCustom = variant === "custom";
  const priceDisplay =
    typeof price === "number"
      ? `$${price.toLocaleString("en-US")}`
      : price;

  return (
    <div
      className={cn(
        "relative flex h-full flex-col gap-6 rounded-2xl border p-6 sm:p-8",
        featured
          ? "border-accent bg-surface-1 ring-1 ring-accent/30 shadow-lg"
          : "border-border-subtle bg-surface-1",
        isCustom && "border-dashed bg-transparent",
        className
      )}
    >
      {featured && (
        <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-accent-fg">
          Most chosen
        </span>
      )}

      <div className="space-y-2">
        <h3 className="font-serif text-2xl tracking-tight">{name}</h3>
        <p className="text-sm text-fg-muted">{bestFor}</p>
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-4xl tracking-tight text-fg">
            {priceDisplay}
          </span>
          {!isCustom && (
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-fg-subtle">
              {currency}
            </span>
          )}
        </div>
        <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
          {isCustom ? "Scoped per engagement" : `${timelineDays} days`}
        </div>
      </div>

      <ul className="space-y-2 text-sm text-fg-muted">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <Check
              className="mt-[3px] h-4 w-4 shrink-0 text-accent"
              aria-hidden
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {excludes && excludes.length > 0 && (
        <div className="border-t border-border-subtle pt-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-subtle">
            Not included
          </div>
          <ul className="mt-2 space-y-1 text-sm italic text-fg-subtle">
            {excludes.map((e) => (
              <li key={e} className="flex items-start gap-2">
                <X
                  className="mt-[3px] h-3.5 w-3.5 shrink-0 opacity-60"
                  aria-hidden
                />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto space-y-3">
        {isCustom ? (
          <CtaButton variant="outline" size="lg" href="/contact" className="w-full">
            Request a custom quote
          </CtaButton>
        ) : (
          <>
            <BookSprintCta
              variant={featured ? "default" : "outline"}
              size="lg"
              label="Start this engagement"
              notes={`Package: ${name}`}
              className="w-full"
            />
            <CtaButton
              variant="link"
              href={`/contact?package=${slug ?? ""}`}
              className="w-full"
            >
              Have questions? →
            </CtaButton>
          </>
        )}
      </div>
    </div>
  );
}
