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
});

const libre = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bellevueassurance.com"),
  title: {
    default: "Bellevue Assurance | Final Expense & Life Insurance",
    template: "%s | Bellevue Assurance",
  },
  description:
    "Get affordable final expense and life insurance quotes by phone. Licensed agents, no-obligation quotes, coverage options for seniors. Call today.",
  keywords: [
    "final expense insurance",
    "burial insurance",
    "life insurance for seniors",
    "affordable life insurance",
    "no medical exam life insurance",
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
    title: "Bellevue Assurance | Final Expense & Life Insurance",
    description:
      "Get affordable final expense and life insurance quotes by phone. Licensed agents, no-obligation quotes.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Bellevue Assurance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bellevue Assurance | Final Expense & Life Insurance",
    description: "Get affordable final expense and life insurance quotes by phone.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
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
