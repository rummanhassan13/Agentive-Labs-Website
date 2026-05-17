"use server";

import { contactSchema } from "@/lib/schemas/contact";

export interface ContactActionState {
  ok: boolean;
  errors?: Partial<Record<string, string[]>>;
  message?: string;
  // On success, return values for Cal pre-fill
  name?: string;
  email?: string;
  notes?: string;
}

export async function submitContact(
  _prev: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const raw: Record<string, FormDataEntryValue> = {};
  formData.forEach((v, k) => {
    raw[k] = v;
  });

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Please fix the highlighted fields.",
    };
  }

  const data = parsed.data;

  // TODO: forward to CRM (HubSpot or Pipedrive) + send notification via Resend
  // to hello@agentivelabs.com. For Phase 2 MVP we accept the submission and
  // pass values back for Cal pre-fill.

  const notes = [
    data.packageSlug ? `Package interest: ${data.packageSlug}` : null,
    `Vertical: ${data.vertical}`,
    `Team size: ${data.teamSize}`,
    `Budget: ${data.budget}`,
    "",
    "Workflow to remove first:",
    data.workflow,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    ok: true,
    name: data.name,
    email: data.email,
    notes,
    message: "Brief received — pick a slot below.",
  };
}
