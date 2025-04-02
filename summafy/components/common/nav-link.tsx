'use client'
import Link from "next/link";
import {cn} from "@/lib/utils";


export default function NavLink({href,children,className}:
                                {href:string,
                                 children:React.ReactNode,
                                 className:string,
                                }){
    return <Link href={href}
                 className={cn("transition-colors text-sm duration-200 text-gray-600 hover:text-[#8F87F1]",className)}
    >{children}</Link>;
}