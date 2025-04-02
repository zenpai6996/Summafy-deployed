"use client"
import {Button} from "@/components/ui/button";
import {ArrowRight, Sparkle, Sparkles} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {useState} from "react";
import Link from "next/link";


export default function HeroSection(){
    const [isHovered, setIsHovered] = useState(false);
    return (
        <section>
            <div className={"relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl "}>
                <div className={"flex"}>
                    <div className={"relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-[#FED2E2] via-[#C68EFD] to-[#8F87F1] animate-gradient-x group"}>
                        <Badge variant={"secondary"} className={"cursor-pointer relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-100 transition-colors duration-200"}
                               onMouseEnter={() => setIsHovered(true)}
                               onMouseLeave={() => setIsHovered(false)}
                        >
                            {isHovered ? (
                                <Sparkles style={{ width: '24px', height: '24px' }}  className={" rotate-12 mr-2 text-[#C68EFD] animate-pulse "} />
                            ) : (
                                <Sparkle style={{ width: '24px', height: '24px' }}  className={" rotate-12 mr-2 text-[#C68EFD] animate-pulse "} />
                            )}
                            <p className={"text-base text-[#C68EFD]"}>Powered by AI</p>
                        </Badge>
                    </div>
                </div>
                <h1 className={"text-gray-900 font-bold py-6 text-center"}>
                    From PDFs to {" "}
                    <span className={"relative inline-block px-1 py-2"}>
                    <span className={"relative z-10"}>Clear Insightful</span>
                    <span className={"absolute inset-0 bg-gradient-to-r from-[#C68EFD]/25 to-[#C68EFD]/50 -rotate-2 rounded-lg transform -skew-y-1"}></span>
                    </span>{" "}
                    Summaries
                </h1>
                <h2 className={"text-gray-900 text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl pb-8 text-gray-600"}>
                    Transform lengthy documents into clear, actionable summaries
                </h2>
                <div>
                    <Button variant={"link"} className={`
    items-center text-white text-base sm:text-lg rounded-full 
    px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-10 
    relative overflow-hidden font-bold hover:no-underline
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-slate-900 before:to-[#C68EFD] 
    after:absolute after:inset-0 after:bg-gradient-to-r after:from-[#C68EFD] after:to-slate-900 
    after:opacity-0 hover:after:opacity-100 
    after:transition-opacity after:duration-500 after:ease-in-out shadow-lg
  `}>
                       <Link href={"/upload"} className={"flex gap-2 items-center relative z-10"}>
                           <span> Try Summafy</span>
                           <ArrowRight className={"animate-pulse"}/>
                       </Link>
                    </Button>
                </div>
                </div>
        </section>
    )
}