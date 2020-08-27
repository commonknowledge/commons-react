import * as qs from "querystring";

import { useAnalytics } from "@commonknowledge/common-analytics";
import { loadStripe } from "@stripe/stripe-js/pure";
import { InferType } from "yup";

import { DonationFormData, DonationFormSchema } from "../types/donations.types";

import { getStripePlans } from "./stripe.service";

export interface UseDonationsOpts {
  /** Url to redirect to on successful donation */
  successUrl?: string;

  /** Url to redirect to on cancelling donation */
  cancelUrl?: string;

  /** Default donation amount */
  defaultAmount: string;

  /** Default donation interval */
  defaultInterval: string;

  /** Stripe public API key. Defaults to process.env.STRIPE_PUBLISHABLE_KEY */
  stripeApiKey?: string;
}

export const useDonations = ({
  successUrl,
  cancelUrl,
  defaultAmount,
  defaultInterval,
  stripeApiKey = process.env.STRIPE_PUBLISHABLE_KEY,
}: UseDonationsOpts) => {
  if (!stripeApiKey) {
    throw Error(
      "stripeApiKey prop not provided and process.env.STRIPE_PUBLISHABLE_KEY not defined"
    );
  }

  const analytics = useAnalytics();
  // Preload any query strings from the URL into the form too
  const queryParams = qs.decode(
    typeof window === `undefined` ? "" : window.location.search
  );
  const formValuesFromURLQueryString = DonationFormSchema.cast(queryParams);
  const defaultValues: InferType<typeof DonationFormSchema> = {
    INTERVAL: defaultInterval,
    AMOUNT: defaultAmount,
    ...formValuesFromURLQueryString,
  };

  return {
    defaultValues,
    donate: async (data: DonationFormData) => {
      analytics.trackUser(data.EMAIL);
      analytics.trackEvent("attemptDonation", { category: "forms" });

      // Get the stripe payment data from the user options
      const stripeItems = await getStripePlans(
        Number(data?.AMOUNT),
        data.INTERVAL,
        DEFAULT_CURRENCY
      );

      // Prepare the stripe payment redirects
      const payload = qs.encode(data);
      const host = window.location.protocol + "//" + window.location.host;
      const successUrlFull = `${host}${
        successUrl || window.location.pathname
      }?${payload}`;
      const cancelUrlFull = `${host}${
        cancelUrl || window.location.pathname
      }?${payload}`;

      const stripe = await loadStripe(stripeApiKey);
      if (!stripe) throw new Error("Couldn't load our payment system, Stripe.");

      analytics.trackEvent(`donation-interval-${data.INTERVAL}`, {
        category: "forms",
        value: Number(data.AMOUNT),
      });
      analytics.trackEvent(`donation-amount-${data.AMOUNT}`, {
        category: "forms",
        value: Number(data.INTERVAL),
      });
      analytics.trackEvent("donation", {
        category: "forms",
        value: Number(data.AMOUNT),
      });

      await stripe.redirectToCheckout({
        customerEmail: data.EMAIL,
        ...stripeItems,
        successUrl: successUrlFull,
        cancelUrl: cancelUrlFull,
      });
    },
  };
};

export const NO_DONATION = "NO_DONATION";
export const DEFAULT_CURRENCY = "gbp";
