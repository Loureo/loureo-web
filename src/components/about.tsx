import {
  Box,
  Center,
  Flex,
  For,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";

import { useRef } from "react";

const MotionVStack = motion(VStack);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionSimpleGrid = motion(SimpleGrid);

const About = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef(null);

  const isTitleInView = useInView(titleRef, { once: true, margin: "-200px" });
  const isSubtitleInView = useInView(subtitleRef, {
    once: true,
    margin: "-200px",
  });
  const isCardsInView = useInView(cardsRef, { once: true, margin: "-500px" });

  return (
    <Box py={24} px={4}>
      <VStack gap={16} maxW={"7xl"} mx={"auto"}>
        {/* Main heading */}
        <VStack gap={12} textAlign={"center"}>
          <MotionHeading
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={
              isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6 }}
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight={400}
            letterSpacing={"tight"}
            lineHeight={"1.2"}
          >
            Innovar es sencillo cuando se trabaja con pasión y experiencia
          </MotionHeading>

          <MotionText
            ref={subtitleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={
              isSubtitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6 }}
            fontSize={{ base: "lg", md: "xl" }}
            color={"gray.600"}
            maxW={"3xl"}
          >
            Creemos que la mejor forma de abrazar el futuro es simplificarlo.
            Por eso, combinamos nuestro dominio tecnológico con un enfoque
            cercano y humano. Nuestro equipo traduce la complejidad en
            soluciones claras y efectivas, pensadas para que, sin importar tu
            nivel técnico, puedas sentir el poder de la innovación.
          </MotionText>
        </VStack>

        {/* Features grid */}
        <MotionSimpleGrid
          ref={cardsRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          columns={{ base: 1, md: 6 }}
          gap={8}
          w={"full"}
        >
          <For
            each={[
              {
                title: "Desarrollo de Producto Digital",
                description: (
                  <>
                    Creamos{" "}
                    <Text as={"span"} fontWeight={600} color={"gray.50"}>
                      aplicaciones y plataformas a medida
                    </Text>
                    , escalables y centradas en la experiencia de usuario.
                    Integramos tecnología de vanguardia para que tu producto sea
                    tan potente como fácil de usar.
                  </>
                ),
                illustration: (
                  <Flex justify={"end"}>
                    <Image
                      src="./digital-product-comps.png"
                      alt="Ascending curve"
                      w={"full"}
                    />
                  </Flex>
                ),
                colSpan: 3,
              },
              {
                title: "Integración de IA",
                description: (
                  <>
                    Transformamos tus datos en oportunidades. Desde la
                    automatización de procesos hasta la generación de insights
                    predictivos. Te guiamos para{" "}
                    <Text as={"span"} fontWeight={600} color={"gray.50"}>
                      que la IA trabaje a tu favor
                    </Text>
                    , no al revés.
                  </>
                ),
                illustration: (
                  <Center p={4} w={"full"}>
                    <Image src="./cone.png" alt="Changes timeline" h={"full"} />
                  </Center>
                ),
                colSpan: 3,
              },
              {
                title: "Optimización de Procesos",
                description: (
                  <>
                    Analizamos de cerca tu modelo de negocio para{" "}
                    <Text as={"span"} fontWeight={600} color={"gray.50"}>
                      detectar ineficiencias
                    </Text>
                    . Diseñamos soluciones ágiles que ahorran tiempo, reducen
                    costes y mejoran la comunicación entre equipos.
                  </>
                ),
                illustration: <Image src="./bento-graph.svg" alt="Graph" />,
                colSpan: 2,
              },
              {
                title: "Integración Tecnológica",
                description: (
                  <>
                    Integramos tus herramientas de forma fluida, cuidando cada
                    detalle técnico. Queremos que sientas la{" "}
                    <Text as={"span"} fontWeight={600} color={"gray.50"}>
                      tecnología como un aliado
                    </Text>
                    , no como un reto.
                  </>
                ),
                illustration: (
                  <Center w={"full"}>
                    <Image
                      src="./integrate.png"
                      alt="Changes timeline"
                      transform={"scale(2)"}
                      opacity={0.2}
                      maxH={"200px"}
                    />
                  </Center>
                ),
                colSpan: 2,
              },
              {
                title: "Consultoría Tecnológica",
                description: (
                  <>
                    El primer paso es saber{" "}
                    <Text as={"span"} fontWeight={600} color={"gray.50"}>
                      dónde estás y dónde quieres ir
                    </Text>
                    . Eliminamos complejidades y nos enfocamos en lo que
                    realmente importa: tu éxito.
                  </>
                ),
                illustration: (
                  <Box p={4}>
                    <Image src="./chat.png" alt="Chat session" />
                  </Box>
                ),
                colSpan: 2,
              },
            ]}
          >
            {(item, index) => (
              <MotionVStack
                key={`feature-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: index * 0.2 }}
                flex={1}
                bg={"whiteAlpha.50"}
                rounded={"2xl"}
                align={"start"}
                overflow={"hidden"}
                gridColumn={{ base: 1, md: `span ${item.colSpan}` }}
                justifyContent={"space-between"}
                maxH={"600px"}
                h={"full"}
              >
                <VStack p={5} gap={10} align={"start"} zIndex={1}>
                  <Heading fontSize={"xl"} fontWeight={600}>
                    {item.title}
                  </Heading>

                  <Text color={"gray.300"} fontWeight={300}>
                    {item.description}
                  </Text>
                </VStack>

                <Flex w={"full"} h={"full"} zIndex={0}>
                  {item.illustration}
                </Flex>
              </MotionVStack>
            )}
          </For>
        </MotionSimpleGrid>
      </VStack>
    </Box>
  );
};

export default About;
