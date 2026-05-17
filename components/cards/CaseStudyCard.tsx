import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  metric: string;
  metricLabel: string;
  vertical: string;
  client: string;
  summary: string;
  href?: string;
  ctaLabel?: string;
  className?: string;
}

export function CaseStudyCard({
  metric,
  metricLabel,
  vertical,
  client,
  summary,
  href,
  ctaLabel = "Read the case study",
  className,
}: CaseStudyCardProps) {
  return (
    <div
      className={cn(
        "relative grid gap-8 rounded-3xl border border-border-subtle bg-surface-1 p-8 md:grid-cols-12 md:p-12",
        className
      )}
    >
      <div className="absolute right-6 top-6 rotate-90 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-subtle md:right-12 md:top-12">
        {vertical}
      </div>
      <div className="md:col-span-5">
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
          {client}
        </div>
        <div className="mt-4 font-serif text-5xl tracking-[-0.02em] text-accent md:text-7xl">
          {metric}
        </div>
        <div className="mt-2 text-sm text-fg-muted">{metricLabel}</div>
      </div>
      <div className="md:col-span-7">
        <p className="text-lg leading-relaxed text-fg-muted">{summary}</p>
        {href && (
          <Link
            href={href}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors hover:text-accent"
          >
            {ctaLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );
}
