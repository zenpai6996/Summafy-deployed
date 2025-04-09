import {getSummaryById} from "@/lib/summaries";
import {OctagonAlert} from "lucide-react";
import BgGradient from "@/components/common/BgGradient";

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
    return (
        <div className={" min-h-screen "}>
            <BgGradient className={"from-purple-400 to-purple-500"}/>
            <div className={"container mx-auto flex flex-col gap-4"}>
                <div className={"px-4 sm:px-6 lg:px-8 sm:py-12 lg:py-24"}>
                    <div className={"flex flex-col"}>
                        <h1 className={"text-4xl "}>{summary[0].title}</h1>
                    </div>
                    {summary[0].file_name &&
                        <p className={"text-gray-500"}>
                            PDF: {summary[0].file_name}
                        </p>}
                </div>
            </div>
        </div>
    )
}