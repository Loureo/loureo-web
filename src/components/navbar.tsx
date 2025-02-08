"use client";

import { Box, Button, Center, HStack, Image } from "@chakra-ui/react";

import { motion } from "framer-motion";

const MotionBox = motion(Box);

const Navbar = () => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 0.6 }}
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
              window.open(
                "mailto:hello@loureo.com?subject=Me gustaría hablar con vosotros",
                "_blank"
              );
            }}
          >
            Contacto →
          </Button>
        </HStack>
      </Center>
    </MotionBox>
  );
};

export default Navbar;
