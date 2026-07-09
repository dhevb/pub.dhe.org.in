"use client";

import React from "react";

interface Document {
  title: string;
  filePath: string;
  fileType: "pdf" | "docx";
}

const documents: Document[] = [
  {
    title: "Guidelines",
    filePath: "/Guidelines for Viksit India-Revised.docx",
    fileType: "docx",
  },
  {
    title: "New Special Issue",
    filePath: "/files/new_special_issue.docx",
    fileType: "docx",
  },
];

const NewIssue: React.FC = () => {
  const handleReadClick = (doc: Document) => {
    if (doc.fileType === "docx") {
      window.open(
        `https://docs.google.com/gview?url=${window.location.origin}${doc.filePath}&embedded=true`,
        "_blank"
      );
    } else {
      window.open(doc.filePath, "_blank");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start space-y-8 bg-gray-100">
      {documents.map((doc) => (
        <div key={doc.filePath} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-medium text-gray-700">{doc.title}</h2>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleReadClick(doc)}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              Read file
            </button>
            <a
              href={doc.filePath}
              download={doc.filePath.split("/").pop()}
              className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-semibold text-text hover:border-primary hover:text-primary"
            >
              Download file
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewIssue;
