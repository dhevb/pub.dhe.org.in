"use client";

import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-navy py-6 text-center text-white">
      <div className="container-wide px-4">
        <p className="text-sm text-white/80">
          &copy; {year} Department of Holistic Education. All rights reserved.
        </p>
        <p className="mt-3 text-sm">
          <Link href="/" className="text-saffron hover:underline">
            Main Site
          </Link>
          {" · "}
          <Link href="/ContactUs" className="text-saffron hover:underline">
            Contact
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
