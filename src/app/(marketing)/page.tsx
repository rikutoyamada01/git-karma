import Hero from "../../components/Hero";
import Ticker from "../../components/Ticker";
import Features from "../../components/Features";
import HowItWorks from "../../components/HowItWorks";
import Stats from "../../components/Stats";
import CTA from "../../components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Features />
      <HowItWorks />
      <Stats />
      <CTA />
    </>
  );
}
