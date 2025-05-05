import { getDbConnection } from "./db";

export async function getCurrentPlan(clerkUserId: string): Promise<'basic' | 'pro'> {
    const subscriptionDetails = await getSubscriptionDetails(clerkUserId);
    return subscriptionDetails.plan_id as 'basic' | 'pro';
}

export async function getUploadCount(clerkUserId: string): Promise<number> {
    const sql = await getDbConnection();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const result = await sql`
        SELECT COUNT(*) as count FROM pdf_summaries
        WHERE user_id = ${clerkUserId}
          AND EXTRACT(MONTH FROM created_at) = ${currentMonth}
          AND EXTRACT(YEAR FROM created_at) = ${currentYear}
    `;
    return result[0]?.count || 0;
}

export interface SubscriptionDetails {
    plan_id: 'basic' | 'pro';
    days_remaining: number;
    uploads_used: number;
    upload_limit: number;
    is_limit_reached: boolean;
}

export async function getSubscriptionDetails(clerkUserId: string): Promise<SubscriptionDetails> {
    const sql = await getDbConnection();
    console.log(`Getting subscription details for user: ${clerkUserId}`);

    // Get current month's upload count
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const uploadsResult = await sql`
        SELECT COUNT(*) as count FROM pdf_summaries
        WHERE user_id = ${clerkUserId}
        AND EXTRACT(MONTH FROM created_at) = ${currentMonth}
        AND EXTRACT(YEAR FROM created_at) = ${currentYear}
    `;

    const uploadsUsed = uploadsResult[0]?.count || 0;

    // Get subscription with proper plan type detection
    const subscription = await sql`
        SELECT
            rs.plan_id,
            rp.name as plan_name,
            rs.current_end,
            rs.status,
            CASE
                WHEN rs.current_end IS NOT NULL THEN
                    EXTRACT(DAY FROM (rs.current_end - CURRENT_DATE))::integer
                ELSE 30  -- Default 30 days if end date not set
            END as days_remaining
        FROM razorpay_subscriptions rs
        JOIN razorpay_plans rp ON rs.plan_id = rp.id
        WHERE rs.user_id = ${clerkUserId} AND rs.status = 'created'
        ORDER BY rs.created_at DESC LIMIT 1
    `;


    if (subscription.length > 0) {
        // More explicit logging to debug the issue
        console.log(`Plan name: ${subscription[0].plan_name}`);
        console.log(`Status: ${subscription[0].status}`);

        // Ensure plan detection is accurate - check both name and plan_id
        const planName = subscription[0].plan_name?.toLowerCase() || '';
        const isPro = planName.includes('pro') || subscription[0].plan_id === 'plan_QR8u02PToxcJzb';
        const uploadLimit = isPro ? 15 : 5;


        return {
            plan_id: isPro ? 'pro' : 'basic',
            days_remaining: subscription[0].days_remaining || 0,
            uploads_used: uploadsUsed,
            upload_limit: uploadLimit,
            is_limit_reached: uploadsUsed >= uploadLimit
        };
    }


    // Default Basic plan
    const basicUploadLimit = 5;
    return {
        plan_id: 'basic',
        days_remaining: 0,
        uploads_used: uploadsUsed,
        upload_limit: basicUploadLimit,
        is_limit_reached: uploadsUsed >= basicUploadLimit
    };
}