import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSiteSettings } from "@/lib/cms";
import { enqueueEmail, renderTemplate } from "@/lib/email";
import {
  CSRF_COOKIE_NAME,
  validateCsrfToken,
} from "@/lib/security/csrf";
import { sanitizeEmail, sanitizeString } from "@/lib/security/sanitize";

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  subject: z.string().min(1).max(300),
  message: z.string().min(10).max(5000),
});

export async function POST(request: NextRequest) {
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get("x-csrf-token");
  if (!validateCsrfToken(cookieToken, headerToken)) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const site = getSiteSettings();
    const name = sanitizeString(parsed.data.name, 200);
    const email = sanitizeEmail(parsed.data.email);
    const subject = sanitizeString(parsed.data.subject, 300);
    const message = sanitizeString(parsed.data.message, 5000);

    const { subject: tplSubject, html } = renderTemplate("announcement", {
      title: `Contact: ${subject}`,
      body: `From: ${name} &lt;${email}&gt;<br/><br/>${message}`,
    });

    enqueueEmail({
      to: site.email,
      subject: tplSubject,
      html,
      templateId: "announcement",
      metadata: { from: email, name },
    });

    return NextResponse.json({ ok: true, queued: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
