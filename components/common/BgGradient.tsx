
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

export default function BgGradient1({
                                       className
                                   }:{
    className?:string;
}){
    return(
        <div className={"relative "}>
            <div
                aria-hidden={"true"}
                className={"pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30"}
            >
                <div
                    style={{clipPath:'polygon(50% 0%, 98% 35%, 68% 57%, 79% 91% , 50% 70%, 21% 91% , 2% 35% , 39% 35%)',}}
                    className={cn("relative left-[calc(50%-11rem)] aspect-1155/678 w-[36,125rem] -translate-x-1/2 rotate-[30-deg] bg-gradient-to-br from-pink-200 via-pink-600 to-pink-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]",className)}
                >
                </div>
            </div>
        </div>
    );
}