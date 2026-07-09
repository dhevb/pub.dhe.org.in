import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/lib/seo/metadata";
import { ArrowRight, BookOpen } from "lucide-react";

/** Hero without framer-motion — avoids LCP delay from opacity:0 initial state. */
export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-navy text-white"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/80 to-navy opacity-90" aria-hidden />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-saffron/10 blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-green/10 blur-3xl" aria-hidden />

      <div className="container-wide section-padding relative">
        <div className="mx-auto max-w-4xl text-center animate-fade-in">
          <Badge className="mb-6 border border-saffron/40 bg-saffron/20 text-white">
            A Bharatiya Knowledge Journal
          </Badge>
          <h1 id="hero-heading" className="heading-display mb-4 text-white">
            {siteConfig.name}
          </h1>
          <p className="font-devanagari mb-4 text-xl text-white/90 sm:text-2xl">
            {siteConfig.nameHindi}
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/85">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/vbe.rase/SubmitManuscript"
              className="btn-primary inline-flex min-h-11 items-center gap-2 px-8 py-4 text-base"
            >
              Submit Your Research
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/search"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/30 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white hover:text-navy"
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              Explore Papers
            </Link>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-saffron via-gold to-green" aria-hidden />
    </section>
  );
}
