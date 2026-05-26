"use client";

import * as React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/components/utility/MotionSafe";
import { duration, easing } from "@/lib/motion";

import { cn } from "@/lib/utils";

interface BentoCardProps {
  title: string;
  body: string;
  eyebrow?: string;
  href?: string;
  Icon?: LucideIcon;
  className?: string;
  children?: React.ReactNode;
}

export function BentoCard({
  title,
  body,
  eyebrow,
  href,
  Icon,
  className,
  children,
}: BentoCardProps) {
  const reduced = useReducedMotion();
  
  const whileHover = !reduced && href ? { scale: 1.02, y: -4 } : undefined;
  const transition = !reduced
    ? { duration: duration.short, ease: easing.outExpo }
    : undefined;

  const inner = (
    <motion.div
      whileHover={whileHover}
      transition={transition}
      className={cn(
        "group relative flex h-full flex-col gap-3 rounded-2xl border border-border-subtle bg-surface-1 p-6 transition-all duration-200",
        href &&
          "hover:border-border-emphasis hover:bg-surface-2",
        "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        {eyebrow && (
          <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
            {eyebrow}
          </div>
        )}
        {Icon && (
          <Icon
            className="h-5 w-5 shrink-0 text-accent"
            aria-hidden
          />
        )}
      </div>
      <h3 className="font-serif text-2xl leading-[1.15] tracking-tight">
        {title}
      </h3>
      <p className="text-[15px] leading-[1.55] text-fg-muted">{body}</p>
      {children}
      {href && (
        <div className="mt-auto flex items-center gap-1 pt-2 text-sm font-medium text-accent opacity-80 transition-opacity group-hover:opacity-100">
          Learn more
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </div>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={title}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0 rounded-2xl"
      >
        {inner}
      </Link>
    );
  }
  return inner;
}

