import { NextResponse } from "next/server";
import { z } from "zod";

import { sendLeadEmails } from "@/lib/email";
import type { LeadSubmission } from "@/lib/email";

const leadSchema = z.object({
  name: z.string().min(2, "Please add your name."),
  email: z.string().email("Enter a valid email."),
  company: z.string().optional(),
  phone: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
  interestedServices: z.array(z.string()).min(1, "Select at least one initiative."),
});

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid submission.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const lead: LeadSubmission = parsed.data;

  try {
    const result = await sendLeadEmails(lead);
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error("Lead submission failed", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again shortly." },
      { status: 500 },
    );
  }
}
