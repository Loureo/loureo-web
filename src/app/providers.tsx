"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import Fonts from "./fonts";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#FBFFE8",
      100: "#F9FFDE",
      200: "#F6FFC9",
      300: "#F3FFB5",
      400: "#EFFFA0",
      500: "#ECFF8C",
      600: "#E4FF5E",
      700: "#DDFF30",
      800: "#D5FF02",
      900: "#B0D300",
      950: "#9DBC00",
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
