/** Send transactional email via Resend when RESEND_API_KEY is set. */
export async function sendEmailViaResend(input: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<{ sent: boolean; id?: string; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "Viksit Bharat Journal <noreply@pub.dhe.org.in>";

  if (!apiKey) {
    return { sent: false, reason: "RESEND_API_KEY not configured" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { sent: false, reason: `Resend error ${res.status}: ${body}` };
  }

  const data = (await res.json()) as { id?: string };
  return { sent: true, id: data.id };
}
