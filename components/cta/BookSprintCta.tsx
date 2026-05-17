"use client";

import * as React from "react";
import { getCalApi } from "@calcom/embed-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

interface BookSprintCtaProps extends Omit<ButtonProps, "asChild" | "variant"> {
  label?: string;
  variant?: ButtonProps["variant"];
  notes?: string;
  prefill?: { name?: string; email?: string };
}

const NAMESPACE = "discovery";

export function BookSprintCta({
  label = "Book the Discovery Sprint",
  variant = "default",
  size = "default",
  className,
  notes,
  prefill,
  ...props
}: BookSprintCtaProps) {
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const cal = await getCalApi({ namespace: NAMESPACE });
        if (cancelled) return;
        cal("ui", {
          theme: "auto",
          hideEventTypeDetails: false,
          styles: { branding: { brandColor: site.brand.accentHex } },
        });
      } catch (err) {
        // Cal not available (e.g. SSR fallback) — popup will no-op
        console.warn("[Cal] init failed", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const link = site.cal.link;
  const configObj: Record<string, string> = { layout: "month_view" };
  if (notes) configObj.notes = notes;
  if (prefill?.name) configObj.name = prefill.name;
  if (prefill?.email) configObj.email = prefill.email;

  return (
    <Button
      data-cal-namespace={NAMESPACE}
      data-cal-link={link}
      data-cal-config={JSON.stringify(configObj)}
      data-analytics="book-cta"
      variant={variant}
      size={size}
      className={cn(className)}
      aria-label={`${label} (opens scheduling dialog)`}
      {...props}
    >
      {label}
    </Button>
  );
}
