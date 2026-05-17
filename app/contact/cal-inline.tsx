"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { site } from "@/lib/site";

const Cal = dynamic(
  () => import("@calcom/embed-react").then((m) => m.default),
  {
    ssr: false,
    loading: () => <CalSkeleton />,
  }
);

function CalSkeleton() {
  return (
    <div className="flex h-full min-h-[600px] items-center justify-center">
      <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
        Loading scheduler…
      </div>
    </div>
  );
}

interface CalInlineProps {
  name?: string;
  email?: string;
  notes?: string;
}

export function CalInline({ name, email, notes }: CalInlineProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const params = new URLSearchParams();
  if (name) params.set("name", name);
  if (email) params.set("email", email);
  if (notes) params.set("notes", notes);
  const calLink = params.toString()
    ? `${site.cal.link}?${params.toString()}`
    : site.cal.link;

  return (
    <div
      ref={ref}
      className="min-h-[680px] overflow-hidden rounded-2xl border border-border-subtle bg-surface-1"
    >
      {visible ? (
        <Cal
          calLink={calLink}
          style={{ width: "100%", height: "680px", overflow: "auto" }}
          config={{ layout: "month_view" }}
        />
      ) : (
        <CalSkeleton />
      )}
    </div>
  );
}
