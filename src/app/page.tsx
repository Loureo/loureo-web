"use client";

import { Spacer } from "@chakra-ui/react";

import About from "@/components/about";
import FAQs from "@/components/faqs";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Manifesto from "@/components/manifesto";
import Projects from "@/components/projects";

const Home = () => {
  return (
    <>
      {/* // Hero */}
      <Hero />

      <Spacer h={12} />

      {/* // About */}
      <About />

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
