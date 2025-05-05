"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface CheckoutFormProps {
    planId: string;
    planName: string;
    price: number;
}

export default function CheckoutForm({ planId, planName, price }: CheckoutFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleCheckout = async () => {
        try {
            setIsLoading(true);

            // Create subscription
            const response = await fetch('/api/razorpay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ planId }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Failed to create subscription');
            }

            // Initialize Razorpay checkout
            const options = {
                key: data.keyId,
                subscription_id: data.subscriptionId,
                name: "Summafy",
                description: `${planName} Subscription`,
                handler: function(response: any) {
                    // Redirect to dashboard on successful payment
                    router.push('/dashboard');
                },
                prefill: {
                    name: "",
                    email: "",
                    contact: "",
                },
                notes: {
                    planId: planId,
                },
                theme: {
                    color: "#C68EFD",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Failed to initialize checkout. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full  bg-gradient-to-r from-[#E9A5F1] to-[#8F87F1] hover:bg-gradient-to-r hover:from-[#8F87F1] hover:to-[#E9A5F1]"
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                </>
            ) : (
                `Subscribe for ₹${price}/month`
            )}
        </Button>
    );
}