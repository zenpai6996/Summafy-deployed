import {cn} from "../../lib/utils";

export default function ProgressBar({sections,currentSection}:{sections:Array<{title:string;points:String[]}>;currentSection:number}){
    return(
        <div className={"absolute bg-background/80 top-0 left-0 right-0 z-20 backdrop-blur-xs pt-4 pb-2 border-b border-rose-50/10"}>
            <div className={"px-4 flex gap-1.5"}>
                {
                    sections.map((_,index) => (
                <div  key={index} className={"h-1.5 flex-1 bg-purple-500/10 overflow-hidden"}>
                        <div
                            className={cn(" h-full rounded-full bg-gradient-to-r from-gray-500 to-purple-600 transition-all duration-200",
                            index === currentSection ? "w-full" : currentSection > index ? "w-full opacity-50" : "w-0"
                            )}
                        />

                        </div>
                    ))}
            </div>
        </div>
    );
}