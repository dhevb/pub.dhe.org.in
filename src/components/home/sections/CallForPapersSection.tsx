import Link from "next/link";
import { Button } from "@/components/ui/Button";

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
          <Link href="/vbe.rase/SubmitManuscript">
            <Button className="bg-white text-saffron-deep hover:bg-white/90">
              Submit Manuscript
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-saffron-deep"
            >
              Author Guidelines
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
