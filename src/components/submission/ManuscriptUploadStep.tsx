"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl, journalSubmitManuscriptFilePath } from "@/lib/api/client";
import { LEGACY_STORAGE_KEYS } from "@/lib/auth/constants";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";

interface ManuscriptUploadStepProps {
  apiPrefix: string;
  onPrevious: () => void;
}

export function ManuscriptUploadStep({
  apiPrefix,
  onPrevious,
}: ManuscriptUploadStepProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a manuscript file to upload.");
      return;
    }

    const manuscriptId = localStorage.getItem("manuscriptId");
    const userId = localStorage.getItem(LEGACY_STORAGE_KEYS.userId);

    if (!manuscriptId || !userId) {
      setError("Session expired. Please restart the submission process.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("manuscriptId", manuscriptId);
    formData.append("userId", userId);

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(apiUrl(journalSubmitManuscriptFilePath(apiPrefix)), {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      setSuccess("Manuscript uploaded successfully!");
      setTimeout(() => router.push("/dashboard/author"), 2000);
    } catch {
      setError("An error occurred while uploading the manuscript file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-text">
        Manuscript Upload
      </h2>
      <div>
        <Label htmlFor="manuscript-file">Upload Manuscript (PDF/DOC)</Label>
        <input
          id="manuscript-file"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="input-field mt-1"
          required
        />
      </div>

      {error && <p className="text-sm text-error" role="alert">{error}</p>}
      {success && <p className="text-sm text-green" role="status">{success}</p>}

      <div className="flex justify-between pt-2">
        <Button type="button" variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Uploading…" : "Submit Manuscript"}
        </Button>
      </div>
    </form>
  );
}
