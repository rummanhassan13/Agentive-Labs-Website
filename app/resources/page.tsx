import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Code2, BookOpen } from "lucide-react";

import { SiteShell } from "@/components/layout/SiteShell";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/nav/Breadcrumbs";
import { Hero } from "@/components/hero/Hero";
import { FinalCtaBand } from "@/components/sections/FinalCtaBand";

export const metadata: Metadata = {
  title: "Resources — Agentive Labs",
  description: "Technical documentation, AI automation playbooks, and n8n templates.",
  alternates: { canonical: "/resources" },
};

const RESOURCES = [
  {
    title: "Engineering Blog",
    desc: "Deep dives into vector search, exception handling, and CRM integrations.",
    href: "/blog",
    icon: FileText,
  },
  {
    title: "Playbooks",
    desc: "Step-by-step guides for automating operations in specific industries.",
    href: "/playbooks",
    icon: BookOpen,
  },
  {
    title: "Templates",
    desc: "Exported n8n blueprints and Supabase schemas to kickstart your build.",
    href: "/templates",
    icon: Code2,
  },
];

export default function ResourcesPage() {
  return (
    <SiteShell>
      <Hero
        eyebrow="Knowledge Base"
        title="Technical resources for operations teams."
        sub="We document everything we build. Here is our library of playbooks, infrastructure templates, and engineering notes."
      />

      <Section pad="sm">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resources", href: "/resources" },
            ]}
          />
        </Container>
      </Section>

      <Section pad="lg">
        <Container size="prose">
          <div className="grid gap-6">
            {RESOURCES.map((res) => {
              const Icon = res.icon;
              return (
                <Link
                  key={res.href}
                  href={res.href}
                  className="group flex items-start gap-6 rounded-3xl border border-border-subtle bg-surface-1 p-8 transition-colors hover:border-accent hover:bg-surface-2"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-surface-2 text-fg-subtle group-hover:border-accent/30 group-hover:bg-accent-muted group-hover:text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-fg group-hover:text-accent">
                      {res.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {res.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      <FinalCtaBand />
    </SiteShell>
  );
}
