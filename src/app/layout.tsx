import "./globals.css";

import Navbar from "@/components/navbar";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Loureo - Estudio de desarrollo",
  description: "A la vanguardia en soluciones de desarrollo.",
  icons: {
    icon: "https://www.loureo.com/favicon.ico",
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
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <Navbar />

          {children}
        </Providers>
      </body>
    </html>
  );
}
