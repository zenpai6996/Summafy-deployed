import {ExternalLink, FileTerminal} from "lucide-react";
import {Button} from "@/components/ui/button";
import DownloadSummaryButton from "./download-summaries-button";

export function SourceInfo({
                fileName,
                originalFileUrl,
                title,
                summaryText,
                createdAt

}:{ fileName:string;
    originalFileUrl:string;
    title:string;
    summaryText:string;
    createdAt:string;
}) {
    return (
        <div className={"flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"}>
            <div className={"flex items-center justify-center gap-2"}>
                <FileTerminal className={"h-4 w-4 text-purple-500"}/>
                <span>Source:{fileName}</span>
            </div>
            <div className={"flex gap-2"}>
                <Button variant={"ghost"} size={"sm"} className={"h-8 border-purple-500 border rounded-full hover:scale-105 transition-all duration-300 ease-in-out  px-3 text-purple-500 hover:text-purple-700 hover:bg-rose-50"} asChild>
                    <a href={originalFileUrl} target={"_blank"} rel={"noopener noreferer"}>
                        <ExternalLink className={"h-4 w-4 mr-1"}/>
                        View Original
                    </a>
                </Button>
                <DownloadSummaryButton
                title ={title}
                summaryText={summaryText}
                fileName={fileName}
                createdAt={createdAt}
                />
            </div>
        </div>
    )

}