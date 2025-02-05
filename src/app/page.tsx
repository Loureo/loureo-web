"use client";

import { Box, Spacer } from "@chakra-ui/react";

import About from "@/components/about";
import FAQs from "@/components/faqs";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Manifesto from "@/components/manifesto";
import Projects from "@/components/projects";
import { useRef } from "react";

const Home = () => {
  const scrollToRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* // Hero */}
      <Hero scrollToRef={scrollToRef} />

      <Spacer h={12} />

      {/* // About */}
      <Box ref={scrollToRef}>
        <About />
      </Box>

      {/* Manifesto */}
      <Manifesto />

      {/* Projects */}
      <Projects />

      {/* FAQs */}
      <FAQs />

      {/* Contact */}
      {/* <Heading>Contact</Heading> */}

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
