import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import { OrganizationSchema } from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  adjustFontFallback: true,
});

const libre = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  title: {
    default: "Bellevue Assurance | Simplified Term Life & Final Expense Insurance",
    template: "%s | Bellevue Assurance",
  },
  description:
    "Get simplified term life, whole life, and final expense insurance quotes by phone. Use our free life insurance rate calculator for instant estimates. No medical exam options from carriers like Ethos. Licensed agents, quick approval, affordable coverage.",
  keywords: [
    "simplified term life insurance",
    "no medical exam term life",
    "final expense insurance",
    "whole life insurance",
    "burial insurance",
    "guaranteed issue life insurance",
    "affordable life insurance",
    "no exam life insurance",
    "life insurance calculator",
    "life insurance rate calculator",
    "free life insurance quote calculator",
  ],
  authors: [{ name: "Bellevue Assurance" }],
  creator: "Bellevue Assurance",
  publisher: "Bellevue Assurance",
  formatDetection: { email: false, address: false, telephone: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "Bellevue Assurance | Simplified Term Life & Final Expense Insurance",
    description:
      "Get simplified term life, whole life, and final expense insurance quotes by phone. No medical exam options from top carriers. Licensed agents, affordable coverage.",
    images: [{ url: `${SITE_CONFIG.url}/og-image.png`, width: 1200, height: 630, alt: "Bellevue Assurance - Life Insurance Made Simple" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bellevue Assurance | Simplified Term Life & Final Expense Insurance",
    description: "Get simplified term life, whole life, and final expense insurance with no medical exam options. Quick approval from top carriers.",
    images: [`${SITE_CONFIG.url}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": 320
    },
  },
  verification: {
    google: "kzPR2WrBIk637SZ4SdxCzx6Skj5WrZuVZ4pQpO",
  },
  category: "Insurance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${libre.variable}`}>
      <head>
        <OrganizationSchema />
      </head>
      <body className="min-h-screen flex flex-col bg-ba-bg text-ba-text antialiased">
        <Header />
        <main className="grow">{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
