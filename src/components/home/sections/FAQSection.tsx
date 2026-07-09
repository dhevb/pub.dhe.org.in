"use client";

import { useState } from "react";
import { FAQS } from "@/lib/content/homepage";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-surface" aria-labelledby="faq-heading">
      <div className="container-narrow">
        <h2 id="faq-heading" className="heading-section mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Card key={faq.question} className="overflow-hidden p-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-text">{faq.question}</span>
                  <span
                    className={cn(
                      "text-xl text-primary transition-transform",
                      isOpen && "rotate-45"
                    )}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="border-t border-border px-6 py-4 text-text-muted">
                    {faq.answer}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
