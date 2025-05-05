"use client"
import { Sparkle, Sparkles, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { MotionDiv } from "@/components/common/motion-wrapper";
import { itemVariants } from "@/utils/constants";
import Link from "next/link";

interface UploadHeaderProps {
    isLimitReached: boolean;
    currentPlan: 'basic' | 'pro';
    uploadsUsed: number;
    uploadLimit: number;
}

export default function UploadHeader({
                                         isLimitReached,
                                         currentPlan,
                                         uploadsUsed,
                                         uploadLimit
                                     }: UploadHeaderProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={"flex flex-col items-center justify-center gap-6 text-center"}>
            <MotionDiv
                variants={itemVariants}
                className={"flex cursor-pointer justify-center"}>
                <div
                    className={"inline-flex text-1xs sm:text-1xl px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-300 rounded-full text-gray-300 font-semibold"}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
          <span className={"text-white"}>
            {isHovered ? (
                <Sparkles style={{ width: '24px', height: '24px' }} className={" rotate-0 mr-2 text-[#ebef10] animate-pulse "} />
            ) : (
                <Sparkle style={{ width: '24px', height: '24px' }} className={" rotate-12 mr-2 text-[#ebef10] animate-pulse "} />
            )}
          </span>
                    AI Powered Content Creation
                </div>
            </MotionDiv>

            <MotionDiv variants={itemVariants} className={"capitalize text-3xl font-bold tracking-tight text-gray-300 sm:text-4xl "}>
                Start Uploading {" "}
                <span className={"relative inline-block px-1 py-2"}>
          <span className={"relative z-10"}>Your PDF's</span>
          <span className={"absolute inset-0 bg-gradient-to-r from-[#C68EFD]/50 to-[#C68EFD]/25 -rotate-2 rounded-lg transform -skew-y-1"}></span>
        </span>{" "}
            </MotionDiv>

            <MotionDiv variants={itemVariants} className={"mt-2 text-lg leading-8 text-gray-400 max-w-2xl text-center"}>
                <div className="flex flex-col items-center">
                    <p>Upload your PDF and let Summafy do the magic! ✨</p>

                    <div className={`mt-2 text-base ${isLimitReached ? 'text-red-400' : 'text-purple-300'} flex items-center`}>
                        {isLimitReached && <AlertTriangle className="w-4 h-4 mr-1" />}
                        <span className="font-medium">
              Upload Count: {uploadsUsed}/{uploadLimit} ({currentPlan === 'pro' ? 'Pro Plan' : 'Basic Plan'})
            </span>
                    </div>
                </div>
            </MotionDiv>
        </div>
    );
}