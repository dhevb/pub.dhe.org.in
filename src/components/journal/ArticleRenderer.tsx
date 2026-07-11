"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getPaperDoi, getPaperLicenseNotice } from "@/lib/i18n/paper-fields";
import type { PaperData } from "@/types/article";
import { useEffect, useMemo, useState } from "react";

interface ArticleRendererProps {
  data: PaperData;
  nightMode?: boolean;
}

export function ArticleRenderer({ data, nightMode = false }: ArticleRendererProps) {
  const [activeSection, setActiveSection] = useState("abstract");
  const references = data.Refrences || data.References || [];

  const sections = useMemo(() => [
    { id: "abstract", label: "Abstract" },
    ...(data.Introduction ? [{ id: "introduction", label: "Introduction" }] : []),
    ...(data.Heading?.map((h, i) => ({
      id: `heading-${i}`,
      label: h.Title,
    })) || []),
    ...(data.Conclusion ? [{ id: "conclusion", label: "Conclusion" }] : []),
    ...(references.length ? [{ id: "references", label: "References" }] : []),
  ], [data, references.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handlePrint = () => window.print();
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: data.ArticleDetails?.Title,
        url: window.location.href,
      });
    }
  };

  const bg = nightMode ? "bg-gray-900 text-gray-100" : "bg-surface text-text";
  const licenseNotice = getPaperLicenseNotice(data);
  const doi = getPaperDoi(data);

  return (
    <article className={`${bg} rounded-xl`}>
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sticky TOC */}
        <aside
          className="lg:sticky lg:top-24 lg:h-fit lg:w-64 lg:shrink-0"
          aria-label="Table of contents"
        >
          <nav className="card p-4">
            <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-wide text-text-muted">
              Contents
            </h2>
            <ul className="space-y-1">
              {sections.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                      activeSection === id
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-text-muted hover:bg-background hover:text-text"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {data.ArticleInfo && (
            <div className="card mt-4 p-4 text-sm">
              <p>
                <span className="font-medium">Published:</span>{" "}
                {data.ArticleInfo.Published}
              </p>
              <p>
                <span className="font-medium">Editor:</span>{" "}
                {data.ArticleInfo.Editor}
              </p>
            </div>
          )}
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          {data.ArticleDetails && (
            <header className="mb-8 border-b border-border pb-8">
              <h1 className="heading-section mb-4">
                {data.ArticleDetails.Title}
              </h1>

              <div className="mb-4 flex flex-wrap gap-2">
                {[...(data.ArticleDetails.Authors || []), ...(data.ArticleDetails.CoAuthors || [])].map(
                  (author, i) => (
                    <Card key={i} className="p-3">
                      <p className="font-semibold text-text">{author.Name}</p>
                      <p className="text-sm text-text-muted">{author.Position}</p>
                      <p className="text-sm text-text-muted">{author.Affiliation}</p>
                    </Card>
                  )
                )}
              </div>

              {data.Keywords && (
                <div className="flex flex-wrap gap-2">
                  {data.Keywords.split(",").map((kw, i) => (
                    <Badge key={i} variant="primary">
                      {kw.trim()}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={handlePrint} className="btn-ghost text-sm">
                  Print
                </button>
                <button onClick={handleShare} className="btn-ghost text-sm">
                  Share
                </button>
              </div>
            </header>
          )}

          {licenseNotice && (
            <p className="mb-6 text-sm text-text-muted">{licenseNotice}</p>
          )}

          {doi && (
            <p className="mb-6 text-sm text-text-muted">
              <span className="font-medium">DOI:</span> {doi}
            </p>
          )}

          {data.Abstract && (
            <section id="abstract" className="mb-8 scroll-mt-24">
              <h2 className="mb-4 font-display text-2xl font-semibold">Abstract</h2>
              <p className="leading-relaxed text-text-muted">{data.Abstract}</p>
            </section>
          )}

          {data.Highlights && (
            <section className="mb-8">
              <h2 className="mb-4 font-display text-2xl font-semibold">Highlights</h2>
              <ul className="list-disc space-y-2 pl-6 text-text-muted">
                {data.Highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </section>
          )}

          {data.Introduction && (
            <section id="introduction" className="mb-8 scroll-mt-24">
              <h2 className="mb-4 font-display text-2xl font-semibold">Introduction</h2>
              <p className="leading-relaxed text-text-muted">{data.Introduction}</p>
            </section>
          )}

          {data.Heading?.map((heading, i) => (
            <section key={i} id={`heading-${i}`} className="mb-8 scroll-mt-24">
              <h2 className="mb-4 font-display text-2xl font-semibold">
                {heading.Title}
              </h2>
              <p className="leading-relaxed text-text-muted">{heading.Content}</p>
              {heading.SubHeadings?.map((sub, j) => {
                const subTitle = sub.SubTitle || sub.Title || "";
                const subContent = sub.SubContent || sub.Content || "";
                return (
                <div key={j} className="mt-6">
                  <h3 className="mb-2 font-display text-xl font-semibold">
                    {subTitle}
                  </h3>
                  <p className="leading-relaxed text-text-muted">{subContent}</p>
                </div>
              );})}
            </section>
          ))}

          {data.Conclusion && (
            <section id="conclusion" className="mb-8 scroll-mt-24">
              <h2 className="mb-4 font-display text-2xl font-semibold">Conclusion</h2>
              <p className="leading-relaxed text-text-muted">{data.Conclusion}</p>
            </section>
          )}

          {data.Recommendations && (
            <section className="mb-8">
              <h2 className="mb-4 font-display text-2xl font-semibold">Recommendations</h2>
              <p className="leading-relaxed text-text-muted">{data.Recommendations}</p>
            </section>
          )}

          {references.length > 0 && (
            <section id="references" className="mb-8 scroll-mt-24">
              <h2 className="mb-4 font-display text-2xl font-semibold">References</h2>
              <ol className="list-decimal space-y-3 pl-6">
                {references.map((ref, i) => (
                  <li key={i} className="text-sm text-text-muted">
                    {ref.url ? (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {ref.text}
                      </a>
                    ) : (
                      ref.text
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
