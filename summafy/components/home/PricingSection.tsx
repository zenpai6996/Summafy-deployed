import Link from "next/link";
import {cn} from "@/lib/utils";
import {ArrowBigRight, ArrowRight, CheckIcon} from "lucide-react";

type PriceType = {
    name:string;
    price:number;
    description:string;
    items:string[];
    id:string;
    paymentLink:string;
    priceId:string;
}

const plans =[
    {
        name:'Free!',
        price:0,
        description: 'Best for Students',
        items:[
            '10 PDF summaries per month',
            'Standard processing speed',
            'Email support',
        ],
        id:'basic',
        paymentLink: '/upload',
        priceId: '',
    },
    {
        name:'Pro',
        price:50,
        description:'Best for Professionals',
        items:[
            '50 PDF summaries per month',
            'Priority Processing',
            'Markdown Export'
        ],
        id:'pro',
        paymentLink:'',
        priceId:'',
    },
    {
        name:'Exclusive',
        price:1000,
        description:'Lifetime pro Access',
        items:[
            'Unlimited PDF summaries',
            'Priority Processing',
            '24/7 priority Support',
            'Markdown Export'
        ],
        id:'exclusive',
        paymentLink:'',
        priceId:'',
    },
];
const PricingCard= ({name,price,description,items,id,paymentLink}:PriceType) => {
    return (
        <div className={"relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300"}>
           <div className={cn("relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl",id === 'pro' && "border-[#E9A5F1] gap-5 border-2",id === 'exclusive' && "hover:border-[#FFB200] ")}>
            <div className={"flex justify-between items-center gap-4"}>
                <div>
                    {id === "exclusive" ? (
                        <p className="text-lg lg:text-xl font-bold capitalize bg-gradient-to-r from-[#FFE700] via-[#FF2E63] to-[#252A34] bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
                            {name}
                        </p>
                    ) : (
                        <p className={"text-lg lg:text-xl font-bold capitalize"}>{name}</p>
                    )}                    <p className={"text-base-content/80 mt-2 "}>{description}</p>
                </div>
            </div>
            <div className={"flex gap-2 "}>
                <p className={"text-5xl tracking-tight font-extrabold"}>₹{price}</p>
                <div className={"flex flex-col justify-end mb-[8px]"}>
                    {
                        id === "exclusive" ?(
                                <><p className={"text-xs uppercase font-semibold"}>Lifetime</p>
                                    <p className={"text-xs"}>Access</p></>
                            )
                            :(
                            <><p className={"text-xs uppercase font-semibold"}>RS</p>
                            <p className={"text-xs"}>/month</p></>
                        )
                    }
                </div>
            </div>
            <div className={"space-y-2.5 leading-relaxed text-base flex-1"}>
                {items.map((item,idx) => <li key={idx} className={"flex items-center gap-2"}>
                    <CheckIcon size={18}/>
                    <span>{item}</span></li> )}
            </div>
            <div className={"space-y-2 justify-center w-full"}>
                <Link href={paymentLink}   className={cn(
                    "w-full rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#E9A5F1] to-[#8F87F1] hover:bg-gradient-to-r hover:from-[#8F87F1] hover:to-[#E9A5F1] text-white border-2 py-2 transition-all duration-800 ease-in-out\n" +
                    "    bg-[length:200%_200%] hover:bg-[position:100%_100%]", id === 'basic' && "bg-gradient-to-r from-[#E9A5F1] to-[#8F87F1] hover:bg-gradient-to-r hover:from-[#8F87F1] hover:to-[#E9A5F1] border-rose-100",
                    id === 'pro' && "bg-gradient-to-r from-[#E9A5F1] to-[#8F87F1] hover:bg-gradient-to-r hover:from-[#8F87F1] hover:to-[#E9A5F1] border-purple-500",
                    id === 'exclusive' && "bg-gradient-to-r from-[#E9A5F1] to-[#8F87F1] hover:bg-gradient-to-r hover:from-[#FFE700] hover:to-[#FF2E63] border-rose-100")
                }
                >
                    {id === "basic" ? (
                        <>Try Now <ArrowRight size={18}/></>
                    ) : (
                        <>Buy Now <ArrowRight size={18}/></>
                    )}
                </Link>
            </div>
        </div>
    </div>
    )
}

export default function PricingSection(){
    return(
        <section className={"relative overflow-hidden "} id={"pricing"}>
            <div className={"py-12 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 "}>
                <div className={"flex items-center justify-center w-full pb-12"}>
                    <h2 className={"uppercase font-bold text-xl mb-8 text-[#C68EFD]"}>
                        Pricing
                    </h2>
                </div>
                <div className={"relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8"}>
                    {plans.map((plan) => (
                        <PricingCard key={plan.id} {...plan}/>
                    ))}
                </div>
            </div>
        </section>
    )
}