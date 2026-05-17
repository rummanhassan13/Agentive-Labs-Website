"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PricingCard, type PricingCardProps } from "@/components/cards/PricingCard";

export type Vertical =
  | "all"
  | "shopify-d2c"
  | "agency"
  | "logistics"
  | "education"
  | "b2b-saas";

export interface PricingPackage extends PricingCardProps {
  vertical: Vertical;
}

const VERTICAL_LABELS: Record<Vertical, string> = {
  all: "All",
  "shopify-d2c": "Shopify",
  agency: "Agencies",
  logistics: "Logistics",
  education: "Education",
  "b2b-saas": "B2B SaaS",
};

interface PricingTabsProps {
  packages: PricingPackage[];
  customCard?: PricingCardProps;
}

export function PricingTabs({ packages, customCard }: PricingTabsProps) {
  const verticals: Vertical[] = [
    "all",
    "shopify-d2c",
    "agency",
    "logistics",
    "education",
    "b2b-saas",
  ];

  return (
    <Tabs defaultValue="all" className="w-full">
      <div className="mb-8 flex justify-center">
        <TabsList className="flex h-auto flex-wrap gap-1 bg-surface-2">
          {verticals.map((v) => (
            <TabsTrigger key={v} value={v} className="text-sm">
              {VERTICAL_LABELS[v]}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {verticals.map((v) => {
        const filtered =
          v === "all"
            ? packages
            : packages.filter((p) => p.vertical === v || p.vertical === "all");
        return (
          <TabsContent key={v} value={v} className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((pkg) => (
                <PricingCard key={pkg.slug ?? pkg.name} {...pkg} />
              ))}
              {customCard && (
                <PricingCard {...customCard} variant="custom" />
              )}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
