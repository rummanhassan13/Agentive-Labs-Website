import { Container } from "@/components/layout/Container";

export interface Step {
  number: string;
  title: string;
  body: string;
}

interface HowItWorksProps {
  heading?: string;
  intro?: string;
  steps: Step[];
}

export function HowItWorks({
  heading = "How we work",
  intro,
  steps,
}: HowItWorksProps) {
  return (
    <Container>
      <div className="max-w-2xl">
        <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
          {heading}
        </h2>
        {intro && (
          <p className="mt-3 text-base leading-relaxed text-fg-muted">
            {intro}
          </p>
        )}
      </div>
      <ol className="mt-10 grid gap-6 md:grid-cols-4">
        {steps.map((step) => (
          <li
            key={step.number}
            className="flex flex-col gap-3 rounded-2xl border border-border-subtle bg-surface-1 p-6"
          >
            <div className="font-mono text-3xl tracking-tight text-accent">
              {step.number}
            </div>
            <h3 className="font-serif text-xl tracking-tight">{step.title}</h3>
            <p className="text-sm leading-relaxed text-fg-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Container>
  );
}
