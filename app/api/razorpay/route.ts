import { NextRequest, NextResponse } from 'next/server';
import { createSubscription } from '@/lib/razorpay';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { planId } = await req.json();

        // Create subscription
        const subscription = await createSubscription(
            planId,
            user.id,
            user.emailAddresses[0].emailAddress
        );

        return NextResponse.json({
            success: true,
            subscriptionId: subscription.id,
            keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error('Error creating subscription:', error);
        return NextResponse.json(
            { success: false, message: (error as Error).message },
            { status: 500 }
        );
    }
}