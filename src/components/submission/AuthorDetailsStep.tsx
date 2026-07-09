"use client";

import { useState } from "react";
import { apiUrl } from "@/lib/api/client";
import { journalSubmitAuthorDetailsPath } from "@/lib/api/client";
import { LEGACY_STORAGE_KEYS } from "@/lib/auth/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

interface CoAuthor {
  name: string;
  email: string;
  designation: string;
  organization: string;
  mobile: string;
}

interface AuthorDetailsStepProps {
  apiPrefix: string;
  onNext: () => void;
  onPrevious: () => void;
}

export function AuthorDetailsStep({
  apiPrefix,
  onNext,
  onPrevious,
}: AuthorDetailsStepProps) {
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [authorDesignation, setAuthorDesignation] = useState("");
  const [authorOrganization, setAuthorOrganization] = useState("");
  const [authorMobile, setAuthorMobile] = useState("");
  const [coAuthors, setCoAuthors] = useState<CoAuthor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem(LEGACY_STORAGE_KEYS.userId);

    if (!userId) {
      setError("Please sign in before submitting author details.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(apiUrl(journalSubmitAuthorDetailsPath(apiPrefix)), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author_name: authorName,
          author_email: authorEmail,
          author_designation: authorDesignation,
          author_organization: authorOrganization,
          author_mobile: authorMobile,
          co_authors: coAuthors,
          user_id: userId,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      const data = await res.json();
      if (data.manuscriptId) {
        localStorage.setItem("manuscriptId", data.manuscriptId);
      }
      onNext();
    } catch {
      setError("An error occurred while submitting author details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-text">Author Details</h2>
      <div>
        <Label htmlFor="authorName">Author Name</Label>
        <Input id="authorName" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="authorEmail">Email</Label>
        <Input id="authorEmail" type="email" value={authorEmail} onChange={(e) => setAuthorEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="authorDesignation">Designation</Label>
        <Input id="authorDesignation" value={authorDesignation} onChange={(e) => setAuthorDesignation(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="authorOrganization">Organization</Label>
        <Input id="authorOrganization" value={authorOrganization} onChange={(e) => setAuthorOrganization(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="authorMobile">Mobile Number</Label>
        <Input id="authorMobile" value={authorMobile} onChange={(e) => setAuthorMobile(e.target.value)} required />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label>Co-Authors</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setCoAuthors([
                ...coAuthors,
                { name: "", email: "", designation: "", organization: "", mobile: "" },
              ])
            }
          >
            Add Co-Author
          </Button>
        </div>
        {coAuthors.map((co, index) => (
          <div key={index} className="mb-4 rounded-lg border border-border p-4">
            <Input
              placeholder="Name"
              value={co.name}
              onChange={(e) => {
                const next = [...coAuthors];
                next[index] = { ...co, name: e.target.value };
                setCoAuthors(next);
              }}
              className="mb-2"
            />
            <Input
              placeholder="Email"
              type="email"
              value={co.email}
              onChange={(e) => {
                const next = [...coAuthors];
                next[index] = { ...co, email: e.target.value };
                setCoAuthors(next);
              }}
            />
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-error" role="alert">{error}</p>}

      <div className="flex justify-between pt-2">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting…" : "Next"}
        </Button>
      </div>
    </form>
  );
}
