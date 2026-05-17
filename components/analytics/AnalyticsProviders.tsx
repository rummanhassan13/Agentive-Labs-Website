"use client";

import * as React from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PlausibleProvider from "next-plausible";

import { site } from "@/lib/site";

/**
 * Analytics layer.
 *
 * Plausible v4 needs a site-specific script URL (https://plausible.io/js/pa-XXX.js)
 * that we don't have yet — leave the Provider unmounted until the user wires
 * NEXT_PUBLIC_PLAUSIBLE_SRC. Vercel Analytics + Speed Insights mount in
 * production only and need no configuration.
 */
export function AnalyticsProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProd =
    typeof process !== "undefined" && process.env.NODE_ENV === "production";
  const plausibleSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC;

  const content = (
    <>
      {children}
      {isProd && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </>
  );

  if (plausibleSrc) {
    return (
      <PlausibleProvider src={plausibleSrc} enabled={isProd}>
        {content}
      </PlausibleProvider>
    );
  }

  // Silently skip Plausible until a script URL is provisioned (placeholder mode).
  // Once configured, set NEXT_PUBLIC_PLAUSIBLE_SRC and rebuild. site.plausible.domain
  // is retained in site config for future use.
  void site.plausible.domain;
  return content;
}
