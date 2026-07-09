import { PUBLICATION_STEPS } from "@/lib/content/homepage";

export function PublicationProcessSection() {
  return (
    <section className="section-padding bg-background" aria-labelledby="process-heading">
      <div className="container-wide">
        <h2 id="process-heading" className="heading-section mb-12 text-center">
          Publication Process
        </h2>
        <ol className="grid gap-6 md:grid-cols-5">
          {PUBLICATION_STEPS.map((step, index) => (
            <li key={step.title} className="relative text-center">
              {index < PUBLICATION_STEPS.length - 1 && (
                <span
                  className="absolute left-[calc(50%+1.5rem)] top-6 hidden h-0.5 w-[calc(100%-3rem)] bg-border md:block"
                  aria-hidden
                />
              )}
              <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                {step.step}
              </div>
              <h3 className="font-semibold text-text">{step.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
