import { Heading, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react";

const Manifesto = () => {
  const items = [
    {
      title: "Simplicity is the ultimate sophistication",
      description:
        "Menos es más. Buscamos la innovación que se percibe sin saturar, haciendo que las herramientas tecnológicas fluyan con naturalidad.",
    },
    {
      title: "Mind, heart and guts",
      description:
        "Mezclamos análisis, empatía e intuición para dar vida a soluciones que aportan valor real, centrándonos en las personas antes que en la técnica.",
    },
    {
      title: "Flexible like gravity",
      description:
        "Somos fuertes y adaptables a la vez. Cada proyecto tiene su propia órbita, y nosotros ajustamos nuestro enfoque para integrarnos sin fricciones.",
    },
    {
      title: "Always focus on future and offbeat",
      description:
        "Nos impulsa la curiosidad. Apostamos por caminos poco convencionales, manteniéndonos siempre al día de las últimas tendencias y explorando nuevas posibilidades.",
    },
    {
      title: "Brand culture for better",
      description:
        "Creemos que nuestra cultura de marca impacta tanto en nuestro equipo como en la sociedad. Queremos ser un best place to work y un socio de confianza para ti.",
    },
    {
      title: "Connected by illusion and passion",
      description:
        "Lo que hacemos nos apasiona. Queremos que nuestros clientes se sumen a esta ilusión y vean cómo la tecnología puede transformar sus negocios (y su día a día).",
    },
    {
      title: "Making mistakes make us grow",
      description:
        "Experimentamos, medimos y mejoramos en un proceso iterativo constante. Equivocarnos rápido y aprender rápido forma parte de nuestro ADN.",
    },
    {
      title: "Tech is for and about people",
      description:
        "Diseñamos pensando en los usuarios finales. La tecnología debe simplificar la vida, no complicarla. Por eso creemos en un diálogo constante con quienes la usan.",
    },
  ];

  return (
    <VStack gap={30} py={24} px={4} maxW={"7xl"} mx={"auto"}>
      <Heading fontSize={"5xl"} fontWeight={400} lineHeight={"1.2"} mb={24}>
        Manifesto
      </Heading>

      <SimpleGrid
        gap={{ base: 20, lg: 24 }}
        w={"full"}
        columns={{ base: 1, lg: 2 }}
      >
        {items.map((item, index) => (
          <Stack
            key={`timeline-${index}`}
            gap={{ base: 10, lg: 14 }}
            direction={{ base: "column", md: "row" }}
            justifyContent={"start"}
            alignItems={"start"}
          >
            <Heading fontSize={"xl"} color={"brand.200"}>
              {("0" + (index + 1)).slice(-2)}
            </Heading>

            <VStack gap={10} justifyContent={"start"} alignItems={"start"}>
              <Heading fontSize={"xl"} textTransform={"uppercase"}>
                {item.title}
              </Heading>
              <Text fontSize={"lg"} color={"gray.200"}>
                {item.description}
              </Text>
            </VStack>
          </Stack>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Manifesto;
