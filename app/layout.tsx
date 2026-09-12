import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getSiteUrl } from "@/lib/site-url";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: { default: "Eyeclimate", template: "%s" },
  description:
    "Eyeclimate turns satellite, airborne, and ground-sensor data into decision-ready intelligence for methane, wildlife, and air quality.",
  applicationName: "Eyeclimate",
  authors: [{ name: "Eyeclimate", url: getSiteUrl() }],
  creator: "Eyeclimate",
  publisher: "Eyeclimate",
  keywords: [
    "Earth observation",
    "climate intelligence",
    "methane detection",
    "wildlife monitoring",
    "remote sensing",
    "geospatial AI",
  ],
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getSiteUrl(),
    siteName: "Eyeclimate",
    title: "Eyeclimate — Earth observation intelligence",
    description:
      "Decision-ready climate intelligence from satellite, airborne, and ground-sensor data.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eyeclimate — Earth observation intelligence",
    description:
      "Decision-ready climate intelligence from satellite, airborne, and ground-sensor data.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${getSiteUrl()}/#organization`,
        name: "Eyeclimate",
        description:
          "Earth-observation intelligence company building AI products for methane emissions, wildlife monitoring, and air-quality analysis.",
        url: getSiteUrl(),
        logo: `${getSiteUrl()}/images/brand/eyeclimate-logo.webp`,
        email: "info@eyeclimate.com",
        contactPoint: {
          "@type": "ContactPoint",
          email: "info@eyeclimate.com",
          contactType: "sales and project inquiries",
          areaServed: "Worldwide",
          availableLanguage: "English",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Stanford",
          addressRegion: "CA",
          addressCountry: "US",
        },
        knowsAbout: [
          "Earth observation",
          "Methane detection and quantification",
          "Wildlife monitoring",
          "Air-quality intelligence",
          "Remote sensing",
          "Geospatial artificial intelligence",
        ],
        sameAs: [
          "https://www.linkedin.com/company/eyeclimate/",
          "https://www.instagram.com/eyeclimate/",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${getSiteUrl()}/#website`,
        url: getSiteUrl(),
        name: "Eyeclimate",
        description:
          "Decision-ready environmental intelligence from satellite, airborne, drone, and ground-sensor data.",
        publisher: { "@id": `${getSiteUrl()}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
