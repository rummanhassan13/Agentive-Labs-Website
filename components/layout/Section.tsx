import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "default" | "contrast" | "bleed" | "muted";
type Pad = "sm" | "md" | "lg";

const toneClass: Record<Tone, string> = {
  default: "bg-surface-0 text-fg",
  contrast: "bg-surface-1 text-fg",
  muted: "bg-surface-2 text-fg",
  bleed: "bg-surface-3 text-fg",
};

const padClass: Record<Pad, string> = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-24 sm:py-32",
};

interface SectionProps {
  tone?: Tone;
  pad?: Pad;
  as?: "section" | "div" | "article";
  className?: string;
  id?: string;
  ariaLabelledBy?: string;
  children: React.ReactNode;
}

export function Section({
  tone = "default",
  pad = "md",
  as: Comp = "section",
  className,
  id,
  ariaLabelledBy,
  children,
}: SectionProps) {
  return (
    <Comp
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(toneClass[tone], padClass[pad], className)}
    >
      {children}
    </Comp>
  );
}
