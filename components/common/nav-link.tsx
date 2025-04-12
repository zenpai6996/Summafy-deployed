'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
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

export default function NavLink({href,children,className}:
                                {href:string,
                                 children:React.ReactNode,
                                 className?:string,
                                }){
    const pathname =usePathname();
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
    return <Link href={href}
                 className={cn("transition-colors text-base duration-200 text-gray-700 hover:text-[#8F87F1]",className,isActive && "text-[#8F87F1]")}
    >{children}</Link>;
}