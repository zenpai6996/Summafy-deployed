import { SignUp } from "@clerk/nextjs"
import Link from "next/link";


export default function Page() {
    return (
        <section className="flex justify-center items-center lg:min-h-[40vh]">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto sm:px-6 lg:px-8 lg:pt-12">
                <SignUp
                    appearance={{

                        variables: {
                            colorPrimary: '#8F87F1'
                        },
                        elements: {
                            footer: {
                                display: 'none'
                            },
                            footerActionLink: {
                                display: 'none'
                            }
                        }
                    }}
                />
                <div className="mt-10 text-center">
                    <span className="text-gray-600">Already have an account? </span>
                    <Link href="/sign-in" className="text-[#8F87F1] hover:no-underline">
                        Sign In
                    </Link>
                </div>
            </div>
        </section>
    )
}