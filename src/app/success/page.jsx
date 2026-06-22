import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, Button, Chip } from "@heroui/react";
import {
  CheckCircle2,
  ArrowRight,
  Mail,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { stripe } from "../../lib/stripe";
import { userSubscription } from "@/lib/action/subscriptions";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const { status, customer_details } = session;
  const customerEmail = customer_details?.email;
  const amountTotal = session.amount_total
    ? (session.amount_total / 100).toFixed(2)
    : "0.00";
  const currency = session.currency?.toUpperCase() || "USD";

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const subsInfo = {
      email: customerEmail,
      plan: "premium",
    };

    const premiumUser = await userSubscription(subsInfo);
  

    return (
      <div className="min-h-[calc(100vh-80px)] bg-default-50/40 dark:bg-zinc-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full z-10">
          <Card className="p-6 md:p-8 rounded-[32px] border border-slate-100 dark:border-zinc-900/80 bg-white dark:bg-zinc-900 shadow-xl text-center space-y-6 relative overflow-hidden">
            {/* Top Animated/Static Status Icon */}
            <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500/15 rounded-full animate-pulse" />
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center relative border border-emerald-500/10 shadow-inner">
                <CheckCircle2 size={32} strokeWidth={2.2} />
              </div>
            </div>

            {/* Typography Header */}
            <div className="space-y-2">
              <Chip
                size="sm"
                variant="flat"
                className="font-black text-[10px] uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 rounded-md px-2.5 h-6"
              >
                Payment Secured
              </Chip>
              <h1 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight pt-1">
                Thank You for Your Order!
              </h1>
              <p className="text-xs text-default-400 dark:text-zinc-400 leading-relaxed font-medium max-w-xs mx-auto">
                We appreciate your business. Your premium account configuration
                pipeline has been deployed successfully.
              </p>
            </div>

            {/* Transaction Detail Card Panel */}
            <div className="p-4 bg-default-50 dark:bg-zinc-800/40 border border-default-100 dark:border-zinc-800/60 rounded-2xl text-left space-y-2.5">
              <div className="flex justify-between items-center border-b border-default-100 dark:border-zinc-800/50 pb-2 text-xs">
                <span className="text-default-400 font-medium">
                  Customer Email
                </span>
                <span
                  className="font-bold text-slate-700 dark:text-zinc-200 truncate max-w-[200px]"
                  title={customerEmail}
                >
                  {customerEmail}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-default-400 font-medium">
                  Amount Charged
                </span>
                <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
                  {amountTotal} {currency}
                </span>
              </div>
            </div>

            {/* Disclaimers & Support Area */}
            <div className="space-y-3 pt-1">
              <p className="text-[11px] text-default-400 dark:text-zinc-500 font-medium leading-normal flex items-center justify-center gap-1.5">
                <Mail size={13} className="text-indigo-500 shrink-0" />
                <span>
                  Confirmation sent to{" "}
                  <strong className="text-slate-600 dark:text-zinc-400 font-bold">
                    {customerEmail}
                  </strong>
                </span>
              </p>

              <div className="text-[11px] font-medium text-default-400 dark:text-zinc-500">
                Questions? Email us at{" "}
                <a
                  href="mailto:orders@example.com"
                  className="text-indigo-500 hover:underline font-bold transition-all"
                >
                  orders@example.com
                </a>
              </div>
            </div>

            {/* Direct Gateway Landing Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link href="/" className="w-full">
                <Button
                  color="primary"
                  className="w-full font-black text-xs h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-600/10 gap-1.5"
                >
                  Go to Dashboard <ArrowRight size={13} />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
