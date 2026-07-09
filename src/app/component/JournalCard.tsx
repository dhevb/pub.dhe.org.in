import React from "react";
import Image from "next/image";
import Link from "next/link";

const JOURNALS = [
  { href: "/vie", title: "Viksit India English", image: "/vie.jpeg" },
  { href: "/vih", title: "Viksit India Hindi", image: "/vih.jpeg" },
  { href: "/vbe", title: "Viksit Bharat English", image: "/vbh.png" },
  { href: "/vbh", title: "Viksit Bharat Hindi", image: "/vbe.png" },
] as const;

const JournalCard: React.FC = () => (
  <div className="flex min-h-screen items-center justify-center bg-orange-100">
    <div className="grid w-full max-w-screen-lg grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
      {JOURNALS.map((journal) => (
        <Link
          key={journal.href}
          href={journal.href}
          className="block rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
        >
          <h3 className="mb-3 text-sm font-semibold text-gray-800">{journal.title}</h3>
          <div className="flex justify-center">
            <Image
              alt={journal.title}
              src={journal.image}
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

export default JournalCard;
