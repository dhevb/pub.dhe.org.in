import Link from "next/link";
import { footerSections } from "@/lib/navigation";
import { siteConfig } from "@/lib/seo/metadata";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-navy text-white">
      <div className="container-wide section-padding !py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-display text-lg font-bold">Viksit Bharat Journal</p>
            <p className="mt-2 text-sm text-white/70 font-devanagari">
              {siteConfig.nameHindi}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Knowledge for Society. Research for Nation Building. Open, ethical,
              and affordable publishing for every knowledge creator.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-block text-sm text-saffron hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-saffron"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row">
          <p>
            © {year} {siteConfig.publisher}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about" className="hover:text-saffron">
              About
            </Link>
            <Link href="/ContactUs" className="hover:text-saffron">
              Contact
            </Link>
            <Link href="/login" className="hover:text-saffron">
              Login
            </Link>
            <Link href="/dashboard" className="hover:text-saffron">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
