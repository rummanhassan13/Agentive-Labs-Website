interface WorkflowDiagramProps {
  className?: string;
}

/**
 * Inline SVG workflow diagram. Three input sources -> central Agent node ->
 * two outputs (CRM Sync + Exception Queue). Dashed connectors animate via
 * CSS keyframes (disabled by prefers-reduced-motion globally).
 */
export function WorkflowDiagram({ className }: WorkflowDiagramProps) {
  return (
    <svg
      viewBox="0 0 800 320"
      className={className}
      role="img"
      aria-labelledby="workflow-title workflow-desc"
    >
      <title id="workflow-title">
        Workflow diagram: leads, inbox and orders flow through an AI agent into
        CRM sync and an exceptions queue
      </title>
      <desc id="workflow-desc">
        Three input nodes labeled Lead, Inbox and Order on the left, connected
        by dashed lines to a central Agent node, which connects to two output
        nodes labeled CRM Sync and Exception Queue on the right.
      </desc>

      <defs>
        <style>{`
          .node-bg { fill: oklch(0.20 0.013 240); stroke: oklch(1 0 0 / 0.08); stroke-width: 1; }
          .node-bg-accent { fill: oklch(0.78 0.14 195 / 0.12); stroke: oklch(0.78 0.14 195 / 0.4); stroke-width: 1; }
          .node-label { fill: oklch(0.80 0.008 240); font-family: var(--font-inter), sans-serif; font-size: 13px; }
          .node-label-accent { fill: oklch(0.78 0.14 195); font-family: var(--font-inter), sans-serif; font-size: 14px; font-weight: 500; }
          .eyebrow { fill: oklch(0.62 0.010 240); font-family: var(--font-geist-mono), monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; }
          .connector { stroke: oklch(0.78 0.14 195 / 0.55); stroke-width: 1.5; fill: none; stroke-dasharray: 4 4; animation: dashFlow 3s linear infinite; }
          @keyframes dashFlow { to { stroke-dashoffset: -16; } }
          :where(html.light) .node-bg { fill: oklch(0.97 0.004 240); stroke: oklch(0.18 0.01 240 / 0.10); }
          :where(html.light) .node-bg-accent { fill: oklch(0.78 0.14 195 / 0.18); }
          :where(html.light) .node-label { fill: oklch(0.42 0.01 240); }
          :where(html.light) .eyebrow { fill: oklch(0.58 0.01 240); }
        `}</style>
      </defs>

      <g>
        <rect x="40" y="40" width="140" height="56" rx="12" className="node-bg" />
        <text x="56" y="64" className="eyebrow">Source</text>
        <text x="56" y="84" className="node-label">Lead form</text>

        <rect x="40" y="132" width="140" height="56" rx="12" className="node-bg" />
        <text x="56" y="156" className="eyebrow">Source</text>
        <text x="56" y="176" className="node-label">WhatsApp inbox</text>

        <rect x="40" y="224" width="140" height="56" rx="12" className="node-bg" />
        <text x="56" y="248" className="eyebrow">Source</text>
        <text x="56" y="268" className="node-label">Shopify order</text>
      </g>

      <path className="connector" d="M180 68 C 270 68, 270 160, 340 160" />
      <path className="connector" d="M180 160 L 340 160" />
      <path className="connector" d="M180 252 C 270 252, 270 160, 340 160" />

      <g>
        <rect
          x="340"
          y="120"
          width="120"
          height="80"
          rx="16"
          className="node-bg-accent"
        />
        <text x="358" y="148" className="eyebrow">Agent</text>
        <text x="358" y="172" className="node-label-accent">Triage + Route</text>
        <text x="358" y="190" className="node-label" style={{ fontSize: 11 }}>
          Documented · audited
        </text>
      </g>

      <path className="connector" d="M460 160 C 530 160, 530 76, 620 76" />
      <path className="connector" d="M460 160 C 530 160, 530 244, 620 244" />

      <g>
        <rect x="620" y="48" width="140" height="56" rx="12" className="node-bg" />
        <text x="636" y="72" className="eyebrow">Output</text>
        <text x="636" y="92" className="node-label">CRM sync</text>

        <rect x="620" y="216" width="140" height="56" rx="12" className="node-bg" />
        <text x="636" y="240" className="eyebrow">Output</text>
        <text x="636" y="260" className="node-label">Exception queue</text>
      </g>
    </svg>
  );
}
