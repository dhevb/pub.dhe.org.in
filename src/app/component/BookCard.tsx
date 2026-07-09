import React from "react";
import Image from "next/image";
import Link from "next/link";

const BOOKS = [
  { href: "/Role of academic driven startups in economy.pdf", title: "Role of Academic Driven Startups in Economics", image: "/Role.jpeg" },
  { href: "/vih", title: "Role of Academic Driven Startups in Developing Economy of Jammu & Kashmir", image: "/Role1.jpeg" },
  { href: "/Shiksha_Mahakumbh.pdf", title: "Shiksha Mahakumbh", image: "/shiksha.jpeg" },
  { href: "/SchoolEducation.pdf", title: "Recent Advances in School education", image: "/recent_advances.jpeg" },
] as const;

const BooksCard: React.FC = () => (
  <div className="flex min-h-screen items-center justify-center bg-orange-100">
    <div className="grid w-full max-w-screen-lg grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
      {BOOKS.map((book) => (
        <Link key={book.href} href={book.href} className="block rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
          <h3 className="mb-3 text-sm font-semibold text-gray-800">{book.title}</h3>
          <div className="flex justify-center">
            <Image
              alt=""
              src={book.image}
              height={150}
              width={300}
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default BooksCard;
