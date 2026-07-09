import { Providers } from "@/components/Providers";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Noto_Sans_Devanagari } from "next/font/google";
import { buildMetadata } from "@/lib/seo/metadata";
import { organizationSchema, websiteSchema } from "@/lib/seo/schemas";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata: Metadata = buildMetadata({});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FF9933" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1628" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${notoDevanagari.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </head>
      <body className="min-h-screen bg-background font-body antialiased">
        <Providers>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <div id="main-content">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
