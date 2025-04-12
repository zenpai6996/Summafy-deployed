import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import BgGradient from "@/components/common/BgGradient";

export default function Page() {
    return (
        <section className="flex justify-center items-center lg:min-h-[40vh]">

            <div className="py-12 lg:py-24 max-w-5xl mx-auto sm:px-6 lg:px-8 lg:pt-12">
                <BgGradient/>
                <SignIn
                    appearance={{

                        elements: {
                            footer: {
                                display: 'none' // Hide default footer
                            }
                        },
                        variables: {
                            colorPrimary: '#8F87F1'
                        }
                    }}
                />
                <div className="mt-10 text-center">
                    <span className="text-gray-600">Don't have an account? </span>
                    <Link href="/sign-up" className="text-[#8F87F1] hover:no-underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </section>
    )
}