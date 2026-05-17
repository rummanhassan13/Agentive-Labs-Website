import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  email: z.string().email("Please enter a valid email"),
  company: z.string().max(120).optional().or(z.literal("")),
  vertical: z.enum([
    "shopify-d2c",
    "agency",
    "logistics",
    "education",
    "b2b-saas",
    "other",
  ]),
  workflow: z
    .string()
    .min(20, "Tell us a little more — at least 20 characters")
    .max(800),
  teamSize: z.enum(["lt10", "10-50", "50-250", "250+"]),
  budget: z.enum(["1-2k", "2-5k", "5-15k", "need-quote"]),
  siteUrl: z
    .string()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
  // Optional pre-fill from /pricing or /services deep-links
  packageSlug: z.string().optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const VERTICAL_LABELS: Record<ContactInput["vertical"], string> = {
  "shopify-d2c": "Shopify / D2C",
  agency: "Marketing / agency",
  logistics: "Logistics",
  education: "Education",
  "b2b-saas": "B2B SaaS",
  other: "Other",
};

export const TEAM_SIZE_LABELS: Record<ContactInput["teamSize"], string> = {
  lt10: "Under 10",
  "10-50": "10–50",
  "50-250": "50–250",
  "250+": "250+",
};

export const BUDGET_LABELS: Record<ContactInput["budget"], string> = {
  "1-2k": "$1,000–$2,000",
  "2-5k": "$2,000–$5,000",
  "5-15k": "$5,000–$15,000",
  "need-quote": "Need a quote",
};
