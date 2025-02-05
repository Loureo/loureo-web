import { Heading, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react";

const Manifesto = () => {
  const items = [
    {
      title: "Simplicity is the ultimate sophistication",
      description:
        "Nuestro foco es que la tecnología sea fácil e intuitiva. Esto permite hacerla accesible a las personas e implementarse a cualquier nivel y tamaño de empresa. Nosotros nos despertamos cada mañana y trabajamos para que esto suceda y, así, poder tener productos limpios, usables y con la mínima fricción posible entre tecnología-persona.",
    },
    {
      title: "Mind, heart and guts",
      description:
        "Análisis, humanidad e intuición. Primero escuchamos para identificar las necesidades de las personas. Luego, reflexionamos y analizamos las evidencias, priorizando este enfoque sobre la ejecución para obtener mejores resultados. También damos espacio a la intuición. Así, los usuarios se benefician de innovaciones que aportan valor y mejoran su calidad de vida en relación con la tecnología.",
    },
    {
      title: "Flexible like gravity",
      description:
        "Como un campo gravitatorio: fuerte, firme y flexible, nos adaptamos a cada nuevo proyecto para funcionar como un equipo cohesionado. Conocemos las posibilidades y límites de cada proyecto, acompañando a nuestros usuarios en el día a día. Así, aumentamos nuestra capacidad de mejora entre hitos, permitiendo que el cliente integre nuestro I+D en su empresa de forma ágil y natural.",
    },
    {
      title: "Always focus on future and offbeat",
      description:
        "Somos unos apasionados de la tecnología. Y eso es lo que nos hace estar siempre actualizados para usar las mejores tecnologías a favor de nuestros clientes. Lo que buscamos? Innovación constante e iteración continua bajo un perfeccionismo eficiente: con un lenguaje que permanece y tools externos e IA en evolución constante.",
    },
    {
      title: "Brand culture for better",
      description:
        "Creemos que la cultura de marca no solo cambia a las empresas a través de crear un impacto en las personas, sino que esto se extrapola a la sociedad y el mundo. En Loureo nos esforzamos porque ese impacto sea positivo y que cada día estemos un poquito más cerca de ser el “best place to work”.",
    },
    {
      title: "Connected by illusion and passion",
      description:
        "Nos dedicamos a esto porque nos emociona y nos motiva para mejorar y crecer. Del mismo modo, queremos que nuestros clientes se ilusionen y vivan con pasión todo lo que nosotros, apoyándonos en la tecnología, podemos hacer por ellos. Si nos retroalimentamos, la experiencia del proyecto y su satisfacción aumentará hasta el infinito y más allá.",
    },
    {
      title: "Making mistakes make us grow",
      description:
        "Oh, we are humans! Y creemos profundamente que las personas aprenden y crecen a través del error. Y los proyectos avanzan y crecen también a partir de estos. Es la iteración constante la que nos lleva a corregir de forma ágil y avanzar con desviaciones mínimas. Y eso, sí que se nos da bien.",
    },
    {
      title: "Tech is for and about people",
      description:
        "Creemos que la tecnología debe estar a nuestro servicio, no al revés. Debe diseñarse en función de cómo opera la gente. Para lograrlo, es esencial entenderla, escuchar y dialogar con quienes trabajan en el sector y con sus usuarios. Crear comunidad en torno a la tecnología es fundamental para integrarla de manera natural en la sociedad.",
    },
  ];

  return (
    <VStack gap={30} py={24} px={4} maxW={"7xl"} mx={"auto"}>
      <Heading
        fontSize={"5xl"}
        fontWeight={"thin"}
        textTransform={"uppercase"}
        mb={24}
        fontFamily={"monospace"}
        lineHeight={"1.2"}
      >
        We are based on
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
