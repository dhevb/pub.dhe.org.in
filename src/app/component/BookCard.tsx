import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const BOOKS = [
  {
    href: "/Role of academic driven startups in economy.pdf",
    title: "Role of Academic Driven Startups in Economics",
    image: "/Role.jpeg",
  },
  {
    href: "/vih",
    title: "Role of Academic Driven Startups in Developing Economy of Jammu & Kashmir",
    image: "/Role1.jpeg",
  },
  {
    href: "/Shiksha_Mahakumbh.pdf",
    title: "Shiksha Mahakumbh",
    image: "/shiksha.jpeg",
  },
  {
    href: "/SchoolEducation.pdf",
    title: "Recent Advances in School education",
    image: "/recent_advances.jpeg",
  },
] as const;

const BooksCard = () => (
  <section className="section-padding" aria-labelledby="books-heading">
    <div className="container-wide">
      <h1 id="books-heading" className="heading-section mb-4 text-center">
        Books &amp; Publications
      </h1>
      <p className="mx-auto mb-12 max-w-2xl text-center text-text-muted">
        Featured books, conference reports, and publications from the Viksit Bharat
        Journal ecosystem.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {BOOKS.map((book) => (
          <Link key={book.href} href={book.href} className="group block h-full">
            <Card className="flex h-full flex-col transition-shadow group-hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-base leading-snug">{book.title}</CardTitle>
              </CardHeader>
              <CardContent className="mt-auto flex justify-center">
                <Image
                  alt=""
                  src={book.image}
                  height={150}
                  width={300}
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default BooksCard;
