"use client"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {forwardRef} from "react";
import {Loader2} from "lucide-react";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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

interface UploadFormInputProps {
    onSubmit:(e:React.FormEvent<HTMLFormElement>) => void;
    isLoading:boolean;
}

const UploadFormInput= forwardRef<HTMLFormElement,UploadFormInputProps>(({onSubmit,isLoading},ref) => {
    return(
        <form ref={ref} className={"flex flex-col gap-6"} onSubmit={onSubmit}>
            <div className={"flex justify-end  items-center gap-1.5"}>
                <Input
                    type={"file"}
                    id={"file"}
                    name={"file"}
                    accept={"application/pdf"}
                    required
                    className={cn(isLoading && 'opacity-50 cursor-not-allowed')}
                    disabled={isLoading}
                />
                <Button disabled={isLoading}>{
                    isLoading ? <><Loader2 className={"mr-2 h-4 w-4 animate-spin"}/> Processing...</> : "Upload Your PDF"
                }</Button>
            </div>
        </form>
    )
});
UploadFormInput.displayName='UploadFormInput';

export default UploadFormInput;

