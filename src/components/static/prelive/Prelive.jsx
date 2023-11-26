"use client";
import Welcome from "../Welcome";
import About from "../about/About";
import Landing from "./Landing";
import Footer from "./Footer";
import GetInvolved from "./getInvolved/GetInvolved";
import { ParallaxProvider } from "react-scroll-parallax";
import FAQ from "./FAQ";

const Prelive = () => {
  return (
    <div className="w-full bg-blur bg-cover">
      <ParallaxProvider>
        <Landing />
        <About />
        <Welcome />
        <GetInvolved />
        <FAQ />
        <Footer />
      </ParallaxProvider>
    </div>
  );
};

export default Prelive;
