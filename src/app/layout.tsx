import Navbar from "@/components/navbar";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.loureo.com"),
  title: "Loureo - Estudio de desarrollo",
  description: "A la vanguardia en soluciones de desarrollo.",
  icons: {
    icon: "https://www.loureo.com/favicon/favicon.ico",
    shortcut: "https://www.loureo.com/favicon/favicon.ico",
    apple: "https://www.loureo.com/favicon/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.loureo.com",
    title: "Loureo - Estudio de desarrollo",
    description: "A la vanguardia en soluciones de desarrollo.",
    images: [
      {
        url: "https://www.loureo.com/favicon/og_image.png",
        width: 1200,
        height: 630,
        alt: "Loureo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loureo - Estudio de desarrollo",
    description: "A la vanguardia en soluciones de desarrollo.",
    images: ["https://www.loureo.com/favicon/og_image.png"], // Must be an absolute URL
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={spaceGrotesk.className}>
        <Provider>
          <Navbar />

          {children}

          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
