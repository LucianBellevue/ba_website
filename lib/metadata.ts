import { SITE_CONFIG } from "@/lib/constants";

/** Single source of truth for site URL: https only, no www. Use for canonicals and OG URLs. */
export const defaultOgImage = {
  url: `${SITE_CONFIG.url}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Bellevue Assurance - Life Insurance Made Simple",
};

export const siteUrl = SITE_CONFIG.url;
