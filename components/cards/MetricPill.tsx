import * as React from "react";
import { cn } from "@/lib/utils";

interface MetricPillProps {
  value: string;
  label: string;
  className?: string;
}

export function MetricPill({ value, label, className }: MetricPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-1 px-3 py-1",
        className
      )}
    >
      <span className="font-mono text-xs text-accent">{value}</span>
      <span className="text-xs text-fg-muted">{label}</span>
    </span>
  );
}
