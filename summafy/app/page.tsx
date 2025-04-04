import Image from "next/image";
import {Button} from "@/components/ui/button";
import HeroSection from "@/components/home/HeroSection";
import BgGradient from "@/components/common/BgGradient";
import DemoSection from "@/components/home/DemoSection";
import HowItWorks from "@/components/home/HowItWorks";
import PricingSection from "@/components/home/PricingSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className={"relative w-full"}>
        {/*HeroSection*/}
        <BgGradient/>
        <div className={"flex flex-col"}>
            <HeroSection />
            {/*DemoSection*/}
            <DemoSection/>
            {/*HowItWorksSection*/}
            <HowItWorks/>
            {/*PricingSection*/}
            <PricingSection/>
            {/*CTAsection*/}
            <CTASection/>
        </div>
        {/*Footer*/}
    </div>
  );
}
