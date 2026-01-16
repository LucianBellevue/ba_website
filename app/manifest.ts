import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bellevue Assurance - Simplified Issue & Fast Issue Term Life Insurance",
    short_name: "Bellevue Assurance",
    description: "Get simplified issue term life and fast issue term life insurance with no medical exam options. Quick approval from licensed agents.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0e2a47",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
