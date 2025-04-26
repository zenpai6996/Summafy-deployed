import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowRight} from "lucide-react";
import Squares from "../common/squares";

export default function CTASection(){
    return(<>
       
        <section className={"bg-gray-900 py-12 relative overflow-hidden"}>
        <div className="absolute inset-0 z-0 ">
                <Squares 
                    speed={0.3} 
                    squareSize={40}
                    direction='diagonal' 
                    borderColor='#E9A5F1'
                    hoverFillColor='#222'
                />
            </div>

            <div className="absolute inset-0 bg-gray-900/10 pointer-events-none"></div>
                
            <div className={" relative z-10 py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 "}>
           
                <div className={"flex flex-col items-center justify-center space-y-4 text-center "}>
                    <div className={"space-y-4"}>
                        <h2 className={"text-3xl text-gray-300 font-bold tracking-tighter sm:text-4xl md:text-5xl"}>Ready to save hours of Reading Time?</h2>
                        <p className={"mx-auto max-w-[700px] text-gray-500 md:text-xl relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"}>
                            Transform lengthy documents into clear , actionable insights with our AI-powered summariser
                        </p>
                    <div className={"flex flex-col gap-2 min-[400px]:flex-row justify-center"}>
                        <div>
                            <Button size={"lg"} variant={"outline"} className={" w-full min-[400px] rounded-2xl :w-auto bg-gradient-to-r from-[#E9A5F1] to-[#8F87F1] hover:bg-gradient-to-r hover:from-[#8F87F1] hover:to-[#E9A5F1] text-white hover:scale-105 hover:transition-all duration-300 ease-in-out hover:text-white"}>
                                <Link href={"/"} className={"flex items-center justify-center no-underline"}>Get Started{' '}<ArrowRight className={"ml-2 w-4 h-4 animate-pulse"}/></Link>
                            </Button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}