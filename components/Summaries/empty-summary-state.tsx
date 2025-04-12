import {FileText} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function EmptySummaryState(){
    return (
        <div className={"text-center py-12"}>
            <div className={"flex flex-col items-center gap-4"}>
                    <FileText
                        className="w-16 h-16 text-gray-500"
                    />
                <h3 className={"text-xl font-semibold text-gray-600"}>No Summaries yet</h3>
                <p className={"text-gray-500 max-w-md"}>Upload your first PDF to get started with Summafy 💫</p>
                <Link href={"/upload"}>
                    <Button variant={"link"} className={"group hover:no-underline mt-4 text-white bg-gradient-to-r from-purple-300 to-purple-500 hover:from-purple-500 hover:to-purple-300 transition-colors duration-500 ease-in-out rounded-3xl hover:scale-105 hover:transition-all duration-500 ease-in-out "}>
                        Create your first summary
                    </Button>
                </Link>
            </div>
        </div>
    )
}