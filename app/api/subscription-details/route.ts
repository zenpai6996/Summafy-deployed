import { getSubscriptionDetails } from "@/lib/subscriptions";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const clerkUserId = searchParams.get("clerkUserId");

    if (!clerkUserId) {
        return new Response(JSON.stringify({ error: "Missing clerkUserId" }), { status: 400 });
    }

    try {
        console.log(`Fetching subscription details for user: ${clerkUserId}`);
        const details = await getSubscriptionDetails(clerkUserId);
        console.log(`Subscription details result:`, details);
        return new Response(JSON.stringify(details), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, max-age=0' // Prevent caching
            }
        });
    } catch (err) {
        console.error("API error:", err);
        return new Response(JSON.stringify({
            error: "Internal server error",
            message: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }), { status: 500 });
    }
}