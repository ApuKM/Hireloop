import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import { Card, CardHeader, CardFooter, Button, Separator } from "@heroui/react";
// Assuming you have your stripe instance initialized in your lib directory
import { stripe } from "@/lib/stripe";
import { SubInfo } from "@/utils/types/PricingTypes";
import { createSubscription } from "@/lib/api/subscriptions";

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  // 1. Graceful validation check instead of standard app crashing
  if (!session_id || !session_id.startsWith("cs_")) {
    return (
      <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4">
        <Card className="max-w-md border border-danger/20 p-4 text-center shadow-lg">
          <Card.Content className="flex flex-col items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-danger/10 text-danger text-xl font-bold">
              ✕
            </div>
            <h1 className="text-xl font-bold text-default-900">
              Invalid Checkout Session
            </h1>
            <p className="text-sm text-default-500">
              We could not find a valid checkout session for this transaction.
              If you believe this is an error, please reach out to support.
            </p>
            <Link href="/pricing">
              <Button variant="outline" className="mt-2 w-full">
                Back to Pricing
              </Button>
            </Link>
          </Card.Content>
        </Card>
      </div>
    );
  }

  // 2. Fetch data safely with explicit Stripe expands
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  console.log("Session form stripe", session);
  if (session.status === "open") {
    return redirect("/pricing");
  }

  // Extract variables safely with proper fallbacks
  const planId = session?.metadata?.planId;
  const customerEmail = session.customer_details?.email ?? "your email address";
  const planName =
    session.line_items?.data[0]?.description ?? "Subscription Plan";
  const amountTotal = session.amount_total
    ? (session.amount_total / 100).toFixed(2)
    : "0.00";
  const currency = session.currency?.toUpperCase() ?? "USD";
  const transactionId =
    typeof session.payment_intent === "object"
      ? session.payment_intent?.id
      : session.id;

  const subInfo: SubInfo = {
    customerEmail,
    planId,
  };

  const result = await createSubscription(subInfo);
  console.log("Result from subinfo", result)

  return (
    <main className="min-h-screen bg-linear-to-b from-default-50 via-background to-default-100 py-16 lg:py-24">
      <div className="container mx-auto max-w-xl px-4">
        <Card className="border border-default-200/60 p-4 shadow-xl">
          {/* Animated/Clean Success Check Banner */}
          <CardHeader className="flex flex-col items-center gap-2 pt-6 text-center">
            <div className="flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-success-50 text-success shadow-xs ring-4 ring-success-100">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight md:text-3xl">
              Subscription Activated!
            </h1>
            <p className="text-sm text-default-500">
              Thank you for your purchase. Your account has been upgraded
              successfully.
            </p>
          </CardHeader>

          <Separator className="my-6 opacity-60" />

          {/* Detailed Invoice Breakdowns */}
          <Card.Content className="space-y-4 px-4 py-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-default-400">
              Order Summary
            </h3>

            <div className="rounded-xl bg-default-50 p-4 space-y-3 border border-default-200/40">
              <div className="flex justify-between items-center text-sm">
                <span className="text-default-500">Plan Activated</span>
                <span className="font-semibold text-default-900">
                  {planName}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-default-500">Amount Charged</span>
                <span className="font-bold text-primary">
                  {currency === "USD" ? "$" : ""}
                  {amountTotal} {currency}
                </span>
              </div>

              <Separator className="my-1 opacity-40" />

              <div className="flex justify-between items-center text-xs">
                <span className="text-default-400">User Email</span>
                <span className="text-default-600 truncate max-w-[200px]">
                  {customerEmail}
                </span>
              </div>

              {transactionId && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-default-400">Reference ID</span>
                  <span className="font-mono text-default-600 select-all">
                    {transactionId}
                  </span>
                </div>
              )}
            </div>

            <p className="text-center text-xs text-default-400 pt-2">
              A confirmation receipt and setup setup guidelines have been
              dispatched to your email. Need help? Contact us at{" "}
              <a
                href="mailto:support@yourdomain.com"
                className="text-primary hover:underline font-medium"
              >
                support@yourdomain.com
              </a>
              .
            </p>
          </Card.Content>

          {/* Action Call To Actions */}
          <CardFooter className="flex flex-col gap-2 pb-6 pt-6 px-4">
            <Link href="/">
              <Button className="w-full font-semibold shadow-md" variant="outline" size="lg">
                Go to Home
              </Button>
            </Link>
            <Link href="/jobs">
              <Button className="w-full font-medium text-green-400" variant="secondary" size="lg">
                Explore Active Jobs
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
