import {
  Box,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      w={"full"}
      bgColor={"blacky.700"}
      py={12}
      px={4}
      pb={60}
      position={"relative"}
      zIndex={10}
      overflow={"hidden"}
    >
      <Heading
        fontSize={"150px"}
        color={"blackAlpha.300"}
        lineHeight={"1"}
        textAlign={"center"}
        w={"fit-content"}
        position={"absolute"}
        bottom={-8}
        left={"50%"}
        transform={"translateX(-50%)"}
        zIndex={-1}
        userSelect={"none"}
        whiteSpace={"nowrap"}
        overflow={"hidden"}
        textOverflow={"ellipsis"}
      >
        WHAT HUMANS NEED: <br /> SIMPLE & NICE TECH
      </Heading>

      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        maxW={"7xl"}
        mx={"auto"}
        gap={20}
      >
        <VStack gap={8} justifyContent={"start"} alignItems={"start"}>
          <Image src={"./loureo-primary.svg"} alt="Loureo Logo" height={90} />

          <Text fontSize={"lg"} color={"gray.300"}>
            © Loureo {new Date().getFullYear()}
          </Text>
        </VStack>

        <Heading fontSize={"6xl"} lineHeight={"1.2"}>
          WHAT HUMANS NEED: <br /> SIMPLE & NICE TECH
        </Heading>
      </SimpleGrid>
    </Box>
  );
};

export default Footer;
