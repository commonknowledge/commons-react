import Stripe from "stripe";
import { RedirectToCheckoutOptions } from "@stripe/stripe-js";
import { RequestHandler } from "express";

interface StripeDonationOpts {
  stripeSecretKey?: string;
  stripeProductId?: string;
}

type PayInterval = Stripe.PlanCreateParams.Interval | "one_time";
const DEFAULT_CURRENCY = "gbp";

export const createStripeDonationEndpoint = ({
  stripeSecretKey = process.env.STRIPE_SECRET_KEY,
  stripeProductId = process.env.STRIPE_DONATION_PRODUCT_ID,
}: StripeDonationOpts): RequestHandler => {
  if (!stripeSecretKey) {
    throw new Error("stripeSecretKey has not been set.");
  }
  if (!stripeProductId) {
    throw new Error("stripeProductId has not been set.");
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2020-08-27",
  });

  const findPlan = async (
    amount: number,
    interval: PayInterval = "month",
    currency: string = DEFAULT_CURRENCY
  ): Promise<Partial<RedirectToCheckoutOptions>> => {
    // * Stripe counts money in pennies, not pounds
    //
    // * We first round to lowest full $1 to limit the number of plans
    // created by people with a fetish for .99 or .98 amounts
    //
    // * We obviously can't charge people MORE than they pledged so we use floor.
    //
    // * But we also can't charge 0 so $1 is the floor
    amount = parseInt(
      String(
        Math.floor(
          Math.max(1, typeof amount === "number" ? amount : parseFloat(amount))
        ) * 100
      )
    );

    // Process
    const prices = await stripe.prices.list({
      product: stripeProductId,
      limit: 10000,
    });

    let price = prices.data.find(
      (price) =>
        price.unit_amount == amount &&
        ((interval === "one_time" && price.recurring === null) ||
          interval === price.recurring?.interval) &&
        price.currency === currency
    );

    if (!price) {
      price = await stripe.prices.create({
        unit_amount: amount,
        product: stripeProductId,
        currency,
        recurring:
          interval === "one_time"
            ? undefined
            : {
                interval,
                interval_count: 1,
              },
        active: true,
        billing_scheme: "per_unit",
      });
    }

    const res: Partial<RedirectToCheckoutOptions> = {
      lineItems: [{ price: price.id, quantity: 1 }],
      mode: interval === "one_time" ? "payment" : "subscription",
    };
    return res;
  };

  return async (req, res) => {
    const { amount, interval, currency } = req.body;

    const stripePlans = await findPlan(parseInt(amount), interval, currency);

    return res.json(stripePlans);
  };
};
