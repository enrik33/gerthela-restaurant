import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
