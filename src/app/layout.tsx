import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HtmlLangUpdater from "@/components/HtmlLangUpdater";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gerthela Taverna - Fresh Seafood in Saranda, Albania",
  description:
    "Authentic Mediterranean seafood restaurant on Saranda waterfront. Fresh daily catch, family-owned. Pick your own fish. Open daily 1PM-12AM.",
  keywords: ["restaurant", "seafood", "Saranda", "Albania", "Mediterranean", "fish"],
  metadataBase: new URL("https://gerthela.com"),
  openGraph: {
    title: "Gerthela Taverna - Fresh Seafood in Saranda",
    description: "Experience authentic Mediterranean cuisine on Saranda's waterfront.",
    url: "https://gerthela.com",
    siteName: "Gerthela Taverna",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/IMG_4283.jpeg",
        width: 1200,
        height: 630,
        alt: "Gerthela Taverna - Fresh Seafood Restaurant in Saranda, Albania",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gerthela Taverna - Fresh Seafood in Saranda",
    description: "Experience authentic Mediterranean cuisine on Saranda's waterfront.",
    images: ["/images/IMG_4283.jpeg"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Gerthela Taverna",
              description: "Authentic Mediterranean seafood restaurant on Saranda waterfront. Fresh daily catch, family-owned.",
              url: "https://gerthela.com",
              telephone: "+355686660000",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Rruga Jonianet",
                addressLocality: "Saranda",
                postalCode: "9701",
                addressCountry: "AL",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 39.875,
                longitude: 20.004,
              },
              servesCuisine: ["Seafood", "Mediterranean", "Albanian"],
              openingHours: "Mo-Su 13:00-00:00",
              image: "https://gerthela.com/images/IMG_4283.jpeg",
              sameAs: [
                "https://www.instagram.com/gerthela_/",
                "https://www.tripadvisor.com/Restaurant_Review-g303165-d4926971-Reviews-Gerthela-Saranda_Vlore_County.html",
              ],
            }),
          }}
        />
        <HtmlLangUpdater />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
