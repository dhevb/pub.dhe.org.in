import React from "react";
import Link from "next/link";
import {
  isVieArchiveContentEntry,
  isVieArchivePaper,
  isVieArchivePdfPending,
  vieArchivePdfUrl,
  type VieArchiveArticle,
} from "@/lib/journals/vie-archive-utils";

interface ArticleListProps {
  articles: VieArchiveArticle[];
}

function displayAuthor(article: VieArchiveArticle): string {
  return article.author.trim() || article.readArticle?.trim() || "";
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  return (
    <div className="p-4">
      {articles.map((article, index) => {
        if (isVieArchiveContentEntry(article)) {
          const pdfUrl = vieArchivePdfUrl(article.page);
          return (
            <div
              key={`content-${article.volume}-${article.issue}-${index}`}
              className="mb-6 rounded border border-primary/30 bg-primary/5 p-4"
            >
              <h2 className="text-lg font-semibold text-black">
                {article.volume} · {article.issue}
              </h2>
              <p className="text-sm text-gray-600">
                Published: {article.publishDate}
              </p>
              <a
                className="mt-2 inline-block text-sm text-indigo-700 underline hover:text-indigo-900"
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View issue contents (PDF)
              </a>
            </div>
          );
        }

        if (!isVieArchivePaper(article)) {
          return (
            <div
              key={`pending-${index}`}
              className="mb-4 rounded border border-dashed border-gray-300 p-4 text-gray-600"
            >
              {article.volume} · {article.issue} — metadata incomplete
            </div>
          );
        }

        const author = displayAuthor(article);
        const pdfUrl = vieArchivePdfUrl(article.page);
        const pdfPending = isVieArchivePdfPending(article.page);

        return (
          <div
            key={`${article.page}-${index}`}
            className="mb-4 rounded border-2 border-primary bg-white p-4 shadow-md"
          >
            <div className="mb-2">
              <h3 className="font-semibold text-black">{article.title}</h3>
              <p className="text-gray-600">Author: {author}</p>
            </div>
            <div className="flex w-full flex-row flex-wrap gap-1">
              <span className="border-l-2 border-r-2 border-indigo-700 px-2 py-1 text-black md:w-1/3">
                {article.publishDate}
              </span>
              {pdfPending ? (
                <span className="border-r-2 border-gray-400 px-2 py-1 text-center text-gray-500 md:w-2/3">
                  PDF pending upload
                </span>
              ) : (
                <>
                  <a
                    className="border-r-2 border-green-700 px-2 py-1 text-center text-black hover:rounded hover:bg-green-700 hover:text-white md:w-1/3"
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View PDF
                  </a>
                  <a
                    className="block border-r-2 border-indigo-700 px-2 py-1 text-center text-black hover:rounded hover:bg-indigo-700 hover:text-white md:w-1/3"
                    href={pdfUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download PDF
                  </a>
                </>
              )}
              {article.readArticle?.startsWith("/") && (
                <Link
                  href={article.readArticle}
                  className="block border-r-2 border-indigo-700 px-2 py-1 text-center text-black hover:rounded hover:bg-indigo-700 hover:text-white md:w-1/3"
                >
                  Read article
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleList;
