import Razorpay from 'razorpay';
import { getDbConnection } from './db';

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function createRazorpayPlan(name: string, description: string, amount: number,
                                         interval: 'monthly' | 'yearly', pdfLimit: number) {
    try {
        // Create plan in Razorpay
        const plan = await razorpay.plans.create({
            period: interval,
            interval: 1,
            item: {
                name,
                description,
                amount: amount * 100, // Amount in paise
                currency: 'INR',
            },
        });

        // Store plan in database
        const sql = await getDbConnection();
        await sql`
      INSERT INTO razorpay_plans (id, name, description, pdf_limit, price, billing_cycle, is_active)
      VALUES (${plan.id}, ${name}, ${description}, ${pdfLimit}, ${amount}, ${interval}, true)
    `;

        return plan;
    } catch (error) {
        console.error('Error creating Razorpay plan:', error);
        throw error;
    }
}

export async function createSubscription(planId: string, clerkUserId: string, userEmail: string) {
    try {
        const sql = await getDbConnection();

        // Get user or create if not exists
        const [user] = await sql`
            INSERT INTO users (clerk_id, email)
            VALUES (${clerkUserId}, ${userEmail})
                ON CONFLICT (clerk_id) DO UPDATE
                                              SET email = EXCLUDED.email
                                              RETURNING clerk_id
        `;

        // Verify plan exists
        const plans = await sql`SELECT * FROM razorpay_plans WHERE id = ${planId}`;
        if (plans.length === 0) {
            throw new Error('Plan not found');
        }

        // Create subscription in Razorpay
        const subscription = await razorpay.subscriptions.create({
            plan_id: planId,
            customer_notify: 1,
            total_count: 12,
            notes: {
                userId: clerkUserId,
            },
        });

        // Get subscription details to get start/end dates
        const subDetails = await razorpay.subscriptions.fetch(subscription.id);

        // Insert subscription with proper dates
        await sql`
            INSERT INTO razorpay_subscriptions (
                subscription_id, 
                user_id, 
                plan_id, 
                status,
                current_start,
                current_end
            ) VALUES (
                ${subscription.id}, 
                ${clerkUserId}, 
                ${planId}, 
                ${subscription.status},
                ${new Date(subDetails.current_start * 1000)},
                ${new Date(subDetails.current_end * 1000)}
            )
        `;

        // Update user with subscription info
        await sql`
            UPDATE users
            SET price_id = ${planId},
                customer_id = ${subscription.id},
                status = 'active'
            WHERE clerk_id = ${clerkUserId}
        `;

        return subscription;
    } catch (error) {
        console.error('Error creating Razorpay subscription:', error);
        throw error;
    }
}

export async function getSubscriptionDetails(subscriptionId: string) {
    try {
        return await razorpay.subscriptions.fetch(subscriptionId);
    } catch (error) {
        console.error('Error fetching subscription:', error);
        throw error;
    }
}

export async function cancelSubscription(subscriptionId: string) {
    try {
        return await razorpay.subscriptions.cancel(subscriptionId);
    } catch (error) {
        console.error('Error cancelling subscription:', error);
        throw error;
    }
}

export async function verifyPaymentSignature(params: any) {
    try {
        // Verify payment signature
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(`${params.razorpay_order_id}|${params.razorpay_payment_id}`)
            .digest('hex');

        return generated_signature === params.razorpay_signature;
    } catch (error) {
        console.error('Error verifying payment signature:', error);
        throw error;
    }
}