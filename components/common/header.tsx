"use client"
import { FileTerminal, X } from 'lucide-react';
import NavLink from "@/components/common/nav-link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Button2 from '../ui/button2';
import { useState } from 'react';

const navLinks = [
    { label: "Pricing", href: "#pricing" },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return <section className={"py-4 lg:py-8 relative"}>
        <div className='container max-w-5xl'>
            <div className={"grid grid-cols-2 lg:grid-cols-3 border border-purple-400/50 rounded-full p-2 px-4 md:pr-2 items-center"}>
                <div>
                    <NavLink href={"/"} className={"flex items-center gap-1 lg:gap-2 shrink-0"}>
                        <FileTerminal
                            className="w-5 h-5 lg:w-6 lg:h-6 text-gray-300 hover:text-[#8F87F1] hover:rotate-12 transition-all duration-200 ease-in-out"
                        />
                        <span className={"font-extrabold mt-1 lg:text-xl " +
                            "text-gray-300 hover:text-[#8F87F1] transition duration-300 ease-in-out"}>Summafy
                        </span>
                    </NavLink>
                </div>
                <div className={"lg:flex justify-center items-center hidden"}>
                    <nav className={"flex gap-6 text-gray-300 font-medium"}>
                        
                        <a className='hover:text-[#8F87F1] transition duration-300 ease-in-out' href="/">Home</a>
                        <a className='hover:text-[#8F87F1] transition duration-300 ease-in-out' href="#pricing">Pricing</a>
                        
                        
                        <SignedIn>
                            <a className='hover:text-[#8F87F1] transition duration-300 ease-in-out' href="/dashboard">Summaries</a>
                            <a className='hover:text-[#8F87F1] transition duration-300 ease-in-out' href="/upload">Upload</a>
                        </SignedIn>
                    </nav>
                </div>
                <div className={"flex justify-end gap-4 items-center"}>
                    
                <div className="md:hidden">
                        <label className="hamburger flex items-center justify-center">
                            <input
                                type="checkbox"
                                checked={isMenuOpen}
                                onChange={toggleMenu}
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            />
                            <svg viewBox="0 0 32 32" width="24" height="24">
                                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                                <path className="line" d="M7 16 27 16"></path>
                            </svg>
                        </label>
                    </div>
                    
                    {/* Show login button when signed out */}
                    <SignedOut>
                        <NavLink href='/sign-in'>
                            <Button2 className={"hidden md:inline-flex items-center"} variant={"primary"}>Log In</Button2>
                        </NavLink>
                    </SignedOut>
                    
                    {/* Show user button when signed in */}
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-10 h-10 lg:w-12 lg:h-12",
                                    userButtonTrigger: "focus:shadow-none"
                                }
                            }}
                        />
                    </SignedIn>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full right-10 w-50% mt-2 py-4  backdrop-blur-md rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out">
                    <div className="container max-w-5xl">
                        <nav className="flex flex-col space-y-4 text-gray-300 font-medium px-4">
                            <a className='hover:text-[#8F87F1] transition duration-300 ease-in-out' href="/">Home</a>
                            <a className='hover:text-[#8F87F1] transition duration-300 ease-in-out' href="#pricing">Pricing</a>
                            
                            <SignedIn>
                                <a className='hover:text-[#8F87F1] transition duration-300 ease-in-out' 
                                href="/dashboard">Summaries</a>
                                <a className='hover:text-[#8F87F1] transition duration-300 ease-in-out' 
                                href="/upload">Upload</a>
                            </SignedIn>
                            
                            <SignedOut>
                                <a className='hover:text-[#8F87F1] transition duration-300 ease-in-out' href="/sign-in">Log In</a>
                                <a className='hover:text-[#8F87F1] transition duration-300 ease-in-out' href="/sign-up">Sign Up</a>
                            </SignedOut>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    </section>
}