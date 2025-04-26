
import { Card } from "@/components/ui/card";
import DeleteButton from "./delete-button";
import Link from "next/link";
import {FileText} from "lucide-react";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import SpotlightCard from "../common/Spotlight";

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

const SummaryHeader = ({fileUrl,title,created_at}:{fileUrl:string,title:string,created_at:string}) => {
    return( 
        
    <div className={"flex items-start gap-2 sm:gap-4"}>
        
        <FileText className={"w-5 h-5 sm:w-8 sm:h-8 text-purple-500 mt-1"}/>
        <div className={"flex-1 min-w-0 "}>
            <h3 className="text-base font-semibold  text-gray-900 truncate-w-4/5 xl:text-lg ">
                {title || formatFileName(fileUrl)}
            </h3>
            <div className={"flex flex-row gap-10"}>
                <p className={"text-sm text-gray-700 "}>
                <span >
              {new Date(created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
              })}
            </span>
                </p>
                <p className={"text-sm text-gray-700 "}>
                  <span>
              {new Date(created_at).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
              })}
            </span>
                </p>
            </div>

        </div>
    </div>
    );
};

const StatusBadge =  ({status}:{status:string}) => {
    return(
        <span className={cn(
            'px-3 py-1 text-xs font-medium rounded-full capitalize',
            status === 'completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
        )}>
      {status}
    </span>
    )
}

export function SummaryCard({ summary }: { summary: any }) {
    return (
  

        <Card className="relative h-full border-hidden overflow-hidden hover:shadow-md bg-transparent duration-200 hover:scale-105 transition-all duration-300 ease-in-out">
            <SpotlightCard className=" bg-white">
            <div className="absolute top-1 right-1 z-10">
                <DeleteButton summaryId={summary.id}/>
            </div>
            <Link
                href={`summary/${summary.id}`}
                className="block  hover:bg-gray-50 transition-colors duration-150 "
            >
                <div className="flex flex-col gap-3 sm:gap-4 ">
                    <SummaryHeader
                        created_at={summary.created_at}
                        fileUrl={summary.summary_text}
                        title={summary.title}
                    />
                    <p className="text-gray-700 line-clamp-3 text-sm sm:text-base">
                        {summary.summary_text}
                    </p>
                    <div className={"flex justify-between items-center mt-2 sm:mt-4"}>
                        <StatusBadge status={summary.status} />
                    </div>
                </div>
            </Link>
            </SpotlightCard>
            
        </Card>
    );
}