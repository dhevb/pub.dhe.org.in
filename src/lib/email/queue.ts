export type EmailTemplateId =
  | "submission_acknowledgement"
  | "revision_request"
  | "reviewer_invitation"
  | "acceptance"
  | "rejection"
  | "publication_notice"
  | "password_reset"
  | "newsletter"
  | "announcement";

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text?: string;
  templateId: EmailTemplateId;
  metadata?: Record<string, string>;
}

export interface EmailQueueItem extends EmailMessage {
  id: string;
  status: "pending" | "sent" | "failed";
  createdAt: string;
  attempts: number;
}

/** In-memory queue placeholder — replace with Redis/BullMQ in production scale. */
const queue: EmailQueueItem[] = [];

export function renderTemplate(
  id: EmailTemplateId,
  vars: Record<string, string>
): { subject: string; html: string } {
  const templates: Record<EmailTemplateId, { subject: string; body: string }> = {
    submission_acknowledgement: {
      subject: "Manuscript received — {{journal}}",
      body: "<p>Dear {{author}},</p><p>We have received your manuscript <strong>{{title}}</strong>.</p>",
    },
    revision_request: {
      subject: "Revision requested — {{title}}",
      body: "<p>Please revise your manuscript per editor comments.</p>",
    },
    reviewer_invitation: {
      subject: "Peer review invitation — {{title}}",
      body: "<p>You are invited to review <strong>{{title}}</strong>.</p>",
    },
    acceptance: {
      subject: "Manuscript accepted — {{title}}",
      body: "<p>Congratulations! Your manuscript has been accepted.</p>",
    },
    rejection: {
      subject: "Editorial decision — {{title}}",
      body: "<p>Thank you for your submission. We are unable to accept it at this time.</p>",
    },
    publication_notice: {
      subject: "Published — {{title}}",
      body: "<p>Your article is now live at {{url}}.</p>",
    },
    password_reset: {
      subject: "Password reset — Viksit Bharat Journal",
      body: "<p>Use this link to reset your password: {{link}}</p>",
    },
    newsletter: {
      subject: "{{subject}}",
      body: "{{content}}",
    },
    announcement: {
      subject: "{{title}}",
      body: "<p>{{body}}</p>",
    },
  };

  const t = templates[id];
  let subject = t.subject;
  let html = t.body;
  for (const [k, v] of Object.entries(vars)) {
    subject = subject.replaceAll(`{{${k}}}`, v);
    html = html.replaceAll(`{{${k}}}`, v);
  }
  return { subject, html };
}

export function enqueueEmail(message: EmailMessage): EmailQueueItem {
  const item: EmailQueueItem = {
    ...message,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
    attempts: 0,
  };
  queue.push(item);
  return item;
}

export function getPendingEmails(): EmailQueueItem[] {
  return queue.filter((q) => q.status === "pending");
}
