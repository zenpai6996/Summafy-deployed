import Image from "next/image";
import {Button} from "@/components/ui/button";
import HeroSection from "@/components/home/HeroSection";
import BgGradient from "@/components/common/BgGradient";
import DemoSection from "@/components/home/DemoSection";
import HowItWorks from "@/components/home/HowItWorks";

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
        </div>

        {/*PricingSection*/}
        {/*CTAsection*/}
        {/*Footer*/}
    </div>
  );
}
