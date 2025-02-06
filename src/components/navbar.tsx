"use client";

import { Box, Button, Center, HStack, Image } from "@chakra-ui/react";

import { toaster } from "./ui/toaster";

const Navbar = () => {
  return (
    <Box
      pos={"fixed"}
      top={10}
      left={0}
      right={0}
      zIndex={1000}
      w={"fit-content"}
      p={2}
      m={"0 auto"}
      bgColor={"whiteAlpha.500/80"}
      borderRadius={"full"}
      backdropFilter={"blur(4px)"}
      shadow={"subtle"}
    >
      <Center>
        <HStack gap={8} justifyContent={"space-between"} w={"full"}>
          <Image
            src={"./loureo-primary.svg"}
            alt="Loureo Logo"
            height={30}
            ml={2}
          />

          <Button
            colorPalette={"blacky"}
            onClick={() => {
              navigator.clipboard.writeText("hello@loureo.com");

              toaster.create({
                title: `¡Email copiado al portapapeles!`,
                type: "info",
              });
            }}
          >
            Contacto →
          </Button>
        </HStack>
      </Center>
    </Box>
  );
};

export default Navbar;
