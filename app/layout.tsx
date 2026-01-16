import type { Metadata } from "next";
import { Inter, Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import { OrganizationSchema } from "@/components/JsonLd";

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
  metadataBase: new URL("https://bellevueassurance.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Bellevue Assurance | Simplified Issue & Fast Issue Term Life Insurance",
    template: "%s | Bellevue Assurance",
  },
  description:
    "Get simplified issue term life and fast issue term life insurance quotes by phone. No medical exam options from carriers like Ethos. Licensed agents, quick approval, affordable coverage.",
  keywords: [
    "simplified issue term life insurance",
    "fast issue term life insurance",
    "no medical exam term life",
    "ethos life insurance",
    "quick approval life insurance",
    "final expense insurance",
    "burial insurance",
    "affordable life insurance",
    "no exam life insurance",
  ],
  authors: [{ name: "Bellevue Assurance" }],
  creator: "Bellevue Assurance",
  publisher: "Bellevue Assurance",
  formatDetection: { email: false, address: false, telephone: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bellevueassurance.com",
    siteName: "Bellevue Assurance",
    title: "Bellevue Assurance | Simplified Issue & Fast Issue Term Life Insurance",
    description:
      "Get simplified issue term life and fast issue term life insurance quotes by phone. No medical exam options from carriers like Ethos. Licensed agents, quick approval.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Bellevue Assurance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bellevue Assurance | Simplified Issue & Fast Issue Term Life Insurance",
    description: "Get simplified issue and fast issue term life insurance with no medical exam options. Quick approval from carriers like Ethos.",
    images: ["/og-image.png"],
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
    google: "google-site-verification=N2AWoOyp_7NyZQsfFvSOvFBT_s57uHF-LM-NweFLFcs",
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
