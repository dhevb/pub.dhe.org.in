"use client";

import { useState } from "react";
import { apiUrl, journalSubmitArticleDetailsPath } from "@/lib/api/client";
import { LEGACY_STORAGE_KEYS } from "@/lib/auth/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const CATEGORIES = [
  "Education",
  "Science",
  "Technology",
  "Engineering",
  "Social Sciences",
  "Indian Knowledge Systems",
  "Public Policy",
  "Innovation",
];

interface ArticleDetailsStepProps {
  apiPrefix: string;
  onNext: () => void;
  onPrevious: () => void;
}

export function ArticleDetailsStep({
  apiPrefix,
  onNext,
  onPrevious,
}: ArticleDetailsStepProps) {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem(LEGACY_STORAGE_KEYS.userId);
    const manuscriptId = localStorage.getItem("manuscriptId");

    if (!manuscriptId) {
      setError("Manuscript ID not found. Please complete author details first.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(apiUrl(journalSubmitArticleDetailsPath(apiPrefix)), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          abstract,
          category,
          keywords,
          userId,
          manuscriptId,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      onNext();
    } catch {
      setError("An error occurred while submitting article details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-text">Article Details</h2>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="abstract">Abstract</Label>
        <textarea
          id="abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          required
          rows={5}
          className="input-field"
          placeholder="250–300 words"
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="keywords">Keywords</Label>
        <Input
          id="keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Comma separated"
          required
        />
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
