import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { Heading, Stack, Text } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";

import { useRef } from "react";

const MotionStack = motion(Stack);
const MotionHeading = motion(Heading);
const MotionAccordionItem = motion(AccordionItem);

const faqData = [
  {
    question: "¿Trabajáis con empresas de cualquier sector o tamaño?",
    answer:
      "Totalmente. Nos adaptamos a la realidad de cada cliente, desde emprendedores y pymes hasta grandes corporaciones.",
  },
  {
    question:
      "¿Es necesario tener conocimientos técnicos para contratar vuestros servicios?",
    answer:
      "No. Nuestro papel es traducir lo complejo en términos sencillos. Te acompañaremos en cada paso para que tomes decisiones informadas.",
  },
  {
    question: "¿Cuánto suele durar un proyecto con Loureo?",
    answer:
      "Varía según la complejidad y el alcance. Sin embargo, trabajamos por hitos para que veas resultados y avances concretos en cada fase.",
  },
  {
    question: "¿Cómo integráis la IA en mis procesos de negocio?",
    answer:
      "Estudiamos tus datos, analizamos tus objetivos y elegimos la mejor estrategia de IA. Puede ser machine learning, análisis predictivo u otras técnicas, siempre alineadas con tus metas.",
  },
  {
    question: "¿Puedo contar con soporte después de la entrega del proyecto?",
    answer:
      "Sí. Ofrecemos acompañamiento continuo, mantenimiento y evoluciones para que tu solución siga creciendo al ritmo de tu negocio.",
  },
  {
    question:
      "¿Qué garantías ofrecéis sobre la calidad y la eficacia de las soluciones?",
    answer:
      "Trabajamos de forma iterativa, validando en cada etapa. Esto nos permite garantizar que la solución final cumpla con tus objetivos y escale cuando lo necesites.",
  },
];

const FAQs = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  return (
    <MotionStack
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      direction={{ base: "column", lg: "row" }}
      gap={{ base: 10, lg: 14 }}
      py={24}
      px={4}
      maxW={"7xl"}
      mx={"auto"}
    >
      <MotionHeading
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        as="h2"
        fontSize="4xl"
        fontWeight={400}
        color="gray.600"
        mb={2}
        lineHeight={"1.2"}
        w={{ base: "100%", lg: "30%" }}
      >
        Encuentra las respuestas a{" "}
        <Text as="span" color={"brand.200"}>
          todas tus preguntas.
        </Text>
      </MotionHeading>

      <AccordionRoot multiple w={{ base: "100%", lg: "70%" }}>
        {faqData.map((faq, index) => (
          <MotionAccordionItem
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              delay: 0.5 + index * 0.1, // Stagger each FAQ item
            }}
            value={`item-${index}`}
            bgColor={"blacky.700"}
            borderRadius={"xl"}
            border={"none"}
            gap={2}
            mb={2}
          >
            <h3>
              <AccordionItemTrigger p={6} _hover={{ bg: "transparent" }}>
                <Text fontSize="lg" flex="1">
                  {faq.question}
                </Text>
              </AccordionItemTrigger>
            </h3>

            <AccordionItemContent p={6} pt={0}>
              <Text color="gray.300">{faq.answer}</Text>
            </AccordionItemContent>
          </MotionAccordionItem>
        ))}
      </AccordionRoot>
    </MotionStack>
  );
};

export default FAQs;
