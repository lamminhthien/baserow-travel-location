import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TravelMap - Discover Amazing Places",
  description: "Interactive travel map with locations, prices, and links to Google Maps, Reviews, and TikTok",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}