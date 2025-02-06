import {
  Box,
  Center,
  Heading,
  Icon,
  List,
  Stack,
  StackSeparator,
  Text,
  VStack,
} from "@chakra-ui/react";

import { LuCircleCheck } from "react-icons/lu";
import { PiEyeSlashBold } from "react-icons/pi";

const Projects = () => {
  const projects = [
    {
      title: "Project 1",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus voluptatum provident facere eius, numquam, sapiente corrupti unde illo sequi dolorum fuga porro minus ab, in magnam quaerat delectus explicabo quod. Sit repellat, voluptatem sequi distinctio qui molestias similique laboriosam quia ipsum? Hic porro molestiae ab rerum dignissimos earum facere doloremque.",
      services: ["UI/UX", "Webapp development", "Consultancy"],
      showCase: "/project_1.mp4",
      undisclosed: true,
    },
    {
      title: "Project 2",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus voluptatum provident facere eius, numquam, sapiente corrupti unde illo sequi dolorum fuga porro minus ab, in magnam quaerat delectus explicabo quod. Sit repellat, voluptatem sequi distinctio qui molestias similique laboriosam quia ipsum? Hic porro molestiae ab rerum dignissimos earum facere doloremque.",
      services: ["AI model training", "Automations"],
      showCase: "/project_2.mp4",
      undisclosed: true,
    },
  ];

  return (
    <VStack gap={30} py={24} px={4} maxW={"7xl"} mx={"auto"}>
      <VStack gap={12} textAlign={"center"} mb={24}>
        <Heading fontSize={"5xl"} fontWeight={400} lineHeight={"1.2"}>
          Proyectos
        </Heading>

        <Text
          fontSize={{ base: "lg", md: "xl" }}
          color={"gray.600"}
          maxW={"3xl"}
        >
          Cada proyecto en Loureo es un viaje único donde combinamos estrategia,
          diseño y tecnología para llevar la innovación a su máxima expresión.
          Próximamente, podrás conocer en detalle cómo hemos ayudado a negocios
          de distintos tamaños y sectores a redefinir sus límites con soluciones
          a la medida.
        </Text>
      </VStack>

      <VStack
        gap={{ base: 20, lg: 24 }}
        w={"full"}
        separator={<StackSeparator />}
      >
        {projects.map((project, index) => (
          <Stack
            key={`timeline-${index}`}
            gap={{ base: 10, lg: 14 }}
            direction={{ base: "column", lg: "row" }}
            justifyContent={"start"}
            alignItems={"start"}
            w={"full"}
          >
            <Heading
              fontSize={"2xl"}
              textTransform={"uppercase"}
              wordBreak={"keep-all"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              w={{ base: "100%", lg: "30%" }}
            >
              {project.title}
            </Heading>

            <VStack
              gap={20}
              justifyContent={"start"}
              alignItems={"start"}
              w={{ base: "full", lg: "70%" }}
            >
              <Text fontSize={"lg"} color={"gray.200"}>
                {project.description}
              </Text>

              <VStack
                gap={6}
                justifyContent={"start"}
                alignItems={"start"}
                w={"full"}
              >
                <Heading fontSize={"xl"} textTransform={"uppercase"}>
                  Services
                </Heading>

                <List.Root as="ul" variant="plain" gap={4}>
                  {project.services.map((service, index) => (
                    <List.Item key={`service-${index}`}>
                      <List.Indicator asChild color="green.500" mr={4}>
                        <LuCircleCheck />
                      </List.Indicator>

                      {service}
                    </List.Item>
                  ))}
                </List.Root>
              </VStack>

              <Box
                borderRadius={"xl"}
                overflow={"hidden"}
                position={"relative"}
                border={"1px solid"}
                borderColor={"blacky.200"}
                w={"full"}
                aspectRatio={"16/9"}
              >
                <video
                  src={project.showCase}
                  autoPlay
                  muted
                  loop
                  controls={false}
                />

                {project.undisclosed && (
                  <Center
                    position={"absolute"}
                    top={"50%"}
                    left={"50%"}
                    transform={"translate(-50%, -50%)"}
                    w={"110%"}
                    h={"110%"}
                    bgColor={"blackAlpha.800"}
                    backdropFilter={"blur(10px)"}
                    zIndex={10}
                    flexDir={"column"}
                    gap={4}
                  >
                    <Icon as={PiEyeSlashBold} boxSize={30} color={"gray.500"} />

                    <Text fontSize={"lg"} color={"gray.500"}>
                      Undisclosed
                    </Text>
                  </Center>
                )}
              </Box>
            </VStack>
          </Stack>
        ))}
      </VStack>
    </VStack>
  );
};

export default Projects;
