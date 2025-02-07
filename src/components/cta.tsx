import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";

import { useRef } from "react";

const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const CTA = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  return (
    <VStack gap={16} maxW={"4xl"} mx={"auto"} px={4} my={24}>
      <MotionVStack ref={containerRef} gap={12} textAlign={"center"}>
        <MotionHeading
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight={400}
          letterSpacing={"tight"}
          lineHeight={"1.2"}
        >
          ¿Listo para revolucionar tu negocio con un toque de sencillez y
          audacia?
        </MotionHeading>

        <MotionText
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          fontSize={{ base: "lg", md: "xl" }}
          color={"gray.600"}
          maxW={"3xl"}
        >
          Contáctanos y descubre cómo transformar tus procesos y tus resultados.
          Hablemos y hagamos que la tecnología sea tu mayor ventaja competitiva.
        </MotionText>

        <MotionButton
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          size={"lg"}
          colorPalette={"brand"}
          variant={"subtle"}
          onClick={() => {
            window.open("mailto:hello@loureo.com");
          }}
        >
          Contáctanos
        </MotionButton>
      </MotionVStack>
    </VStack>
  );
};

export default CTA;
