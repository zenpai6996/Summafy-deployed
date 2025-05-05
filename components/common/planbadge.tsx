"use client"
import {useEffect, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

interface SubscriptionDetails {
    plan_id: 'basic' | 'pro';
    days_remaining: number;
    uploads_used: number;
    upload_limit: number;
    is_limit_reached: boolean;
}

export default function PlanBadge({ clerkUserId }: { clerkUserId: string }) {
    const [details, setDetails] = useState<SubscriptionDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to load subscription details
    async function loadDetails() {
        try {
            setLoading(true);
            // Add cache busting parameter to prevent browser caching
            const res = await fetch(`/api/subscription-details?clerkUserId=${clerkUserId}&t=${new Date().getTime()}`);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            console.log("Subscription details:", data); // Debug log
            setDetails(data);
        } catch (error) {
            console.error("Failed to load subscription details:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && clerkUserId) {
            loadDetails();

            // Set up a refresh interval to check for updates every minute
            const intervalId = setInterval(loadDetails, 60000);

            // Clean up interval on unmount
            return () => clearInterval(intervalId);
        }
    }, [clerkUserId]);

    if (loading) return <div className="text-xs text-white px-2 py-1">Loading...</div>;
    if (error) return <div className="text-xs px-2 py-1 text-red-500">Error</div>;
    if (!details) return <div className="text-xs px-2 py-1">No plan</div>;

    const isPro = details.plan_id === 'pro';
    const uploadsUsed = details.uploads_used || 0;
    const uploadLimit = details.upload_limit || (isPro ? 15 : 5);
    const isLimitReached = details.is_limit_reached || uploadsUsed >= uploadLimit;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className={`text-xs px-2 py-1 rounded-full ml-2 flex items-center gap-1 ${
                        isPro
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 font-bold'
                            : 'bg-gray-200 text-gray-800'
                    }`}
                >
                    {isLimitReached && <AlertTriangle className="w-3 h-3" />}
                    {isPro ? 'PRO' : 'Basic'}
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-gray-800 border-gray-700 text-white" align="end" sideOffset={8}>
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                        {isPro ? 'Pro Plan' : 'Basic Plan'}
                    </h4>
                    {/*{isPro && (*/}
                    {/*    <p className="text-sm text-gray-300">*/}
                    {/*        {details.days_remaining} days remaining*/}
                    {/*    </p>*/}
                    {/*)}*/}
                    <p className={`text-sm ${isLimitReached ? 'text-red-400 font-semibold' : 'text-gray-300'}`}>
                        {uploadsUsed}/{uploadLimit} PDFs this month
                        {isLimitReached && ' (Limit reached)'}
                    </p>
                    {!isPro && (
                        <Link href="/#pricing" className="text-sm text-purple-400 hover:underline block">
                            Upgrade to Pro
                        </Link>
                    )}
                    <button
                        onClick={loadDetails}
                        className="text-xs bg-transparent text-gray-300 hover:text-white"
                    >
                        Refresh
                    </button>
                </div>
            </PopoverContent>
        </Popover>
    );
}