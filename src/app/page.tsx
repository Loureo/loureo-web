"use client";

import {
  Box,
  Grid,
  GridItem,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Variants, motion } from "framer-motion";

import { Link } from "@chakra-ui/next-js";
import Marquee from "react-fast-marquee";
import { PiArrowCircleUpRight } from "react-icons/pi";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 1,
    },
  },
};

const item: Variants = {
  hidden: { y: 100, opacity: 0, transition: { duration: 0.8 } },
  show: { y: 0, opacity: 1, transition: { duration: 0.8 } },
};

export default function Home() {
  return (
    <VStack
      spacing={{ base: 4, md: 8 }}
      px={{ base: 4, md: 8 }}
      pb={{ base: 4, md: 8 }}
      pt={{ base: 0 }}
      as={motion.div}
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Box w={"full"} h={"90%"} as={motion.div} variants={item}>
        <Box
          as="video"
          poster="https://assets-global.website-files.com/62f22a75df043850e3e9e22c/636e7f6c49cf1238f936d2e7_preview_reel_desktop.webp"
          width="100%"
          muted
          playsInline
          loop
          autoPlay
          data-object-fit="cover"
          objectFit={"cover"}
          display={"block"}
          lineHeight={0}
          pos={"relative"}
          top={0}
          left={0}
          w={"100%"}
          h={"100%"}
          borderRadius={"20px"}
        >
          <source
            src="https://player.vimeo.com/progressive_redirect/playback/764891094/rendition/1080p/file.mp4?loc=external&amp;signature=514594fbee03548845bbad0d845efcfd514e89f0d63546fbb1a1a6e88ab42bb2"
            type="video/mp4"
          />
        </Box>
      </Box>

      <VStack
        spacing={8}
        justifyContent={"start"}
        alignItems={"start"}
        bgColor={"gray.900"}
        py={{ base: 4, md: 8 }}
        w={"full"}
        borderRadius={"20px"}
        as={motion.div}
        variants={item}
      >
        <Grid
          templateRows={{ base: "repeat(12, 1fr)", md: "repeat(1, 1fr)" }}
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(12, 1fr)" }}
          gap={4}
        >
          <GridItem rowSpan={{ base: 4, md: 1 }} colSpan={{ base: 1, md: 4 }}>
            <Heading
              as={"h1"}
              fontWeight={"semibold"}
              px={{ base: 4, md: 8 }}
              lineHeight={1}
            >
              Pronto...
            </Heading>
          </GridItem>

          <GridItem rowSpan={{ base: 8, md: 1 }} colSpan={{ base: 1, md: 8 }}>
            <VStack
              spacing={4}
              justifyContent={"start"}
              alignItems={"start"}
              px={{ base: 4, md: 8 }}
            >
              <Heading as={"h2"} fontWeight={"medium"} fontSize={"xl"}>
                Somos un equipo de especialistas enfocados en crear y gestionar
                marcas, productos y experiencias digitales.
              </Heading>
              <Text>
                Entendemos las marcas como un activo clave de los negocios para
                que cumplan sus objetivos y sus propósitos. Desde Soluble les
                acompañamos a consolidarse y escalar de forma auténtica y
                sostenible, maximizando la captación y fidelizando a clientes y
                talento.
              </Text>
            </VStack>
          </GridItem>
        </Grid>

        <Marquee pauseOnHover>
          {[
            "Producto digital",
            "Automatización de procesos",
            "Software a medida",
            "Soluciones con IA",
            "eCommerce",
            "Growth Hacking",
          ].map((text) => (
            <Box
              key={text}
              mx={2.5}
              px={5}
              py={1.5}
              border={"1px solid"}
              borderColor={"gray.500"}
              borderRadius={"20px"}
            >
              <Text as={"span"} fontSize={"md"} color={"gray.400"}>
                {text}
              </Text>
            </Box>
          ))}
        </Marquee>
      </VStack>

      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 2, md: 4 }}
        justifyContent={"space-between"}
        alignItems={{ base: "start", md: "center" }}
        bgColor={"gray.900"}
        mb={{ base: 4, md: 8 }}
        px={{ base: 4, md: 8 }}
        py={{ base: 4, md: 4 }}
        borderRadius={"20px"}
        w={"full"}
        as={motion.div}
        variants={item}
      >
        <Box>
          <Text>Ponte en contacto con nosotros:</Text>
        </Box>

        <Box>
          <Link href={"mailto:hello@loureo.com"}>
            <HStack justifyContent={"end"} alignItems={"center"}>
              <Text>hello@loureo.com</Text>
              <PiArrowCircleUpRight size={"20"} strokeWidth={0.5} />
            </HStack>
          </Link>
        </Box>
      </Stack>
    </VStack>
  );
}
