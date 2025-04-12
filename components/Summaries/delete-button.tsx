"use client";
import { Button } from "../ui/button";
import {Trash2} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import {useState, useTransition} from "react";
import { deleteSummaryAction } from "actions/summary-actions";
import {toast} from "sonner";

interface DeleteButtonProps {
    summaryId: string;
}

export default function DeleteButton({summaryId}: DeleteButtonProps) {
    const [open, setOpen] = useState(false);
    const [isPending,startTransition] = useTransition();
    const handleDelete = async () => {
        startTransition(async()=> {
            //Delete the summary
            //redirect to dashboard
            const result = await deleteSummaryAction({summaryId});
            if(!result.success){
                toast.error("Error",{
                    description:"Failed to delete the summary",
                });
            }
            setOpen(false);
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild={true}>
                <Button variant={'ghost'} size={"icon"} className={"text-gray-900 mr-4 bg-gray-50 border-2 border-gray-200 mt-5"}>
                    <Trash2 className={"w-4 h-4"}/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Summary (⊙_⊙)？</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the Summary ? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={() => setOpen(false)} variant={'ghost'} size={"default"} className={"px-2text-gray-900 bg-gray-50 border-2 border-gray-200 hover:text-gray-600 hover:bg-gray-100"}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} variant={'destructive'} size={"default"} className={"text-gray-100 bg-gray-900 border-2 border-gray-200 hover:text-gray-100 hover:bg-red-600"}>
                        {isPending ? 'Deleting...': 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}