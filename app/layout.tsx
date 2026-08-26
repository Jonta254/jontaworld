import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Nav from "./components/site/Nav";
import Footer from "./components/site/Footer";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Web and App Designer and Developer | ${SITE.brand}`,
    // The pipe is the conventional title-tag separator, not prose punctuation.
    template: `%s | ${SITE.name} ${SITE.brand}`,
  },
  description: `I design and build websites, apps, online stores and digital products from strategy to launch. View live work and start a project with ${SITE.name}.`,
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
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icons/jontaworld-48.png", type: "image/png", sizes: "48x48" },
    ],
    shortcut: [{ url: "/icons/jontaworld-48.png", type: "image/png", sizes: "48x48" }],
    apple: [{ url: "/icons/jontaworld-180.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  // Home canonical. Each page overrides with its own path, so a URL reached via
  // query strings or an alternate host consolidates to one address.
  alternates: { canonical: "/", types: { "application/rss+xml": `${SITE.url}/feed.xml` } },
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
