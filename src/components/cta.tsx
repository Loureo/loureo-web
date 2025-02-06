import { Button, Heading, Text, VStack } from "@chakra-ui/react";

const CTA = () => {
  return (
    <VStack gap={16} maxW={"4xl"} mx={"auto"} my={24}>
      <VStack gap={12} textAlign={"center"}>
        <Heading
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight={400}
          letterSpacing={"tight"}
          lineHeight={"1.2"}
        >
          ¿Listo para revolucionar tu negocio con un toque de sencillez y
          audacia?
        </Heading>

        <Text
          fontSize={{ base: "lg", md: "xl" }}
          color={"gray.600"}
          maxW={"3xl"}
        >
          Contáctanos y descubre cómo transformar tus procesos y tus resultados.
          Hablemos y hagamos que la tecnología sea tu mayor ventaja competitiva.
        </Text>

        <Button
          size={"lg"}
          colorPalette={"brand"}
          variant={"subtle"}
          onClick={() => {
            window.open("mailto:hola@loureo.com", "_blank");
          }}
        >
          Contáctanos
        </Button>
      </VStack>
    </VStack>
  );
};

export default CTA;
