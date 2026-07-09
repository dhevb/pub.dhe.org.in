"use client";

import { useState } from "react";
import { JOURNAL_LIST } from "@/lib/journals/config";
import { BOOKS_AND_PROCEEDINGS } from "@/lib/content/homepage";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";

export function PublicationSearchSection() {
  const [journalHref, setJournalHref] = useState("");
  const [bookHref, setBookHref] = useState("");

  return (
    <section className="section-padding bg-background" aria-labelledby="search-tools-heading">
      <div className="container-wide">
        <h2 id="search-tools-heading" className="heading-section mb-10 text-center">
          Find Journals & Proceedings
        </h2>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Find Journals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="journal-select">Select a journal</Label>
                <select
                  id="journal-select"
                  className="input-field mt-1"
                  value={journalHref}
                  onChange={(e) => setJournalHref(e.target.value)}
                >
                  <option value="">Search for journals</option>
                  {JOURNAL_LIST.map((j) => (
                    <option key={j.id} value={j.entryRoute}>
                      {j.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                className="w-full"
                disabled={!journalHref}
                onClick={() => journalHref && (window.location.href = journalHref)}
              >
                Go to Journal
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Find Books & Proceedings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="book-select">Select proceedings</Label>
                <select
                  id="book-select"
                  className="input-field mt-1"
                  value={bookHref}
                  onChange={(e) => setBookHref(e.target.value)}
                >
                  <option value="">Search for books/proceedings</option>
                  {BOOKS_AND_PROCEEDINGS.map((book) => (
                    <option key={book.href} value={book.href}>
                      {book.title}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                className="w-full"
                disabled={!bookHref}
                onClick={() => bookHref && window.open(bookHref, "_blank")}
              >
                Open Proceedings
              </Button>
            </CardContent>
          </Card>
        </div>

        <p className="mt-8 text-center text-sm text-text-muted">
          All articles in Viksit Bharat Journal are{" "}
          <strong className="text-text">open access</strong> — peer-reviewed and
          freely available under CC BY 4.0.
        </p>
      </div>
    </section>
  );
}
