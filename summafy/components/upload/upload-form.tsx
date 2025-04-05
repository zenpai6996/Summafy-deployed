import {Button} from "@/components/ui/button";

export default function UploadForm(){
    return(
        <div>
            <form className={"flex flex-col gap-4"}>
                <input type={"file"}/>
                <Button>
                    Upload Your PDF
                </Button>
            </form>
        </div>
    )
}