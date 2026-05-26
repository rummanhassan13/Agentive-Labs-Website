"use client";

import * as React from "react";
import { useActionState, startTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import {
  contactSchema,
  type ContactInput,
  VERTICAL_LABELS,
  TEAM_SIZE_LABELS,
  BUDGET_LABELS,
} from "@/lib/schemas/contact";
import { submitContact, type ContactActionState } from "./actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const INITIAL_STATE: ContactActionState = { ok: false };

interface ContactFormProps {
  onSubmitted: (result: {
    name: string;
    email: string;
    notes: string;
  }) => void;
  defaultWorkflow?: string;
}

export function ContactForm({ onSubmitted, defaultWorkflow = "" }: ContactFormProps) {
  const searchParams = useSearchParams();
  const presetPackage = searchParams.get("package") ?? "";
  const presetVertical = (searchParams.get("vertical") ?? "") as
    | ContactInput["vertical"]
    | "";

  const [state, formAction, isPending] = useActionState(
    submitContact,
    INITIAL_STATE
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      vertical: (presetVertical || "other") as ContactInput["vertical"],
      workflow: defaultWorkflow,
      teamSize: "10-50",
      budget: "2-5k",
      siteUrl: "",
      packageSlug: presetPackage,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const workflowValue = watch("workflow") ?? "";
  // eslint-disable-next-line react-hooks/incompatible-library
  const verticalValue = watch("vertical");
  // eslint-disable-next-line react-hooks/incompatible-library
  const teamSizeValue = watch("teamSize");
  // eslint-disable-next-line react-hooks/incompatible-library
  const budgetValue = watch("budget");

  React.useEffect(() => {
    if (state.ok) {
      onSubmitted({
        name: state.name ?? "",
        email: state.email ?? "",
        notes: state.notes ?? "",
      });
    }
  }, [state.ok, state.name, state.email, state.notes, onSubmitted]);

  const onSubmit: SubmitHandler<ContactInput> = (data) => {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (v != null) fd.set(k, String(v));
    });
    startTransition(() => formAction(fd));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-10"
    >
      {/* Fieldset 1: About you */}
      <fieldset className="space-y-4">
        <legend className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
          About you
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Name"
            error={errors.name?.message ?? state.errors?.name?.[0]}
            required
          >
            <Input
              autoComplete="name"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
          </Field>
          <Field
            label="Email"
            error={errors.email?.message ?? state.errors?.email?.[0]}
            required
          >
            <Input
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
          </Field>
        </div>
        <Field label="Company" error={errors.company?.message}>
          <Input
            autoComplete="organization"
            placeholder="Optional"
            {...register("company")}
          />
        </Field>
      </fieldset>

      {/* Fieldset 2: Your business */}
      <fieldset className="space-y-4">
        <legend className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
          Your business
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Vertical"
            error={errors.vertical?.message ?? state.errors?.vertical?.[0]}
            required
          >
            <Select
              value={verticalValue}
              onValueChange={(v) =>
                setValue("vertical", v as ContactInput["vertical"], {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Pick your closest vertical" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(VERTICAL_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="hidden"
              {...register("vertical")}
              value={verticalValue ?? ""}
              readOnly
            />
          </Field>
          <Field
            label="Site URL"
            error={errors.siteUrl?.message}
            hint="Optional"
          >
            <Input
              type="url"
              placeholder="https://"
              autoComplete="url"
              {...register("siteUrl")}
            />
          </Field>
        </div>
        <Field
          label="Team size"
          error={errors.teamSize?.message ?? state.errors?.teamSize?.[0]}
          required
        >
          <RadioGroup
            value={teamSizeValue}
            onValueChange={(v) =>
              setValue("teamSize", v as ContactInput["teamSize"], {
                shouldValidate: true,
              })
            }
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {Object.entries(TEAM_SIZE_LABELS).map(([value, label]) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-2 rounded-md border border-border-subtle bg-surface-1 px-3 py-2 text-sm text-fg-muted has-[input:checked]:border-accent has-[input:checked]:text-fg"
              >
                <RadioGroupItem value={value} />
                <span>{label}</span>
              </label>
            ))}
          </RadioGroup>
          <input
            type="hidden"
            {...register("teamSize")}
            value={teamSizeValue ?? ""}
            readOnly
          />
        </Field>
      </fieldset>

      {/* Fieldset 3: Workflow */}
      <fieldset className="space-y-4">
        <legend className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
          What you&rsquo;d remove first
        </legend>
        <Field
          label="Workflow to remove first"
          error={errors.workflow?.message ?? state.errors?.workflow?.[0]}
          hint={`${workflowValue.length}/800 characters`}
          required
        >
          <Textarea
            rows={5}
            maxLength={800}
            placeholder="The repeatable manual thing that's eating your week — be specific."
            aria-invalid={!!errors.workflow}
            {...register("workflow")}
          />
        </Field>
      </fieldset>

      {/* Fieldset 4: Budget */}
      <fieldset className="space-y-4">
        <legend className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
          Budget
        </legend>
        <RadioGroup
          value={budgetValue}
          onValueChange={(v) =>
            setValue("budget", v as ContactInput["budget"], {
              shouldValidate: true,
            })
          }
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {Object.entries(BUDGET_LABELS).map(([value, label]) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-border-subtle bg-surface-1 px-3 py-2 text-sm text-fg-muted has-[input:checked]:border-accent has-[input:checked]:text-fg"
            >
              <RadioGroupItem value={value} />
              <span>{label}</span>
            </label>
          ))}
        </RadioGroup>
        <input
          type="hidden"
          {...register("budget")}
          value={budgetValue ?? ""}
          readOnly
        />
      </fieldset>

      <input type="hidden" {...register("packageSlug")} value={presetPackage} />

      {/* Form-level error region */}
      <div aria-live="polite" role="alert" className="min-h-[1.25rem]">
        {state.message && !state.ok && (
          <p className="text-sm text-danger">{state.message}</p>
        )}
      </div>

      <div className="space-y-3">
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="w-full"
        >
          {isPending ? "Sending…" : "Send brief and schedule a call →"}
        </Button>
        <p className="text-center text-xs text-fg-subtle">
          We reply within 24h or you can grab a slot now.
        </p>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, error, hint, required, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-1.5">
        <span>{label}</span>
        {required && (
          <span className="text-accent" aria-hidden>
            *
          </span>
        )}
      </Label>
      {children}
      {hint && !error && (
        <p className="text-xs text-fg-subtle">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
