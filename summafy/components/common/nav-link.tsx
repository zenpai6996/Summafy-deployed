'use client'
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";


export default function NavLink({href,children,className}:
                                {href:string,
                                 children:React.ReactNode,
                                 className:string,
                                }){
    const pathname =usePathname();
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
    return <Link href={href}
                 className={cn("transition-colors text-base duration-200 text-gray-700 hover:text-[#8F87F1]",className,isActive && "text-[#8F87F1]")}
    >{children}</Link>;
}