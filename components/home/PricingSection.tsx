import Link from "next/link";

import { ArrowRight, CheckIcon} from "lucide-react";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Tag from "@/components/common/Tag";
import {MotionDiv, MotionH2, MotionSection} from "@/components/common/motion-wrapper";
import {containerVariants, itemVariants} from "@/utils/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileName(url:string):string{
  const fileName = url.split('/').pop() || '';
  return fileName
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .split(' ')
      .map((word)=> word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() )
      .join(' ');

}

type PriceType = {
    name:string;
    price:number;
    description:string;
    items:string[];
    id:string;
    paymentLink:string;
    priceId:string;
}

const listVariants = {
    hidden:{opacity:0,x:-20},
    visible:{
        opacity:1,
        x:0,
        transition:{
            type:"string",
            damping:20,
            stiffness:100,
            delay:0.2,
        },
    },
}

const plans =[
    {
        name:'Basic',
        price:0,
        description: 'Best for Students',
        items:[
            '5 PDF summaries per month',
            'Standard processing speed',
            'Email support',
        ],
        id:'basic',
        paymentLink: '/',
        priceId: '',
    },
    {
        name:'Pro',
        price:100,
        description:'Best for Professionals',
        items:[
            '15 PDF summaries per month',
            'Priority Processing',
            'Markdown Export'
        ],
        id:'pro',
        paymentLink:'',
        priceId:'',
    },
];
const PricingCard= ({name,price,description,items,id,paymentLink}:PriceType) => {
    return (
      
        <MotionDiv
            variants={listVariants}
            whileHover={{scale:1.02}}
            className={"relative w-full max-w-lg bg-white/5 backdrop-blur-xs hover:scale-105 hover:transition-all duration-300"}>
           <div className={cn("relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border border-gray-300/20 rounded-2xl",id === 'pro' && "hover:border-[#FFB200] ")}>
            <MotionDiv variants={listVariants} className={"flex justify-between items-center gap-4"}>
                <div>
                    {id === "pro" ? (
                        <p className="text-lg lg:text-xl font-bold capitalize bg-gradient-to-r from-[#FFE700] via-[#FF2E63] to-[#252A34] bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
                            {name}
                        </p>
                    ) : (
                        <p className={"text-lg text-gray-300 lg:text-xl font-bold capitalize"}>{name}</p>
                    )}                    <p className={"text-base-content/80 text-gray-400 mt-2 "}>{description}</p>
                </div>
            </MotionDiv>
            <MotionDiv variants={listVariants} className={"flex gap-2 "}>
                <p className={"text-5xl text-gray-300 tracking-tight font-extrabold"}>₹{price}</p>
                <div className={"flex flex-col text-gray-400 justify-end mb-[8px]"}>
                    {

                            <><p className={"text-xs uppercase font-semibold"}>RS</p>
                            <p className={"text-xs"}>/month</p></>

                    }
                </div>
            </MotionDiv>
            <MotionDiv variants={listVariants} className={"space-y-2.5 leading-relaxed text-gray-300 ray-300 text-base flex-1"}>
                {items.map((item,idx) => <li key={idx} className={"flex items-center gap-2"}>
                    <CheckIcon className="text-[#E9A5F1]" size={18}/>
                    <span>{item}</span></li> )}
            </MotionDiv>
            <MotionDiv variants={listVariants} className={"space-y-2 justify-center w-full"}>
                <Link href={paymentLink}   className={cn(
                    "w-full rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#E9A5F1] to-[#8F87F1] hover:bg-gradient-to-r hover:from-[#8F87F1] hover:to-[#E9A5F1] text-white border-2 py-2 transition-all duration-800 ease-in-out\n" +
                    "    bg-[length:200%_200%] hover:bg-[position:100%_100%]", id === 'basic' && "bg-gradient-to-r from-[#E9A5F1] to-[#8F87F1] hover:bg-gradient-to-r hover:from-[#8F87F1] hover:to-[#E9A5F1] border-rose-100",
                    id === 'pro' && "bg-gradient-to-r from-[#E9A5F1] to-[#8F87F1] hover:bg-gradient-to-r hover:from-[#FFE700] hover:to-[#FF2E63] border-gray-300")
                }
                >
                    {id === "basic" ? (
                        <>Try Now <ArrowRight size={18}/></>
                    ) : (
                        <>Buy Now <ArrowRight size={18}/></>
                    )}
                </Link>
            </MotionDiv>
        </div>
    </MotionDiv>
    )
}

export default function PricingSection(){
    return(
        <MotionSection
            initial={"hidden"}
            whileInView={"visible"}
            viewport={{once:true,margin:'-100px'}}
            variants={containerVariants}
            className={"relative overflow-hidden "} id={"pricing"}>
            <div className={"py-12 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 "}>
                <div className={"flex items-center justify-center w-full pb-12"}>
                    <MotionH2
                        initial={{opacity:0,y:20}}
                        whileInView={{opacity:1,y:0}}
                        transition={{duration:0.5}}
                        className={"uppercase font-bold text-xl mb-8 text-[#C68EFD]"}>
                        <Tag>Pricing</Tag>
                    </MotionH2>
                </div>
                <div className={"relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8"}>
                    {plans.map((plan) => (
                        <PricingCard key={plan.id} {...plan}/>
                    ))}
                </div>
            </div>
        </MotionSection>
    )
}