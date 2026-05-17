import Link from "next/link";
import { Shield, Database, FileText } from "lucide-react";

export function SecurityBadgeRow() {
  const items = [
    { Icon: Shield, label: "Compliance posture", href: "/security" },
    { Icon: Database, label: "Data flow + retention", href: "/security#data" },
    {
      Icon: FileText,
      label: "Sub-processors",
      href: "/security#sub-processors",
    },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
      {items.map(({ Icon, label, href }) => (
        <Link
          key={label}
          href={href}
          className="inline-flex items-center gap-2 transition-colors hover:text-fg"
        >
          <Icon className="h-3.5 w-3.5" aria-hidden />
          <span>{label}</span>
        </Link>
      ))}
    </div>
  );
}
