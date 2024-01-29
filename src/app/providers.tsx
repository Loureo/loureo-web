"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Fonts from "./fonts";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#FFFFFF",
      100: "#FFFFFF",
      200: "#FFFFFF",
      300: "#FFFFFF",
      400: "#FFFFFF",
      500: "#FFFFFF",
      600: "#E3E3E3",
      700: "#C7C7C7",
      800: "#ABABAB",
      900: "#8F8F8F",
      950: "#818181",
    },
  },
  styles: {
    global: {
      body: {
        bg: "black",
        color: "white",
      },
    },
  },
  fonts: {
    brand: "Yaro, sans-serif",
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      {children}
    </ChakraProvider>
  );
}
