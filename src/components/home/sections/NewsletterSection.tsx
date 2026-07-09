import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function NewsletterSection() {
  return (
    <section className="section-padding bg-navy text-white" aria-labelledby="newsletter-heading">
      <div className="container-narrow text-center">
        <h2 id="newsletter-heading" className="heading-section mb-4 text-white">
          Stay Updated
        </h2>
        <p className="mb-8 text-white/70">
          Get announcements on call for papers, special issues, conferences, and
          new publications from Viksit Bharat Journal.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/ContactUs">
            <Button className="bg-saffron hover:brightness-110">
              Subscribe via Contact
            </Button>
          </Link>
          <Link href="/feed.xml">
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white hover:text-navy"
            >
              RSS Feed
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
