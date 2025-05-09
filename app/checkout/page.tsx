import { redirect } from 'next/navigation';
import { currentUser } from "@clerk/nextjs/server";
import CheckoutForm from '@/components/checkout/checkout-form';

export default async function CheckoutPage({
                                               searchParams,
                                           }: {
    searchParams: { planId?: string };
}) {
    const user = await currentUser();
    if (!user) {
        return redirect('/sign-in');
    }


    const planId = searchParams.planId || 'plan_QRIOmYMuPRUyDi';

    return (
        <main className="min-h-screen py-12 sm:py-24">
            <div className="container mx-auto max-w-md">
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#8F87F1] via-[#C68EFD] to-[#E9A5F1] bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
                        Subscribe to Pro Plan
                    </h1>

                    <div className="bg-white/5 backdrop-blur-xs p-8 border border-gray-300/20 rounded-2xl space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-xl font-semibold text-gray-300">Pro Plan</h2>
                            <p className="text-gray-400">Best for Professionals</p>
                        </div>

                        <div className="flex gap-2">
                            <p className="text-3xl text-gray-300 tracking-tight font-extrabold">₹100</p>
                            <div className="flex flex-col text-gray-400 justify-end mb-[8px]">
                                <p className="text-xs uppercase font-semibold">RS</p>
                                <p className="text-xs">/month</p>
                            </div>
                        </div>

                        <ul className="space-y-2.5 leading-relaxed text-gray-300">
                            <li className="flex items-center gap-2">
                                <CheckIcon className="text-[#E9A5F1]" size={18} />
                                <span>15 PDF summaries per month</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon className="text-[#E9A5F1]" size={18} />
                                <span>Priority Processing</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckIcon className="text-[#E9A5F1]" size={18} />
                                <span>Markdown Export</span>
                            </li>
                        </ul>

                        <CheckoutForm planId={planId} planName="Pro" price={100} />
                    </div>
                </div>
            </div>
        </main>
    );
}

function CheckIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}