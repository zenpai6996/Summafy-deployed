
import SparkyButton from "../ui/SparkyButton";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import {FlipWords} from "@/components/ui/flip-words";



export default function HeroSection(){
    const words = ["Impactful","Meaningful","Effective","Transformative","Dynamic","Compelling"];
    return (
        <section className="overflow-x-clip">
            <div className={"relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl "}>
                <div className={"flex"}>
                    <div className={"relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-[#FED2E2] via-[#C68EFD] to-[#8F87F1] animate-gradient-x group"}>
                    <div className={"flex cursor-pointer justify-center"}>
                 <div className={"inline-flex py-1 px-4 bg-gradient-to-r from-purple-500 to-pink-300 rounded-full text-gray-300 font-semibold"}>Powered by AI ✨</div>
             </div>
                    </div>
                </div>
                <h1 className={"text-gray-300 font-bold py-6 text-center"}>

                    <FlipWords className={"text-white"} words={words}/> <br/>
                    Summaries, created effortlessly
                </h1>
                <h2 className={" text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl pb-8 text-gray-400"}>
                    Transform lengthy documents into clear, actionable summaries
                </h2>
                <div>
                 <SignedIn>

                    <SparkyButton  >

                        <span  className="flex gap-2 items-center relative z-10">
                        Try Summafy
                    </span>

                    </SparkyButton>

                 </SignedIn>
                 <SignedOut>
                 
                    <Button variant={"link"} className={`
                    items-center text-white text-base sm:text-lg rounded-full 
                    px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-10 
                    relative overflow-hidden font-bold hover:no-underline
                    before:absolute before:inset-0 before:bg-gradient-to-r before:from-slate-900 before:to-[#C68EFD] 
                    after:absolute after:inset-0 after:bg-gradient-to-r after:from-[#C68EFD] after:to-slate-900 
                    after:opacity-0 hover:after:opacity-100 
                    after:transition-opacity after:duration-500 after:ease-in-out shadow-lg  hover:scale-105 hover:transition-all duration-300 ease-in-out border border-purple-500
                `}>
                       <Link href={"/sign-up"} className={"flex gap-2 items-center relative z-10"}>
                           <span> Sign Up</span>
                           <ArrowRight className={"animate-pulse"}/>
                       </Link>
                    </Button>
                
                 </SignedOut>
                </div>
                </div>
        </section>
    )
}
