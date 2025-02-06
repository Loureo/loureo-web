"use client";

import { Box, Spacer } from "@chakra-ui/react";

import About from "@/components/about";
import CTA from "@/components/cta";
import FAQs from "@/components/faqs";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Manifesto from "@/components/manifesto";
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
      {/* <Projects /> */}

      {/* FAQs */}
      <FAQs />

      {/* CTA */}
      <CTA />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
