import { redirect } from "next/navigation";
import { stripe } from "../../lib/stripe";
import { userSubscription } from "@/lib/action/subscriptions";
import SuccessClientView from "./SuccessClientView"; // Path to client presenter

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

    // Execute server-side state mutation pipeline securely
    await userSubscription(subsInfo);

    return (
      <SuccessClientView 
        customerEmail={customerEmail}
        amountTotal={amountTotal}
        currency={currency}
      />
    );
  }

  return null;
}