import Link from "next/link";

export function CallForPapersSection() {
  return (
    <section
      className="section-padding bg-gradient-to-r from-saffron to-saffron-deep text-white"
      aria-labelledby="cfp-heading"
    >
      <div className="container-narrow text-center">
        <h2 id="cfp-heading" className="heading-section mb-4 text-white">
          Call for Papers
        </h2>
        <p className="mb-8 text-lg text-white/85">
          Submit your research to Bharat&apos;s indigenous multidisciplinary
          knowledge journal. Open to every knowledge creator.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/vbe.rase/SubmitManuscript"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-8 py-3 text-sm font-semibold text-saffron-deep transition-all hover:bg-white/90"
          >
            Submit Manuscript
          </Link>
          <Link
            href="/about"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-saffron-deep"
          >
            Author Guidelines
          </Link>
        </div>
      </div>
    </section>
  );
}
