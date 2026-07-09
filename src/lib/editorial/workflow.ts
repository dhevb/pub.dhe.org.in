export type EditorialDecision =
  | "accept"
  | "reject"
  | "minor_revision"
  | "major_revision"
  | "withdrawn";

export type ManuscriptStatus =
  | "submitted"
  | "screening"
  | "under_review"
  | "revision_requested"
  | "accepted"
  | "rejected"
  | "scheduled"
  | "published"
  | "withdrawn";

export interface EditorialNote {
  id: string;
  authorId: string;
  body: string;
  createdAt: string;
  visibility: "editor" | "reviewer" | "author";
}

export interface ReviewAssignment {
  id: string;
  manuscriptId: string;
  reviewerId: string;
  reviewerEmail: string;
  status: "invited" | "accepted" | "declined" | "completed";
  dueDate?: string;
  recommendation?: EditorialDecision;
}

export interface StatusHistoryEntry {
  status: ManuscriptStatus;
  at: string;
  by: string;
  note?: string;
}

export interface PublicationSchedule {
  volume?: string;
  issue?: string;
  scheduledAt?: string;
  publishedAt?: string;
}

export interface EditorialManuscript {
  id: string;
  title: string;
  status: ManuscriptStatus;
  submittedAt: string;
  assignments: ReviewAssignment[];
  notes: EditorialNote[];
  history: StatusHistoryEntry[];
  schedule?: PublicationSchedule;
}

export const EDITORIAL_TRANSITIONS: Record<
  ManuscriptStatus,
  ManuscriptStatus[]
> = {
  submitted: ["screening", "withdrawn"],
  screening: ["under_review", "rejected", "withdrawn"],
  under_review: ["revision_requested", "accepted", "rejected"],
  revision_requested: ["under_review", "withdrawn"],
  accepted: ["scheduled", "published"],
  rejected: [],
  scheduled: ["published"],
  published: [],
  withdrawn: [],
};

export function canTransition(
  from: ManuscriptStatus,
  to: ManuscriptStatus
): boolean {
  return EDITORIAL_TRANSITIONS[from]?.includes(to) ?? false;
}
