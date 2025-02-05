import {
  Box,
  Center,
  For,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

const About = () => {
  return (
    <Box py={24} px={4}>
      <VStack gap={16} maxW={"7xl"} mx={"auto"}>
        {/* Main heading */}
        <VStack gap={12} textAlign={"center"}>
          <Heading
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight={400}
            letterSpacing={"tight"}
            lineHeight={"1.2"}
          >
            Everything you need, all in one place
          </Heading>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color={"gray.600"}
            maxW={"3xl"}
          >
            We enable businesses to stay agile, iterate fast, and keep costs low
            while delivering data-driven solutions that meet your needs.
          </Text>
        </VStack>

        {/* Features grid */}
        <SimpleGrid columns={{ base: 1, md: 6 }} gap={8} w={"full"}>
          <For
            each={[
              {
                title: "Performance focused design",
                description:
                  "Make your product a priority with streamlined, focused UX designed to boost engagement and drive conversions.",
                illustration: (
                  <Box>
                    <Image src="./bento-graph.svg" />
                  </Box>
                ),
                colSpan: 3,
              },
              {
                title: "Changes with your product",
                description:
                  "A dynamic, budget-friendly solution that evolves with your product, keeping your site aligned with your goals and always up-to-date.",
                illustration: (
                  <Center p={4} w={"full"}>
                    <Image src="./timeline.png" maxH={"350px"} />
                  </Center>
                ),
                colSpan: 3,
              },
              {
                title: "Free consultancy",
                description:
                  "Experience the benefits risk-free and only pay when you're 100% satisfied.",
                illustration: (
                  <Box p={4}>
                    <Image src="./timeline.png" />
                  </Box>
                ),
                colSpan: 2,
              },
              {
                title: "Professional support",
                description:
                  "Help whenever you need it with our on-hand customer support specialists.",
                illustration: (
                  <Box p={4}>
                    <Image src="./timeline.png" />
                  </Box>
                ),
                colSpan: 2,
              },
              {
                title: "On your terms",
                description:
                  "Cancel your subscription at any point, no strings attached.",
                illustration: (
                  <Box p={4}>
                    <Image src="./timeline.png" />
                  </Box>
                ),
                colSpan: 2,
              },
            ]}
          >
            {(item, index) => (
              <VStack
                key={`feature-${index}`}
                flex={1}
                bg={"whiteAlpha.50"}
                rounded={"2xl"}
                align={"start"}
                overflow={"hidden"}
                gridColumn={{ base: 1, md: `span ${item.colSpan}` }}
                justifyContent={"space-between"}
              >
                <VStack p={5} gap={4} align={"start"}>
                  <Heading fontSize={"xl"} fontWeight={600}>
                    {item.title}
                  </Heading>

                  <Text color={"gray.300"} fontWeight={300}>
                    {item.description}
                  </Text>
                </VStack>

                <Box w={"full"}>{item.illustration}</Box>
              </VStack>
            )}
          </For>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default About;
