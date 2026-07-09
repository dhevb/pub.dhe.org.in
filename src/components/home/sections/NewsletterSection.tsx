import Link from "next/link";

export function NewsletterSection() {
  return (
    <section className="section-padding bg-navy text-white" aria-labelledby="newsletter-heading">
      <div className="container-narrow text-center">
        <h2 id="newsletter-heading" className="heading-section mb-4 text-white">
          Stay Updated
        </h2>
        <p className="mb-8 text-white/85">
          Get announcements on call for papers, special issues, conferences, and
          new publications from Viksit Bharat Journal.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/ContactUs"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-saffron px-8 py-3 text-sm font-semibold text-white hover:brightness-110"
          >
            Subscribe via Contact
          </Link>
          <Link
            href="/feed.xml"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-navy"
          >
            RSS Feed
          </Link>
        </div>
      </div>
    </section>
  );
}
