
import { Card } from "@/components/ui/card";
import DeleteButton from "@/components/Summaries/delete-button";
import Link from "next/link";
import {FileText} from "lucide-react";
import {cn, formatFileName} from "../../lib/utils";

const SummaryHeader = ({fileUrl,title,created_at}:{fileUrl:string,title:string,created_at:string}) => {
    return( <div className={"flex items-start gap-2 sm:gap-4"}>
        <FileText className={"w-5 h-5 sm:w-8 sm:h-8 text-purple-500 mt-1"}/>
        <div className={"flex-1 min-w-0 "}>
            <h3 className="text-base font-semibold  text-gray-900 truncate-w-4/5 xl:text-lg ">
                {title || formatFileName(fileUrl)}
            </h3>
            <div className={"flex flex-row gap-40"}>
                <p className={"text-sm text-gray-500 "}>
                <span >
              {new Date(created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
              })}
            </span>
                </p>
                <p className={"text-sm text-gray-500 "}>
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
        <Card className="relative h-full overflow-hidden hover:shadow-md transition-shadow duration-200 hover:scale-105 transition-all duration-300 ease-in-out">
            <div className="absolute top-3 right-3 z-10">
                <DeleteButton summaryId={summary.id}/>
            </div>
            <Link
                href={`summary/${summary.id}`}
                className="block p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-150 mb-4"
            >
                <div className="flex flex-col gap-3 sm:gap-4 ">
                    <SummaryHeader
                        created_at={summary.created_at}
                        fileUrl={summary.summary_text}
                        title={summary.title}
                    />
                    <p className="text-gray-600 line-clamp-3 text-sm sm:text-base">
                        {summary.summary_text}
                    </p>
                    <div className={"flex justify-between items-center mt-2 sm:mt-4"}>
                        <StatusBadge status={summary.status} />
                    </div>
                </div>
            </Link>
        </Card>
    );
}