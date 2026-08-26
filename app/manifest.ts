import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Josiah jontAWorld",
    short_name: "jontAWorld",
    description: "Design and engineering for complete digital products.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF9F6",
    theme_color: "#17140F",
    icons: [
      { src: "/icons/jontaworld-48.png", sizes: "48x48", type: "image/png" },
      { src: "/icons/jontaworld-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/jontaworld-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
