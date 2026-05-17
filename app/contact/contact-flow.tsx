"use client";

import * as React from "react";

import { ContactForm } from "./contact-form";
import { CalInline } from "./cal-inline";

type Step =
  | { kind: "form" }
  | { kind: "cal"; name: string; email: string; notes: string };

export function ContactFlow() {
  const [step, setStep] = React.useState<Step>({ kind: "form" });
  const calRef = React.useRef<HTMLDivElement | null>(null);

  const handleSubmitted = React.useCallback(
    (r: { name: string; email: string; notes: string }) => {
      setStep({ kind: "cal", ...r });
      // Scroll into view after the Cal block mounts. Microtask is sufficient
      // because the IntersectionObserver inside CalInline triggers the embed.
      queueMicrotask(() => {
        calRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    []
  );

  if (step.kind === "form") {
    return <ContactForm onSubmitted={handleSubmitted} />;
  }

  return (
    <div ref={calRef} className="space-y-6">
      <div className="rounded-2xl border border-accent/40 bg-accent-muted p-4">
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
          Brief received
        </div>
        <p className="mt-1 text-sm text-fg">
          Thanks{step.name ? `, ${step.name}` : ""}. Pick a slot below — your
          email and notes are pre-filled.
        </p>
      </div>
      <CalInline name={step.name} email={step.email} notes={step.notes} />
    </div>
  );
}
