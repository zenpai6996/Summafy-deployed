
import {ReactNode} from "react";
import {BookOpen, BookOpenCheck, Bot,  MoveRight} from "lucide-react";
import SpotlightCard from "../common/Spotlight";
import Tag from "../common/Tag";
import {MotionDiv, MotionH2, MotionH3} from "@/components/common/motion-wrapper";

type Step ={
    icon:ReactNode;
    label:string;
    description:string;
};

const Step: Step[] = [
    {
       icon: <BookOpen size={64} strokeWidth={1.5}/>,
       label:"Upload your PDF",
       description:"Drag and drop your PDF or click to upload",
    },
    {
        icon: <Bot size={64} strokeWidth={1.5}/>,
        label:"AI analysis",
        description:"Our AI analyzes your document instantly",
    },
    {
        icon: <BookOpenCheck size={64} strokeWidth={1.5}/>,
        label:"Get your Summary",
        description:"Get a concise summary of your document",
    },
]

export default function HowItWorks(){
    return(
        <section className={"relative overflow-hidden bg-transparent "}>
            <div className={"py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 "}>
                <div

                    aria-hidden={"true"}
                    className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl">
                    
                    </div>
                <div className={"text-center mb-16"}>
                    <MotionH2
                        initial={{opacity:0,y:20}}
                        whileInView={{opacity:1,y:0}}
                        transition={{duration:0.5}}
                        className={"font-bold text-xl uppercase mb-4 text-[#C68EFD]"}><Tag>How it Works</Tag></MotionH2>
                    <MotionH3
                        initial={{opacity:0,y:20}}
                        whileInView={{opacity:1,y:0}}
                        transition={{duration:0.5,delay:0.2}}
                        className={"font-bold text-3xl text-gray-300 max-w-2xl mx-auto"}>Transform any PDF into an easy-to-digest summary in three single steps</MotionH3>
                </div>
                <div className={"grid grid-cols-1 md:grid-cols-3  gap-8 md:gap-20 max-w-4xl mx-auto relative"}>
                    {Step.map((step, idx) => (
                        <MotionDiv
                            initial={{opacity:0,y:50}}
                            whileInView={{opacity:1,y:0}}
                            transition={{duration:0.5,delay: idx * 0.2}}
                            className={"relative flex items-stretch justify-center"} key={idx}>
                            <StepItem {...step} />
                            {
                                idx < Step.length -1 && (
                                    <MotionDiv
                                        initial={{opacity:0}}
                                        whileInView={{opacity:1}}
                                        transition={{duration:0.5,delay: idx * 0.2 + 0.3}}
                                        className={"hidden absolute md:block top-1/2 -right-14 transform -translate-y-1/2 z-10"}>
                                        <MoveRight size={32} strokeWidth={1} className={"text-[#C68EFD]"}/>
                                    </MotionDiv>
                                )
                            }
                        </MotionDiv>
                    ))}
                </div>
            </div>
        </section>
    )
}

function StepItem({icon, label, description}: Step) {
    return(
        <SpotlightCard className="custom-spotlight-card cursor-pointer bg-white/5 backdrop-blur-xs border border-white/30 hover:border-[#C68EFD] transition-colors group-w-full hover:scale-110 hover:transition-all duration-300 ease-in-out p-6" spotlightColor="rgba(0, 229, 255, 0.2)">
            <div className={"relative rounded-2xl"}>
                <div className={"flex flex-col gap-4 h-full"}>
                    <div className={"flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-gradient-to-br from-[#8F87F1] to-transparent group-hover:from-[#C68EFD]/20 transition-colors"}>
                        <div className={"text-[#FED2E2] "}>
                            {icon}
                        </div>
                    </div>
                    <div className={"flex flex-col flex-1 gap-1 justify-between"}>
                        <h4 className={"text-center font-bold text-xl text-gray-300"}>{label}</h4>
                        <p className={"text-center text-gray-400 text-sm"}>{description}</p>
                    </div>
                </div>
            </div>
        </SpotlightCard>
    )
}