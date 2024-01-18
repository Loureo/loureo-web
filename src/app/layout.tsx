"use client";

import "./globals.css";

import { Button, HStack, Text } from "@chakra-ui/react";
import { Variants, motion } from "framer-motion";

import { Link } from "@chakra-ui/next-js";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import loureoPrimary from "../../public/loureo-primary.svg";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Loureo Website",
  description: "Loureo Website",
};

const navbar: Variants = {
  hidden: {
    y: -100,
    opacity: 0,
    transition: { duration: 0.8, ease: "easeInOut", delay: 1.0 },
  },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeInOut", delay: 1.0 },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <script async src="https://player.vimeo.com/api/player.js"></script>
      </Head>
      <body className={inter.className}>
        <Providers>
          {/* Navbar */}
          <HStack
            justifyContent={"space-between"}
            p={{ base: 4, md: 8 }}
            alignItems={"center"}
            as={motion.div}
            variants={navbar}
            initial="hidden"
            animate="show"
          >
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              spacing={{ base: 3, md: 4 }}
            >
              <Image
                priority
                src={loureoPrimary}
                alt="Loureo Logo"
                width={30}
              />

              <Text
                as="span"
                fontSize={{ base: 26, md: 30 }}
                flex={1}
                fontFamily={"brand"}
                textAlign={"center"}
                fontWeight={"bold"}
                pos={"relative"}
                bottom={"-0.2em"}
              >
                Loureo
              </Text>
            </HStack>

            <Button
              size={"sm"}
              colorScheme="brand"
              border={"1px solid"}
              borderColor={"brand.400"}
              borderRadius={"20px"}
              color={"black"}
              w={"fit-content"}
              justifySelf={"end"}
              as={Link}
              href={"mailto:hello@loureo.com"}
            >
              ¿Hablamos? →
            </Button>
          </HStack>

          {children}
        </Providers>
      </body>
    </html>
  );
}
