import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight} from "lucide-react";
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

export function NavigationControls({
    currentSection,
    totalSections,
    onPrevious,
    onNext,
    onSectionSelect,
                                   }:{
    currentSection:number;
    totalSections:number;
    onPrevious: ( ) => void;
    onNext: () => void;
    onSectionSelect: (index:number) => void;

}){
    return(
        <div className={"absolute bottom-0 left-0 right-0 p-4 bg-white backdrop-blur-xs border-t border-purple-500/10"}>
            <div className={"flex justify-between items-center"}>
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={onPrevious}
                    disabled={currentSection === 0}
                    className={cn("rounded-full hover:text-white h-12 w-12 transition-all duration-200 bg-gradient-to-br from-purple-400 to-purple-600 backdrop-blur-xs border border-purple-500/10 ",currentSection === 0 ? 'opacity-50' : 'hover:bg-purple-400/20')}
                >
                    <ChevronLeft className={"w-6 h-6"}/>
                </Button>
                <div className={"flex gap-2"}>
                    {Array.from({length:totalSections}).map((_,index) => (
                        <button
                        key={index}
                        onClick={() => onSectionSelect(index)}
                        className={cn("w-2 h-2 rounded-full transition-all duration-300",currentSection === index ? 'bg-gradient-to-r from-purple-400 to-purple-600': 'bg-purple-500/50 hover:bg-purple-400/30')}
                        />
                    ))}
                </div>
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={onNext}
                    disabled={currentSection === totalSections -1}
                    className={cn("rounded-full hover:text-white w-12 h-12 transition-all duration-200 bg-gradient-to-br from-purple-400 to-purple-600 backdrop-blur-xs border border-purple-500/10",currentSection === totalSections -1 ? 'opacity-50' : 'hover:bg-purple-400/20')}
                >
                    <ChevronRight className={"w-6 h-6"}/>
                </Button>
            </div>
        </div>
    )
}