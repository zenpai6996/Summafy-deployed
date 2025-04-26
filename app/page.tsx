import HeroSection from "@/components/home/HeroSection";

import DemoSection from "@/components/home/DemoSection";
import HowItWorks from "@/components/home/HowItWorks";
import PricingSection from "@/components/home/PricingSection";
import CTASection from "@/components/home/CTASection";
import Faq from "@/components/home/FAQ";


export default function Home() {
  return (
    <div className={"relative w-full"}>
        {/*HeroSection*/}
        
        <div className={"flex flex-col"}>
            <HeroSection />
            {/*DemoSection*/}
            {/* <DemoSection/> */}
            {/*HowItWorksSection*/}
            <HowItWorks/>
            {/*FAQSection*/}
            <Faq/>
            {/*PricingSection*/}
            <PricingSection/>
            {/*CTAsection*/}
            <CTASection/>
            {/*Footer*/}
        </div>
    </div>
  );
}
