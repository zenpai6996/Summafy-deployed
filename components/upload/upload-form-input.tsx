"use client"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {forwardRef} from "react";
import {AlertCircle, Loader2, Lock} from "lucide-react";
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
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    isLimitReached: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
    ({onSubmit, isLoading, isLimitReached}, ref) => {
        const isDisabled = isLoading || isLimitReached;

        return(
            <form ref={ref} className={"flex flex-col gap-6"} onSubmit={onSubmit}>
                <div className={cn(
                    "flex justify-end items-center gap-1.5 relative",
                    isLimitReached && "opacity-80"
                )}>
                    <div className="relative flex-1">
                        <Input
                            type="file"
                            id="file"
                            name="file"
                            accept="application/pdf"
                            required
                            className={cn(
                                'text-gray-300',
                                isDisabled && 'opacity-50 cursor-not-allowed'
                            )}
                            disabled={isDisabled}
                        />
                        {isLimitReached && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md">
                                <div className="flex items-center text-red-300">
                                    <Lock className="w-4 h-4 mr-2" />
                                    <span className="text-sm font-medium">Upload limit reached</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <Button
                        disabled={isDisabled}
                        className={cn(
                            "bg-gradient-to-r from-[#C95792] to-transparent text-gray-300",
                            isLimitReached && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {isLoading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Processing...</>
                        ) : isLimitReached ? (
                            <><AlertCircle className="mr-2 h-4 w-4"/> Limit Reached</>
                        ) : (
                            "Upload Your PDF"
                        )}
                    </Button>
                </div>
            </form>
        )
    });

UploadFormInput.displayName = 'UploadFormInput';

export default UploadFormInput;