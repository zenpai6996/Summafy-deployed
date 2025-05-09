"use client"
import {Boxes} from 'lucide-react';
import NavLink from "@/components/common/nav-link";
import {SignedIn, SignedOut, UserButton, useUser} from "@clerk/nextjs";
import Button2 from '../ui/button2';
import {useRef, useState, useEffect} from 'react';
import Link from "next/link";
import PlanBadge from "@/components/common/planbadge";
import {MotionDiv} from "@/components/common/motion-wrapper";
import {itemVariants} from "@/utils/constants";

export default function Header({className}:{className?:string}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { user, isLoaded } = useUser();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Remove extra spaces from className to fix hydration issues
    const headerClassName = `py-4 lg:py-8 relative sticky top-0 z-50 ${className || ''}`.trim();

    return (
        <section className={headerClassName}>
            <div className="container max-w-5xl">
                <div className="grid grid-cols-2 lg:grid-cols-3 border border-gray-300/50 rounded-full p-2 px-4 md:pr-2 items-center bg-neutral-900/70 backdrop-blur">
                    <div>
                        <div className="flex items-center gap-1 lg:gap-2 shrink-0">
                            <Boxes
                                className="w-5 h-5 lg:w-6 lg:h-6 text-gray-300 hover:text-[#8F87F1] hover:scale-110 transition-all duration-200 ease-in-out"
                            />
                            <a href="/" className="font-bold mt-1 lg:text-xl text-gray-300 hover:text-[#8F87F1] transition duration-300 ease-in-out cursor-pointer">
                                Summafy
                            </a>
                        </div>
                    </div>
                    <div className="lg:flex justify-center items-center hidden">
                        <div className="flex gap-6 text-gray-300 font-medium">
                            <Link href="/#" as="/#">
                                <p className="hover:text-[#8F87F1] transition duration-300 ease-in-out">Home</p>
                            </Link>
                            <Link href="/#pricing" as="/#pricing">
                                <p className="hover:text-[#8F87F1] transition duration-300 ease-in-out">Pricing</p>
                            </Link>
                            <Link href="/#Faq" as="/#Faq">
                                <p className="hover:text-[#8F87F1] transition duration-300 ease-in-out">FAQs</p>
                            </Link>
                            <SignedIn>
                                <a className="hover:text-[#8F87F1] transition duration-300 ease-in-out" href="/dashboard">Summaries</a>
                                <a className="hover:text-[#8F87F1] transition duration-300 ease-in-out" href="/upload">Upload</a>
                            </SignedIn>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 items-center">
                        <div className="md:hidden">
                            <label className="hamburger flex items-center justify-center mt-1">
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

                        <SignedOut>
                            <NavLink href='/sign-in'>
                                <Button2 className="hidden md:inline-flex items-center" variant="secondary">Log In</Button2>
                            </NavLink>
                            <NavLink href='/sign-up'>
                                <Button2 className="hidden md:inline-flex items-center" variant="primary">Sign up</Button2>
                            </NavLink>
                        </SignedOut>

                        <SignedIn>
                            {user && <PlanBadge clerkUserId={user.id}/>}
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

                {isMenuOpen && (
                    <MotionDiv  initial={{opacity:0,y:0}}
                                whileInView={{opacity:1,y:10}}
                                transition={{duration:0.5}}
                                ref={menuRef} className="md:hidden absolute top-full right-10 w-50% mt-2 py-4 backdrop-blur-md rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out">
                        <div className="container max-w-5xl">
                            <div className="flex flex-col space-y-4 text-gray-300 font-medium px-4">
                                <Link href="/#" as="/#">
                                    <p className="hover:text-[#8F87F1] transition duration-300 ease-in-out">Home</p>
                                </Link>
                                <Link href="/#pricing" as="/#pricing">
                                    <p className="hover:text-[#8F87F1] transition duration-300 ease-in-out">Pricing</p>
                                </Link>
                                <Link href="/#Faq" as="/#Faq">
                                    <p className="hover:text-[#8F87F1] transition duration-300 ease-in-out">FAQs</p>
                                </Link>
                                <SignedIn>
                                    <a className="hover:text-[#8F87F1] transition duration-300 ease-in-out" href="/dashboard">Summaries</a>
                                    <a className="hover:text-[#8F87F1] transition duration-300 ease-in-out" href="/upload">Upload</a>
                                </SignedIn>
                                <SignedOut>
                                    <a className="hover:text-[#8F87F1] transition duration-300 ease-in-out" href="/sign-in">Log In</a>
                                    <a className="hover:text-[#8F87F1] transition duration-300 ease-in-out" href="/sign-up">Sign Up</a>
                                </SignedOut>
                            </div>
                        </div>
                    </MotionDiv>
                )}
            </div>
        </section>
    );
}