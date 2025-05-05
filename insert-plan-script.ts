import { Pool } from 'pg';
import Razorpay from 'razorpay';

// Get environment variables from command line arguments or use defaults
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || process.argv[2];
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || process.argv[3];
const DB_CONNECTION_STRING = process.env.DATABASE_URL || process.argv[4] || 'postgresql://postgres:postgres@localhost:5432/your_db_name';

// Function to get database connection
async function getDbConnection() {
    const pool = new Pool({
        connectionString: DB_CONNECTION_STRING,
    });
    return pool;
}

// Initialize Razorpay with provided credentials
const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
});

async function createRazorpayPlan(name: string, description: string, amount: number,
                                  interval: 'monthly' | 'yearly', pdfLimit: number) {
    try {
        console.log(`Creating Razorpay plan: ${name}`);

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

        console.log(`Razorpay plan created with ID: ${plan.id}`);

        // Store plan in database
        const pool = await getDbConnection();
        await pool.query(
            `INSERT INTO razorpay_plans (id, name, description, pdf_limit, price, billing_cycle, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [plan.id, name, description, pdfLimit, amount, interval, true]
        );

        console.log(`Plan saved to database successfully`);
        return plan;
    } catch (error) {
        console.error('Error creating Razorpay plan:', error);
        throw error;
    }
}

async function displayExistingPlans() {
    try {
        const pool = await getDbConnection();
        const result = await pool.query('SELECT * FROM razorpay_plans');

        const plans = result.rows;
        if (plans.length > 0) {
            console.log(`Found ${plans.length} existing plans:`);
            plans.forEach(plan => {
                console.log(`- ${plan.id}: ${plan.name} (₹${plan.price})`);
            });
            return plans;
        } else {
            console.log('No existing plans found in the database.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching plans from database:', error);
        return [];
    }
}

// Main function to create or display plans
async function manageRazorpayPlans() {
    try {
        console.log('Razorpay Plans Management');
        console.log('------------------------');

        if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
            console.error('\nError: Razorpay API keys not provided');
            console.log('\nUsage: npx tsx insert-plan-script.ts <RAZORPAY_KEY_ID> <RAZORPAY_KEY_SECRET> [DB_CONNECTION_STRING]');
            console.log('\nExample: npx tsx insert-plan-script.ts rzp_test_1234567890 secret_1234567890');
            process.exit(1);
        }

        console.log('Checking for existing plans...');
        const existingPlans = await displayExistingPlans();

        if (existingPlans.length === 0) {
            console.log('\nCreating a new Pro plan...');

            // Create Pro plan
            const proPlan = await createRazorpayPlan(
                'Pro Plan',
                'Best for Professionals - 15 PDF summaries per month',
                100, // ₹100
                'monthly',
                15 // PDF limit
            );

            console.log('\nPlan created successfully!');
            console.log(`Plan ID: ${proPlan.id}`);
            console.log('\nIMPORTANT: Update the default planId in checkout/page.tsx to:');
            console.log(`const planId = searchParams.planId || '${proPlan.id}';`);
        } else {
            console.log('\nPlans already exist. If you want to create a new plan, modify this script.');
            console.log('\nIMPORTANT: Make sure to update checkout/page.tsx with one of these plan IDs');
            console.log('to use as the default plan when no planId is provided in the URL.');
        }
    } catch (error) {
        console.error('\nError running script:', error);
        process.exit(1);
    }
}

// Run the main function
manageRazorpayPlans();