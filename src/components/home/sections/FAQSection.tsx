import { FAQS } from "@/lib/content/homepage";
import { Card } from "@/components/ui/Card";

export function FAQSection() {
  return (
    <section className="section-padding bg-surface" aria-labelledby="faq-heading">
      <div className="container-narrow">
        <h2 id="faq-heading" className="heading-section mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <Card key={faq.question} className="overflow-hidden p-0">
              <details className="group" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-left marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="font-semibold text-text">{faq.question}</span>
                  <span
                    className="text-xl text-primary transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="border-t border-border px-6 py-4 text-text-muted">
                  {faq.answer}
                </p>
              </details>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
