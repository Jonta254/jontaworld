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
  };
}
