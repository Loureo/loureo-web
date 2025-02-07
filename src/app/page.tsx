"use client";

import About from "@/components/about";
import CTA from "@/components/cta";
import FAQs from "@/components/faqs";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Manifesto from "@/components/manifesto";
import { Spacer } from "@chakra-ui/react";

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
