import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Nav from "./components/site/Nav";
import Footer from "./components/site/Footer";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Developer / ${SITE.brand}`,
    // The pipe is the conventional title-tag separator, not prose punctuation.
    template: `%s | ${SITE.name} ${SITE.brand}`,
  },
  description: `${SITE.role}. I design and build complete digital products: ${SITE.services}. Every project shown is live and open to anyone.`,
  keywords: [
    "website designer",
    "web developer",
    "app developer",
    "online store developer",
    "landing page designer",
    "Next.js",
    "React",
    "TypeScript",
    "design systems",
    "brand identity",
  ],
  authors: [{ name: SITE.fullName }],
  creator: SITE.fullName,
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: SITE.url,
    siteName: `${SITE.name} ${SITE.brand}`,
    title: `${SITE.name} | Developer / ${SITE.brand}`,
    description: `Design and engineering for the full web: apps, online stores, marketing sites, design systems, and brand. Every project is live and open to anyone.`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Josiah | Developer / jontAWorld" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Developer / ${SITE.brand}`,
    description: SITE.positioning,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/icons/jontaworld-180.png", sizes: "180x180", type: "image/png" }],
  },
  robots: { index: true, follow: true },
  // Home canonical. Each page overrides with its own path, so a URL reached via
  // query strings or an alternate host consolidates to one address.
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
        {process.env.VERCEL ? <Analytics /> : null}
      </body>
    </html>
  );
}
