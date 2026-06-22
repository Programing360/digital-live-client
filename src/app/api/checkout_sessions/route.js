import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getUseSession } from "@/lib/core/session";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const user = await getUseSession();
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: "price_1Tl1frRpsJty3vvqxsBodVeL",
          quantity: 1,
        },
      ],
      mode: "payment",

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
       cancel_url: `${origin}/upgrade`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
