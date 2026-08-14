import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CopilotSpotlight from "@/components/CopilotSpotlight";
import UseCases from "@/components/UseCases";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <CopilotSpotlight />
      <UseCases />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
