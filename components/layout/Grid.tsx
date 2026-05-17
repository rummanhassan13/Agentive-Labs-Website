import * as React from "react";
import { cn } from "@/lib/utils";

interface GridProps {
  cols?: { base?: number; sm?: number; md?: number; lg?: number };
  gap?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

const gapClass = {
  sm: "gap-3 sm:gap-4",
  md: "gap-4 sm:gap-6",
  lg: "gap-6 sm:gap-8",
};

const colClass: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const smColClass: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  6: "sm:grid-cols-6",
  12: "sm:grid-cols-12",
};

const mdColClass: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
};

const lgColClass: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  6: "lg:grid-cols-6",
  12: "lg:grid-cols-12",
};

export function Grid({ cols, gap = "md", className, children }: GridProps) {
  const c = cols ?? { base: 1, md: 2, lg: 3 };
  return (
    <div
      className={cn(
        "grid",
        c.base ? colClass[c.base] : "grid-cols-1",
        c.sm ? smColClass[c.sm] : "",
        c.md ? mdColClass[c.md] : "",
        c.lg ? lgColClass[c.lg] : "",
        gapClass[gap],
        className
      )}
    >
      {children}
    </div>
  );
}
