import { getSummaryById } from "@/lib/summaries";
import {FileText, OctagonAlert} from "lucide-react";

import {SummaryHeader} from "@/components/Summaries/summary-header";
import {SourceInfo} from "@/components/Summaries/source-info";
import {SummaryViewer} from "@/components/Summaries/summary-viewer";
import {MotionDiv} from "@/components/common/motion-wrapper";

export default async function SummaryPage(props:{params:Promise<{id:string}>}) {
    const params = await props.params;
    const id = params.id;
    const summary = await getSummaryById(id);
    if(!summary){
        return (
            <div className={"flex flex-col items-center justify-center h-full mt-35"}>
                <OctagonAlert className={"text-gray-700 w-30 h-30 mb-10"}/>
                <h1 className={"text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent"}>Summary Not Found</h1>
            </div>
        )
    }
    const {title ,original_file_url, summary_text, file_name, word_count,created_at} = summary;
    const reading_time = Math.ceil((word_count || 0) / 200);
    return (
        <div className={" min-h-screen "}>
            
            <div className={"container mx-auto flex flex-col gap-4"}>
                <div className={"px-1 sm:px-4 lg:px-8 sm:py-12 lg:py-24"}>
                    <MotionDiv
                        initial={{opacity:0,y:20}}
                        animate={{opacity:1,y:0}}
                        transition={{duration:0.5}}
                        className={"flex flex-col"}>
                        <SummaryHeader title={title} createdAt={created_at} readingTime={reading_time}/>
                        { <SourceInfo
                            title={title}
                            fileName={file_name}
                            summaryText={summary_text}
                            createdAt={created_at}
                            originalFileUrl={original_file_url}
                        />}
                    </MotionDiv>
                    <MotionDiv initial={{opacity:0,y:20}}
                               animate={{opacity:1,y:0}}
                               transition={{duration:0.5}}
                               className={"relative mt-4 sm:mt-8 lg:mt-16"}>
                        <div className={"relative p-1 sm:p-2 lg:p-6 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 max-w-4xl mx-auto "}>
                            <div className={"absolute inset-0 bg-gradient-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 rounded-2xl sm:rounded-3xl "}/>
                                <div className={"absolute top-2 sm:top-4 right-2 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground bg-white/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-xs"}>
                                <FileText className={"h-3 w-3 sm:h-4 sm:w-4 text-purple-500"}/>
                                {word_count?.toLocaleString()} words
                            </div>
                            <div className={"relative mt-8 sm:mt-6 flex justify-center"}>
                                <SummaryViewer summary={summary.summary_text}/>
                            </div>
                        </div>
                    </MotionDiv>
                </div>
            </div>
        </div>
    )
}