import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gerthela Taverna - Fresh Seafood in Saranda, Albania",
  description:
    "Authentic Mediterranean seafood restaurant on Saranda waterfront. Fresh daily catch, family-owned. Pick your own fish. Open daily 1PM-11PM.",
  keywords: ["restaurant", "seafood", "Saranda", "Albania", "Mediterranean", "fish"],
  openGraph: {
    title: "Gerthela Taverna - Fresh Seafood in Saranda",
    description: "Experience authentic Mediterranean cuisine on Saranda's waterfront.",
    url: "https://gerthela.al",
    siteName: "Gerthela Taverna",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
