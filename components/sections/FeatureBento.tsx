import type { LucideIcon } from "lucide-react";
import {
  Workflow,
  MessageCircle,
  Headphones,
  Sparkles,
  PhoneCall,
  PenLine,
  Share2,
  Database,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { BentoCard } from "@/components/cards/BentoCard";

export interface FeatureItem {
  title: string;
  body: string;
  eyebrow?: string;
  href?: string;
  iconName?: string;
  /** Column span at the lg breakpoint within a 12-col grid. Defaults to 4. */
  span?: 4 | 5 | 6 | 7 | 8 | 12;
}

const iconMap: Record<string, LucideIcon> = {
  Workflow,
  MessageCircle,
  Headphones,
  Sparkles,
  PhoneCall,
  PenLine,
  Share2,
  Database,
};

const spanClass: Record<number, string> = {
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  12: "lg:col-span-12",
};

interface FeatureBentoProps {
  heading?: string;
  intro?: string;
  items: FeatureItem[];
}

export function FeatureBento({
  heading = "What we build",
  intro,
  items,
}: FeatureBentoProps) {
  return (
    <Container>
      <div className="max-w-2xl">
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
          Capabilities
        </div>
        <h2 className="mt-3 font-serif text-3xl tracking-tight md:text-4xl">
          {heading}
        </h2>
        {intro && (
          <p className="mt-3 text-base leading-relaxed text-fg-muted">
            {intro}
          </p>
        )}
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {items.map((item) => {
          const Icon = item.iconName ? iconMap[item.iconName] : undefined;
          return (
            <div
              key={item.title}
              className={spanClass[item.span ?? 4] ?? "lg:col-span-4"}
            >
              <BentoCard
                title={item.title}
                body={item.body}
                eyebrow={item.eyebrow}
                href={item.href}
                Icon={Icon}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
}
