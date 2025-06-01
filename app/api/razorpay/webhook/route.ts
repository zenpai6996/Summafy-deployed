import { NextRequest, NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
    try {
        const body = await req.text();
        const signature = req.headers.get('x-razorpay-signature');

        // Verify webhook signature
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
            .update(body)
            .digest('hex');

        if (signature !== expectedSignature) {
            return NextResponse.json(
                { success: false, message: 'Invalid signature' },
                { status: 401 }
            );
        }

        const event = JSON.parse(body);
        const sql = await getDbConnection();

        // Store webhook event
        await sql`
      INSERT INTO razorpay_webhook_events(event_id, event_type, payload, processed)
      VALUES (${event.id}, ${event.event}, ${event}, false)
    `;

        // Process subscription events
        if (event.event === 'subscription.activated') {
            const subscriptionId = event.payload.subscription.entity.id;

            await sql`
        UPDATE razorpay_subscriptions
        SET status = 'active',
            current_start = ${new Date(event.payload.subscription.entity.current_start * 1000)},
            current_end = ${new Date(event.payload.subscription.entity.current_end * 1000)}
        WHERE subscription_id = ${subscriptionId}
      `;

            // Update user status
            const userId = event.payload.subscription.entity.notes.userId;
            await sql`UPDATE users SET status = 'active' WHERE id = ${userId}`;
        }

        if (event.event === 'subscription.cancelled' || event.event === 'subscription.expired') {
            const subscriptionId = event.payload.subscription.entity.id;

            await sql`
        UPDATE razorpay_subscriptions
        SET status = 'cancelled'
        WHERE subscription_id = ${subscriptionId}
      `;

            // Update user status
            const userId = event.payload.subscription.entity.notes.userId;
            await sql`UPDATE users SET status = 'inactive' WHERE id = ${userId}`;
        }

        // Mark webhook as processed
        await sql`
      UPDATE razorpay_webhook_events
      SET processed = true
      WHERE event_id = ${event.id}
    `;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json(
            { success: false, message: (error as Error).message },
            { status: 500 }
        );
    }
}