
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {ArrowRight, Plus} from "lucide-react";
import {SummaryCard} from "@/components/Summaries/summary-card";
import { getSummaries } from "@/lib/summaries";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import EmptySummaryState from "@/components/Summaries/empty-summary-state";
import {MotionDiv, MotionH1, MotionP} from "@/components/common/motion-wrapper";
import {itemVariants} from "@/utils/constants";

export default async function DashboardPage(){
    const user = await currentUser();
    const userId = user?.id;
    if(!userId) {
        return redirect('/sign-in');
    }
    const uploadLimit = 5;
    const summaries = await getSummaries(userId);
    return(
        <main className={"min-h-screen"}>
           
            <MotionDiv
                initial={{opacity:0,y:20}}
                animate={{opacity:1,y:0}}
                transition={{duration:0.5}}
                className={"container mx-auto flex flex-col gap-4"}>
                <div className={"px-2 py-12 sm:py-24"}>
                    <div className={"flex gap-4 mb-8 justify-between"}>
                        <div className={"flex flex-col gap-2"}>
                            <MotionH1
                                initial={'hidden'}
                                whileInView={'visible'}
                                variants={itemVariants}
                                className={" text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight  bg-gradient-to-r from-[#8F87F1] via-[#C68EFD] to-[#E9A5F1] bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient"}>Your Summaries</MotionH1>
                            <MotionP
                                initial={'hidden'}
                                animate={'visible'}
                                variants={itemVariants}
                                className={"text-gray-300 text-1xl md:text-2xl lg:text-3xl"}>
                                Here you can find all your summaries. You can also create new summaries and manage your existing ones.
                            </MotionP>
                        </div>
                        <MotionDiv
                            variants={itemVariants}
                            initial={'hidden'}
                            animate={'visible'}
                            whileHover={{scale:1.05}}
                            className={'self-start'}
                        >
                            <Button variant={"link"} className={"no-underline bg-gradient-to-r from-purple-300 to-purple-500 hover:from-purple-500 hover:to-purple-300 text-white transition-colors rounded-3xl hover:scale-105 hover:transition-all duration-500 ease-in-out group hover:no-underline"}>
                                <Link href={"/upload"} className={"flex text-white items-center "}><Plus className={"w-5 h-5 mr-2"}/>New Summary</Link>
                            </Button>
                        </MotionDiv>
                    </div>
                    <MotionDiv
                        initial={'hidden'}
                        animate={'visible'}
                        variants={itemVariants}
                        className={"mb-6"}>
                       <div className={"bg-purple-300 border border-purple-700 text-purple-700 rounded-lg p-4"}>
                           <p className={"text-sm"}>
                               You have reached the limit of {uploadLimit} uploads on the Basic plan.{"  "}
                               <Link href={"/#pricing"} className={"underline underline-offset-4 inline-flex items-center"}>Click Here to upgrade your Plan{' '} <ArrowRight className={"w-4 h-4 inline-block"}/></Link>
                           </p>
                       </div>
                    </MotionDiv>
                    {
                        summaries.length === 0 ?( <EmptySummaryState/> ):
                            (
                            <div className={"grid grid-cols-1 gap-4 sm:gap-6 sm:px-0 sm:grid-cols-2 lg:grid-cols-3 "}>
                                {
                                summaries.map((summary,index) => (
                                <SummaryCard key={index} summary={summary}/>
                                ))
                                }
                            </div>
                            )
                    }
                </div>
            </MotionDiv>
        </main>
    );
}