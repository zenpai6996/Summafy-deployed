"use client"
import {Badge} from "@/components/ui/badge";
import {Sparkle, Sparkles} from "lucide-react";
import {useState} from "react";

export default function UploadHeader(){
    const [isHovered, setIsHovered] = useState(false);

    return(
        <div className={"flex flex-col items-center justify-center gap-6 text-center"}>
            <div className={"relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-[#FED2E2] via-[#C68EFD] to-[#8F87F1] animate-gradient-x group"}>
                <Badge variant={"secondary"} className={" cursor-pointer relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200"}
                       onMouseEnter={() => setIsHovered(true)}
                       onMouseLeave={() => setIsHovered(false)}
                >
                    {isHovered ? (
                        <Sparkles style={{ width: '24px', height: '24px' }}  className={" rotate-12 mr-2 text-[#C68EFD] animate-pulse "} />
                    ) : (
                        <Sparkle style={{ width: '24px', height: '24px' }}  className={" rotate-12 mr-2 text-[#C68EFD] animate-pulse "} />
                    )}
                    <p className={"text-base text-[#C68EFD]"}>AI Powered Content Creation</p>
                </Badge>
            </div>
            <div className={"capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl "}>

                Start Uploading {" "}
                <span className={"relative inline-block px-1 py-2"}>
                    <span className={"relative z-10"}>Your PDF's</span>
                    <span className={"absolute inset-0 bg-gradient-to-r from-[#C68EFD]/50 to-[#C68EFD]/25 -rotate-2 rounded-lg transform -skew-y-1"}></span>
                    </span>{" "}
            </div>
            <div className={"mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center"}>
                <p>Upload your PDF and let Summafy do the magic! ✨</p>
            </div>
        </div>

    )
}