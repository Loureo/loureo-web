import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import MovingGradientBackground from "@/components/moving-gradient-background";
import { motion } from "framer-motion";
import { toaster } from "@/components/ui/toaster";

const MotionCenter = motion(Center);
const MotionStack = motion(Stack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const Hero = ({
  scrollToRef,
}: {
  scrollToRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <VStack
      pos={"relative"}
      p={4}
      h={{ base: "unset", md: "100dvh" }}
      minH={"100dvh"}
      w={"100dvw"}
      zIndex={1}
    >
      <MovingGradientBackground />

      <MotionCenter
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 0.6 }}
        flexDirection={"column"}
        textAlign={"center"}
        bgColor={"whiteAlpha.100"}
        py={28}
        px={{ base: 4, md: 12 }}
        h={"full"}
        w={"full"}
        borderRadius={{ base: "xl", md: "4xl" }}
        backdropFilter={"blur(10px)"}
        zIndex={1}
        flex={1}
      >
        <VStack gap={{ base: 8, md: 12 }} maxW={"4xl"}>
          {/* Hiring banner */}
          <MotionStack
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.6, delay: 0.2 }}
            cursor={"pointer"}
            gap={3}
            direction={{ base: "row", md: "row" }}
            alignItems={"center"}
            justifyContent={"center"}
            p={1.5}
            bgColor={"whiteAlpha.300"}
            userSelect={"none"}
            rounded={"full"}
            shadow={"subtle"}
            _hover={{ bgColor: "whiteAlpha.300", shadow: "xs" }}
            onClick={() => {
              // Copy to clipboard the email address
              navigator.clipboard.writeText("hello@loureo.com");

              toaster.create({
                title: `Email copied to clipboard`,
                type: "info",
              });
            }}
          >
            <Box bgColor={"brand.50"} py={1} px={3} rounded={"full"}>
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                fontWeight={"bold"}
                textWrap={"nowrap"}
                color={"brand.500"}
              >
                Hiring!
              </Text>
            </Box>

            <Text fontSize={{ base: "xs", md: "sm" }} pr={3}>
              Product developers & designers!
            </Text>
          </MotionStack>

          <MotionHeading
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.6, delay: 0.4 }}
            fontSize={{ base: "3xl", md: "7xl" }}
            fontWeight={400}
            lineHeight={1.05}
            letterSpacing={"tight"}
          >
            Customized and people-focused digital products
          </MotionHeading>

          <MotionText
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.6, delay: 0.6 }}
            fontSize={{ base: "md", md: "lg" }}
            fontWeight={300}
            lineHeight={1.2}
          >
            Fusionamos IA, diseño y estrategia para que tus proyectos alcancen
            todo su potencial. Sin fricciones, sin complicaciones… solo
            resultados reales que impulsan tu crecimiento.
          </MotionText>

          <MotionButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 0.6, delay: 0.8 }}
            size={"lg"}
            colorPalette={"brand"}
            variant={"subtle"}
            onClick={() => {
              scrollToRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Ver más
          </MotionButton>
        </VStack>
      </MotionCenter>
    </VStack>
  );
};

export default Hero;
