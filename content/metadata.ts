import type { Metadata } from "next";
import { SITE } from "./site";

export function routeMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website", url: path, title, description,
      siteName: SITE.brand,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Josiah | jontAWorld" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}
