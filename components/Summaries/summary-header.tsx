import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Calendar, ChevronLeft, Sparkles,Clock} from "lucide-react";
import {Badge} from "@/components/ui/badge";

export function SummaryHeader({title,createdAt,readingTime}:{title:string,createdAt:string,readingTime:number}) {
    return(
       <div className={"flex flex-col sm:flex-row gap-4 mb-4 justify-between items-center sm:items-start"}>
            <div className={"space-y-6 text-center sm:text-left w-full sm:w-auto"}>
                <div className={"flex flex-wrap justify-center sm:justify-start items-center gap-4"}>
                    <Badge  variant={"secondary"} className={"cursor-pointer relative px-4 py-1.5 text-sm font-medium bg-white/80 backdrop-blur-xs rounded-full hover:bg-white/90 transition-all duration-300 shadow-xs hover:shadow-md"}>
                        <Sparkles className={"h-4 w-4 mr-1.5 text-purple-500"}/>
                        <span className={"text-purple-500"}>AI Summary</span>
                    </Badge>
                    <Badge  variant={"secondary"} className={"cursor-pointer relative px-4 py-1.5 text-sm font-medium bg-white/80 backdrop-blur-xs rounded-full hover:bg-white/90 transition-all duration-300 shadow-xs hover:shadow-md"}>
                        <div className={" flex items-center gap-2 text-sm text-muted-foreground"}>
                            <Calendar className={"h-4 w-4 text-purple-500"}/>
                            {new Date(createdAt).toLocaleDateString('en-US',{
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                }
                            )}
                        </div>
                        <div className={" flex items-center gap-2 text-sm text-muted-foreground"}>
                            <Clock className={"h-4 w-4 text-purple-500"}/>
                            {readingTime} min read
                        </div>
                    </Badge>
                    <div className={"self-start items-center justify-center right-0"}>
               <Link href={"/dashboard"} >
                   <Button variant={"link"} size={"sm"} className={"group text-purple-800 hover:no-underline flex items-center gap-1 sm:gap-2 hover:bg-white/80 backdrop-blur-xs rounded-full transition-all duration-200 shadow-xs hover:shadow-md border border-purple-500/30 bg-purple-100 px-2 sm:px-3 hover:scale-105 mt-1"}>
                      <ChevronLeft className={"h-3 w-3 sm:h-4 sm:w-4 text-purple-800 transition-transform group-hover:translate-x-0.5"}/>
                       <span className={"text-xs sm:text-sm text-muted-foreground font-medium"}>Back <span className={"hidden sm:inline"}>to Dashboard</span></span>
                   </Button>
               </Link>
           </div>
                </div>
               
                <h1 className="text-3xl  md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight bg-gradient-to-r from-[#8F87F1] via-[#C68EFD] to-[#E9A5F1]  bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
                    {title}
                </h1>
            </div>
          
       </div>
    )
}