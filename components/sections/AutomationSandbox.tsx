"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/components/utility/MotionSafe";
import { 
  ShoppingBag, 
  MessageSquare, 
  Globe, 
  Database, 
  Sparkles, 
  Terminal
} from "lucide-react";

interface TriggerOption {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  logs: string[];
  metrics: {
    value: string;
    label: string;
  };
}

const TRIGGERS: TriggerOption[] = [
  {
    id: "shopify",
    name: "Shopify Order Placed",
    icon: ShoppingBag,
    description: "Daily order-to-invoice spreadsheet reconciliation routine",
    color: "oklch(0.78 0.14 195)", // teal
    logs: [
      "⚡ Webhook: Shopify Order #9802 received",
      "🔍 Querying transaction match database (Stripe)...",
      "🤖 AI Match engine: Normalizing multi-currency values...",
      "📝 Generating Xero invoice: INV-9802",
      "✅ Match matched: INV-9802 successfully ledgered in Xero",
      "📈 Counter: +$420 reconciled. Reconciliation time: 12 seconds."
    ],
    metrics: {
      value: "−60% Time",
      label: "Operations reclaim"
    }
  },
  {
    id: "whatsapp",
    name: "WhatsApp Inquiry",
    icon: MessageSquare,
    description: "Intelligent support ticket triage and vector retrieval",
    color: "oklch(0.74 0.15 145)", // green
    logs: [
      "⚡ Webhook: WhatsApp message from +92-300-XXXXXXX",
      "🧠 NLP Classifier: Tagged intent 'FAQ Tracking'",
      "🔍 Supabase pgvector: Semantic vector search launched...",
      "🤖 Drafting AI Response: 'Your package is at the central node...'",
      "📢 Slack Alert: Rep routing complete (Confidence: 96%)",
      "✅ Autoreply delivered to WhatsApp client"
    ],
    metrics: {
      value: "98% Deflect",
      label: "Support Deflection"
    }
  },
  {
    id: "leadform",
    name: "Website Form Capture",
    icon: Globe,
    description: "Inbound client scoping, enrichment, and CRM routing",
    color: "oklch(0.82 0.14 80)", // warning/yellow-gold
    logs: [
      "⚡ Webhook: Inbound form submitted (/contact)",
      "🌐 Firecrawl: Scraping client company domain details...",
      "🧠 GPT enrichment: Extracted size, CRM tech, operations budget",
      "🛡️ Fit Check: Prospect scored as high-priority tier A",
      "📝 Created HubSpot Contact & Routing ticket",
      "✅ Rep notified on Slack in under 70 seconds"
    ],
    metrics: {
      value: "<2 min",
      label: "SLA Speed-to-lead"
    }
  }
];

export function AutomationSandbox() {
  const [activeTrigger, setActiveTrigger] = React.useState<string>("shopify");
  const reduced = useReducedMotion();

  const currentOption = TRIGGERS.find(t => t.id === activeTrigger) || TRIGGERS[0];
  const IconActive = currentOption.icon;

  return (
    <div className="w-full rounded-3xl border border-border-subtle bg-surface-1 p-6 md:p-8 card-glass">
      <div className="mb-6 flex flex-col gap-2">
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
          Active Automation Sandbox
        </div>
        <h3 className="font-serif text-2xl tracking-tight md:text-3xl text-fg">
          Interactive workflow simulation
        </h3>
        <p className="max-w-2xl text-sm leading-relaxed text-fg-muted">
          Select a business trigger on the left to see our custom n8n data engine orchestrate processes, run AI guardrails, and ledger records in real-time.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column - Clickable Trigger Selectors */}
        <div className="flex flex-col gap-3 lg:col-span-4">
          {TRIGGERS.map((t) => {
            const TriggerIcon = t.icon;
            const isActive = t.id === activeTrigger;

            return (
              <button
                key={t.id}
                onClick={() => setActiveTrigger(t.id)}
                className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all ${
                  isActive
                    ? "border-border-emphasis bg-surface-2 shadow-sm"
                    : "border-transparent bg-transparent hover:bg-surface-2/50"
                }`}
              >
                <div 
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${
                    isActive ? "bg-accent-muted text-accent" : "bg-surface-3 text-fg-subtle"
                  }`}
                >
                  <TriggerIcon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-base font-semibold leading-tight text-fg">
                    {t.name}
                  </h4>
                  <p className="text-xs leading-normal text-fg-subtle">
                    {t.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Center Column - Dynamic Node Flow Map */}
        <div className="relative flex flex-col items-center justify-center min-h-[220px] rounded-2xl border border-border-subtle bg-surface-0/50 p-6 lg:col-span-4">
          <div className="absolute inset-0 bg-radial-glow-sm opacity-20 pointer-events-none" />
          
          <div className="z-10 flex flex-col items-center gap-6 w-full max-w-[280px]">
            {/* Start Node */}
            <div className="flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-1 px-4 py-2 text-xs font-mono text-fg shadow-sm">
              <IconActive className="h-4 w-4 text-accent" />
              <span>Trigger</span>
            </div>

            {/* Down Arrow connector */}
            <div className="relative h-8 w-px bg-border-emphasis">
              {!reduced && (
                <motion.div
                  key={activeTrigger}
                  initial={{ y: -16, opacity: 0 }}
                  animate={{ y: 24, opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent"
                />
              )}
            </div>

            {/* AI Agent Node */}
            <div className="flex items-center gap-2 rounded-xl border border-accent/30 bg-surface-1 px-4 py-3 text-xs font-mono text-fg shadow-md">
              <Sparkles className="h-4 w-4 text-accent animate-pulse" />
              <span>Agentive Engine</span>
            </div>

            {/* Down Arrow connector */}
            <div className="relative h-8 w-px bg-border-emphasis">
              {!reduced && (
                <motion.div
                  key={activeTrigger}
                  initial={{ y: -16, opacity: 0 }}
                  animate={{ y: 24, opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent"
                />
              )}
            </div>

            {/* Destination Node */}
            <div className="flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-1 px-4 py-2 text-xs font-mono text-fg shadow-sm">
              <Database className="h-4 w-4 text-fg-subtle" />
              <span>CRM Ledger</span>
            </div>
          </div>
        </div>

        {/* Right Column - Output Log Console */}
        <div className="flex flex-col gap-4 lg:col-span-4">
          {/* Logs panel */}
          <div className="flex flex-col flex-grow rounded-2xl border border-border-subtle bg-surface-3 p-4 font-mono text-xs text-fg-muted shadow-inner min-h-[160px]">
            <div className="mb-2 flex items-center gap-2 border-b border-border-subtle pb-2 text-[10px] uppercase tracking-wider text-fg-subtle">
              <Terminal className="h-3.5 w-3.5 text-accent" />
              <span>Console output log</span>
            </div>
            
            <div className="flex-grow space-y-2 overflow-y-auto max-h-[160px] pr-2">
              <AnimatePresence mode="popLayout">
                {currentOption.logs.map((log, index) => (
                  <motion.div
                    key={`${activeTrigger}-log-${index}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="leading-relaxed"
                  >
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Metric Pill */}
          <div className="flex items-center justify-between rounded-2xl border border-border-subtle bg-surface-2 p-4 shadow-sm">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                Audited Result
              </div>
              <p className="font-serif text-sm font-semibold text-fg">
                {currentOption.metrics.label}
              </p>
            </div>
            <div className="text-right">
              <span className="font-mono text-2xl font-bold tracking-tight text-accent">
                {currentOption.metrics.value}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
