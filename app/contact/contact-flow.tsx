"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useReducedMotion } from "@/components/utility/MotionSafe";
import { staggerContainer, fadeUp } from "@/lib/motion";

import { ContactForm } from "./contact-form";
import { CalInline } from "./cal-inline";

type Step =
  | { kind: "triage" }
  | { kind: "form"; workflow: string }
  | { kind: "cal"; name: string; email: string; notes: string };

const TRIAGE_OPTIONS = [
  {
    id: "lead_routing",
    title: "Lead capture & routing",
    description: "Automate inbound lead processing, qualification, scoring, and instant routing directly to CRM.",
    draftText: "We want to automate our lead capture and routing first. Specifically, we'd like to integrate lead forms with our CRM and automate the sorting.",
    icon: (
      <svg className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-12A2.25 2.25 0 013.75 8.25V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v8.25m0 0l-3-3m3 3l3-3" />
      </svg>
    ),
  },
  {
    id: "support_triage",
    title: "Customer support triage",
    description: "Qualify inbound support tickets, categorize queries, and auto-draft suggested responses.",
    draftText: "We want to automate customer support triage first. Specifically, we want to classify incoming tickets and generate draft replies.",
    icon: (
      <svg className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.625.625 0 11-1.25 0 .625.625 0 011.25 0zm4.5 0a.625.625 0 11-1.25 0 .625.625 0 011.25 0zm4.5 0a.625.625 0 11-1.25 0 .625.625 0 011.25 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75a9.764 9.764 0 01-3.013-.488l-3.76 1.003A.75.75 0 014 21.75v-4.13A9.78 9.78 0 012.25 12z" />
      </svg>
    ),
  },
  {
    id: "data_entry",
    title: "Data entry & sync",
    description: "Eliminate manual data transfers between your inbox, spreadsheets, CRM, and internal databases.",
    draftText: "We want to automate data entry and sync first. Specifically, we want to automate data sync from our operational tools into our CRM.",
    icon: (
      <svg className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
];

export function ContactFlow() {
  const searchParams = useSearchParams();
  const presetPackage = searchParams.get("package") ?? "";
  const presetWorkflowId = searchParams.get("workflow") ?? "";

  const reduced = useReducedMotion();
  const calRef = React.useRef<HTMLDivElement | null>(null);

  // Auto-resolve preset workflow ID to standard text
  const getPresetWorkflowText = (id: string): string => {
    const opt = TRIAGE_OPTIONS.find((o) => o.id === id);
    return opt ? opt.draftText : "";
  };

  const [step, setStep] = React.useState<Step>(() => {
    if (presetPackage || presetWorkflowId) {
      return { kind: "form", workflow: getPresetWorkflowText(presetWorkflowId) };
    }
    return { kind: "triage" };
  });

  const handleSubmitted = React.useCallback(
    (r: { name: string; email: string; notes: string }) => {
      setStep({ kind: "cal", ...r });
      queueMicrotask(() => {
        calRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    []
  );

  const selectTriage = (workflowId: string, draftText: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("workflow", workflowId);
    window.history.replaceState(null, "", `?${params.toString()}`);
    setStep({ kind: "form", workflow: draftText });
  };

  const bypassTriage = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("workflow");
    window.history.replaceState(null, "", `?${params.toString()}`);
    setStep({ kind: "form", workflow: "" });
  };

  if (step.kind === "triage") {
    return (
      <div className="space-y-6">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
            Step 1 of 2
          </span>
          <h2 className="mt-2 font-serif text-2xl tracking-tight text-fg md:text-3xl">
            What is your biggest operational drag?
          </h2>
          <p className="mt-2 text-sm text-fg-muted">
            Select one option to instantly pre-fill a brief, or bypass to type your own manually.
          </p>
        </div>

        <motion.div
          variants={!reduced ? staggerContainer : undefined}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-3"
        >
          {TRIAGE_OPTIONS.map((opt) => (
            <motion.button
              key={opt.id}
              variants={!reduced ? fadeUp : undefined}
              onClick={() => selectTriage(opt.id, opt.draftText)}
              className="group flex flex-col text-left items-start gap-4 p-5 rounded-2xl border border-border-subtle bg-surface-1 hover:border-accent hover:bg-surface-2 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0"
              whileHover={!reduced ? { y: -3, scale: 1.01 } : undefined}
              transition={!reduced ? { duration: 0.22, ease: [0.16, 1, 0.3, 1] } : undefined}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2 group-hover:bg-accent/10 border border-border-subtle transition-colors duration-300">
                {opt.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="font-medium text-base text-fg group-hover:text-accent transition-colors duration-300">
                  {opt.title}
                </h3>
                <p className="text-xs leading-relaxed text-fg-muted">
                  {opt.description}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <div className="flex justify-center pt-2">
          <button
            onClick={bypassTriage}
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle hover:text-accent hover:underline transition-colors duration-200 cursor-pointer"
          >
            Bypass / describe something else manually &rarr;
          </button>
        </div>
      </div>
    );
  }

  if (step.kind === "form") {
    return (
      <div className="space-y-6">
        <div>
          <button
            onClick={() => setStep({ kind: "triage" })}
            className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle hover:text-accent transition-colors duration-200"
          >
            &larr; Back to triage options
          </button>
        </div>
        <ContactForm onSubmitted={handleSubmitted} defaultWorkflow={step.workflow} />
      </div>
    );
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

