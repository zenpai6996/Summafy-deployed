import Link from "next/link";
import { FileTerminal } from 'lucide-react';
import {Button} from "@/components/ui/button";
import NavLink from "@/components/common/nav-link";

export default function Header() {
    const isLoggedIn = false;
    return(
    <nav className={"container flex items-center justify-between py-4 lg:py-6 px-2 mx-auto"}>
        <div className={"flex lg:flex-1"}>
            <NavLink href={"/"} className={"flex items-center gap-1 lg:gap-2 shrink-0"}>
                <FileTerminal
                    className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:text-[#8F87F1] hover:rotate-12 transition-all duration-200 ease-in-out"
                />
               <span className={"font-extrabold mt-2 lg:text-xl " +
                   "text-gray-900 hover:text-[#8F87F1] transition duration-300 ease-in-out"}>Summafy
               </span>
            </NavLink>
        </div>
        <div className={"flex flex-1 justify-center gap-4" +
            "lg:gap-12 items-center"}>
            <NavLink className={"mr-2.5"} href={"/#pricing"}>
                Pricing
            </NavLink>
            {isLoggedIn && <NavLink href={"/dashboard"}>
                Your Summaries
            </NavLink>}
        </div>
        <div className={"flex lg:flex-1 justify-end"}>
            {isLoggedIn ? (
                    <div className={"flex gap-2 items-center"}>
                        <NavLink href={"/upload"}>
                            Upload a PDF
                        </NavLink>
                        <div>Pro</div>
                        <Button>User</Button>
                    </div>
            ):(
                <div>
                    <NavLink href={"/sign-in"}>
                        Sign In
                    </NavLink>
                </div>
            )
            }
        </div>
    </nav>
    )
}