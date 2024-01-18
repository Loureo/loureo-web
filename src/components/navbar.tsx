"use client";

import { Button, HStack, Text } from "@chakra-ui/react";
import { Variants, motion } from "framer-motion";

import { Link } from "@chakra-ui/next-js";
import Image from "next/image";
import loureoPrimary from "../../public/loureo-primary.svg";

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

const Navbar = () => {
  return (
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
        <Image priority src={loureoPrimary} alt="Loureo Logo" width={30} />

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
  );
};

export default Navbar;
