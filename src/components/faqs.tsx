import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { Heading, Stack, Text } from "@chakra-ui/react";

const faqData = [
  {
    question: "What is Aconia's web design subscription service?",
    answer:
      "Our subscription service provides ongoing professional web design and development support for a fixed monthly fee...",
  },
  {
    question: "How does the Aconia subscription work?",
    answer:
      "You'll have access to our team of designers and developers who will handle your web design needs on an ongoing basis...",
  },
  {
    question: "What types of design projects can aconia handle?",
    answer:
      "We handle a wide range of design projects including website updates, landing pages, graphic design, and more...",
  },
  {
    question:
      "Is there a limit to how many update requests I can submit each month?",
    answer:
      "We process requests one at a time to ensure quality, but there's no strict limit on the number of requests...",
  },
  {
    question: "How quickly can I expect my site to be published?",
    answer:
      "Typical turnaround time for updates is 1-2 business days, depending on the complexity of the request...",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time without any long-term commitments...",
  },
  {
    question: "What makes Aconia different from hiring a freelance designer?",
    answer:
      "Aconia offers reliable, consistent service with a full team of professionals, predictable pricing, and ongoing support...",
  },
];

const FAQs = () => {
  return (
    <Stack
      direction={{ base: "column", lg: "row" }}
      gap={30}
      py={24}
      px={4}
      maxW={"7xl"}
      mx={"auto"}
    >
      <Heading
        as="h2"
        fontSize="4xl"
        fontWeight={400}
        color="gray.600"
        mb={2}
        lineHeight={"1.2"}
      >
        Get the answers to{" "}
        <Text as="span" color={"brand.200"}>
          all your questions.
        </Text>
      </Heading>

      <AccordionRoot multiple>
        {faqData.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            bgColor={"blacky.700"}
            borderRadius={"xl"}
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
          </AccordionItem>
        ))}
      </AccordionRoot>
    </Stack>
  );
};

export default FAQs;
