import {Button} from "../ui/button";
import {Trash2} from "lucide-react";

export default function DeleteButton(){
    return (
        <Button variant={'ghost'} size={"icon"} className={"text-gray-900 mr-4 bg-gray-50 border-2 border-gray-200 mt-5"}>
            <Trash2 className={"w-4 h-4"}/>
        </Button>
    )
}