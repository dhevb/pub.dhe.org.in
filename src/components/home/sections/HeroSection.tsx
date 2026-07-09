"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/seo/metadata";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/80 to-navy opacity-90" />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-saffron/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-green/10 blur-3xl" />

      <div className="container-wide section-padding relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <Badge className="mb-6 border border-saffron/30 bg-saffron/10 text-saffron">
            A Bharatiya Knowledge Journal
          </Badge>
          <h1 className="heading-display mb-4 text-white">
            {siteConfig.name}
          </h1>
          <p className="font-devanagari mb-4 text-xl text-white/80 sm:text-2xl">
            {siteConfig.nameHindi}
          </p>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/70">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/vbe.rase/SubmitManuscript">
              <Button size="lg">
                Submit Your Research
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </Link>
            <Link href="/search">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-navy"
              >
                <BookOpen className="h-4 w-4" aria-hidden />
                Explore Papers
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="h-1 bg-gradient-to-r from-saffron via-gold to-green" />
    </section>
  );
}
